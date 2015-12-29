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
const AV = require('leanengine');
const tool = require('./tool');

let pub = {};

pub.game = (req, res) => {
    tool.l('crawler_game');
    superagent
        .get('http://yx8.com/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            global.games = [];
            var $ = cheerio.load(sres.text);
            $('h2 a').each(function (idx, element) {
                var title = $(element).text();
                var urlOrigin = $(element).attr('href');
                var urlArr = urlOrigin.split('com/');
                var url = urlArr[0] + "com/game/" + urlArr[1];
                global.games.push({
                    title: title,
                    url: url
                });
            });
        });
    res.send(global.games);
};

pub.video = (req, res) => {
    tool.l('crawler_video');
    superagent
        .get('http://aimozhen.com/share/')
        .query({amzpage: 1})
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            global.videos = [];
            var $ = cheerio.load(sres.text);
            $('.info a[target=_blank]').each(function (idx, element) {
                global.title = $(element).attr('title');
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
                    url: global.urlTarget
                });
            });
        });
    res.send(global.videos);
};

pub.article = (req, res) => {
    tool.l('crawler_article');
    superagent
        .get('http://api.kanzhihu.com/getpostanswers/20151229/archive')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            global.articles = [];
            var json = JSON.parse(sres.text).answers;
            //$('.entry-inner li').each(function (idx, element) {
            //    var title = $(element).children('h3').children('a').text();
            //    var url = $(element).children('h3').children('a').attr('href');
            //    var sub = $(element).children('p').children('span').text();
            //    global.articles.push({
            //        title: title,
            //        url: url,
            //        sub: sub
            //    });
            //});
            json.forEach(function (item) {
                global.articles.push({
                    title: item.title,
                    url: "http://www.zhihu.com/question/" + item.questionid,
                    sub: item.summary,
                    image: item.avatar
                });
            });
            res.send(global.articles);
        });
};
module.exports = pub;
