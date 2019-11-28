import express = require("express");
const router = express.Router();
import pg = require("pg");

const usersColumns = [
    "company",
    "code",
    "firstname",
    "lastname",
    "email",
    "dept",
];

const client = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
});
client.connect();

router.get("/", (_req, res, _next) => {
    res.send("Hello, API v1!");
});

router.get("/users", async (req, res, _next) => {
    let fields = [];
    if (req.query.fields) {
        fields = req.query.fields.split(",").map((f) => f.trim());
        console.log(fields);
        for (const f of fields) {
            if (!usersColumns.includes(f)) {
                res.json({ error: `column '${f}' does not exist` });
                return;
            }
        }
    }

    const columns = fields.length > 0 ? fields.join(",") : "*";
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    const sql =
        "SELECT " +
        columns +
        " FROM users ORDER BY COMPANY, CODE LIMIT $1 OFFSET $2";
    console.log(sql);
    const result = await client.query({
        text: sql,
        values: [limit, offset],
    });
    console.log(result.rows);
    res.json(result.rows);
});

router.get("/users/:u", async (req, res, _next) => {
    let fields = [];
    if (req.query.fields) {
        fields = req.query.fields.split(",").map((f) => f.trim());
        console.log(fields);
        for (const f of fields) {
            if (!usersColumns.includes(f)) {
                res.json({ error: `column '${f}' does not exist` });
                return;
            }
        }
    }

    const columns = fields.length > 0 ? fields.join(",") : "*";
    const sql =
        "SELECT " + columns + " FROM users WHERE company = $1 AND code = $2";
    console.log(sql);
    const result = await client.query({
        text: sql,
        values: [req.params.u.slice(0, 3), req.params.u.slice(3)],
    });
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

export = router;
