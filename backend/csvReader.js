const { parse } = require("csv-parse");
const path = require('path');
const fs = require("fs");
const chineseConv = require('chinese-conv');

const shanggu_shijing_path = path.join(__dirname, '/rawData/shanggu-shijing.csv').toString();
const zhonggu_guangyun_path = path.join(__dirname, '/rawData/zhonggu-guangyun.csv').toString();
const jindai_zhongyuan_path = path.join(__dirname, '/rawData/jindai-zhongyuan.csv').toString();
const sankey_path = path.join(__dirname, '/rawData/sankey-data.csv').toString();

const getColumns = (arr, indices) => arr.map(row => indices.map(i => row[i]));

const get_random_elements = (arr, num) => {
    let shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const match_array_item = (arr, target, column) => {
    let target_code = target.charCodeAt(0);
    let url = 0;
    arr.forEach((obj) => {
        if (obj[0].charCodeAt(0) == target_code) {
            url = obj[column];
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

const is_empty_json = (jsonObj) => {
    for (let key in jsonObj) {
        if (jsonObj[key].length != 0) {
            return false;
        }
    }
    return true;
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

const get_shijing_chapter = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(shanggu_shijing_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let data = getColumns(rows, [0]);
                    let data_removed = remove_unrecognized_yunbu(data, 0);
                    let data_deduplicated = yunbu_deduplication(data_removed, 0)

                    let chapter = [];
                    for (item of data_deduplicated) {
                        chapter.push(item[0])
                    }
                    resolve(chapter);
                }
            })
        })
    })
}

const shijing_word_cloud = (chapter) => {
    return new Promise((resolve, reject) => {
        fs.readFile(shanggu_shijing_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let titles = new Set();
                    let selected_row = rows.filter((element) => element[0] == chapter);
                    for (item of selected_row) {
                        titles.add(item[1]);
                    }
                    resolve(Array.from(titles));
                }
            });
        })
    })
}

const shijing_search = (search_item) => {
    return new Promise((resolve, reject) => {
        fs.readFile(shanggu_shijing_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let data = getColumns(rows, [4, 3, 0, 1, 2]);
                    let titles = new Set();

                    let yunbu = search_item["yunbu"];
                    let yunbu_data = data.filter((element) => element[0] == yunbu);

                    for (let key in search_item) {
                        if (search_item[key].length != 0) {
                            let index = Object.keys(search_item).indexOf(key);
                            data = data.filter((element) => element[index] == search_item[key])
                        }
                    }

                    for (let item of data) {
                        if (item[3].length != 0) {
                            titles.add(item[3]);
                        }
                    }

                    let search_results = [];
                    let yunbu_length = {};
                    yunbu_length.yunbu_length = yunbu_data.length;
                    search_results.push(yunbu_length);

                    for (let title of Array.from(titles)) {
                        let one_poem = {};
                        let target = data.find((element) => element[3] == title);
                        one_poem.chapter = target[2];
                        one_poem.title = title;

                        if (target[4].slice(-1) == "○") {
                            one_poem.text = target[4].slice(0, -2);
                        } else {
                            one_poem.text = target[4].slice(0, -1);
                        }
                        search_results.push(one_poem);
                    }
                    resolve(search_results);
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
                    let converted = chineseConv.tify(title);
                    let text_data = getColumns(rows, [1, 2, 3, 4]);
                    let picked_text = text_data.filter((element) => element[0] == converted)
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

const get_guangyun_search_item = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(zhonggu_guangyun_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let data = getColumns(rows, [9, 4, 5, 6, 8, 10]);

                    let zu = new Set();
                    let shengniu = new Set();
                    let hu = new Set();
                    let deng = new Set();
                    let shengdiao = new Set();
                    let she = new Set();

                    for (item of data) {
                        if (item[0] != null) {
                            zu.add(item[0])
                        }
                        if (item[1] != null) {
                            shengniu.add(item[1])
                        }
                        if (item[2] != null) {
                            hu.add(item[2])
                        }
                        if (item[3] != null) {
                            deng.add(item[3])
                        }
                        if (item[4] != null) {
                            shengdiao.add(item[4])
                        }
                        if (item[5] != null) {
                            she.add(item[5])
                        }
                    }

                    let guangyun_search_item = {};
                    guangyun_search_item.zu = Array.from(zu);
                    guangyun_search_item.shengniu = Array.from(shengniu);
                    guangyun_search_item.hu = Array.from(hu);
                    guangyun_search_item.deng = Array.from(deng);
                    guangyun_search_item.shengdiao = Array.from(shengdiao);
                    guangyun_search_item.she = Array.from(she);

                    resolve(guangyun_search_item);
                }
            })
        })
    })
}

