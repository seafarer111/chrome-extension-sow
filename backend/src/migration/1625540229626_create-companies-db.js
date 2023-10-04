module.exports = {
  up: `CREATE TABLE IF NOT EXISTS companies
  (
    id              INT PRIMARY KEY auto_increment, 
    name            VARCHAR(255) UNIQUE NOT NULL, 
    url           VARCHAR(255) UNIQUE NOT NULL, 
    about        TEXT NOT NULL, 
    icp            TEXT NOT NULL,
    created_on      DATETIME NOT NULL DEFAULT NOW(),
    updated_on      DATETIME NOT NULL DEFAULT NOW(),
    remove_on       DATETIME NULL DEFAULT NULL
    )`,
  down: "DROP TABLE IF EXISTS companies",
};
