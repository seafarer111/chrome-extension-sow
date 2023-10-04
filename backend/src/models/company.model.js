const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

const getCompanies = async () => {
  let sql = `SELECT * FROM ${Tables.tb_companies}`;
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
  const sql = `INSERT INTO ${Tables.tb_companies}
                    (name, url, about, icp) VALUES (?,?,?,?)`;
  const result = await DBConnection.query(sql, [
    params.name,
    params.url,
    params.about,
    params.icp,
  ]);
  const affectedRows = result ? result.affectedRows : 0;
  return affectedRows;
};

module.exports = {
  getCompanies,
  create,
};
