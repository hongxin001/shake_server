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
    //superagent
    //    .get('https://cnodejs.org/')
    //    .end(function (err, sres) {
    //        if (err) {
    //            return next(err);
    //        }
    //        var articles = [];
    //        var $ = cheerio.load(sres.text);
    //        $('#topic_list .topic_title').each(function (idx, element) {
    //            var title = $(element).attr('title');
    //            var url = "https://cnodejs.org" + $(element).attr('href');
    //            articles.push({
    //                title: title,
    //                url: url
    //            });
    //            // 保存文章数据
    //            //var Arcitle = AV.Object.extend('article');
    //            //var query = new Arcitle();
    //            //query.set('ticle', title);
    //            //query.set('url', url);
    //            //query.save(null, {
    //            //    success: function (query) {
    //            //        // 成功保存之后，执行其他逻辑.
    //            //        tool.l('New object created with objectId: ' + query.id);
    //            //    },
    //            //    error: function (query, error) {
    //            //        // 失败之后执行其他逻辑
    //            //        // error 是 AV.Error 的实例，包含有错误码和描述信息.
    //            //        tool.l('Failed to create new object, with error message: ' + error.message);
    //            //    }
    //            //});
    //        });
    //        res.send(articles);
    //    });

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
                // 保存游戏数据
                //var Game = AV.Object.extend('game');
                //var query = new Game();
                //query.save({
                //    title: title,
                //    url: url
                //}, {
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
            res.send(games);
        });
};

module.exports = pub;
