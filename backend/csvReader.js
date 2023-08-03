const { parse } = require("csv-parse");
const path = require('path');
const fs = require("fs");

const shanggu_shijing_path = path.join(__dirname, '/rawData/shanggu-shijing.csv').toString();
const zhonggu_guangyun_path = path.join(__dirname, '/rawData/zhonggu-guangyun-url.csv').toString();
const jindai_zhongyuan_path = path.join(__dirname, '/rawData/jindai-zhongyuan-url.csv').toString();
const shijing_json_path = path.join(__dirname, '/rawData/shijing.json').toString();

const getColumns = (arr, indices) => arr.map(row => indices.map(i => row[i]));

const get_random_elements = (arr, num) => {
    let shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const match_array_item = (arr, target) => {
    let target_code = target.charCodeAt(0);
    let url = 0;
    arr.forEach((obj) => {
        if (obj[0].charCodeAt(0) == target_code) {
            url = obj[2];
        }
    })
    return url;
}

const remove_unrecognized_yunbu = (arr, position) => {
    arr.forEach((item) => {
        let index = arr.indexOf(item);
        if (item[position].length > 1) { arr.splice( index, 1 ); }
    })
    return arr;
}

const yunbu_deduplication = (arr, position) => {
    let uniques = [];
    let itemsFound = {};

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let yunbu = item[position];
        if( itemsFound[yunbu] ) { continue; }
        uniques.push(item);
        itemsFound[yunbu] = true;
    }
    return uniques;
}


// ------------ shijing ------------
const get_shanggu_shijing = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(shanggu_shijing_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let data = getColumns(rows, [0, 1, 3]);
                    let data_removed = remove_unrecognized_yunbu(data, 1);
                    let data_deduplicated = yunbu_deduplication(data_removed, 1)
                    resolve(data_deduplicated);
                }
            });
        })
    })
}

const shijing_word_cloud = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(shijing_json_path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                let jsonData = JSON.parse(data);
                let randomJson = get_random_elements(jsonData, 30);
                let titles = [];
                randomJson.forEach((jsonObj) => {
                    titles.push(jsonObj.title);
                })
                resolve(titles);
            }
        })
    })
}

const shijing_url = (data) => {
    let url = "http://test.com";
    return url;
}

// ------------ guangyun ------------
const get_zhonggu_guangyun = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(zhonggu_guangyun_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let data = getColumns(rows, [1, 2, 7, 11]);
                    let data_removed = remove_unrecognized_yunbu(data, 0);
                    let data_deduplicated = yunbu_deduplication(data_removed, 0)
                    resolve(data_deduplicated);
                }
            })
        })
    })
}

const guangyun_word_cloud = (data) => {
    let random_data = get_random_elements(data, 40);
    let cloud = [];
    random_data.forEach((obj) => {
        cloud.push(obj[0]);
    })
    return cloud;
}

const guangyun_url = (data, target) => {
    let url = match_array_item(data, target);
    return url;
}


// ------------ zhongyuan ------------
const get_jindai_zhongyuan = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(jindai_zhongyuan_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let data = getColumns(rows, [1, 2, 7]);
                    let data_removed = remove_unrecognized_yunbu(data, 0);
                    let data_deduplicated = yunbu_deduplication(data_removed, 0)
                    resolve(data_deduplicated);
                }
            })
        })
    })
}

const zhongyuan_word_cloud = (data) => {
    let random_data = get_random_elements(data, 40);
    let cloud = [];
    random_data.forEach((obj) => {
        cloud.push(obj[0]);
    })
    return cloud;
}

const zhongyuan_url = (data, target) => {
    let url = match_array_item(data, target);
    return url;
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
    shijing_url,
    guangyun_url,
    zhongyuan_url,
    yunbu_selection
}