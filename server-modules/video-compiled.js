/**
 * Created by WebStorm.
 * User: aaron
 * Date: 15/11/30
 * Time: 20:37
 */

// 一些工具方法

'use strict';
var AV = require('leanengine');
var tool = require('./tool');

var pub = {};

pub.show = function (req, res) {
    // 控制台输出
    tool.l('video');

    // 创建该类的一个实例
    var Video = AV.Object.extend('video');
    var query = new AV.Query(Video);

    // 获取单个视频
    //query.get('567ff3d200b042c0920f4d14', {
    //  success: function(video) {
    //    // 成功获得实例
    //    var videoName = video.get('name');
    //    var videoUrl = video.get('url');
    //    res.send({
    //      videoName: videoName,
    //      videoUrl: videoUrl
    //    });
    //  },
    //  error: function(error) {
    //    res.send({
    //      error:"get videos failed"
    //    });
    //  }
    //});

    // 获取整个视频集
    //query.find({
    //    success: function (results) {
    //        tool.l('Successfully retrieved ' + results.length + ' posts.');
    //        // 处理返回的结果数据
    //        for (var i = 0; i < results.length; i++) {
    //            var object = results[i];
    //            tool.l(object.id + ' - ' + object.get('name') + ' - ' + object.get('url'));
    //        }
    //    },
    //    error: function (error) {
    //        res.send({
    //            error: "find videos failed"
    //        });
    //    }
    //});

    // 输出视频接口
    query.find({
        success: function success(results) {
            var num = parseInt(Math.random() * results.length);
            tool.l(num);
            res.send({
                title: results[num].get('title'),
                url: results[num].get('url'),
                sub: results[num].get('sub'),
                icon: results[num].get('icon'),
                share: results[num].get('share')
            });
        },
        error: function error(_error) {
            res.send({
                error: "find videos failed"
            });
        }
    });
};

module.exports = pub;

//# sourceMappingURL=video-compiled.js.map