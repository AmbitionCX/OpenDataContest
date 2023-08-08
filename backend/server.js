const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const csvReader = require('./csvReader');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    let key = "&key=" + process.env.API_KEY
    let url = "http://data1.library.sh.cn/gj/webapi/instances?freetext=三国" + key;

    axios({
        method: 'get',
        url
    })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
})


// ------------------- shijing -------------------
app.get("/get_shanggu_shijing", (req, res) => {
    csvReader.get_shanggu_shijing().then(data => res.send(data))
})

app.get("/get_shijing_cloud", (req, res) => {
    csvReader.shijing_word_cloud().then(data => res.send(data))
})

app.post("/shijing_full_text", (req, res) => {
    let require_title = request.body.params.title;
    res.setHeader('Content-Type', 'application/json');
    
    csvReader.shijing_full_text(require_title).then( (data) => {
        if (data.length == 0){
            res.json({
                code: 400,
                message: `No content matched with title ${require_title}`
            })
        } else {
            res.json({
                code: 200,
                data: data
            })
        }
    })
})

// ------------------- guangyun -------------------
app.get("/get_zhonggu_guangyun", (req, res) => {
    csvReader.get_zhonggu_guangyun().then(data => res.send(data))
})

app.get("/get_guangyun_cloud", (req, res) => {
    csvReader.get_zhonggu_guangyun().then((data) => {
        let cloud = csvReader.guangyun_word_cloud(data);
        res.send(cloud);
    })
})

app.post("/get_guangyun_url", (req, res) => {
    let target = req.body.params.Word;
    csvReader.get_zhonggu_guangyun().then((data) => {
        let url = csvReader.guangyun_url(data, target);

        res.setHeader('Content-Type', 'application/json');
        res.json({
            code: 200,
            data: url
        })
    })
})


// ------------------- zhongyuan -------------------
app.get("/get_jindai_zhongyuan", (req, res) => {
    csvReader.get_jindai_zhongyuan().then(data => res.send(data))
})

app.get("/get_zhongyuan_cloud", (req, res) => {
    csvReader.get_jindai_zhongyuan().then((data) => {
        let cloud = csvReader.zhongyuan_word_cloud(data);
        res.send(cloud);
    })
})

app.post("/get_zhongyuan_url", (req, res) => {
    let target = req.body.params.Word;
    csvReader.get_jindai_zhongyuan().then((data) => {
        let url = csvReader.zhongyuan_url(data, target);

        res.setHeader('Content-Type', 'application/json');
        res.json({
            code: 200,
            data: url
        })
    })
})

app.post("/yunbu_sankey_data", (req, res) => {
    let target = req.body.params.yunbu;
    res.setHeader('Content-Type', 'application/json');

    csvReader.yunbu_sankey_data(target).then((sankey_data) => {
        res.json({
            code: 200,
            data: sankey_data
        })
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}...`);
});

