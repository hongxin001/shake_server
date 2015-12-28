/**
 * Created by WebStorm.
 * User: aaron
 * Date: 15/11/30
 * Time: 20:37
 */

// 一些工具方法

'use strict';
var cheerio = require('cheerio');
var superagent = require('superagent');
const AV = require('leanengine');
const tool = require('./tool');

let pub = {};

pub.show = (req, res) => {
    // 控制台输出
    tool.l('crawler');

    // 创建该类的一个实例
    var Arcitle = AV.Object.extend('article');
    var query = new AV.Query(Arcitle);

    // 爬虫
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                var title = $(element).attr('title');
                var url = "https://cnodejs.org" + $(element).attr('href');
                items.push({
                    title: title,
                    url: url
                });
                // 保存数据
                //query.set('ticle', title);
                //query.set('url', url);
                //query.save(null, {
                //    success: function (query) {
                //        // 成功保存之后，执行其他逻辑.
                //        tool.l('New object created with objectId: ' + query.id);
                //    },
                //    error: function (query, error) {
                //        // 失败之后执行其他逻辑
                //        // error 是 AV.Error 的实例，包含有错误码和描述信息.
                //        tool.l('Failed to create new object, with error message: ' + error.message);
                //    }
                //});
            });
            res.send(items);
        });
};

module.exports = pub;
