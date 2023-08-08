const { parse } = require("csv-parse");
const path = require('path');
const fs = require("fs");

const shanggu_shijing_path = path.join(__dirname, '/rawData/shanggu-shijing.csv').toString();
const zhonggu_guangyun_path = path.join(__dirname, '/rawData/zhonggu-guangyun.csv').toString();
const jindai_zhongyuan_path = path.join(__dirname, '/rawData/jindai-zhongyuan.csv').toString();
const sankey_path = path.join(__dirname, '/rawData/sankey-data.csv').toString();

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
            url = obj[3];
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
                    let data = getColumns(rows, [3, 4]);
                    let data_removed = remove_unrecognized_yunbu(data, 0);
                    let data_deduplicated = yunbu_deduplication(data_removed, 0)
                    resolve(data_deduplicated);
                }
            });
        })
    })
}

const shijing_word_cloud = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(shanggu_shijing_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let title_data = getColumns(rows, [1]);
                    let title_deduplicated = yunbu_deduplication(title_data, 0)
                    let randomTitle = get_random_elements(title_deduplicated, 30);
                    let titles = [];
                    randomTitle.forEach((item) => {
                        titles.push(item[0]);
                    })
                    resolve(titles);
                }
            });
        })
    })
}

const shijing_full_text = ( title ) => {
    return new Promise((resolve, reject) => {
        fs.readFile(shanggu_shijing_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let text_data = getColumns(rows, [1, 2, 3, 4]);
                    let picked_text = text_data.filter( (element) => element[0] == title )
                    let full_text = [];
                    let one_line_json = {};
                    let one_line_text = '';
                    for (let text of picked_text) {
                        one_line_text += text[1];
                        let new_line = false;

                        if ( one_line_text.slice(-1) == "○" ){
                            one_line_text = one_line_text.slice(0, -1);
                            new_line = !new_line;
                        }

                        if ( text[2] != '' ){
                            one_line_json.text = one_line_text;
                            one_line_json.yunjiao = text[2];
                            one_line_json.yunbu = text[3];

                            full_text.push(one_line_json);
                            one_line_json = {};
                            one_line_text = '';
                        }

                        if (new_line){
                            full_text.push( {
                                text: '',
                                yunjiao: '',
                                yunbu: ''
                            } );
                            new_line = !new_line;
                        }
                    }
                    resolve(full_text.toString());
                }
            });
        })
    })
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

const yunbu_sankey_data = (yunbu) => {
    return new Promise((resolve, reject) => {
        fs.readFile(sankey_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let shijing_data = getColumns(rows, [0, 1]);
                    let guangyun_data = getColumns(rows, [2, 3]);
                    let zhongyuan_data = getColumns(rows, [4, 5]);

                    let shijing_picked_data = shijing_data.filter( (element) => element[1] == yunbu )
                    console.log(shijing_picked_data);
                    // let sankey_data = {nodes, links};
                    // resolve(sankey_data);
                }
            })
        })
    })
}

yunbu_sankey_data("東").then();

module.exports = {
    get_shanggu_shijing,
    get_zhonggu_guangyun,
    get_jindai_zhongyuan,
    shijing_word_cloud,
    guangyun_word_cloud,
    zhongyuan_word_cloud,
    guangyun_url,
    zhongyuan_url,
    yunbu_sankey_data,
    shijing_full_text
}