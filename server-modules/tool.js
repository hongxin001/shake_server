/**
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 *
 */

// 一些工具方法

'use strict';
const AV = require('leanengine');

let pub = {};

pub.l = (msg) => {
    console.log('\n\n', msg, '\n\n');
};

pub.fail = (res, err) => {
    res.status(err.status).send({
        err: err.status,
        msg: err.msg
    });
};

pub.random = (arr) => {
    return parseInt(Math.random() * arr.length);
};

pub.save = (table, items) => {
    var Table = AV.Object.extend(table);
    var query = new Table();
    query.save({
        title: items.title,
        url: items.url,
        sub: items.sub,
        icon: items.icon,
        share: 0
    }, {
        success: function (query) {
            // 成功保存之后，执行其他逻辑.
            tool.l('New object created with objectId: ' + query.id);
        },
        error: function (query, error) {
            // 失败之后执行其他逻辑
            // error 是 AV.Error 的实例，包含有错误码和描述信息.
            tool.l('Failed to create new object, with error message: ' + error.message);
        }
    });
};

module.exports = pub;