const guangyun_search = (params) => {
    return new Promise((resolve, reject) => {
        fs.readFile(zhonggu_guangyun_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let target_yunbu = params.yunbu;
                    let search_item = params.guangyun_search;

                    let target_data = getColumns(rows, [0, 9, 4, 5, 6, 8, 10, 1]);
                    target_data = target_data.filter((element) => element[0] == target_yunbu);
                    let selected_data = new Set();
                    let selected_shengniu = new Set();

                    if (is_empty_json(search_item)) {
                        for (let item of target_data) {
                            selected_data.add(item);
                            selected_shengniu.add(item[2]);
                        }
                    } else {
                        for (let key in search_item) {
                            if (search_item[key].length != 0) {
                                let index = Object.keys(search_item).indexOf(key);
                                for (let value of search_item[key]) {
                                    let find_data = target_data.filter((element) => element[index + 1] == value);
                                    for (let item of find_data) {
                                        selected_data.add(item);
                                        selected_shengniu.add(item[2]);
                                    }
                                }
                            }
                        }
                    }

                    let guangyun_search_results = [];
                    let yunbu_length = {};
                    yunbu_length.yunbu_length = target_data.length;
                    guangyun_search_results.push(yunbu_length);

                    selected_data = Array.from(selected_data);
                    shengniu_list = Array.from(selected_shengniu);

                    for (let item of shengniu_list) {
                        let each_shengniu = {}
                        let each_zitou = new Set();
                        each_shengniu.shengniu = item;

                        let selected_zitou = selected_data.filter((element) => element[2] == item);
                        for (let item of selected_zitou) {
                            if (item[7].length == 1) {
                                each_zitou.add(item[7]);
                            }
                        }
                        each_shengniu.shengniu = item;
                        each_shengniu.zitou = Array.from(each_zitou);

                        guangyun_search_results.push(each_shengniu);
                    }
                    resolve(guangyun_search_results)
                }
            })
        })
    })
}

const guangyun_yunbu_counter = (yunbu) => {
    return new Promise((resolve, reject) => {
        fs.readFile(zhonggu_guangyun_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let target_data = getColumns(rows, [0, 1]);
                    let yunjiaozi = new Set();

                    if (yunbu.length != 0) {
                        target_data = target_data.filter((element) => element[0] == yunbu);
                    }

                    for (item of target_data) {
                        yunjiaozi.add(item[1]);
                    }
                    counter = Array.from(yunjiaozi).length;
                    resolve(counter);
                }
            });
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
    let converted = chineseConv.tify(target);
    let url = match_array_item(data, converted, 3);
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

const get_zhongyuan_search_item = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(jindai_zhongyuan_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let data = getColumns(rows, [4, 5, 6, 3]);

                    let shengniu = new Set();
                    let qingzhuo = new Set();
                    let sihu = new Set();
                    let shengdiao = new Set();

                    for (item of data) {
                        if (item[0] != null) {
                            shengniu.add(item[0])
                        }
                        if (item[1] != null) {
                            qingzhuo.add(item[1])
                        }
                        if (item[2] != null) {
                            sihu.add(item[2])
                        }
                        if (item[3] != null) {
                            shengdiao.add(item[3])
                        }
                    }

                    let zhongyuan_search_item = {};
                    zhongyuan_search_item.shengniu = Array.from(shengniu);
                    zhongyuan_search_item.qingzhuo = Array.from(qingzhuo);
                    zhongyuan_search_item.sihu = Array.from(sihu);
                    zhongyuan_search_item.shengdiao = Array.from(shengdiao);

                    resolve(zhongyuan_search_item);
                }
            })
        })
    })
}

