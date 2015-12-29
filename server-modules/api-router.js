/**
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 *
 * @author wangxiao
 */

// 所有 API 的路由

'use strict';

const router = require('express').Router();

// 添加一个模块
const hello = require('./hello');
const game = require('./game');
const video = require('./video');
const article = require('./article');
const crawler = require('./crawler');

// 一个 API 路由下的 hello 接口，访问 /api/hello
router.get('/hello', hello.hello);
router.get('/game', game.show);
router.get('/video', video.show);
router.get('/article', article.show);
router.get('/crawler/game', crawler.game);
router.get('/crawler/video', crawler.video);

module.exports = router;
