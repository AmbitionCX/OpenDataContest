const express = require('express');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

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

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});