const zhongyuan_search = (params) => {
    return new Promise((resolve, reject) => {
        fs.readFile(jindai_zhongyuan_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let target_yunbu = params.yunbu;
                    let search_item = params.zhongyuan_search;

                    let target_data = getColumns(rows, [0, 4, 5, 6, 3, 1]);
                    target_data = target_data.filter((element) => element[0] == target_yunbu);

                    let selected_data = new Set();
                    let selected_shengniu = new Set();

                    if (is_empty_json(search_item)) {
                        for (let item of target_data) {
                            selected_data.add(item);
                            selected_shengniu.add(item[1]);
                        }
                    } else {
                        for (let key in search_item) {
                            if (search_item[key].length != 0) {
                                let index = Object.keys(search_item).indexOf(key);
                                for (let value of search_item[key]) {
                                    let find_data = target_data.filter((element) => element[index + 1] == value);
                                    for (let item of find_data) {
                                        selected_data.add(item);
                                        selected_shengniu.add(item[1]);
                                    }
                                }
                            }
                        }
                    }

                    let zhongyuan_search_results = [];
                    let yunbu_length = {};
                    yunbu_length.yunbu_length = target_data.length;
                    zhongyuan_search_results.push(yunbu_length);

                    selected_data = Array.from(selected_data);
                    shengniu_list = Array.from(selected_shengniu);

                    for (let item of shengniu_list) {
                        let each_shengniu = {}
                        let each_zitou = new Set();
                        each_shengniu.shengniu = item;

                        let selected_zitou = selected_data.filter((element) => element[1] == item);
                        for (let item of selected_zitou) {
                            if (item[5].length == 1) {
                                each_zitou.add(item[5]);
                            }
                        }
                        each_shengniu.shengniu = item;
                        each_shengniu.zitou = Array.from(each_zitou);

                        zhongyuan_search_results.push(each_shengniu);
                    }
                    resolve(zhongyuan_search_results)
                }
            })
        })
    })
}

