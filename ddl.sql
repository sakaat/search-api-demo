CREATE TABLE users (
    company   VARCHAR(4)   NOT NULL,
    code      VARCHAR(10)  NOT NULL,
    firstname VARCHAR(30)  NOT NULL,
    lastname  VARCHAR(30)  NOT NULL,
    email     VARCHAR(100) NOT NULL,
    dept      VARCHAR(4)   NOT NULL,
    PRIMARY KEY(company,code)
)
;
