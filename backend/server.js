const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const csvReader = require('./csvReader');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Open Data Contest");
})


// ------------------- shijing -------------------
app.get("/get_shanggu_shijing", (req, res) => {
    csvReader.get_shanggu_shijing().then(data => res.send(data))
})

app.get("/get_shijing_chapter", (req, res) => {
    csvReader.get_shijing_chapter().then(data => res.send(data))
})

app.post("/shijing_search", (req, res) => {
    let search_item = req.body.params.search_item;
    console.log(search_item);
    csvReader.shijing_search(search_item).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({
            code: 200,
            data: data
        })
    })
})

app.post("/shijing_word_cloud", (req, res) => {
    let chapter = req.body.params.chapter;
    if (chapter == null) {
        chapter = "国风·周南";
    }

    res.setHeader('Content-Type', 'application/json');
    csvReader.shijing_word_cloud(chapter).then(data => res.send(data))
})

app.post("/shijing_full_text", (req, res) => {
    let require_title = req.body.params.title;
    res.setHeader('Content-Type', 'application/json');

    csvReader.shijing_full_text(require_title).then((data) => {
        if (data.length == 0) {
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

app.get("/get_guangyun_search_item", (req, res) => {
    csvReader.get_guangyun_search_item().then(data => res.send(data))
})

app.post("/guangyun_search", (req, res) => {
    let params = req.body.params;
    csvReader.guangyun_search(params).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({
            code: 200,
            data: data
        })
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

app.get("/get_zhongyuan_search_item", (req, res) => {
    csvReader.get_zhongyuan_search_item().then(data => res.send(data))
})

app.post("/zhongyuan_search", (req, res) => {
    let params = req.body.params;
    csvReader.zhongyuan_search(params).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({
            code: 200,
            data: data
        })
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

app.post("/get_yunjiaozi", (req, res) => {
    let link = req.body.params.yunbu;
    res.setHeader('Content-Type', 'application/json');

    csvReader.get_yunjiaozi(link).then((yunjiaozi) => {
        res.json({
            code: 200,
            data: yunjiaozi
        })
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}...`);
});
