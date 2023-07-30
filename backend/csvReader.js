const { parse } = require("csv-parse");
const path = require('path');
const fs = require("fs");

const shanggu_shijing_path = path.join(__dirname, '/rawData/shanggu-shijing.csv').toString();
const zhonggu_guangyun_path = path.join(__dirname, '/rawData/zhonggu-guangyun.csv').toString();
const jindai_zhongyuan_path = path.join(__dirname, '/rawData/jindai-zhongyuan.csv').toString();
const shijing_json_path = path.join(__dirname, '/rawData/shijing.json').toString();

const getColumns = (arr, indices) => arr.map(row => indices.map(i => row[i]));

const get_shanggu_shijing = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(shanggu_shijing_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(getColumns(rows, [0, 1, 3]));
                }
            });
        })
    })
}

const get_random_elements = (arr, num) => {
    let shuffled = [...arr].sort( () => 0.5 - Math.random() );
    return shuffled.slice(0, num);
}

const shijing_word_cloud = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(shijing_json_path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                let jsonData = JSON.parse(data);
                let randomJson = get_random_elements(jsonData, 10);
                let titles = [];
                randomJson.forEach( (jsonObj) => {
                    titles.push(jsonObj.title);
                } )
                resolve(titles);
            }
        })
    })
}

const get_zhonggu_guangyun = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(zhonggu_guangyun_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(getColumns(rows, [1, 2, 7]));
                }
            })
        })
    })
}

const guangyun_word_cloud = (data) => {
    let random_data = get_random_elements(data, 10);
    let cloud = [];
    random_data.forEach( (obj) => {
        cloud.push(obj[0]);
    } )
    return cloud;
}

const get_jindai_zhongyuan = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(jindai_zhongyuan_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(getColumns(rows, [1, 2]));
                }
            })
        })
    })
}

const zhongyuan_word_cloud = (data) => {
    let random_data = get_random_elements(data, 10);
    let cloud = [];
    random_data.forEach( (obj) => {
        cloud.push(obj[0]);
    } )
    return cloud;
}

const yunbu_selection = (data) => {
    return data;
}

module.exports = {
    get_shanggu_shijing,
    get_zhonggu_guangyun,
    get_jindai_zhongyuan,
    shijing_word_cloud,
    guangyun_word_cloud,
    zhongyuan_word_cloud,
    yunbu_selection
}