/**
 * Created by WebStorm.
 * User: aaron
 * Date: 15/12/29
 * Time: 18:18
 */

// 一些工具方法

'use strict';
var cheerio = require('cheerio');
var superagent = require('superagent');
const tool = require('./tool');
const AV = require('leanengine');

let pub = {};

pub.game = (req, res) => {
    tool.l('crawler games start');
    superagent.get('http://yx8.com/').end(function (err, sres) {
        if (err) {
            return next(err);
        }
        global.games = [];
        var $ = cheerio.load(sres.text);
        $('.panel').each(function (idx, element) {
            global.title = $(element).children('.article-excerpt-wrapper').children('.article-excerpt').children('h2').children('a').text();
            var urlOrigin = $(element).children('.article-excerpt-wrapper').children('.article-excerpt').children('h2').children('a').attr('href');
            var urlArr = urlOrigin.split('com/');
            global.url = urlArr[0] + "com/game/" + urlArr[1];
            global.icon = $(element).children('.article-image-wrapper').children('.article-image').children('a').children('img').attr('src');
            superagent.get(urlOrigin).end(function (err, sres) {
                if (err) {
                    return next(err);
                }
                var $ = cheerio.load(sres.text);
                global.sub = $('.the-content').children().next('p').text();
            });
            global.games.push({
                title: global.title,
                url: global.url,
                icon: global.icon,
                sub: global.sub
            });
            //var Table = AV.Object.extend('game');
            //var query = new Table();
            //query.save({
            //    title: global.title,
            //    url: global.url,
            //    icon: global.icon,
            //    sub: global.sub
            //}, {
            //    success: function (query) {
            //        tool.l('New object created with objectId: ' + query.id);
            //    },
            //    error: function (query, error) {
            //        tool.l('Failed to create new object, with error message: ' + error.message);
            //    }
            //});
        });
    });
    tool.l('crawler games end');
    res.send(global.games);
};

pub.video = (req, res) => {
    tool.l('crawler videos start');
    superagent.get('http://aimozhen.com/share/').query({amzpage: 1}).end(function (err, sres) {
        if (err) {
            return next(err);
        }
        global.videos = [];
        var $ = cheerio.load(sres.text);
        $('.info a[target=_blank]').each(function (idx, element) {
            global.title = $(element).attr('title');
            var obj = $(element).parent().parent().before().children();
            global.icon = obj.html().split('&apos;')[1];
            global.sub = obj.children().children('.content').text().trim();
            var urlOrigin = "http://aimozhen.com" + $(element).attr('href');
            superagent.get(urlOrigin).end(function (err, sres) {
                if (err) {
                    return next(err);
                }
                var $ = cheerio.load(sres.text);
                global.urlTarget = $('#video-player-info a').attr('href');
            });
            global.videos.push({
                title: global.title,
                url: global.urlTarget,
                icon: global.icon,
                sub: global.sub
            });
            //var Table = AV.Object.extend('video');
            //var query = new Table();
            //query.save({
            //    title: global.title,
            //    url: global.urlTarget,
            //    icon: global.icon,
            //    sub: global.sub
            //}, {
            //    success: function (query) {
            //        tool.l('New object created with objectId: ' + query.id);
            //    },
            //    error: function (query, error) {
            //        tool.l('Failed to create new object, with error message: ' + error.message);
            //    }
            //});
        });
    });
    tool.l('crawler videos end');
    res.send(global.videos);
};

pub.article = (req, res) => {
    tool.l('crawler articles start');
    superagent
        .get('http://api.kanzhihu.com/getpostanswers/20151229/archive')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            global.articles = [];
            var json = JSON.parse(sres.text).answers;
            json.forEach(function (item) {
                global.articles.push({
                    title: item.title,
                    url: "http://www.zhihu.com/question/" + item.questionid + "/answer/" + item.answerid,
                    sub: item.summary,
                    icon: item.avatar
                });
                //var Table = AV.Object.extend('article');
                //var query = new Table();
                //query.save({
                //    title: item.title,
                //    url: "http://www.zhihu.com/question/" + item.questionid + "/answer/" + item.answerid,
                //    sub: item.summary,
                //    icon: item.avatar
                //}, {
                //    success: function (query) {
                //        tool.l('New object created with objectId: ' + query.id);
                //    },
                //    error: function (query, error) {
                //        tool.l('Failed to create new object, with error message: ' + error.message);
                //    }
                //});
            });
        });
    tool.l('crawler articles end');
    res.send(global.articles);
};
module.exports = pub;
