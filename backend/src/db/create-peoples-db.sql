 
USE sow_db; 

CREATE TABLE IF NOT EXISTS peoples
(
    id              INT PRIMARY KEY auto_increment, 
    name            VARCHAR(255) NOT NULL,
    url           VARCHAR(255) NOT NULL, 
    about        TEXT NOT NULL,
    comapny            VARCHAR(255) NOT NULL,
    matched            BOOLEAN NOT NULL,
    created_on      DATETIME NOT NULL DEFAULT NOW(),
    updated_on      DATETIME NOT NULL DEFAULT NOW(),
    remove_on       DATETIME NULL DEFAULT NULL
)