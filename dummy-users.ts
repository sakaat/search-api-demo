import faker = require("faker");
import pg = require("pg");

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";

const client = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

(async () => {
    client.connect();
    for (let i = 0; i < 100; i++) {
        const al = ALPHABET.length;
        let dummyCompany = "";
        for (let j = 0; j < 3; j++) {
            // tslint:disable-next-line: insecure-random
            dummyCompany += ALPHABET[Math.floor(Math.random() * al)];
        }

        const nl = NUMBERS.length;
        let dummyCode = "";
        for (let j = 0; j < 6; j++) {
            // tslint:disable-next-line: insecure-random
            dummyCode += NUMBERS[Math.floor(Math.random() * nl)];
        }

        let dummyDept = "";
        for (let j = 0; j < 4; j++) {
            // tslint:disable-next-line: insecure-random
            dummyDept += NUMBERS[Math.floor(Math.random() * nl)];
        }

        const sql = "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)";
        await client.query({
            text: sql,
            values: [
                dummyCompany,
                dummyCode,
                faker.name.firstName(),
                faker.name.lastName(),
                faker.internet.email(),
                dummyDept,
            ],
        });
    }
    client.end();
})();
