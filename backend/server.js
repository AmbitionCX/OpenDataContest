const express = require('express');
const axios = require('axios');
var cors = require('cors');
const csvReader = require('./csvReader');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    let key = "&key=" + process.env.API_KEY
    let url = "http://data1.library.sh.cn/gj/webapi/instances?freetext=三国" + key;

    axios({
        method:'get',
        url
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
})

app.get("/get_shanggu_shijing", (req, res) => {
    csvReader.get_shanggu_shijing().then( data => res.send(data))
})

app.get("/get_zhonggu_guangyun", (req, res) => {
    csvReader.get_zhonggu_guangyun().then( data => res.send(data))
})

app.get("/get_jindai_zhongyuan", (req, res) => {
    csvReader.get_jindai_zhongyuan().then( data => res.send(data))
})

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}...`);
});

