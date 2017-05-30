/**
 * 主框架js
 */
var mainModule = angular.module('manager.main', ['ui.router', "common.service", "common.filter"]);

mainModule.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/loginSuccess');
    $stateProvider
        // 1登录成功
        .state('loginSuccess', {
            url: '/loginSuccess',
            templateUrl: 'login/login_success.html',
            controller: 'loginSuccessCtrl as mainModule'
        })
        //2用户管理
        .state('userManager', {
            url: '/userManager',
            templateUrl: 'user/user_manager.html'
        })
        //2.1用户管理--用户列表
        .state('userManager.uLi', {
            url: '/userManager.uLi',
            templateUrl: 'user/user_list.html',
            controller: 'uListCtrl as mainModule'
        })
        //2.2用户管理--用户详情
        .state('userManager.uDt', {
            url: '/userManager.uDt',
            templateUrl: 'user/user_detail.html',
            controller: 'uDetailCtrl as mainModule'
        })
        //2.3用户管理--用户详情--作品
        .state('userManager.uDt.wks', {
            url: '/wks',
            templateUrl: 'user/tab/u_works.html',
            controller: 'wksCtrl as mainModule'
        })
        //2.4用户管理--用户详情--发出的评论
        .state('userManager.uDt.ucm', {
            url: '/ucm',
            templateUrl: 'user/tab/u_comment_made.html',
            controller: 'ucmCtrl as mainModule'
        })
        //2.5用户管理--用户详情--收到的评论
        .state('userManager.uDt.ucr', {
            url: '/ucr',
            templateUrl: 'user/tab/u_comment_rec.html',
            controller: 'ucrCtrl as mainModule'
        })
        //2.6用户管理--用户详情--发出的赞
        .state('userManager.uDt.upm', {
            url: '/upm',
            templateUrl: 'user/tab/u_praise_made.html',
            controller: 'upmCtrl as mainModule'
        })
        //2.7用户管理--用户详情--收到的赞
        .state('userManager.uDt.upr', {
            url: '/upr',
            templateUrl: 'user/tab/u_praise_rec.html',
            controller: 'uprCtrl as mainModule'
        })
        //3作品管理
        .state('worksManager', {
            url: '/worksManager',
            templateUrl: 'works/works_manager.html'
        })
        //3.1作品管理--作品列表
        .state('worksManager.wList', {
            url: '/worksManager.wList',
            templateUrl: 'works/works_list.html',
            controller: 'worksListCtrl as mainModule'
        })
        //3.2作品管理--作品列表--投稿中的作品
        .state('worksManager.sub_ing', {
            url: '/worksManager.sub_ing',
            templateUrl: 'works/status/sub_ing.html',
            controller: 'sub_ingCtrl as mainModule'
        })
        //3.3作品管理--作品列表--投稿成功的作品
        .state('worksManager.sub_success', {
            url: '/worksManager.sub_success',
            templateUrl: 'works/status/sub_success.html',
            controller: 'sub_successCtrl as mainModule'
        })
        //3.4作品管理--作品列表--已发布的作品
        .state('worksManager.published', {
            url: '/worksManager.published',
            templateUrl: 'works/status/published.html',
            controller: 'publishedCtrl as mainModule'
        })
        //4客服管理
        .state('customerServiceManager', {
            url: '/customerServiceManager',
            templateUrl: 'customer/customer_manager.html'
        })
        //4.1客服管理--举报管理--举报列表
        .state('customerServiceManager.reportList', {
            url: '/reportList',
            templateUrl: 'customer/report_list.html',
            controller: 'reportListCtrl as mainModule'
        })
        //4.2客服管理--举报管理--举报列表--列表详情
        .state('customerServiceManager.reportListDt', {
            url: '/reportListDt',
            templateUrl: 'customer/report_list_detail.html',
            controller: 'reportListDtCtrl as mainModule'
        })
        //4.3客服管理--意见反馈--反馈列表
        .state('customerServiceManager.feedback', {
            url: '/feedback',
            templateUrl: 'customer/feedback_list.html',
            controller: 'feedbackListCtrl as mainModule'
        })
        //5系统管理
        .state('systemManager', {
            url: '/systemManager',
            templateUrl: 'system/system_manager.html'
        })
        //5.1系统管理--版本更新--版本列表
        .state('systemManager.versionList', {
            url: '/versionList',
            templateUrl: 'system/version_list.html',
            controller: 'versionListCtrl as mainModule'
        })
        //5.2系统管理--版本更新--版本列表--版本详情
        .state('systemManager.versionDetail', {
            url: '/versionDetail',
            templateUrl: 'system/version_detail.html',
            controller: 'versionDetailCtrl as mainModule'
        })

    ;
});

angular.element(document).ready(function(){
    //异步载入模块，为角色权限管理预留
    angular.bootstrap(document, ['manager.main']);
});
