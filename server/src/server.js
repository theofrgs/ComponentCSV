var express = require('express');
var app = express();
const hostname = '0.0.0.0';
var port = 8080;
var cors = require("cors");
const fs = require("fs");
const csv = require('csv-parser');

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.get("/data", (req, res) => {
    const results = [];

    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.send(results)
        });
})

app.listen(port, hostname, () => console.log(`API Server listening on port ${port}`));