const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

const getPeoples = async () => {
  let sql = `SELECT * FROM ${Tables.tb_peoples}`;
  try {
    const result = await DBConnection.query(sql);
    return {
      state: true,
      items: result,
    };
  } catch (e) {
    console.log(e);
    return {
      state: false,
    };
  }
};

const getMatched = async () => {
  const sql = `SELECT * FROM ${Tables.tb_peoples} WHERE matched = 1`;
  try {
    const result = await DBConnection.query(sql);
    return {
      state: true,
      items: result,
    };
  } catch (e) {
    console.log(e);
    return {
      state: false,
    };
  }
};

const create = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_peoples}
                    (name, url, about, company, matched) VALUES (?,?,?,?,?)`;
  const result = await DBConnection.query(sql, [
    params.name,
    params.url,
    params.about,
    params.company,
    params.matched,
  ]);
  const affectedRows = result ? result.affectedRows : 0;
  return affectedRows;
};

module.exports = {
  getPeoples,
  create,
  getMatched,
};
