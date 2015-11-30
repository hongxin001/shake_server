/**
 * Created by WebStorm.
 * User: aaron
 * Date: 15/11/30
 * Time: 20:37
 */

// 一些工具方法

'use strict';

const tool = require('./tool');

let pub = {};

pub.show = (req, res) => {
  tool.l('game1');
  res.send({
    game1: 'info'
  });
};

module.exports = pub;
