const PeoplesModel = require("../models/peoples.model");
const HttpException = require("../utils/HttpException.utils");
const LinkedIn = require("node-linkedin");
const { getLinkedinAccessToken } = require("../utils/utils");

const getPeoples = async (req, res, next) => {
  const result = await PeoplesModel.getPeoples();
  if (result) {
    res.send({ ok: true, data: result.items });
  } else {
    throw new HttpException(404, "Something went wrong");
  }
};

const getMatched = async (req, res, next) => {
  const result = await PeoplesModel.getMatched();
  if (result) {
    res.send({ ok: true, items: result.items });
  } else {
    throw new HttpException(404, "Something went wrong");
  }
};

const createPeople = async (req, res, next) => {
  const people = req.body;
  const result = PeoplesModel.create(people);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ ok: true, data: "successful" });
};

const saveSalesNavigator = async (req, res, next) => {
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
        throw new HttpException(500, "Something went wrong");
      }
      res.send({ ok: true, data: result });
    }
  );
};

module.exports = {
  getPeoples,
  createPeople,
  getMatched,
  saveSalesNavigator,
};
