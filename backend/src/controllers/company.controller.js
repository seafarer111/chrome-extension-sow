const CompanyModel = require("../models/company.model");
const PeoplesModel = require("../models/peoples.model");
const HttpException = require("../utils/HttpException.utils");
import { OpenAIChat } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { spawn } from "child_process";

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

const callPythonScriptasync = async (jsonInput) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["scripts/app.py", jsonInput]);
    pythonProcess.stdout.on("data", (data) => {
      const output = data.toString();
      resolve(output);
    });
    let errorOutput = "";
    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
      reject(errorOutput);
    });
  });
};

const getGPT = async (req, res, next) => {
  const { company } = req.body;

  const scrapRes = [
    {
      name: "xxx",
      about: "Actively Looking for Change as a front end Developer with 2+ EXP",
      company: "Hyderabad",

      url: "345634563456",
    },
    {
      name: "yyy",
      about: "Bench sales recruiter At Spherestaffit",
      company: "Hyderabad",
      url: "34563456",
    },
    {
      name: "zzz",
      about:
        "HR Operations Executive || Actively hiring for HR Generalist and US IT Bench Sales Recruiter roles in Rajahmundry, AP || Email me at hr.admin.bza@prodisystech.com",
      company: "Vijayawada",
      url: "3563",
    },
    {
      name: "aaaa",
      about: "Software Test Engineer at Prodisys Technologies",
      company: "Krishna",
      url: "",
    },
    {
      name: "bbb",
      about: "Actively Hiring BDMs - US IT & Non-IT Sales",
      company: "Hyderabad",
      url: "",
    },
    {
      name: "cccc",
      about: "Quality Analyst at Prodisys Technologies",
      company: "Hyderabad",
      url: "",
    },
    {
      name: "dddd",
      about: "Human Resources",
      company: "Hyderabad",
      url: "",
    },
    {
      name: "eeeee",
      about: "Technical Associate at Prodisys Technologies",
      company: "Hyderabad",
      url: "",
    },
    {
      name: "dddddeee",
      about: "HR Executive",
      company: "Andhra Pradesh",
      url: "India",
    },
    {
      name: "LinkedIn Member",
      url: "afdafda",
      about: "IT Recruiter at prodisys",
      company: "Krishna",
    },
  ];
  ICP = company.icp;
  ABOUT = company.about;
  COMPANY = company.name;
  const results = await Promise.all(scrapRes.map(langChainFunc));

  // PeoplesModel.create(results);
  res.send({ ok: true, data: results });
};

const langChainFunc = async (item) => {
  const prompt = `Please provide only "true" or "false" if the this member(${item.about}) is matched with the company(${ICP}, also ${ABOUT})`;
  const res = await chain.call({ input: prompt }); // TRUE or FALSE
  return {
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
};
