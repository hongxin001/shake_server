"use strict";

!(function (e) {
  function t(o) {
    if (n[o]) return n[o].exports;var u = n[o] = { exports: {}, id: o, loaded: !1 };return (e[o].call(u.exports, u, u.exports, t), u.loaded = !0, u.exports);
  }var n = {};return (t.m = e, t.c = n, t.p = "", t(0));
})([function (e, t, n) {
  "use strict";function o(e) {
    return e && e.__esModule ? e : { "default": e };
  }var u = n(1),
      r = o(u),
      i = n(2),
      a = o(i),
      l = n(3),
      s = o(l),
      c = n(4),
      d = o(c),
      m = n(7),
      f = o(m),
      p = n(8),
      h = o(p),
      g = n(9),
      v = o(g),
      b = n(10),
      _ = o(b);angular.module("webProject", ["ngAnimate", "ngCookies", "ngSanitize", "ui.router", "ngMaterial"]).constant("lcConfig", r["default"]).constant("moment", window.moment).config(a["default"]).config(s["default"]).run(d["default"]).service("commonSer", f["default"]).service("helloSer", h["default"]).directive("lcHeader", v["default"]).controller("homeCtrl", _["default"]);
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 });var n = { httpTimeout: 2e4, apiHost: "http://localhost:3000", host: "http://localhost:9000" },
      o = window.location.host;"http://" + o !== n.host && (n.apiHost = "http://" + o), t["default"] = n, e.exports = t["default"];
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = ["$httpProvider", "lcConfig", function (e, t) {
    "ngInject";var n = t.httpTimeout,
        o = t.apiHost;e.defaults.withCredentials = !0, e.defaults.headers["delete"] = { "Content-Type": "application/json;charset=utf-8" }, e.interceptors.push([function () {
      return { request: function request(e) {
          return (e.timeout = n, /^[http|https]/.test(e.url) || /\.html$/.test(e.url) || (e.url = o + e.url), e);
        }, response: function response(e) {
          return (/\.html/.test(e.config.url) ? e : e.data
          );
        }, responseError: function responseError(e) {
          return Promise.reject(e.data);
        } };
    }]);
  }], e.exports = t["default"];
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = ["$stateProvider", "$urlRouterProvider", "$locationProvider", function (e, t, n) {
    "ngInject";n.html5Mode(!0), e.state("home", { url: "/", templateUrl: "app/auth/home/home.html", controller: "homeCtrl" }), t.otherwise("/");
  }], e.exports = t["default"];
}, function (e, t, n) {
  "use strict";function o(e) {
    return e && e.__esModule ? e : { "default": e };
  }Object.defineProperty(t, "__esModule", { value: !0 });var u = n(5),
      r = o(u),
      i = n(6),
      a = o(i),
      l = { zhCn: r["default"], en: a["default"] },
      s = "zhCn",
      c = function c(e, t) {
    "ngInject";e.i18n = l[s], e.lang = s, e.$watch("lang", function () {
      t.$.extend(e.i18n, l[e.lang]);
    });
  };c.$inject = ["$rootScope", "$window"], t["default"] = c, e.exports = t["default"];
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = { title: "标题", name: "姓名", nickname: "昵称", username: "用户名", email: "邮箱", admin: "负责", op: "操作", kind: "类别", add: "添加", number: "编号", status: "状态", updateTime: "更新时间", "null": "空", leftParenthesis: "（", rightParenthesis: "）", btn: { success: "完成", submit: "提交", edit: "修改", "delete": "删除" }, auth: { register: "注册", login: "登录" }, header: { setting: "设置", logout: "登出", search: "搜索问题试试", ask: "我要提问" } }, e.exports = t["default"];
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = { auth: { loginBtn: "Login By LeanCloud" } }, e.exports = t["default"];
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = ["$http", "$state", "lcConfig", "$window", function (e, t, n, o) {
    "ngInject";return { goHome: function goHome() {
        t.go("home");
      }, redirect: function redirect(e) {
        o.location.href = e;
      } };
  }], e.exports = t["default"];
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = ["$http", "$window", "lcConfig", "$state", function (e, t, n, o) {
    "ngInject";return { getData: function getData() {
        return e({ method: "get", url: "/api/hello" });
      } };
  }], e.exports = t["default"];
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = ["authSer", "commonSer", "$rootScope", "$state", function (e, t, n, o) {
    "ngInject";return { restrict: "E", templateUrl: "app/common/header/header.html", scope: !0, replace: !0, link: function link(e) {} };
  }], e.exports = t["default"];
}, function (e, t) {
  "use strict";Object.defineProperty(t, "__esModule", { value: !0 }), t["default"] = ["$scope", "$window", "commonSer", "helloSer", function (e, t, n, o) {
    "ngInject";e.goHome = function () {
      n.goHome();
    }, o.getData().then(function (e) {
      console.log(e);
    });
  }], e.exports = t["default"];
}]), angular.module("webProject").run(["$templateCache", function (e) {
  e.put("app/auth/home/home.html", '<div class="auth-home-module"><div class="block1"><div class="logo">LeanEngine</div><div class="btns"><md-button class="registerBtn lc-btn">{{i18n.auth.register}}</md-button><md-button class="loginBtn lc-btn md-raised light">{{i18n.auth.login}}</md-button></div></div></div>'), e.put("app/common/header/header.html", '<div class="common-header-module"><div class="header-content"><div class="logo" ng-click="goHome();">LeanEngine</div><md-menu ng-if="user.username" class="account-menu" md-position-mode="target-right target" md-offset="0 48"><md-button md-menu-origin="" class="lc-btn" ng-click="openMenu($mdOpenMenu, $event)">{{user.username}}</md-button><md-menu-content><md-menu-item><md-button>{{i18n.header.setting}}</md-button></md-menu-item><md-menu-item><md-button>{{i18n.header.logout}}</md-button></md-menu-item></md-menu-content></md-menu><md-button ng-if="!user.username" class="loginBtn" ng-click="">{{i18n.auth.login}}</md-button><div class="search-input" ng-if="ui.showAskBtn"><md-button class="md-icon-button searchBtn" ng-click="" aria-label="close"><span></span></md-button><input class="search" type="text" placeholder="{{i18n.header.search}}"></div><md-button class="askBtn lc-btn md-raised" ng-click="creatTicket()" ng-if="ui.showAskBtn"><span class="ask-icon"></span> <span>{{i18n.header.ask}}</span></md-button></div></div>');
}]);

//# sourceMappingURL=app-95cce65c12-compiled.js.map