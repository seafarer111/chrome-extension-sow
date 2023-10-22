const PeoplesModel = require("../models/peoples.model");
const LinkedIn = require("node-linkedin");
const { getLinkedinAccessToken } = require("../utils/utils");

const getPeoples = async (req, res, next) => {
  try {
    const result = await PeoplesModel.getPeoples();
    if (result) {
      res.send({ ok: true, data: result.items });
    } else {
      res.send({ ok: false, data: "Something went wrong" });
    }
  } catch (error) {
    res.send({ ok: false, data: "DB Error" });
  }
};

const getMatched = async (req, res, next) => {
  try {
    const result = await PeoplesModel.getMatched();
    if (result) {
      res.send({ ok: true, items: result.items });
    } else {
      res.send({ ok: false, data: "Something went wrong" });
    }
  } catch (error) {
    res.send({ ok: false, data: "DB Error" });
  }
};

const createPeople = async (req, res, next) => {
  const people = req.body;
  const result = PeoplesModel.create(people);
  if (!result) {
    res.send({ ok: false, data: "Something went wrong." });
  }
  res.send({ ok: true, data: "successful" });
};

const saveSalesNavigator = async (req, res, next) => {
  try {
    const linkedin = new LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      redirectUri: process.env.LINKEDIN_CLIENT_REDIRECT_URI,
    });
    const accessToken = await getLinkedinAccessToken();
    const profileUrl = req.body.url;
    const leadType = "person";
    const locationFilter = {
      geoRegion: "us:0",
    };
    linkedin.sn.saveLead(
      profileUrl,
      leadType,
      locationFilter,
      accessToken,
      (err, result) => {
        if (err) {
          res.send({
            ok: false,
            data: "Something went wrong with Linkedin API",
          });
        }
        res.send({ ok: true, data: result });
      }
    );
  } catch (error) {
    res.send({ ok: false, data: "Something went wrong with Linkedin API" });
  }
};

module.exports = {
  getPeoples,
  createPeople,
  getMatched,
  saveSalesNavigator,
};
