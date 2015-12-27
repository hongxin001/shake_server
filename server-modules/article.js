/**
 * Created by WebStorm.
 * User: aaron
 * Date: 15/11/30
 * Time: 20:37
 */

// 一些工具方法

'use strict';
const AV = require('leanengine');
const tool = require('./tool');

let pub = {};

pub.show = (req, res) => {
    // 控制台输出
    tool.l('article');

    // 创建该类的一个实例
    var Game = AV.Object.extend('article');
    var query = new AV.Query(Game);

    // 获取单个文章
    //query.get('567ff3d200b042c0920f4d14', {
    //  success: function(article) {
    //    // 成功获得实例
    //    var articleTitle = article.get('title');
    //    var articleContent = article.get('content');
    //    var articleImage = article.get('image');
    //    res.send({
    //      articleTitle: articleTitle,
    //      articleContent: articleContent
    //      articleImage: articleImage
    //    });
    //  },
    //  error: function(error) {
    //    res.send({
    //      error:"get articles failed"
    //    });
    //  }
    //});

    // 获取整个文章集
    //query.find({
    //    success: function (results) {
    //        tool.l('Successfully retrieved ' + results.length + ' posts.');
    //        // 处理返回的结果数据
    //        for (var i = 0; i < results.length; i++) {
    //            var object = results[i];
    //            tool.l(object.id + ' - ' + object.get('title') + ' - ' + object.get('content') + ' - ' + object.get('image'));
    //        }
    //    },
    //    error: function (error) {
    //        res.send({
    //            error: "find articles failed"
    //        });
    //    }
    //});

    // 输出文章接口
    query.find({
        success: function (results) {
            var num = parseInt(Math.random() * results.length);
            tool.l(num);
            res.send({
                title: results[num].get('title'),
                content: results[num].get('content'),
                image: results[num].get('image')
            });
        },
        error: function (error) {
            res.send({
                error: "find articles failed"
            });
        }
    });
};

module.exports = pub;
