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
                // 处理字符串
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
    superagent.get('http://aimozhen.com/share/').query({amzpage: 1}).end(function (err, sres) {
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

module.exports = pub;
