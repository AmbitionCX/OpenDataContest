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
        if (item[position].length > 1) { arr.splice(index, 1); }
    })
    return arr;
}

const yunbu_deduplication = (arr, position) => {
    let uniques = [];
    let itemsFound = {};

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let yunbu = item[position];
        if (itemsFound[yunbu]) { continue; }
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

const shijing_full_text = (title) => {
    return new Promise((resolve, reject) => {
        fs.readFile(shanggu_shijing_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let text_data = getColumns(rows, [1, 2, 3, 4]);
                    let picked_text = text_data.filter((element) => element[0] == title)
                    let full_text = [];
                    let one_line_json = {};
                    let one_line_text = '';
                    for (let text of picked_text) {
                        one_line_text += text[1];
                        let new_line = false;

                        if (one_line_text.slice(-1) == "○") {
                            one_line_text = one_line_text.slice(0, -1);
                            new_line = !new_line;
                        }

                        if (text[2] != '') {
                            one_line_json.text = one_line_text;
                            one_line_json.yunjiao = text[2];
                            one_line_json.yunbu = text[3];

                            full_text.push(one_line_json);
                            one_line_json = {};
                            one_line_text = '';
                        }

                        if (new_line) {
                            full_text.push({
                                text: '',
                                yunjiao: '',
                                yunbu: ''
                            });
                            new_line = !new_line;
                        }
                    }
                    resolve(full_text);
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

                    let layer_1 = [];
                    let layer_2 = [];
                    let layer_3 = [];
                    let nodes = { layer_1, layer_2, layer_3 };

                    let link_1 = [];
                    let link_2 = [];
                    let links = { link_1, link_2 };

                    let shijing_yunbu = new Set();
                    let guangyun_yunbu = new Set();
                    let zhongyuan_yunbu = new Set();

                    // shijing -> guangyun
                    let shijing_picked_data = shijing_data.filter((element) => element[1] == yunbu);
                    for (let shijing_item of shijing_picked_data) {

                        if (!shijing_yunbu.has(shijing_item[1])) {
                            shijing_yunbu.add(shijing_item[1]);

                            let shijing_node = {};
                            shijing_node.text = shijing_item[1];
                            shijing_node.count = 1;
                            layer_1.push(shijing_node);
                        } else {
                            layer_1.find((element) => element.text == shijing_item[1]).count++;
                        }

                        let guangyun_matched_data = guangyun_data.find((element) => element[0] == shijing_item[0]);
                        if (guangyun_matched_data != null) {
                            if (!guangyun_yunbu.has(guangyun_matched_data[1])) {
                                guangyun_yunbu.add(guangyun_matched_data[1]);

                                let guangyun_node = {};
                                guangyun_node.text = guangyun_matched_data[1];
                                guangyun_node.count = 1;
                                layer_2.push(guangyun_node);


                            } else {
                                layer_2.find((element) => element.text == guangyun_matched_data[1]).count++;
                            }

                            let find_link = link_1.find((element) => (element.source == shijing_item[1]) && (element.target == guangyun_matched_data[1]));
                            if (find_link == null) {

                                let link = {};
                                link.source = shijing_item[1];
                                link.target = guangyun_matched_data[1];
                                link.value = 1;
                                link_1.push(link);

                            } else {
                                find_link.value++;
                            }
                        }


                    }

                    // guangyun -> zhongyuan
                    guangyun_yunbu.forEach((each_yunbu) => {

                        let guangyun_picked_data = guangyun_data.filter((element) => element[1] == each_yunbu);
                        for (let guangyun_item of guangyun_picked_data) {
                            let zhongyuan_matched_data = zhongyuan_data.find((element) => element[0] == guangyun_item[0]);

                            if (zhongyuan_matched_data != null) {
                                if (!zhongyuan_yunbu.has(zhongyuan_matched_data[1])) {
                                    zhongyuan_yunbu.add(zhongyuan_matched_data[1]);

                                    let zhongyuan_node = {};
                                    zhongyuan_node.text = zhongyuan_matched_data[1];
                                    zhongyuan_node.count = 1;
                                    layer_3.push(zhongyuan_node);

                                    let link = {};
                                    link.source = guangyun_item[1];
                                    link.target = zhongyuan_matched_data[1];
                                    link.value = 1;
                                    link_2.push(link);
                                } else {
                                    layer_3.find((element) => element.text == zhongyuan_matched_data[1]).count++;
                                }

                                let find_link = link_2.find((element) => (element.source == guangyun_item[1]) && (element.target == zhongyuan_matched_data[1]));
                                if(find_link == null){

                                    let link = {};
                                    link.source = guangyun_item[1];
                                    link.target = zhongyuan_matched_data[1];
                                    link.value = 1;
                                    link_2.push(link);

                                } else {
                                    find_link.value++;
                                }

                            }
                        }
                    })

                    let sankey_data = { nodes, links };
                    resolve(sankey_data);
                }
            })
        })
    })
}

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