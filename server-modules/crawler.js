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

    // 爬虫
    superagent
        .get('http://yx8.com/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var games = [];
            var $ = cheerio.load(sres.text);
            $('h2 a').each(function (idx, element) {
                var title = $(element).text();
                var urlOrigin = $(element).attr('href');
                // 处理字符串
                var urlArr = urlOrigin.split('com/');
                var url = urlArr[0] + "com/game/" + urlArr[1];
                games.push({
                    title: title,
                    url: url
                });
            });
            res.send(games);
        });
};

module.exports = pub;
