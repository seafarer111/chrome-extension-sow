const CompanyModel = require("../models/company.model");
const PeoplesModel = require("../models/peoples.model");
const HttpException = require("../utils/HttpException.utils");
import { OpenAIChat } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { spawn } from "child_process";
const puppeteer = require("puppeteer");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const ResumeParser = require("simple-resume-parser");

const storage = multer.diskStorage({
  destination: "uploads/resume",
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("resume");

const template = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. The AI answers as Yoda.
  Current conversation:
  {chat_history}
  Human: {input}
  AI:`;

const memory = new BufferMemory({ memoryKey: "chat_history" });
const model = new OpenAIChat({ temperature: 0.9 });
const prompt = PromptTemplate.fromTemplate(template);
const chain = new LLMChain({ llm: model, prompt, memory });
let ICP = "";
let ABOUT = "";
let COMPANY = "";

const getCompanies = async (req, res, next) => {
  const result = await CompanyModel.getCompanies();
  if (result) {
    res.send({ ok: true, data: result.items });
  } else {
    throw new HttpException(404, "Something went wrong");
  }
};

const createCompany = async (req, res, next) => {
  const company = {
    name: req.body?.companyName,
    url: req.body?.url,
    about: req.body?.companyIntroduction,
    icp: req.body?.icp,
  };

  const result = CompanyModel.create(company);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ ok: true, data: "successful" });
};

const uploadResume = async (req, res, next) => {
  upload(req, res, () => {
    const { jobDesc, icp, company } = req.body;
    console.log(jobDesc, icp);
    /** Here we should scrap the job description from the job link */
    const resume = new ResumeParser(req.file.path);
    resume
      .parseToJSON()
      .then(async (data) => {
        const experience = data.parts?.experience ? data.parts.experience : "";
        const skills = data.parts?.skills ? data.parts.skills : "";
        const name = data.parts?.name ? data.parts.name : "";
        const linkedinUrl = data.parts?.profiles
          ? data.parts.profiles
              .split(" ")
              .filter((item) => item.includes("linkedin.com"))[0]
          : "";
        const about = "";
        const resumeData = {
          experience,
          skills,
        };
        const prompt = `You are the hiring manager for Our company which does ${icp}. We have a job opening listed at ${jobDesc}. Take a look at ${JSON.stringify(
          resumeData
        )} and tell me the pros and cons of this person in this roll. Include their strengths and weaknesses in this roll and what we should focus on in an interview with them for the position.`;
        try {
          const results = await chain.call({ input: prompt });
          const savedata = {
            name: name,
            url: linkedinUrl,
            about: about,
            company: company,
            matched: true,
          };
          const result = PeoplesModel.create(savedata);
          if (!result) {
            res.send({ ok: false, data: "Something went wrong." });
          } else {
            res.send({ ok: true, data: results });
          }
        } catch (error) {
          res.send({ ok: false, data: error });
        }
      })
      .catch((error) => {
        res.send({ ok: false, data: "Something went wrong." });
        console.error(error);
      });
  });
};

const callPythonScriptasync = async (input) => {
  await puppeteer.launch({ headless: false });
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["scripts/app.py"]);
    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();
    let output = "";
    pythonProcess.stdout.on("data", (data) => {
      output = data.toString();
    });
    let errorOutput = "";
    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("exit", (code) => {
      if (code === 0) {
        const jsonOutput = JSON.parse(output);
        console.log(jsonOutput);
        resolve(output);
      } else {
        reject(errorOutput);
      }
    });
  });
};

const getGPT = async (req, res, next) => {
  const { company } = req.body;
  const scrapData = await callPythonScriptasync(company.name);
  ICP = company.icp;
  ABOUT = company.about;
  COMPANY = company.name;
  const results = await Promise.all(scrapData.map(langChainFunc));
  const result = PeoplesModel.create(results);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ ok: true, data: results });
};

const langChainFunc = async (item, idx) => {
  const prompt = `Please provide only "true" or "false" if the this member(${item.about}) is matched with the company(${ICP}, also ${ABOUT}), Don't answer if the response is ture or false!!!`;
  const res = await chain.call({ input: prompt });
  return {
    id: idx,
    name: item.name,
    about: item.title,
    url: item.url,
    company: COMPANY,
    matched: res.text.toLowerCase().startsWith("true") ? true : false,
  };
};

module.exports = {
  getCompanies,
  createCompany,
  getGPT,
  uploadResume,
};
