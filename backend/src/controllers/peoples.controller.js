const PeoplesModel = require("../models/peoples.model");
const HttpException = require("../utils/HttpException.utils");

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

module.exports = {
  getPeoples,
  createPeople,
  getMatched,
};