const zhongyuan_yunbu_counter = (yunbu) => {
    return new Promise((resolve, reject) => {
        fs.readFile(jindai_zhongyuan_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let target_data = getColumns(rows, [0, 1]);
                    let yunjiaozi = new Set();

                    if (yunbu != null) {
                        target_data = target_data.filter((element) => element[0] == yunbu);
                    }

                    for (item of target_data) {
                        yunjiaozi.add(item[1]);
                    }
                    counter = Array.from(yunjiaozi).length;
                    resolve(counter);
                }
            });
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
    let converted = chineseConv.tify(target);
    let url = match_array_item(data, converted, 2);
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

                    let nodes = [];
                    let links = [];

                    let shijing_yunbu = new Set();
                    let guangyun_yunbu = new Set();
                    let zhongyuan_yunbu = new Set();

                    // shijing -> guangyun
                    let shijing_picked_data = shijing_data.filter((element) => element[1] == yunbu);
                    for (let shijing_item of shijing_picked_data) {

                        if (!shijing_yunbu.has(shijing_item[1])) {
                            shijing_yunbu.add(shijing_item[1]);

                            let shijing_node = {};
                            shijing_node.name = shijing_item[1];
                            // shijing_node.count = 1;
                            nodes.push(shijing_node);
                        } else {
                            // nodes.find((element) => element.name == shijing_item[1]).count++;
                        }

                        let guangyun_matched_data = guangyun_data.find((element) => element[0] == shijing_item[0]);
                        if (guangyun_matched_data != null) {
                            if (!guangyun_yunbu.has(guangyun_matched_data[1])) {
                                guangyun_yunbu.add(guangyun_matched_data[1]);

                                let guangyun_node = {};
                                guangyun_node.name = guangyun_matched_data[1];
                                // guangyun_node.count = 1;
                                nodes.push(guangyun_node);


                            } else {
                                // nodes.find((element) => element.name == guangyun_matched_data[1]).count++;
                            }

                            let find_link = links.find((element) => (element.source == shijing_item[1]) && (element.target == guangyun_matched_data[1]));
                            if (find_link == null) {

                                let link = {};
                                link.source = shijing_item[1];
                                link.target = guangyun_matched_data[1];
                                link.value = 1;
                                links.push(link);

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
                                    zhongyuan_node.name = zhongyuan_matched_data[1];
                                    // zhongyuan_node.count = 1;
                                    nodes.push(zhongyuan_node);

                                    let link = {};
                                    link.source = guangyun_item[1];
                                    link.target = zhongyuan_matched_data[1];
                                    link.value = 1;
                                    links.push(link);
                                } else {
                                    // nodes.find((element) => element.name == zhongyuan_matched_data[1]).count++;
                                }

                                let find_link = links.find((element) => (element.source == guangyun_item[1]) && (element.target == zhongyuan_matched_data[1]));
                                if (find_link == null) {

                                    let link = {};
                                    link.source = guangyun_item[1];
                                    link.target = zhongyuan_matched_data[1];
                                    link.value = 1;
                                    links.push(link);

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

const get_yunjiaozi = (link) => {
    return new Promise((resolve, reject) => {
        fs.readFile(sankey_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let shijing_data = getColumns(rows, [0, 1]);
                    let guangyun_data = getColumns(rows, [2, 3]);
                    let zhongyuan_data = getColumns(rows, [4, 5]);

                    let find_sources;
                    let yunjiaozi = new Set();

                    if (link.source.slice(0, 2) == "上古") {
                        find_sources = shijing_data.filter((element) => element[1] == link.source);
                        for (item of find_sources) {
                            let find_target = guangyun_data.find((element) => (element[0] == item[0]) && (element[1] == link.target))
                            if (find_target != null) {
                                yunjiaozi.add(find_target[0]);
                            }
                        }
                    }
                    if (link.source.slice(0, 2) == "中古") {
                        find_sources = guangyun_data.filter((element) => element[1] == link.source);
                        for (item of find_sources) {
                            let find_target = zhongyuan_data.find((element) => (element[0] == item[0]) && (element[1] == link.target))
                            if (find_target != null) {
                                yunjiaozi.add(find_target[0]);
                            }
                        }
                    }
                    resolve(Array.from(yunjiaozi));
                }
            })
        })
    })
}

const yunjiaozi_counter = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(zhonggu_guangyun_path, function (err, fileData) {
            parse(fileData, { delimiter: ",", from_line: 2 }, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let yunjiaozi = getColumns(rows, [1]);
                    // let yunjiaozi_dedupicate = new Set();
                    let yunjiaozi_array = [];

                    for (let item of yunjiaozi) {
                        if (item[0].length == 1) {
                            // yunjiaozi_dedupicate.add(item[0]);
                            yunjiaozi_array.push(item[0])
                        }
                    }
                    console.log(yunjiaozi_array.length);
                    // console.log(Array.from(yunjiaozi_dedupicate).length);
                }
            })
        })
    })
}

module.exports = {
    get_shanggu_shijing,
    get_shijing_chapter,
    get_zhonggu_guangyun,
    get_jindai_zhongyuan,
    shijing_word_cloud,
    guangyun_word_cloud,
    zhongyuan_word_cloud,
    guangyun_url,
    zhongyuan_url,
    yunbu_sankey_data,
    shijing_full_text,
    get_yunjiaozi,
    shijing_search,
    get_guangyun_search_item,
    guangyun_search,
    get_zhongyuan_search_item,
    zhongyuan_search,
    guangyun_yunbu_counter,
    zhongyuan_yunbu_counter
}