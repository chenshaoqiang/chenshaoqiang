var app = angular.module('app', ['ui.router','angularFileUpload','datatables','ngResource','datatables.columnfilter','datatables.select']);
var url = window.location.href;
var arr = url.split(';');
app.config(function($httpProvider,$provide){
	$httpProvider.interceptors.push("yourInterceptors");
	$provide.decorator('$state', function($delegate, $stateParams) {
		$delegate.forceReload = function() {
			return $delegate.go($delegate.current, $stateParams, {
				reload: true,
				inherit: false,
				notify: true
			});
		};
		return $delegate;
	});
}).factory("yourInterceptors", function($q){
	return {
		'request':function(config){
			return config;
		},
		'response':function(resp){
			var res = resp.data;
			if(typeof(res)=='string'){
				if(res.indexOf('请输入您的手机号和密码来登录') !== -1){
					//如果返回的文本包含"登陆页面"，就跳转到登陆页面
					window.location.href= arr[0];
					//一定要返回一个字符串不能不返回或者不给返回值，否则会进入success方法
					return "";
				}
			}
			return resp;
		},
		'requestError':function(rejection){
			return $q.reject(rejection);
		},
		'responseError':function(rejection){
			return rejection
		}
	};
});
var URLInit={
	/*--主页--*/
	"userinfo":"/onecloud-manager/user/userinfo"
	,"unread":"/onecloud-manager/message/unread?receiver="
	,"setread":"/onecloud-manager/message/setread"
	/*--首页--*/
	,"getpublishnotice":"/onecloud-manager/notice/getpublishnotice"
	,"myManage":"/onecloud-manager/company/myManage"
	,"myJoined":"/onecloud-manager/company/myJoined"
	,"getnotice":"/onecloud-manager/notice/getnotice?id="
	/*--我的企业--*/
	,"validateCompany":"/onecloud-manager/company/validateCompany"
	,"getIndustrylist":"/onecloud-manager/company/getIndustrylist"
	,"createCompany":"/onecloud-manager/company/createCompany"
	,"ThumUpload":"/onecloud-manager/file/imageThumbnails/upload"
	,"upload":"/onecloud-manager/file/upload"
	,"getRegionlist":"/onecloud-manager/region/getRegionlist"
	,"joinCompany":"/onecloud-manager/company/joinCompany"
	/*--设置--*/
	,"headportrait":"/onecloud-manager/user/userinfo/headportrait"
	,"getCaptcha":"/onecloud-portal/captcha/getCaptcha"
	,"common":"/onecloud-manager/user/userinfo/common"
	,"identity":"/onecloud-manager/user/userinfo/identity"
	,"validateCaptcha":"/onecloud-portal/captcha/validateCaptcha"
	,"validate":"/onecloud-portal/register/validate"
	,"auth":"/onecloud-manager/user/userinfo/auth"
	/*--产品管理--*/
	,"companyProList":"/onecloud-manager/companyProduct/companyProList?pageSize=10000&pageNum=1&companyId="
	,"companyProListByPage":"/onecloud-manager/companyProduct/companyProList?"
	,"updateRemark":"/onecloud-manager/companyProduct/updateRemark"
	,"configzip":"/onecloud-manager/instanceuser/download/configzip?productId="
	,"byid":"/onecloud-manager/instanceuser/download/account/byid"
	,"config":"/onecloud-manager/instanceuser/download/config?productId="
	,"getList":"/onecloud-manager/productLine/getList"
	,"generateOrder":"/onecloud-manager/companyProduct/generateOrder"
	,"ListByProductId":"/onecloud-manager/instance/ListByProductId"
	,"instanceuserList":"/onecloud-manager/instanceuser/list"
	,"instanceSave":"/onecloud-manager/instance/save"
	,"instanceUpdate":"/onecloud-manager/instance/update"
	,"instanceDel":"/onecloud-manager/instance/del"
	,"instanceuserSave":"/onecloud-manager/instanceuser/save"
	,"instanceuserUpdate":"/onecloud-manager/instanceuser/update"
	,"instanceuserLogout":"/onecloud-manager/instanceuser/logout"
	,"instanceuserStartup":"/onecloud-manager/instanceuser/startup"
	,"importuser":"/onecloud-manager/instanceuser/initUser/"
	,"getConfirmInfo":"/onecloud-manager/companyProduct/getConfirmInfo"
	,"confirmRegister":"/onecloud-manager/companyProduct/confirmRegister"
	,"relatedPro":"/onecloud-manager/companyProduct/relatedPro"
	,"getTrialProduct":"/onecloud-manager/companyProduct/getTrialProduct"
	,"productTrial":"/onecloud-manager/companyProduct/productTrial"
	/*--企业设置--*/
	,"getCompanyInfo":"/onecloud-manager/company/getCompanyInfo?companyId="
	,"updateCompany":"/onecloud-manager/company/updateCompany"
	,"identifyInformationSubmit":"/onecloud-manager/company/identifyInformationSubmit"
	,"findUserListByName":"/onecloud-manager/company/findUserListByName"
	,"assignCompany":"/onecloud-manager/company/assignCompany"
	/*--消息中心--*/
	,"unreadMes":"/onecloud-manager/message/unreadMessage?receiver="
	,"readMes":"/onecloud-manager/message/readMessage?receiver="
};
//写cookies
function setCookie(c_name, value, expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
//读取cookies
function getCookie(name) {
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return (arr[2]);
	else
		return null;
}
//删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//格式化时间数据
Date.prototype.format = function(format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
				? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return format;
};
app.config(function($stateProvider,$locationProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/main');
	$stateProvider
		.state('main', {url:'/main', templateUrl: 'user_manager/main.html', controller: 'mainCtrl'})
		.state('myBusiness', {url:'/myBusiness', templateUrl: 'user_manager/myBusiness.html', controller: 'myBusinessCtrl'})
		.state('businessAdmin', {url:'/businessAdmin', templateUrl: 'user_manager/businessAdmin.html', controller: 'businessAdminCtrl'})
		.state('businessAdmin.modify', {url:'/modify', templateUrl: 'user_manager/modify.html'})
		.state('businessAdmin.auth', {url:'/auth', templateUrl: 'user_manager/auth.html'})
		.state('addBusiness', {url:'/addBusiness', templateUrl: 'user_manager/addBusiness.html', controller: 'addBusinessCtrl'})
		.state('addBusiness.step1', {url:'/addBusiness/step1', templateUrl: 'user_manager/addBusinessStep1.html'})
		.state('addBusiness.step2', {url:'/addBusiness/step2', templateUrl: 'user_manager/addBusinessStep3.html'})
		.state('admin', {url:'/admin', templateUrl: 'user_manager/admin.html', controller: 'adminCtrl as app'})
		.state('admin.productAdmin', {url:'/productAdmin', templateUrl: 'user_manager/productAdmin.html'})
		.state('admin.userAdmin', {url:'/userAdmin', templateUrl: 'user_manager/userAdmin.html'})
		.state('fastReg', {url:'/fastReg', templateUrl: 'user_manager/fastReg.html', controller: 'fastRegCtrl'})
		.state('addProbation', {url:'/addProbation', templateUrl: 'user_manager/addProbation.html', controller: 'addProbationCtrl'})
		.state('setting', {url:'/setting', templateUrl: 'user_manager/setting.html', controller: 'settingCtrl'})
		.state('message_center', {url:'/message_center', templateUrl: 'user_manager/message_center.html', controller: 'messageCtrl'})
});
app.run(['$rootScope', '$location' , '$state','$templateCache','DTDefaultOptions',  function($rootScope, $location, $state,$templateCache,DTDefaultOptions){
//监听路由事件
	DTDefaultOptions.setDOM('lrtip').setLanguage({
		"sEmptyTable": "抱歉，查不到数据",
		"sLengthMenu": "每页显示 _MENU_ 条记录",
		"sZeroRecords": "抱歉， 没有找到",
		"sLoadingRecords": "加载中...",
		"sProcessing": "加载中...",
		"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
		"sInfoEmpty": "没有数据",
		"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
		"oPaginate": {
			"sFirst": "首页",
			"sPrevious": "前一页",
			"sNext": "后一页",
			"sLast": "尾页"
		}
	});
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams){
			$templateCache.removeAll();
			if(fromState.name=="fastReg"){
				window.clearInterval($rootScope.t1);
			}
			// if(fromState.name=="addBusiness.step1"){
			// 	var truthBeTold = window.confirm("确定离开正在编辑的页面吗？");
			// 	if (!truthBeTold) {
			// 		window.onbeforeunload = function(e)
			// 		{
			// 			return  e.returnValue='你真的要关闭吗？';
			// 		};
			// 	}
			// }
			var locationHash = toState.name;
			var checkVal;
			$oLis=$(".main-navigation-menu").children("li");
			function changeCssStyle(name){
				$oLis.each(function(){
					if($(this).attr("data-content")==name){
						$(this).siblings().removeClass("active open");
						$(this).addClass("active open");
					}
				});
			}
			if(/main/.test(locationHash)){
				checkVal="首页";
				changeCssStyle(checkVal);
			}else if(/siness/.test(locationHash)){
				checkVal="我的企业";
				changeCssStyle(checkVal);
			}else if(/admin/.test(locationHash)){
				checkVal="我的企业";
				changeCssStyle(checkVal);
			}else if(/setting/.test(locationHash)){
				checkVal="设置";
				changeCssStyle(checkVal);
			}
			else if(/message/.test(locationHash)){
				checkVal="消息中心";
				changeCssStyle(checkVal);
			}
		})
}]);
app.controller('appCtrl',function($scope,$http,$rootScope){
	$rootScope.goToProductTap=function(busId){
		$rootScope.businessId=busId;
		setCookie('companyId',$rootScope.businessId);
	};
	$http({
		method: 'GET',
		url: URLInit.userinfo+"?DT="+new Date().getTime()
	}).success(function(response) {
		$rootScope.userId=response.data.id;
		//消息部分
		function getMessage(){
			$http({
				method: 'GET',
				url: URLInit.unread+response.data.id+"&DT="+new Date().getTime()
			}).success(function(response) {
				$rootScope.unreadAmount=response.length;
				$rootScope.unreadMessage=response;
				//console.log(response);
			}).error(function(response, status) {

			});
		}
		getMessage();
		$rootScope.setRead=function(id,title,content){
			$scope.sendId={"id":id};
			$scope.detailMessageBox="OPEN";
			$scope.detailMessageTitle=title;
			$scope.detailMessageContent=content;
			$http({
				method: 'POST',
				url: URLInit.setread,
				data:$.param($scope.sendId),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(response) {
				//console.log(response);
				getMessage();
			}).error(function(response) {
				//console.log(response);
			});
		};
		$scope.checkRead=function(){
			$scope.detailMessageBox="CLOSE";
		};
		$scope.services = response;
		$rootScope.headPicUrl = $scope.services.data.headPicUrl;
		$rootScope.mobile = $scope.services.data.mobile;
		$scope.oldName = $scope.services.data.nickname;
		if($scope.services.data.headPicUrl == null) {
			$scope.services.data.headPicUrl = "assets/images/media-user.png";
		}
		switch($scope.services.data.cardIdentity) {
			case null:
				$scope.services.data.cardIdentity = "未认证";
				break;
			case 0:
				$scope.services.data.cardIdentity = "未认证";
				break;
			case 1:
				$scope.services.data.cardIdentity = "待审核";
				break;
			case 2:
				$scope.services.data.cardIdentity = "已认证";
				break;
		}
		for(var i in $scope.services.data) {
			if($scope.services.data[i] == null) {
				$scope.isNull = " ";
			}
		}
		$rootScope.headPicUrl = $scope.services.data.headPicUrl;
		$rootScope.nickname = $scope.services.data.nickname;
		$rootScope.birthday = $scope.services.data.birthday;
		$rootScope.sex = $scope.services.data.sex;
		$rootScope.telphone = $scope.services.data.telphone;
		$rootScope.address = $scope.services.data.address;
		$rootScope.mobile = $scope.services.data.mobile;
		$rootScope.email = $scope.services.data.email;
	}).error(function(response) {
		//console.log(response);
		window.location.href = '/onecloud-manager';
	});

});
app.controller('mainCtrl',['DTOptionsBuilder','DTColumnDefBuilder','DTColumnBuilder', '$rootScope','$scope','$state','$http','$interval','$location',function(DTOptionsBuilder,DTColumnDefBuilder,DTColumnBuilder,$rootScope,$scope,$state,$http,$interval,$location){
	//管理的企业超过三个的时候起作用的状态
	$scope.hasNextManage=false;
	function ChangeStyle(){
		var ulobj=document.getElementById('index_menu');
		var liarr=ulobj.childNodes;
		for(var i=0;i<liarr.length;i++){
			if(liarr[i].tagName=='LI'){
				if(liarr[i].getAttribute('data-content')=='我的企业'){
					if(liarr[i].className !='active open'){
						liarr[i].className ='active open';
					}
				}else{
					liarr[i].className='';
				}
			}
		}
	}
	var vm =this;
		//根据产品ID查询数据源
	function getInstanceId() {
		delCookie('id');
		delCookie('instanceId');
		$http({
			method: "POST",
			url: URLInit.ListByProductId,
			data: {"productId":getCookie("productId")},
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			$http({
				method: "GET",
				url: URLInit.companyProList+$rootScope.businessId+"&DT="+new Date().getTime()
			}).success(function (data) {
				if (data.flag=='000000'){
					if(data.data.list.length == 0){
						$scope.emptyProduct = 'true';
					}else{
						$rootScope.productId = data.data.list[0].id;
						$scope.productName = data.data.list[0].productlineCode;
						for (var i = 0;i<data.data.list.length;i++){
							var productLineId = data.data.list[i].productlineId;
							// for(var j = 0; j<$scope.productLines.length;j++){
							// 	if($scope.productLines[j].id == productLineId){
							// 		$scope.limitName = $scope.productLines[j].name;
							// 		$scope.limitNum = $scope.productLines[j].phoneLimit;
							// 	}
							// }
						}
					}
				}
			}).error(function (data) {
				$scope.netError = 'true';
				$scope.errorMsg = "发送请求失败，请重试！";
			});
			if (data.flag=='000000') {
				//用于保存查询条件(手机号、邮箱、激活状态)
				$rootScope.searchDetailInstance = {};
				$rootScope.searchDetailInstance.status='';
				$scope.requestSuccess = '';
				vm.listItems = $scope.instanceList = data.data;
				if ($scope.instanceList.length > 0) {
					$scope.requestSuccess = 'true';
					setCookie('instanceId', $scope.instanceList[0].instanceId);
					setCookie('id', $scope.instanceList[0].id);
					$rootScope.instanceName = $scope.instanceList[0].name;
					$rootScope.instanceSource = $scope.instanceList[0].source;
					$rootScope.searchInstanceId = getCookie('instanceId');
					$scope.canLoadTable = 'true';
					//console.log(getCookie('instanceId'));
					function searchIns() {
						vm.userOptions = DTOptionsBuilder.newOptions()
							.withOption('ajax', {
								// Either you specify the AjaxDataProp here
								url: URLInit.instanceuserList,
								type: 'POST',
								data: function (d) {
									d.instanceId = getCookie('instanceId');
									d.mobile = $rootScope.searchDetailInstance.mobile;
									d.email = $rootScope.searchDetailInstance.email;
									d.status = $rootScope.searchDetailInstance.status;
									d.accountCode = $rootScope.searchDetailInstance.accountCode;
									d.account = $rootScope.searchDetailInstance.account;
								},
								dataSrc: function(json) {
									if(json.flag = '000000'){
										json['recordsTotal'] = json.data.total;
										json['recordsFiltered'] = json.data.total;
										$scope.start = json.data.startRow - 1;
										$scope.currentData = [];
										if (json.data.list.length>0){
											for (var i=0;i<json.data.list.length;i++){
												$scope.currentData.push(json.data.list[i].id);
											}
										}
										return json.data.list;
									}else{
										$scope.netError = 'true';
										$scope.errorMsg = json.desc;
									}
								}
							})
							// or here
							.withDataProp('data.list')
							.withOption('processing', true)
							.withOption('serverSide', true)
							.withOption('stateSave', true)
							.withPaginationType('simple_numbers');
						if($rootScope.productlineCode == 'U8'){
							vm.userColumnDefs = [
								DTColumnDefBuilder.newColumnDef(0).renderWith(function (data, type, full) {
									return '<span class="accountCode">'+full.accountCode+'</span><span class="id hide">'+full.id+'</span><span class="instanceId hide">'+full.instanceId+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(1).renderWith(function (data, type, full) {
									return '<span class="account">'+full.account+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(2).renderWith(function (data, type, full) {
									return '<span class="mobile">'+full.mobile+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(3).renderWith(function (data, type, full) {
									if (full.email == null){
										full.email = '';
									}
									return '<span class="email">'+full.email+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(4).renderWith(function (data, type, full) {
									if(full.status==null || full.status=='0'){
										return '<span class="status">已激活</span>'
									}else if(full.status=='1'){
										return '<span class="status">未激活</span>'
									}else if(full.status=='2'){
										return '<span class="status">已注销</span>'
									}
								}),
								DTColumnDefBuilder.newColumnDef(5).renderWith(function (data, type, full) {
									if(full.status=='2'){
										//用户注销的情况下
										var html =
											'<button data-status="'+full.status+'" id="edit" class="btn btn-warning fa fa-edit btn-sm btn-padding margin-right-5" ' +
											'ng-click="app.edit()"'+
											'</button>'+
											'<button id="success" class="btn fa fa-key btn-padding btn-success btn-sm" ng-show="true" ng-click="app.startup('+"'"+full.id+"'"+','+"'"+full.mobile+"'"+','+"'"+full.productlineId+"'"+')">' +
											'</button>'+
											'<button id="danger" class="btn fa fa-trash-o btn-padding btn-danger btn-sm ng-hide" ng-show="false" ng-click="app.delete('+"'"+full.id+"'"+')">' +
											'</button>';
									}else {
										var html =
											'<button data-status="'+full.status+'" id="edit" class="btn btn-warning fa fa-edit btn-sm btn-padding margin-right-5" ' +
											'ng-click="app.edit()"'+
											'</button>'+
											'<button id="success" class="btn btn-success fa fa-key btn-padding btn-sm ng-hide" ng-show="false" ng-click="app.startup('+"'"+full.id+"'"+','+"'"+full.mobile+"'"+','+"'"+full.productlineId+"'"+')">' +
											'</button>'+
											'<button id="danger" class="btn fa fa-trash-o btn-danger btn-padding btn-sm" ng-show="true" ng-click="app.delete('+"'"+full.id+"'"+')">' +
											'</button>';
									}
									return html;
								})
							];
							vm.userColumns = [
								DTColumnBuilder.newColumn('accountCode').withTitle('编码').notSortable(),
								DTColumnBuilder.newColumn('account').withTitle('用户名').notSortable(),
								DTColumnBuilder.newColumn('mobile').withTitle('手机号').notSortable(),
								DTColumnBuilder.newColumn('email').withTitle('邮箱').notSortable(),
								DTColumnBuilder.newColumn('status').withTitle('用户激活状态').notSortable(),
								DTColumnBuilder.newColumn(null).withTitle('操作').notSortable()
							];
						}
						else if($rootScope.productlineCode == 'nc'){
							vm.userColumnDefs = [
								DTColumnDefBuilder.newColumnDef(0).renderWith(function (data, type, full) {
									return '<span class="accountCode">'+full.accountCode+'</span><span class="id hide">'+full.id+'</span><span class="instanceId hide">'+full.instanceId+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(1).renderWith(function (data, type, full) {
									return '<span class="account">'+full.account+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(2).renderWith(function (data, type, full) {
									return '<span class="mobile">'+full.mobile+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(3).renderWith(function (data, type, full) {
									if (full.email == null){
										full.email = '';
									}
									return '<span class="email">'+full.email+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(4).renderWith(function (data, type, full) {
									if(full.status==null || full.status=='0'){
										return '<span class="status">已激活</span>'
									}else if(full.status=='1'){
										return '<span class="status">未激活</span>'
									}else if(full.status=='2'){
										return '<span class="status">已注销</span>'
									}
								})
							];
							vm.userColumns = [
								DTColumnBuilder.newColumn('accountCode').withTitle('编码').notSortable(),
								DTColumnBuilder.newColumn('account').withTitle('用户名').notSortable(),
								DTColumnBuilder.newColumn('mobile').withTitle('手机号').notSortable(),
								DTColumnBuilder.newColumn('email').withTitle('邮箱').notSortable(),
								DTColumnBuilder.newColumn('status').withTitle('用户激活状态').notSortable()
							];
						}

						vm.userInstance = {};
						vm.reloadUserData = reloadUserData;
						function reloadUserData () {
							vm.userInstance.reloadData();
						}
						vm.userOptions.withOption('fnRowCallback',
							function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
								$compile(nRow)($scope);
								$('td', nRow).unbind('click');
								$('td', nRow).bind('click', function(e) {
									var status = $(e.target).siblings("button.btn-warning").attr("data-status");
									$scope.checkToDeleteUser = function () {
										$scope.clicked = 'true';
										$http({
											method:"POST",
											url: URLInit.instanceuserLogout,
											data: JSON.stringify($scope.deleteUserId),
											headers: {
												'Content-Type': 'application/json'
											}
										}).success(function(data) {
											$scope.clicked = 'false';
											//响应成功
											if(data.flag == '000000'){
												$scope.deleteUserBox = 'CLOSE';
												//先把注销图标隐藏
												$(e.target).attr("ng-show",false);
												$(e.target).attr("class","ng-hide");
												//再把启用显示
												$(e.target).siblings("button#success").attr("ng-show",true);
												$(e.target).siblings("button#success").attr("class","btn fa fa-key btn-padding btn-success btn-sm");
												$(e.target).parent().siblings().children("span.status").html('已注销');
											}
										}).error(function(data, header, config, status) {
											//处理响应失败
											$scope.clicked = 'false';
											$scope.netError = 'true';
											$scope.errorMsg = "发送请求失败，请重试！";
										});
									};
									$scope.checkToStartUser = function () {
										$scope.clicked = 'true';
										$http({
											method:"POST",
											url: URLInit.instanceuserStartup,
											data: JSON.stringify($scope.startUpUser),
											headers: {
												'Content-Type': 'application/json'
											}
										}).success(function(data) {
											$scope.clicked = 'false';
											//响应成功
											if(data.flag == '000000'){
												$scope.startUpUserBox = 'CLOSE';
												//先把启用图标隐藏
												$(e.target).attr("ng-show",false);
												$(e.target).attr("class","ng-hide");
												//再把注销显示
												$(e.target).siblings("#danger").attr("ng-show",true);
												$(e.target).siblings("#danger").attr("class","btn fa fa-trash-o btn-padding btn-danger btn-sm");
												$(e.target).parent().siblings().children("span.status").html('未激活');
											}else {
												$scope.netError = 'true';
												$scope.errorMsg = data.desc;
											}
										}).error(function(data, header, config, status) {
											$scope.clicked = 'false';
											//处理响应失败
											$scope.netError = 'true';
											$scope.errorMsg = "发送请求失败，请重试！";
										});
									};

									if ($(e.target).attr('id')=='edit'){
										var code = $(e.target).parent().siblings().children("span.accountCode");
										var account = $(e.target).parent().siblings().children("span.account");
										var mobile = $(e.target).parent().siblings().children("span.mobile");
										var email = $(e.target).parent().siblings().children("span.email");
										var id = $(e.target).parent().siblings().children("span.id");
										var instanceId = $(e.target).parent().siblings().children("span.instanceId");
										$('#code').text(code.html());
										$('#accountInput').val(account.html());
										$('#mobileInput').val(mobile.html());
										$('#emailInput').val(email.html());
										$scope.handleUpdateUser = function () {
											var newAccount = $('#accountInput').val();
											var newMobile = $('#mobileInput').val();
											var newEmail = $('#emailInput').val();
											$scope.updateUserFormData = {
												"accountCode" : $('#code').text(),
												"account" : newAccount,
												"mobile" : newMobile,
												"email" : newEmail,
												"id" : id.html(),
												"instanceId" : instanceId.html()
											};
											$scope.clicked = 'true';
											$http({
												method:"POST",
												url: URLInit.instanceuserUpdate,
												data: JSON.stringify($scope.updateUserFormData),
												headers: {
													'Content-Type': 'application/json'
												}
											}).success(function(data) {
												//响应成功
												$scope.clicked = 'false';
												if(data.flag == '000000'){
													$scope.responseError = 'success';
													account.html(newAccount);
													mobile.html(newMobile);
													email.html(newEmail);
													if (data.data.status == '0'){
														$(e.target).parent().siblings().children("span.status").html('已激活');
													} else if(data.data.status == '1'){
														$(e.target).parent().siblings().children("span.status").html('未激活');
													} else if(data.data.status == '2'){
														$(e.target).parent().siblings().children("span.status").html('已注销');
													}
												}else {
													$scope.responseError = 'true';
													$scope.errorMsg = data.desc;
												}
											}).error(function(data, header, config, status) {
												$scope.clicked = 'false';
												$scope.netError = 'true';
												$scope.errorMsg = "发送请求失败，请重试！";
											});
										};
									}
								});
								return nRow;
							});
						//具体信息查询数据源用户
						$scope.searchAndRerender=function(){
							reloadUserData();
						};
						//点击数据源tab页签时，拿到数据源id
						$scope.changeInstance = function (instance,id,name,source) {
							$rootScope.searchDetailInstance={};
							$scope.showInput = 'false';
							$rootScope.searchInstanceId = instance;
							$rootScope.instanceName = name;
							$rootScope.instanceSource = source;
							delCookie('instanceId');
							setCookie("instanceId",$rootScope.searchInstanceId);
							setCookie("id",id);
							// getInstanceId();
							reloadUserData();
						};
						//注销用户
						vm.delete = function (person) {
							$scope.deleteUserBox = 'OPEN';
							$scope.deleteUserId = {
								"id": person
							};
						};
						vm.startup = function (id,mobile,productlineId) {
							$scope.startUpUserBox = 'OPEN';
							$scope.startUpUser = {
								"id": id,
								"mobile":mobile,
								"productlineId":productlineId
							}
						};
						vm.edit = function () {
							$scope.updateUserData = 'true';
						};
						//修改用户信息
						$scope.updateUserData = 'false';
						$scope.responseError = 'false';
						$scope.errorMsg = '';
						//管理关闭弹窗
						$scope.closeImport = function () {
							$scope.failUrl = 'false';
							$scope.progress = 0;
							$scope.progressStyle = {
								'width' : $scope.progress+'%'
							};
							$scope.responseError = 'false';
							$scope.response = 'false';
							$scope.importUser = 'false';
							$scope.addSuccess = 'false';
							$scope.addFile = '';
							$scope.addFiles = '';
							$scope.createUser = 'false';
							reloadUserData();
							//getInstanceId();
						};
						function createdRow(row, data, dataIndex) {
							// Recompiling so we can bind Angular directive to the DT

							$compile(angular.element(row).contents())($scope);
						}
						$scope.allFile = 'no';
						$scope.adding = '';
						$scope.cancelWindow = 'CLOSE';
						$scope.canzjg = 'yes';
						$scope.noticeClose = function () {
							$scope.cancelWindow = 'OPEN';
						};
						$scope.checkToCancel = function () {
							$scope.clicked = 'true';
							//关闭导入窗口
							$scope.clicked = 'false';
							$scope.canzjg = 'yes';
							$scope.importUser = 'false';
							$scope.cancelWindow = 'CLOSE';
							window.clearInterval($scope.t4);
						};
						$scope.cancelCancel = function () {
							$scope.cancelWindow = 'CLOSE';
						};
						$scope.btnImport = function () {
							$scope.clicked = 'true';
							$scope.adding = '0';
						};
						$scope.handleImport = function () {
							$scope.allFile = 'no';
							$scope.importUser = 'true';
							//文件
							$scope.addFile = 'false';
							$scope.progress = 0;
							$scope.progressStyle = {
								'width' : $scope.progress+'%'
							};
							//失败的下载链接
							$scope.failUrl = 'false';
							var uploader = $scope.uploader = new FileUploader({
								url : URLInit.importuser + getCookie('instanceId'),
								queueLimit: 1,     //文件个数
								removeAfterUpload: true   //上传后删除文件
							});
							//重新选择文件时，清空队列，达到覆盖文件的效果
							$scope.clearItems = function(){
								uploader.clearQueue();
								window.clearInterval($scope.t4);
								$scope.errorMsg = '';
								$scope.progress = 0;
								$scope.progressStyle = {
									'width' : $scope.progress+'%'
								};
								$scope.adding = '';
								$scope.importFile = 'false';
								$scope.addFiles = 'false';
								$scope.clicked = 'false';
							};
							//添加文件之后，把文件信息赋给scope
							uploader.onAfterAddingFile = function(fileItem) {
								$scope.addFile = 'true';
								$scope.failUrl = 'false';
								$scope.fileItem = fileItem._file;
							};
							//文件上传成功之后回调函数
							uploader.onSuccessItem = function(fileItem, response, status, headers) {
								$scope.adding = '100';
								$scope.scheduleId = response.data;
								$scope.canzjg = 'no';
								$scope.allFile = 'begin';
								$scope.clicked = 'hide';
								if (response.flag=='000000'){
									$scope.importFile = 'true';
									$scope.t4 = window.setInterval(progressFn,5000);
									function progressFn() {
										$http({
											method: "GET",
											url: "/onecloud-manager/instanceuser/getschedule/"+$scope.scheduleId
										}).success(function (data) {
											$scope.adding = '';
											if (data == null){
												$scope.netError = 'true';
												$scope.errorMsg = "上传失败，请重试！";
												window.clearInterval($scope.t4);
											}
											else if (data.flag=='000000'){
												$scope.clicked = 'false';
												if(data.data.result=='0'){
													$scope.progress = data.data.percentage;
													if($scope.progress==null){
														$scope.progressStyle = {
															'width' : '0%'
														}
													}
													$scope.progressStyle = {
														'width' : $scope.progress+'%'
													}
												}
												else if(data.data.result=='1'){
													$scope.progress = data.data.percentage;
													$scope.progressStyle = {
														'width' : $scope.progress+'%'
													};
													$scope.successes = data.data.achievenum;
													$scope.fails = data.data.totalnum - data.data.achievenum;
													window.clearInterval($scope.t4);
													$scope.addFiles = 'success';
													$scope.allFile = 'true';
													$scope.canzjg = 'yes';
													if($scope.fails>0){
														$scope.allFile = 'again';
														$scope.failUrl = 'true';
													}
												}
												else if(data.data.result=='2'){
													window.clearInterval($scope.t4);
													$scope.allFile = 'no';
													$scope.canzjg = 'yes';
													$scope.addFiles = 'fail';
													$scope.errorMsg = "系统错误";
												}
											}else{
												$scope.allFile = 'no';
												$scope.addFiles = 'fail';
												$scope.canzjg = 'yes';
												$scope.netError = 'true';
												$scope.errorMsg = data.desc;
												window.clearInterval($scope.t4);
											}
										}).error(function (data) {
											$scope.allFile = 'no';
											$scope.netError = 'true';
											$scope.errorMsg = "发送请求失败，请重试！";
											window.clearInterval($scope.t4);
											$scope.canzjg = 'yes';
											$scope.clicked = 'false';
										})
									}
								}else{
									$scope.importFile = '';
									$scope.adding = '';
									$scope.allFile = 'no';
									$scope.canzjg = 'yes';
									$scope.addFiles = 'fail';
									$scope.errorMsg = response.desc;
									$scope.clicked = 'false';
								}
							};
							//文件上传失败之后回调函数
							uploader.onErrorItem = function(fileItem, response, status, headers) {
								$scope.netError = 'true';
								$scope.errorMsg = "发送请求失败，请重试！";
								$scope.clicked = 'false';
							};
						};
						//新建用户
						$scope.createUser = 'false';
						$scope.createOpen = function () {

							$scope.createUser = 'true';
							$scope.responseError='false';
							$scope.createUserFormData = {};
							$scope.handleCreateUser = function () {
								$scope.clicked = 'true';
								$scope.createUserFormData.instanceId = getCookie('instanceId');
								$scope.createUserFormData.companyId = getCookie('companyId');
								$http({
									method :"POST",
									url: URLInit.instanceuserSave,
									data : JSON.stringify($scope.createUserFormData),
									headers : {
										'Content-Type': 'application/json'
									}
								}).success(function(data){
									$scope.clicked = 'false';
									if(data.flag =='000000'){
										$scope.responseError='success';
										$scope.createUserFormData = {};

										reloadUserData();
									}else {
										$scope.responseError='true';
										$scope.errorMsg = data.desc;
									}
								}).error(function(data, header, config, status) {
									//处理响应失败
									$scope.clicked = 'false';
									$scope.netError = 'true';
									$scope.errorMsg = "发送请求失败，请重试！";
								});
							}
						}

					}
					searchIns();
					$scope.deleteDateTable=function(){
						$scope.canLoadTable = 'false';
						//console.log("设置了false");
					}
				}else{
					$scope.requestSuccess = 'false';
				}
			}else{
				$scope.netError = 'true';
				$scope.errorMsg = data.desc;
			}
		}).error(function (data) {
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		});
	}
	
	var enterpriceCurrentPage=1;
	var productCurrentPage=1;
	var totleenterpage=0;
	var totleproduct=0;
	$scope.handelShowNotice = "";
	$scope.noticesListNull=false;
	var noticesCount=0;
	var myBusiness=null;
	$http({
		method: "GET",
		url: URLInit.getpublishnotice+"?DT="+new Date().getTime()
	}).success(function(response) {
		if (response.flag == '000000'){
			$scope.noticesList=response.data;
			if($scope.noticesList.length>0){
				$scope.noticesListLen=$scope.noticesList.length;
				$scope.noticesListNull=true;
				var count=1;
				$scope.noticesList.forEach(function(list){
					list.count = count;
					count++;
				});

			}else{
				$scope.noticesListNull=false;
			}
			//console.log($scope.noticesList);
		}
	}).error(function() {});

	//管理的企业
	$http({
		method: "GET",
		url: URLInit.myManage+"?pageSize=3&pageNum=1&DT="+new Date().getTime()
	}).success(function(response) {
		if (response.flag == '000000'){
			$scope.myBusiness = response;
			$scope.myBusinessAmount=response.data.list.length;
			if(response.data.hasNextPage==true){
				$scope.hasNextManage=true;
			}
		}
	});
	//加入的企业:已暂停的功能
	/*$http({
		method: "GET",
		url: URLInit.myJoined+"?pageSize=3&pageNum=1&DT="+"&DT="+new Date().getTime()
	}).success(function(response) {
		if (response.flag == '000000'){
			$scope.joinBusiness = response.data;
		}
	});*/
	//已经开通的产品
	//系统公告弹窗
	$scope.showNotice = function(notices) {
		//console.log(notices);
		$scope.showNoticeTitle =notices.title;
		$scope.handelShowNotice = "open";
		$http({
			method: "GET",
			url: URLInit.getnotice+notices.id
		}).success(function(response) {
			if (response.flag == '000000'){
				$scope.noticesContent=response.data.content;
				var oDiv=document.getElementById("currentNotices");
				oDiv.innerHTML=$scope.noticesContent;
				//console.log(oDiv);
			}else{

			}
		}).error(function(response) {
			console.log(response);
		});

	};
	$scope.closeNotice = function() {
		$scope.handelShowNotice = "";
	};
	//加入企业弹窗
	$scope.handelOpen=function(){
		$scope.handelAuthentication="open";
	};
	//关闭信息弹出框
	$scope.handelClose=function(){
		$scope.handelAuthentication="";
	};

	

	//wbchengs 2016/10/31
	$scope.motal_config={};
	//企业弹窗
	$scope.showEnterpriceModal=function(optiontype){
			$scope.noosmanage=false;
			delCookie('optiontype',optiontype);
			setCookie('optiontype',optiontype);
			var optiontype = getCookie('optiontype',optiontype);
			if(optiontype == 'undefined'){
				$rootScope.stepNumber='产品管理';
				$scope.motal_config.motal_title='产品管理';
				$scope.motal_config.motal_message = '第一步，请选择要管理的企业';
			}else if(optiontype == 'osenter'){
				$rootScope.stepNumber='企业管理';
				$scope.motal_config.motal_title='企业管理';
				$scope.motal_config.motal_message = '请选择要管理的企业';
			}else if(optiontype == 'ossetent'){
				$rootScope.stepNumber='企业认证';
				$scope.motal_config.motal_title='企业认证';
				$scope.motal_config.motal_message = '请选择要认证的企业';
			}else if(optiontype == 'osmanager'){
				$rootScope.stepNumber='用户管理';
				$scope.motal_config.motal_title='用户管理';
				$scope.motal_config.motal_message = '第一步，请选择要管理的企业';
			}
			$http({
				method: "GET",
				url: URLInit.myManage+"?pageSize=3&pageNum=1&DT="+new Date().getTime()
			}).success(function(response){
				enterpriceCurrentPage=1;
				totleenterpage=0;
				if(response.flag === "000000"){
					$scope.showguidemotal='open';
					//创建产品窗口关闭
					$scope.motal_config.motal_createproduct=false;
					//产品列表窗口关闭
					$scope.motal_config.motal_product=false;
					//产品列表窗口轮播按钮
					$scope.motal_config.prdleftctr=false;
					$scope.motal_config.prdrightctr=false;
					//创建企业按钮可用
					$scope.motal_config.motal_createenterprice_btn=true;
					$scope.motal_config.motal_createproduct_btn=false;
					//有企业
					if(response.data.total>0){
						//设置总页数
						totleenterpage=Math.ceil(response.data.total/3);
						//设置企业轮播的左右按钮是否可用
						$scope.motal_config.enterleftctrl=false;
						$scope.motal_config.enterrightctrl=totleenterpage>1;
						//设置其他弹窗都为false
						$scope.motal_config.motal_novalue=false;
						$scope.motal_config.motal_enterprice=true;
						$scope.myenterprice=response.data.list;
						
					}else{
						$scope.motal_config.enterleftctrl=false;
						$scope.motal_config.enterrightctrl=false;
						$scope.motal_config.motal_novalue=true;
						$scope.motal_config.motal_enterprice=false;
						$scope.motal_config.motal_message="您暂时没有创建自己的企业哦！";
					}
				}else{
					alert(response.desc);
				}
			}).error(function(erresponse){
				console.log(erresponse);
			});
	};
	//展示产品
	$scope.showProcudt=function(id,name){
		$rootScope.businessId=id;
		delCookie('businessId');
		setCookie('businessId',$rootScope.businessId);
		var optiontype=getCookie('optiontype');
		$scope.motal_config.motal_title=name;
		$scope.motal_config.motal_message='第二步，请选择要管理的产品';
		if(optiontype=="osenter"){
			ChangeStyle();
			$scope.motal_config.motal_message='';
			setCookie('companyId',$rootScope.businessId);
			$state.go('admin.productAdmin');
			return;
		}
		else if(optiontype=="ossetent"){
			$scope.motal_config.motal_message='';
			setCookie('companyId',$rootScope.businessId);
			$state.go('businessAdmin.auth');
			$rootScope.isClickNode=false;
		}
		else {
			if(optiontype=="osmanager"){
				$scope.noosmanage=true;
			}
			$http({
				method: "GET",
				url: URLInit.companyProListByPage+"pageSize=4&pageNum=1&companyId="+id+"&DT="+new Date().getTime()
			}).success(function(response){
				$scope.motal_config.motal_enterprice=false;
				//创建产品按钮可用
				$scope.motal_config.motal_createenterprice_btn=false;
				$scope.motal_config.motal_createproduct_btn=true;
				if(response.flag==="000000"){
					productCurrentPage=1;
					totleproduct=0;
					//将企业的ID保存在属性中
					document.getElementById('motaltitles').setAttribute('data-id',id);
					if(response.data.total>0){
						if(optiontype=='ossetent'){
							$rootScope.businessId=id;
							setCookie('companyId',$rootScope.businessId);
							ChangeStyle();
							$state.go('businessAdmin');
							return;
						}
						totleproduct=Math.ceil(response.data.total/4);
						if(totleproduct>1){
							$scope.motal_config.prdleftctr=false;
							$scope.motal_config.prdrightctr=true;
						}
						$scope.motal_config.motal_product=true;
						$scope.products=response.data.list;
					}else{
						$scope.motal_config.motal_novalue=true;
						$scope.motal_config.motal_message="您暂时还没有添加此企业的产品哦！"
					}
				}else{
					alert(response.desc);
				}
			});
		}


	};
	//新建产品并注册
	$scope.create_product=function(){
		$scope.motal_config.motal_title=name;
		$scope.motal_config.motal_product=false;
		$scope.motal_config.motal_createproduct=true;
		$scope.motal_config.motal_createproduct_btn=false;
		$scope.motal_config.motal_novalue=false;
		$http({
			method: 'POST',
			url: URLInit.getList,
			data: {},
			headers : { 'Content-Type': 'application/json' }
		}).success(function(response){
			if(response.flag==="000000"){
				$scope.productlines=response.data;
			}else{
				alert(response.desc);
			}
		});
	};
	//企业上一页
	$scope.showEnterpriccPre=function(){
		if($scope.motal_config.enterleftctrl){
			$scope.motal_config.enterrightctrl=true;
			enterpriceCurrentPage-=1;
			if(enterpriceCurrentPage<=1){
				enterpriceCurrentPage=1;
				$scope.motal_config.enterleftctrl=false;
			}
			$http({
				method: "GET",
				url: URLInit.myManage+"?pageSize=3&pageNum="+enterpriceCurrentPage+"&DT="+new Date().getTime()
			}).success(function(response){
				totleenterpage=Math.ceil(response.data.total/3);
				$scope.myenterprice=response.data.list;
				
			});
		}
	};
	//企业下一页
	$scope.showEnterpriccNext=function(){
		if($scope.motal_config.enterrightctrl){
			$scope.motal_config.enterleftctrl=true;
			enterpriceCurrentPage+=1;
			if(enterpriceCurrentPage>=totleenterpage){
				enterpriceCurrentPage=totleenterpage;
				$scope.motal_config.enterleftctrl=true;
				$scope.motal_config.enterrightctrl=false;
			}
			$http({
				method: "GET",
				url: URLInit.myManage+"?pageSize=3&pageNum="+enterpriceCurrentPage+"&DT="+new Date().getTime()
			}).success(function(response){
				totleenterpage=Math.ceil(response.data.total/3);
				$scope.myenterprice=response.data.list;
				
			});
		}
	};
	
	$scope.showProductPre=function(){
		if($scope.motal_config.prdleftctr){
				$scope.motal_config.prdrightctr=true;
				productCurrentPage-=1;
				if(productCurrentPage<=1){
					productCurrentPage=1;
					$scope.motal_config.prdleftctr=false;
				}
			$http({
				method: "GET",
				url: URLInit.companyProListByPage+"pageSize=4&pageNum="+productCurrentPage+"&companyId="+document.getElementById('motaltitles').getAttribute('data-id')+"&DT="+new Date().getTime()
			}).success(function(response){
				if(response.flag==="000000"){
					totleproduct=Math.ceil(response.data.total/4);
					$scope.products=response.data.list;
				}else{
					alert(response.desc);
				}
			});
		}
	};
	$scope.showProductNext=function(){
		if($scope.motal_config.prdrightctr){
			$scope.motal_config.prdleftctr=true;
			productCurrentPage+=1;
			if(productCurrentPage>=totleproduct){
				productCurrentPage=totleproduct;
				$scope.motal_config.prdrightctr=false;
			}
			$http({
				method: "GET",
				url: URLInit.companyProListByPage+"pageSize=4&pageNum="+productCurrentPage+"&companyId="+document.getElementById('motaltitles').getAttribute('data-id')+"&DT="+new Date().getTime()
			}).success(function(response){
				if(response.flag==="000000"){
					totleproduct=Math.ceil(response.data.total/4);
					$scope.products=response.data.list;
				}else{
					alert(response.desc);
				}
			});
		}
	};
	$rootScope.productData = {};
	$scope.RegisterNewProduct=function(){
		ChangeStyle();
		var lineselect=document.getElementById('productline_select');
		var selectvalue=lineselect[lineselect.selectedIndex].value;
		$rootScope.productData.productlineId = selectvalue.split("@")[0];
		$rootScope.regUrl = selectvalue.split("@")[1];
		setCookie('companyId',document.getElementById('motaltitles').getAttribute('data-id'));
		setCookie('productlineId',$rootScope.productData.productlineId);
		setCookie('regUrl',$rootScope.regUrl);
	};
		
	$scope.closeEnterprice=function(){
		$scope.showguidemotal='';
	};
	
	$scope.handleProductId =function(productId,productlineCode){
		ChangeStyle();
		$scope.showInput = 'false';
		$scope.canLoadTable = 'false';
		delCookie('productId');
		setCookie('productId',productId);
		$rootScope.productId = getCookie("productId");
		delCookie('productlineCode');
		setCookie('productlineCode',productlineCode);
		$rootScope.productlineCode = getCookie("productlineCode");
		getInstanceId();
	};
	$scope.gotoInstance=function(productId,productlineCode){
		var optiontype=getCookie('optiontype');
		if(optiontype=="osmanager"){
			$scope.showInput = 'false';
			$scope.canLoadTable = 'false';
			delCookie('productId');
			setCookie('productId',productId);
			$rootScope.productId = getCookie("productId");
			delCookie('productlineCode');
			setCookie('productlineCode',productlineCode);
			$rootScope.productlineCode = getCookie("productlineCode");
			getInstanceId();
			$scope.productId = $rootScope.productId;
			ChangeStyle();
			$state.go('admin.userAdmin');
		}
	};

	$scope.handleNoticeOpen=function(productId,code){
		$rootScope.handelUserNotice = 'open';
		$rootScope.productId = productId;
		delCookie('productlineCode');
		setCookie('productlineCode',code);
		$rootScope.productlineCode = getCookie("productlineCode");
	};
	$scope.netError = 'false';
	$scope.checkDownFile = function(productId){
		$http({
			method: "GET",
			url: '/onecloud-manager/instanceuser/check/datasource?productId='+productId
		}).success(function (data) {
			if (data.flag=='000000'){
				var link = document.getElementById('downFile');
				link.href ='/onecloud-manager/instanceuser/download/config?productId='+productId;
				link.click();
				$scope.closeDownLoadNotice();
			}else{
				$scope.netError = 'true';
				$scope.errorMsg = data.desc;
			}
		}).error(function (data) {
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		});
	};
	$scope.closeOld = function () {
		$scope.handelShowOld = 'close';
		$scope.response = 'false';
		$scope.netError = 'false';
		$scope.deleteInstance = 'CLOSE';
		$scope.deleteUserBox = 'CLOSE';
		$scope.startUpUserBox = 'CLOSE';
		$scope.linkOldFormData = {};
	};
	$scope.closeDownLoad=function(){
		$rootScope.handelUserNotice = '';
	};
	
	$scope.closeDownLoadNotice=function(){
		$rootScope.handelUserNotice = '';
	};
	
	$scope.linkOldProduct=function(){
		ChangeStyle();
		$state.go('admin.productAdmin');
	};
	$scope.changeCssStyl=function(){
		ChangeStyle();
	}
	
}]);
app.controller('myBusinessCtrl',function($scope,$http,$rootScope){
	delCookie('businessId');
	//获取当前点击的企业的ID
	$scope.goToBusSetTap=function(busId){
		$rootScope.businessId=busId;
		$rootScope.isClickNode=true;
		setCookie('businessId',$rootScope.businessId);
	};
	//我的企业页面加载时请求我管理的企业的信息
	$http({
		method: "GET",
		url: URLInit.myManage+"?pageSize=3&pageNum=1&DT="+new Date().getTime()
	}).success(function(response) {
		$scope.myManagerBusiness = response.data.list;
		$scope.getMyBusinessError="false";
	}).error(function(response) {
		$scope.getMyBusinessError="true";
	});
	//获取更多的企业信息
	var moreManagerBusPage= 1,moreManagerLoading="false";
	//promptInfo值控制是继续加载还是已显示完毕
	$scope.moreManager=[];
	function showFirstTime(){
		$scope.managerListLoading=true;
		if(moreManagerLoading=="false"){
			//如果请求未结束，继续点击则不再请求
			moreManagerLoading="true";
			$http.get(URLInit.myManage+"?pageSize=6&pageNum="+ moreManagerBusPage)
				.success(function(response) {
					$scope.managerListLoading=false;
					if(response.flag=='000000'){
						$scope.managerListError=false;
						var resArray=response.data.list;
						if(resArray.length==0){
							//企业列表为空
							$scope.managerListNull=true;
							$scope.promptInfo1="false";
						}else{
							$scope.managerListNull=false;
							for(var i=0;i<resArray.length;i++){
								//每次都把新请求到的数据加入到变量中
								$scope.moreManager.push(resArray[i]);
							}
							if(moreManagerBusPage==response.data.pages + 1){
								moreManagerLoading="true";
								$scope.promptInfo1="false";
							}else{
								$scope.promptInfo1="true";
								moreManagerLoading="false";
							}
						}
					}else{
						//查询失败
						$scope.managerListError=true;
						$scope.managerListErrorMes="加载失败，错误信息："+response.desc;
					}
				}).error(function(response) {
					$scope.managerListLoading=false;
					$scope.managerListError=true;
					$scope.managerListErrorMes="请求企业列表失败！";
			});
			moreManagerBusPage++;
		}
	}
	showFirstTime();
	$scope.getMoreManagerBus=function (){
		$scope.openMoreJoinedBusList="false";
		showFirstTime();
	};
});
app.controller('addBusinessCtrl',['$scope', '$http', '$filter', '$window',"$rootScope", "FileUploader",'$state' ,function($scope,$http,$filter,$window,$rootScope, FileUploader,$state){
	//最初显示的下一步按钮为不可提交按钮
	$scope.clicked = 'false';
	//获取设置按钮所点击的企业信息
	$scope.business ={};
	//用于保存新建企业的表单数据
	$scope.addformData={};
	//设置是否用友伙伴的默认值为是
	$scope.addformData.partner="0";
	//用于重置新建企业的表单数据
	$scope.reset=function(){
		$scope.addformData={};
	};
	//用于获取企业类型供新建企业时选择
	$http({
		method: "GET",
		url: URLInit.getIndustrylist
	}).success(function(response) {
		$scope.professions = response.data;
		$scope.getMyBusTypeError="false";
	}).error(function(response) {
		$scope.getMyBusTypeError="true";
	});
	//新建企业选填确认
	$scope.processAddForm = function() {
		//console.log($scope.addformData);
		//获取字段校验
		var type=$scope.addformData.type,
			name=$scope.addformData.name,
			Province=$scope.addformData.Province,
			City=$scope.addformData.City,
			County=$scope.addformData.County,
			address=$scope.addformData.address,
			partner=$scope.addformData.partner,
			scale=$scope.addformData.scale,
			phone=$scope.addformData.phone,
			profession=$scope.addformData.profession,
			linkman=$scope.addformData.linkman;
		//判断并设置是否已填状态的方法
		function testUndefined(key,status){
			if(/type/.test(key)){
				$scope.typeIsUndefined=status;
			}else if(/name/.test(key)){
				$scope.nameIsUndefined=status;
			}else if(/Province/.test(key)){
				$scope.ProvinceIsUndefined=status;
			}else if(/City/.test(key)){
				$scope.CityIsUndefined=status;
			}else if(/County/.test(key)){
				$scope.CountyIsUndefined=status;
			}else if(/address/.test(key)){
				$scope.addressIsUndefined=status;
			}else if(/partner/.test(key)){
				$scope.partnerIsUndefined=status;
			}else if(/scale/.test(key)){
				$scope.scaleIsUndefined=status;
			}else if(/phone/.test(key)){
				$scope.phoneIsUndefined=status;
			}else if(/profession/.test(key)){
				$scope.professionIsUndefined=status;
			}else if(/linkman/.test(key)){
				$scope.linkmanIsUndefined=status;
			}
		}
		//用于校验的对象
		var checkObj=[{"type":type}, {"name":name},
			{"Province":Province}, {"City":City},
			{"County":County},{"address":address},
			{"partner":partner}, {"scale":scale},
			{"phone":phone}, {"profession":profession},
			{"linkman":linkman}];
		//遍历必填字段并设置状态
		checkObj.forEach(function(list){
			for(key in list){
				if(list[key]==undefined||list[key]==""){
					//未填项状态为true显示提示信息
					testUndefined(key,true);
				}else{
					testUndefined(key,false);
				}
			}
		});
		//如果只有第一级区域,其他两级可不选
		if($scope.citiesIsNull==true){
			$scope.CityIsUndefined=false;
			$scope.CountyIsUndefined=false;
		}
		//检查必填字段是否全部填写
		if((type!=undefined)
			&&(name!=undefined)&&(Province!=undefined)
			&&(address!=undefined)&&(linkman!=undefined)
			&&(partner!=undefined)&&(scale!=undefined)
			&&(phone!=undefined)&&(profession!=undefined)){
			//在省级信息已选的情况下设置region的值
			if(City==undefined||County==undefined){
				//省级已选的情况下，如果没有下一级地区则可提交
				if($scope.citiesIsNull==true){
					$scope.addformData.region=Province+","+City+","+County;
					sendAddFormData();
				}
			}else if(City!=undefined&&County!=undefined){
				$scope.addformData.region=Province+","+City+","+County;
				sendAddFormData();
			}
		}
	};
	$scope.FormBoxClose=function(){
		$scope.formSendFail=false;
	};
	//新建企业表单提交请求
	function sendAddFormData(){
		$scope.formSendFail =false;
		$scope.clicked = 'true';
		$http({
			method: 'POST',
			url: URLInit.createCompany,
			data: $scope.addformData,
			headers : { 'Content-Type': 'application/json' }
		}).success(function(data) {
			$scope.clicked = 'false';
			if (data.flag==="000000") {
				if ($rootScope.stepNumber){
					if ($rootScope.stepNumber=='产品管理'){
						delCookie('companyId');
						setCookie('companyId',data.data);
						$state.go('admin.productAdmin')
					}else if($rootScope.stepNumber == '企业管理'){
						$state.go('myBusiness');
					}else if($rootScope.stepNumber == '企业认证'){
						delCookie('businessId');
						setCookie('businessId',data.data);
						$state.go('businessAdmin.auth');
						$rootScope.isClickNode=false;
					}else if($rootScope.stepNumber == '用户管理'){
						delCookie('companyId');
						setCookie('companyId',data.data);
						$state.go('admin.productAdmin')
					}
					$rootScope.stepNumber = '';
				}else{
					$scope.formSendFail =false;
					$scope.pid = data.data;
					window.location.hash="#/addBusiness/addBusiness/step2";
					$scope.isFounded ="true";
				}

			} else{
				$scope.formSendFail =true;
				$scope.formSendFailInfo =data.desc;
				$scope.isFounded ="false";
			}
		}).error(function(response) {
			$scope.clicked = 'false';
			$scope.formSendFail =true;
			$scope.formSendFailInfo ="请求发送失败";
		});
	}
	$rootScope.goToProductTap=function(busId){
		$rootScope.businessId=busId;
		setCookie('companyId',$rootScope.businessId);
	};
	$scope.goToBusSetTap=function(busId){
		$rootScope.businessId=busId;
		$rootScope.isClickNode=true;
		setCookie('businessId',$rootScope.businessId);
	};
	//点击图片选择的时候打开裁切区
	$scope.openImageCutArea=function(){
		$scope.openImage='true';
		$scope.LogUpSuccess="";
		$scope.LogoImgError=false;
		$scope.LogoUpIsReady=false;
		$scope.addformData.logoUrl=null;
	};
	$scope.closeImageCutArea=function(){
		$scope.openImage='false';
	};
	//企业LOGO上传
	var busLogUploader = $scope.busLogUploader = new FileUploader({
		url : URLInit.upload,
		queueLimit: 1,     			//文件个数
		removeAfterUpload: true,   	//上传后删除文件
		formData :[]                //用于存放随传裁切数据
	});
	//重新选择文件时，清空队列，达到覆盖文件的效果
	$scope.clearItems = function(){
		$scope.openImage='true';
		$scope.LogUpSuccess="";
		$scope.LogoImgError=false;
		$scope.LogoUpIsReady=false;
		$scope.addformData.logoUrl=null;
		busLogUploader.clearQueue();//LOGO列表清空
		$scope.nullMessage="false";
	};
	//添加文件之后，把文件信息赋给scope
	busLogUploader.onAfterAddingFile = function(fileItem) {
		$scope.fileItemA = fileItem._file;
		$scope.LogUpSuccess="";
		$scope.LogoImgError=false;
		var nowFileSize=Math.floor(busLogUploader.queue[0].file.size/1024);
		var nowFileType=busLogUploader.queue[0].file.type;
		//console.log(nowFileSize);
		//console.log(nowFileType);
		if(nowFileSize>5120){
			$scope.LogoImgError=true;
			$scope.LogoImgErrorInfo="上传图片大小限制为5MB，所选图片大于5MB！";
		}else{
			if(nowFileType=='image/jpeg'||nowFileType=='image/png'||
				nowFileType=='image/gif'||nowFileType=='like/jpg'||
				nowFileType=='like/png'||nowFileType=='like/gif'||
				nowFileType=='like/jpeg'){
				$scope.LogoUpIsReady=true;
				busLogUploader.queue[0].upload();
			}else{
				$scope.LogoUpIsReady=false;
				$scope.LogoImgError=true;
				$scope.LogoImgErrorInfo="格式错误,请选择(jpg/png/jpeg/gif)图片格式！";
			}
		}
	};
	//上传成功处理函数
	busLogUploader.onSuccessItem = function(fileItem, response, status, headers) {
		//把返回的url赋给表单
		$scope.LogoUpIsReady=false;
		if(response.flag=="000000"){
			$scope.addformData.logoUrl=response.data.fileUrl;
			//console.log($scope.addformData.logoUrl);
			$scope.LogUpSuccess="true";
		}else{
			$scope.errorMessage=response.desc;
			$scope.LogUpSuccess="false";
		}
	};
	//上传失败处理函数
	busLogUploader.onErrorItem = function(fileItem, response, status, headers) {
		$scope.LogUpSuccess="false";
		$scope.LogoUpIsReady=false;
		$scope.errorMessage="上传失败！";
	};
	//获取第一级(省级)区域信息用于显示
	$http({
		method: "GET",
		url: URLInit.getRegionlist+"?pid=0"
	}).success(function(response) {
		//console.log(response.data);
		$scope.Provinces = response.data;
		$scope.getProvinceError="false";
	}).error(function(response){
		//getProvinceError值为true时显示错误信息
		$scope.getProvinceError="true";
	});
	//选择地区时触发处理函数
	$scope.getDetailCityName=function(){
		$scope.showCity="false";
		$scope.showCounty="false";
		$scope.addformData.City=undefined;
		$scope.addformData.County=undefined;
		var province= $scope.addformData.Province;
		if(province != undefined ){
			$http({
				method: "GET",
				url: URLInit.getRegionlist+"?pid="+province+"&DT="+new Date().getTime()
			}).success(function(response) {
				if(response.data.length==0){
					//没有市级信息了
					$scope.showCity="false";
					$scope.citiesIsNull = true;
				}else{
					//选择了省级后，出现对应的市级
					$scope.showCity="true";
					$scope.citiesIsNull = false;
					$scope.Cities = response.data;
				}
			})
		}else{
			$scope.showCity="false";
			$scope.showCounty="false";
		}
	};
	$scope.getDetailCountyName=function(){
		$scope.showCounty="false";
		$scope.addformData.County=undefined;
		var city= $scope.addformData.City;
		if(city != undefined ){
			$scope.showCounty="true";
			//选择了市级后，出现对应的县区
			$http({
				method: "GET",
				url: URLInit.getRegionlist+"?pid="+city+"&DT="+new Date().getTime()
			}).success(function(response) {
				if (response.flag==="000000") {
					$scope.Counties = response.data;
				} else {
					console.log("请求失败");
				}
			}).error(function(response, status) {
				$scope.status = status;
			});
		}else{
			$scope.showCounty="false";
		}
	};
}]);
app.controller('businessAdminCtrl',function($timeout,$scope,$http,$location,$rootScope,FileUploader){
	/*
	* isClickNode控制两个tab页签的样式,当前控制器加载的时候确认
	* true的时候选中修改资料页签，false的时候选中企业认证页签
	* */
	$rootScope.isClickNode=($rootScope.isClickNode==undefined||$rootScope.isClickNode==true);
	//用于存储字段
	$rootScope.detailBusInfo={};
	//用于存储字段
	$rootScope.baseFormData={};
	//获取企业信息失败，点击弹出框中重试按钮
	$scope.tryAgain=function(){
		$rootScope.detailBusInfo=[];
		$rootScope.baseFormData=[];
		getCompanyInfo(getCookie('businessId'));
	};
	//根据企业id获取企业信息
	function getCompanyInfo(busId){
		$http({
			method: "GET",
			url: URLInit.getCompanyInfo+busId+"&DT="+new Date().getTime()
		}).success(function(response) {
			if (response.flag==="000000") {
				$scope.getCompanyInfoError=false;
				$rootScope.detailBusInfo=response.data;
				// console.log($rootScope.detailBusInfo);
				$rootScope.companyId = $rootScope.detailBusInfo.id;
				//getCompanyInfo应该在获取了行业类别后触发
				for(var i=0;i<$rootScope.professions.length;i++){
					//提取行业id对应的text用于信息显示
					if($rootScope.professions[i].id==$rootScope.detailBusInfo.profession){
						$rootScope.detailBusInfo.showProfession=$rootScope.professions[i].text;
					}
				}
				$rootScope.detailBusInfo.virtual=='1'?$rootScope.detailBusInfo.showVirtual="是":$rootScope.detailBusInfo.showVirtual="否";
				$rootScope.detailBusInfo.partner=='1'?$rootScope.detailBusInfo.showPartner="是":$rootScope.detailBusInfo.showPartner="否";
				$scope.showButton=!($rootScope.detailBusInfo.identity==1||$rootScope.detailBusInfo.identity==2||$rootScope.detailBusInfo.identity==4);
				//设置认证状态
				switch ($rootScope.detailBusInfo.identity)
				{
					case 0:
						$rootScope.detailBusInfo.showIdentity="未认证";
						break;
					case 1:
						$rootScope.detailBusInfo.showIdentity="审核中";
						break;
					case 2:
						$rootScope.detailBusInfo.showIdentity="已认证";
						break;
					case 3:
						$rootScope.detailBusInfo.showIdentity="审核不通过";
						break;
					case 4:
						$rootScope.detailBusInfo.showIdentity="已认证";
						break;
					default :
						$rootScope.detailBusInfo.showIdentity="状态获取失败";
				}
				$rootScope.baseFormData=response.data;
				var ProvinceCode,CityCode,CountyCode;
				if($rootScope.baseFormData.region!=null){
					//处理区域选择,分离区域字段
					var region=$rootScope.baseFormData.region;
					var regionArray = region.split(",");
					ProvinceCode=regionArray[0];
					CityCode=regionArray[1];
					CountyCode=regionArray[2];
					if(CityCode=="undefined"){
						CityCode=undefined;
					}
					if(CountyCode=="undefined"){
						CountyCode=undefined;
					}
				}
				function chooseProvince(){
					//获取第一级(省级)区域信息用于显示
					$http({
						method: "GET",
						url: URLInit.getRegionlist+"?pid=0"
					}).success(function(response) {
						$scope.Provinces = response.data;
						for(var i=0;i<$scope.Provinces.length;i++){
							if($scope.Provinces[i].id==ProvinceCode){
								$rootScope.baseFormData.Province=$scope.Provinces[i].id;
								chooseCity();
							}
						}
					}).error(function(response, status) {
						console.log("请求区域信息出错！错误码：" + status);
					});
				}
				function chooseCity(){
					//选择对应的市级
					$http({
						method: "GET",
						url: URLInit.getRegionlist+"?pid="+$rootScope.baseFormData.Province
					}).success(function(response) {
						if(response.data.length==0){
							//没有市级信息了
							$scope.citiesIsNull = true;
						}else{
							//选择了省级后，出现对应的市级
							$scope.citiesIsNull = false;
							$scope.Cities = response.data;
							for(var i=0;i<$scope.Cities.length;i++){
								if($scope.Cities[i].id==CityCode){
									//console.log($scope.Cities[i].name);
									$rootScope.baseFormData.City=$scope.Cities[i].id;
									chooseCounty();
								}
							}
						}
					}).error(function(response, status) {
						console.log("请求出错！错误码：" + status);
					});
				}
				function chooseCounty(){
					//选择对应的县级
					$http({
						method: "GET",
						url: URLInit.getRegionlist+"?pid="+$rootScope.baseFormData.City
					}).success(function(response) {
						if (response.flag==="000000") {
							$scope.Counties = response.data;
							for(var i=0;i<$scope.Counties.length;i++){
								if($scope.Counties[i].id==CountyCode){
									$rootScope.baseFormData.County=$scope.Counties[i].id;
								}
							}
						} else {
							console.log("请求出错！错误信息：" + response.dec);
						}
					}).error(function(response, status) {
						console.log("请求出错！错误码：" + status);
					});
				}
				//选择地区时触发处理函数
				$scope.getDetailCityName=function(){
					$scope.showCity="false";
					$scope.showCounty="false";
					$scope.baseFormData.City=undefined;
					$scope.baseFormData.County=undefined;
					$scope.Cities=[];
					$scope.Counties=[];
					var province= $scope.baseFormData.Province;
					if(province != undefined ){
						$scope.showCity="true";
						//选择了省级后，出现对应的市级
						chooseCity();
					}else{
						$scope.showCity="false";
						$scope.showCounty="false";
					}
				};
				$scope.getDetailCountyName=function(){
					$scope.showCounty="false";
					$scope.baseFormData.County=undefined;
					$scope.Counties=[];
					var city= $scope.baseFormData.City;
					if(city != undefined ){
						$scope.showCounty="true";
						//选择了市级后，出现对应的县区
						chooseCounty();
					}else{
						$scope.showCounty="false";
					}
				};
				chooseProvince();
			}else {
				$scope.getCompanyInfoError=true;
			}
		}).error(function(response) {
			$scope.getCompanyInfoError=true;
		});
	}
	function getAllMessage(){
		//获取企业类型
		$http({
			method: "GET",
			url: URLInit.getIndustrylist
		}).success(function(response) {
			if(response.flag==="000000"){
				//console.log(response);
				$rootScope.professions = response.data;
				$scope.getMyBusTypeError="false";
				//获取企业信息接口
				window.companyId=$rootScope.businessId=getCookie('businessId');
				//获取具体企业的信息,传入企业ID
				getCompanyInfo($rootScope.businessId);

			}else{
				$scope.getMyBusTypeError="true";
			}
		}).error(function() {
			$scope.getMyBusTypeError="true";
		});
	}
	getAllMessage();
	//保存认证资料用于提交
	$scope.identifyInfo={};
	//企业认证资料提交窗口关闭
	$scope.identityFormBox="CLOSE";
	$scope.showIdentityFormBox=function(){
		$scope.identityFormBox="OPEN";
	};
	//修改企业Logo
	var logoUpdateUploader = $scope.logoUpdateUploader = new FileUploader({
		url : URLInit.upload,
		queueLimit: 1,             //文件个数
		removeAfterUpload: true   //上传后删除文件
	});
	//认证证件照上传
	var busLicenceUploader = $scope.busLicenceUploader = new FileUploader({
		url : URLInit.upload,
		queueLimit: 1,
		removeAfterUpload: true
	});
	//重新选择文件时，清空队列，达到覆盖文件的效果
	$scope.clearItems = function(){
		$scope.LogoImgError=false;
		logoUpdateUploader.clearQueue();
	};
	$scope.clearItems2 = function(){
		$scope.busLicenceImgError=false;
		$scope.busLicenUpSuccess=false;
		$rootScope.detailBusInfo.busLicenceUrl=null;
		busLicenceUploader.clearQueue();//证件照列表清空
	};
	//添加文件之后，把文件信息赋给scope
	logoUpdateUploader.onAfterAddingFile = function(fileItem) {
		$scope.fileItem = fileItem._file;
		var nowFileSize=Math.floor(logoUpdateUploader.queue[0].file.size/1024);
		var nowFileType=logoUpdateUploader.queue[0].file.type;
		//console.log(nowFileSize);
		//console.log(nowFileType);
		if(nowFileSize>5120){
			$scope.LogoImgError=true;
			$scope.LogoImgErrorInfo="图片大小限制为5MB，所选图片大于5MB！";
		}else{
			$scope.LogoImgError=false;
			if(nowFileType=='image/jpeg'||nowFileType=='image/png'||
				nowFileType=='image/gif'||nowFileType=='like/jpg'||
				nowFileType=='like/png'||nowFileType=='like/gif'||
				nowFileType=='like/jpeg'){
				$scope.LogoUpIsReady=true;
				logoUpdateUploader.queue[0].upload();
			}else{
				$scope.LogoUpIsReady=false;
				$scope.LogoImgError=true;
				$scope.LogoImgErrorInfo="格式错误,请选择(jpg/png/jpeg/gif)图片格式！";
			}
		}
	};
	busLicenceUploader.onAfterAddingFile = function(fileItem) {
		$scope.fileItemB = fileItem._file;
		var nowFileSize=Math.floor(busLicenceUploader.queue[0].file.size/1024);
		var nowFileType=busLicenceUploader.queue[0].file.type;
		//console.log(nowFileSize);
		//console.log(nowFileType);
		if(nowFileSize>5120){
			$scope.busLicenceImgError=true;
			$scope.busLicenceImgErrorInfo="图片大小限制为5MB，所选图片大于5MB！";
		}else{
			$scope.busLicenceImgError=false;
			if(nowFileType=='image/jpeg'||nowFileType=='image/png'||
				nowFileType=='image/gif'||nowFileType=='like/jpg'||
				nowFileType=='like/png'||nowFileType=='like/gif'||
				nowFileType=='like/jpeg'){
				$scope.busLicenceUpIsReady=true;
				busLicenceUploader.queue[0].upload();
			}else{
				$scope.busLicenceUpIsReady=false;
				$scope.busLicenceImgError=true;
				$scope.busLicenceImgErrorInfo="格式错误,请选择(jpg/png/jpeg/gif)图片格式！";
			}
		}
	};
	//上传成功处理
	logoUpdateUploader.onSuccessItem = function(fileItem, response) {
		$scope.LogoUpIsReady=false;
		if (response.flag == '000000'){
			$scope.LogoImgError=false;
			$rootScope.baseFormData.logoUrl=response.data.fileUrl;
			updateBusinessInfo($rootScope.baseFormData);
		}else {
			$scope.LogoImgError=true;
			$scope.LogoImgErrorInfo=response.desc;
		}
	};
	busLicenceUploader.onSuccessItem = function(fileItem, response) {
		$scope.busLicenceUrlError="false";
		$scope.busLicenceUpIsReady=false;
		if(response.flag=="000000"){
			$scope.busLicenceImgError=false;
			$rootScope.detailBusInfo.busLicenceUrl=response.data.fileUrl;
			$scope.busLicenUpSuccess=true;
		}else{
			$scope.busLicenceImgError=true;
			$scope.busLicenceImgErrorInfo=response.desc;
			$scope.busLicenUpSuccess=false;
		}
	};
	//上传失败
	logoUpdateUploader.onErrorItem = function(fileItem, response, status, headers) {
		$scope.LogoImgError=true;
		$scope.LogoUpIsReady=false;
		$scope.LogoImgErrorInfo="上传失败";
	};
	busLicenceUploader.onErrorItem = function(fileItem, response, status, headers) {
		$scope.busLicenceUpIsReady=false;
		$scope.busLicenUpSuccess=false;
		$scope.busLicenceImgError=true;
		$scope.busLicenceImgErrorInfo="上传失败";
		$rootScope.detailBusInfo.busLicenceUrl=null;
	};
	$scope.FormBoxClose=function(){
		$scope.updateFormSendFail=false;
	};
	//企业信息更新表单提交
	function updateBusinessInfo(data){
		$scope.updateFormSendFail =false;
		$http({
			method: 'POST',
			url: URLInit.updateCompany,
			data: data,
			headers : { 'Content-Type': 'application/json' }
		}).success(function(response) {
			if (response.flag==="000000") {
				$scope.updateFormSendFail =false;
				$scope.baseFormDataSend="true";
				//更新信息
				getAllMessage();
			} else{
				$scope.updateFormSendFail =true;
				$scope.updateFormSendFailInfo =response.desc;
			}
		}).error(function(response) {
			$scope.updateFormSendFail =true;
			$scope.updateFormSendFailInfo ="信息提交失败";
		});
	}
	//企业信息维护验证
	$scope.updateBusinessInfo=function(){
		var type=$rootScope.baseFormData.type,
			name=$rootScope.baseFormData.name,
			Province=$rootScope.baseFormData.Province,
			City=$rootScope.baseFormData.City,
			County=$rootScope.baseFormData.County,
			address=$rootScope.baseFormData.address,
			partner=$rootScope.baseFormData.partner,
			scale=$rootScope.baseFormData.scale,
			phone=$rootScope.baseFormData.phone,
			profession=$rootScope.baseFormData.profession,
			linkman=$rootScope.baseFormData.linkman;
		if((type!=undefined)
			&&(name!=undefined)&&(Province!=undefined)
			&&(address!=undefined)&&(linkman!=undefined)
			&&(partner!=undefined)&&(scale!=undefined)
			&&(phone!=undefined)&&(profession!=undefined)){
			//在省级信息已选的情况下设置region的值
			if(City==undefined||County==undefined){
				if($scope.citiesIsNull==true){
					$scope.updateFormSendFail =false;
					$rootScope.baseFormData.region=Province+","+City+","+County;
					updateBusinessInfo($rootScope.baseFormData);
				}else{
					//地址未填好
					$scope.updateFormSendFail =true;
					$scope.updateFormSendFailInfo ="请完善企业地址信息";
				}
			}else if(City!=undefined&&County!=undefined){
				$scope.updateFormSendFail =false;
				$rootScope.baseFormData.region=Province+","+City+","+County;
				updateBusinessInfo($rootScope.baseFormData);
			}else{
				//地址未填好
				$scope.updateFormSendFail =true;
				$scope.updateFormSendFailInfo ="请完善企业地址信息";
			}

		}else{
			//未填完
			$scope.updateFormSendFail =true;
			$scope.updateFormSendFailInfo ="请完善相关必填信息";
		}

	};
	//企业信息修改成功后关闭弹出框
	$scope.baseFormDataSendBoxClose=function(){
		$scope.baseFormDataSend="false";
	};
	//认证信息提交
	$scope.updateBusLicenceInfo=function(){
		$scope.identifyInfo.id=$rootScope.businessId;
		$scope.identifyInfo.legalPerson=$rootScope.detailBusInfo.legalPerson;
		$scope.identifyInfo.busLicence=$rootScope.detailBusInfo.busLicence;
		$scope.identifyInfo.busLicenceUrl=$rootScope.detailBusInfo.busLicenceUrl;
		/*console.log($scope.identifyInfo);
		console.log($scope.identifyInfo.legalPerson);
		console.log($scope.identifyInfo.busLicence);
		console.log($scope.identifyInfo.busLicenceUrl);*/
		if(($scope.identifyInfo.busLicenceUrl)==undefined){
			$scope.busLicenceUrlError="true";
		}else{
			$scope.busLicenceUrlError="false";
			$http({
				method: 'POST',
				url: URLInit.identifyInformationSubmit,
				data: $scope.identifyInfo,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(response) {
				//console.log(response);
				if (response.flag==="000000") {
					$scope.showSendMessage=true;
					getCompanyInfo($rootScope.businessId,$http,$rootScope,$scope);
				} else{
					$scope.showSendMessage=false;
					$scope.showSendErrorMessage=response.desc;
				}
			}).error(function(response) {
				$scope.showSendErrorMessage="网络错误";
			});
		}
	};
});
app.controller('adminCtrl',['DTOptionsBuilder','DTColumnDefBuilder', 'DTColumnBuilder', '$rootScope', '$scope', '$http', '$q','$compile','FileUploader','$state',function(DTOptionsBuilder,DTColumnDefBuilder, DTColumnBuilder, $rootScope, $scope, $http, $q,$compile,FileUploader,$state){
	$rootScope.businessId = getCookie('companyId');
	$rootScope.productlineCode = getCookie("productlineCode");
	$rootScope.handelUserNotice = '';
	$scope.clicked = 'false';
	$scope.canLoadTable = 'false';
	$http({
		method: "GET",
		url: URLInit.getCompanyInfo+$rootScope.businessId+"&DT="+new Date().getTime()
	}).success(function(response) {
		if (response.flag==="000000") {
			$rootScope.detailBusInfoName=response.data;
		}
	});
	var vm = this;
	//初始化关联老产品的传参
	$scope.linkOldFormData = {};
	$scope.netError = '';
	//关联老用户接口
	$scope.handleLinkOld = function () {
		$scope.clicked = 'true';
		$scope.linkOldFormData.companyId = $rootScope.businessId;
		$scope.linkOldFormData.productlineId = getCookie('productlineId');
		$http({
			method: "POST",
			url: URLInit.relatedPro,
			data: $scope.linkOldFormData,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			$scope.clicked = 'false';
			if (data.flag=='000000'){
				$scope.response = 'true';
				$scope.responseMsg = "关联成功！";
				$scope.linkOldFormData = {};
				$scope.emptyProduct = 'false';
				reloadData();
			} else {
				$scope.response = 'true';
				$scope.responseMsg = data.desc;
				$scope.linkOldFormData = {};
			}
		}).error(function (data) {
			$scope.clicked = 'false';
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
			$scope.linkOldFormData = {};
		});
	};
	$scope.emptyProduct = 'false';
	//产品列表
	vm.ProListMessage = '';
	vm.someClickHandler = someClickHandler;
	function someClickHandler(info) {
		vm.message = info.id + ' - ' + info.companyName;
	}
	vm.productOptions = DTOptionsBuilder
		.fromFnPromise(function() {
			var defer = $q.defer();
			$http({
				method: "GET",
				url: URLInit.companyProList+$rootScope.businessId+"&DT="+new Date().getTime()
			}).success(function (data) {
				if (data.flag=='000000'){
					if(data.data.list.length == 0){
						$scope.emptyProduct = 'true';
					}else{
						$rootScope.productId = data.data.list[0].id;
						$scope.productName = data.data.list[0].productlineCode;
					}
					defer.resolve(data.data.list);
				}
			}).error(function (data) {
				$scope.netError = 'true';
				$scope.errorMsg = "发送请求失败，请重试！";
			});
			return defer.promise;
		})
		.withDataProp('data.list')
		.withOption('processing', true)
		.withOption('stateSave', true)
		.withPaginationType('simple_numbers');

	vm.productColumnDefs = [
		DTColumnDefBuilder.newColumnDef(2).renderWith(function (data, type, full) {
			var html =
				'<span>试用</span>';
			if(full.status =='1'){
				return html;
			} else if(full.status == '0') {
				return '<span>正式</span>';
			} else if(full.status == '3') {
				return '<span>借用</span>';
			} else if(full.status == null) {
				return '<span></span>';
			}
		}),
		DTColumnDefBuilder.newColumnDef(3).renderWith(function (data, type, full) {
			if (full.remark == null){
				full.remark = ''
			}
			/*-hidden show-*/
			var html =
				'<i class="fa-pencil-font"' +
				'id="pencilFont" ' +
				' ng-show="true" ' + '>' +
				full.remark +
				'</i>'+
				'<input type="text" ' +
				'id='+full.id+
				' name="phoneNum" ' +
				'ng-show="false" ' +
				'placeholder="请输入备注" ' +
				'maxlength="20" ' +
				'class="form-control ng-hide" style="width: 150px;text-align: center"> ' +
				'<i class="fa fa-pencil fa-pencil-box pull-right" ' +
				'ng-show="true" ' +
				'ng-click="showRemark('+"'"+full.remark+"'"+')"' +
				'id="pencil">' +
				'</i>' +
				'<i class="fa fa-save fa-pencil-box pull-right ng-hide" ' +
				'ng-show="false" ' +
				'ng-click="saveRemark('+"'"+full.id+"'"+')"' +
				'id="pencilSave"></i>';
			return html
		}),
		DTColumnDefBuilder.newColumnDef(4).renderWith(function (data, type, full) {
			var downStatus,className;
			if(full.downloadFlag==1){
				downStatus=true;
				className="need-down";
			}else{
				downStatus=false;
				className="need-down ng-hide";
			}
			var html = '<div class="dropdown">'+
				'<button type="button" class="btn btn-primary margin-right-10 btn-sm" ng-click="handleProductId('+"'"+full.id+"'"+",'"+full.productlineCode+"'"+')" ui-sref="admin.userAdmin">数据源管理</button>'+
				'<button class="btn btn-primary btn-sm dropdown-toggle down" type="button" data-toggle="dropdown">'+
				'下载'+
				'<div ng-show="'+downStatus+'" ' +
				'id="redPointA" ' +
				'class="'+className+'"></div>'+
				'<span class="caret margin-left-10"></span>'+
				'</button>'+
				'<ul class="dropdown-menu">'+
				'<li ng-if="'+full.lisenceFlag+'== 0">' +
				'<a ng-href="/onecloud-manager/instanceuser/download/configzip?productId='+full.id+'" >' +
				'下载产品许可文件</a>' +
				'</li>'+
				'<li class="down">' +
				'<a ng-click="handleNoticeOpen('+"'"+full.id+"'"+",'"+full.productlineCode+"'"+')">下载企业认证文件</a>' +
				'<div ng-show="'+downStatus+'"' +
				'id="redPointB" ' +
				'class="'+className+'"></div>'+
				'</li>'+
				'</ul>'+
				'</div>';
			return html;
		})
	];
	vm.productColumns = [
		DTColumnBuilder.newColumn('productName').withTitle('产品名称').notSortable(),
		DTColumnBuilder.newColumn('productCode').withTitle('产品卡号').notSortable(),
		DTColumnBuilder.newColumn('status').withTitle('产品状态').notSortable(),
		DTColumnBuilder.newColumn('remark').withTitle('备注').notSortable().withClass('min-160'),
		DTColumnBuilder.newColumn('productId').withTitle('操作').notSortable().withOption('sWidth', '30.37%').withClass('min-160')
	];
	$rootScope.handleNoticeOpen = function(id,code){
		$rootScope.handelUserNotice = 'open';
		$rootScope.productId = id;
		delCookie('productlineCode');
		setCookie('productlineCode',code);
		$rootScope.productlineCode = getCookie("productlineCode");
	};
	$scope.checkDownFile = function(productId){
		$http({
			method: "GET",
			url: '/onecloud-manager/instanceuser/check/datasource?productId='+productId
		}).success(function (data) {
			if (data.flag=='000000'){
				var link = document.getElementById('downFile');
				link.href ='/onecloud-manager/instanceuser/download/config?productId='+productId;
				link.click();
				$rootScope.closeDownLoadNotice();
			}else{
				$scope.netError = 'true';
				$scope.errorMsg = data.desc;
			}
		}).error(function (data) {
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		});
	};
	//获取产品id
	//重新加载
	vm.dtInstance = {};
	$scope.sendData = {};
	$scope.canLoadTable = 'false';
	vm.reloadData = reloadData;
	function reloadData () {
		vm.dtInstance.reloadData();
	}
	$scope.saveRemark = function (id) {
		$scope.sendData.id = id;
	};
	$scope.showRemark = function (remark) {
		$scope.showRemarkDate= remark;
	};
	$rootScope.closeDownLoad = function(){
		$rootScope.handelUserNotice = '';
	};
	vm.productOptions.withOption('fnRowCallback',
		function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			$compile(nRow)($scope);
			$('td', nRow).unbind('click');
			$('td', nRow).bind('click', function(e) {
				//编辑备注
				if($(e.target).attr("id")=="pencil"){
					//console.log();
					var currentInput=$(e.target).siblings("i#pencilFont").html();
					$(e.target).siblings("input").val(currentInput);
					$(e.target).siblings("input").bind('click', function(e){
						$(this).val("");
					});
					//先把铅笔图标和内容隐藏
					$(e.target).attr("ng-show",false);
					$(e.target).attr("class","fa fa-pencil fa-pencil-box pull-right ng-hide");
					$(e.target).siblings("i#pencilFont").attr("ng-show",false);
					$(e.target).siblings("i#pencilFont").attr("class","fa-pencil-font ng-hide");
					//再把保存图标和输入框显示
					$(e.target).siblings("i#pencilSave").attr("ng-show",true);
					$(e.target).siblings("i#pencilSave").attr("class","fa fa-save pull-right fa-pencil-box");
					$(e.target).siblings("input").attr("ng-show",true);
					$(e.target).siblings("input").attr("class","form-control");
				}
				//保存备注
				if($(e.target).attr("id")=="pencilSave"){
					var remark=$(e.target).siblings("input").val();
					$scope.sendData.remark=remark;
					$http({
						method: "POST",
						url: URLInit.updateRemark,
						data: $scope.sendData,
						headers: {'Content-Type': 'application/json'}
					}).success(function (data) {
						if(data.flag = '000000'){
							//console.log(data);
							$(e.target).siblings("i#pencilFont").html(remark);
						}else {
							$scope.netError = 'true';
							$scope.errorMsg = data.desc;
						}
					}).error(function (data) {
						$scope.netError = 'true';
						$scope.errorMsg = "发送请求失败，请重试！";
					});
					//把保存图标和输入框隐藏
					$(e.target).attr("ng-show",false);
					$(e.target).attr("class","fa fa-save fa-pencil-box pull-right ng-hide");
					$(e.target).siblings("input").attr("ng-show",false);
					$(e.target).siblings("input").attr("class","form-control ng-hide");
					//把铅笔图标和内容显示
					$(e.target).siblings("i#pencil").attr("ng-show",true);
					$(e.target).siblings("i#pencil").attr("class","fa fa-pencil fa-pencil-box pull-right");
					$(e.target).siblings("i#pencilFont").attr("ng-show",true);
					$(e.target).siblings("i#pencilFont").attr("class","fa-pencil-font");
				}
				//下载文件红点样式设置
				$rootScope.closeDownLoadNotice = function(){
					$rootScope.handelUserNotice = '';
					$($('td', nRow)[4]).find("div#redPointA").attr("ng-show",false);
					$($('td', nRow)[4]).find("div#redPointA").attr("class","need-down ng-hide");
					$($('td', nRow)[4]).find("div#redPointB").attr("ng-show",false);
					$($('td', nRow)[4]).find("div#redPointB").attr("class","need-down ng-hide");
				};
				$scope.$apply(function() {
					vm.someClickHandler(aData);
				});
			});
			return nRow;
		});

	//根据产品ID查询数据源
	function getInstanceId() {
		delCookie('id');
		delCookie('instanceId');
		$http({
			method: "POST",
			url: URLInit.ListByProductId,
			data: {"productId":getCookie("productId")},
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			$http({
				method: "GET",
				url: URLInit.companyProList+$rootScope.businessId+"&DT="+new Date().getTime()
			}).success(function (data) {
				if (data.flag=='000000'){
					if(data.data.list.length == 0){
						$scope.emptyProduct = 'true';
					}else{
						$rootScope.productId = data.data.list[0].id;
						$scope.productName = data.data.list[0].productlineCode;
						for (var i = 0;i<data.data.list.length;i++){
							var productLineId = data.data.list[i].productlineId;

							// for(var j = 0; j<$scope.productLines.length;j++){
							// 	if($scope.productLines[j].id == productLineId){
							// 		$scope.limitName = $scope.productLines[j].name;
							// 		$scope.limitNum = $scope.productLines[j].phoneLimit;
							// 	}
							// }
						}
					}
				}
			}).error(function (data) {
				$scope.netError = 'true';
				$scope.errorMsg = "发送请求失败，请重试！";
			});
			if (data.flag=='000000') {
				//用于保存查询条件(手机号、邮箱、激活状态)
				$rootScope.searchDetailInstance = {};
				$rootScope.searchDetailInstance.status='';
				$scope.requestSuccess = '';
				vm.listItems = $scope.instanceList = data.data;
				if ($scope.instanceList.length > 0) {
					$scope.requestSuccess = 'true';
					setCookie('instanceId', $scope.instanceList[0].instanceId);
					setCookie('id', $scope.instanceList[0].id);
					$rootScope.instanceName = $scope.instanceList[0].name;
					$rootScope.instanceSource = $scope.instanceList[0].source;
					$rootScope.searchInstanceId = getCookie('instanceId');
					$scope.canLoadTable = 'true';
					//console.log(getCookie('instanceId'));
					function searchIns() {
						vm.userOptions = DTOptionsBuilder.newOptions()
							.withOption('ajax', {
								// Either you specify the AjaxDataProp here
								url: URLInit.instanceuserList,
								type: 'POST',
								data: function (d) {
									d.instanceId = getCookie('instanceId');
									d.mobile = $rootScope.searchDetailInstance.mobile;
									d.email = $rootScope.searchDetailInstance.email;
									d.status = $rootScope.searchDetailInstance.status;
									d.accountCode = $rootScope.searchDetailInstance.accountCode;
									d.account = $rootScope.searchDetailInstance.account;
								},
								dataSrc: function(json) {
									if(json.flag = '000000'){
										json['recordsTotal'] = json.data.total;
										json['recordsFiltered'] = json.data.total;
										$scope.start = json.data.startRow - 1;
										$scope.currentData = [];
										if (json.data.list.length>0){
											for (var i=0;i<json.data.list.length;i++){
												$scope.currentData.push(json.data.list[i].id);
											}
										}
										return json.data.list;
									}else{
										$scope.netError = 'true';
										$scope.errorMsg = json.desc;
									}
								}
							})
							// or here
							.withDataProp('data.list')
							.withOption('processing', true)
							.withOption('serverSide', true)
							.withOption('stateSave', true)
							.withPaginationType('simple_numbers');
						if($rootScope.productlineCode == 'U8'){
							vm.userColumnDefs = [
								DTColumnDefBuilder.newColumnDef(0).renderWith(function (data, type, full) {
									return '<span class="accountCode">'+full.accountCode+'</span><span class="id hide">'+full.id+'</span><span class="instanceId hide">'+full.instanceId+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(1).renderWith(function (data, type, full) {
									return '<span class="account">'+full.account+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(2).renderWith(function (data, type, full) {
									return '<span class="mobile">'+full.mobile+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(3).renderWith(function (data, type, full) {
									if (full.email == null){
										full.email = '';
									}
									return '<span class="email">'+full.email+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(4).renderWith(function (data, type, full) {
									if(full.status==null || full.status=='0'){
										return '<span class="status">已激活</span>'
									}else if(full.status=='1'){
										return '<span class="status">未激活</span>'
									}else if(full.status=='2'){
										return '<span class="status">已注销</span>'
									}
								}),
								DTColumnDefBuilder.newColumnDef(5).renderWith(function (data, type, full) {
									if(full.status=='2'){
										//用户注销的情况下
										var html =
											'<button data-status="'+full.status+'" id="edit" class="btn btn-warning fa fa-edit btn-sm btn-padding margin-right-5" ' +
											'ng-click="app.edit()"'+
											'</button>'+
											'<button id="success" class="btn fa fa-key btn-padding btn-success btn-sm" ng-show="true" ng-click="app.startup('+"'"+full.id+"'"+','+"'"+full.mobile+"'"+','+"'"+full.productlineId+"'"+')">' +
											'</button>'+
											'<button id="danger" class="btn fa fa-trash-o btn-padding btn-danger btn-sm ng-hide" ng-show="false" ng-click="app.delete('+"'"+full.id+"'"+')">' +
											'</button>';
									}else {
										var html =
											'<button data-status="'+full.status+'" id="edit" class="btn btn-warning fa fa-edit btn-sm btn-padding margin-right-5" ' +
											'ng-click="app.edit()"'+
											'</button>'+
											'<button id="success" class="btn btn-success fa fa-key btn-padding btn-sm ng-hide" ng-show="false" ng-click="app.startup('+"'"+full.id+"'"+','+"'"+full.mobile+"'"+','+"'"+full.productlineId+"'"+')">' +
											'</button>'+
											'<button id="danger" class="btn fa fa-trash-o btn-danger btn-padding btn-sm" ng-show="true" ng-click="app.delete('+"'"+full.id+"'"+')">' +
											'</button>';
									}
									return html;
								})
							];
							vm.userColumns = [
								DTColumnBuilder.newColumn('accountCode').withTitle('编码').notSortable(),
								DTColumnBuilder.newColumn('account').withTitle('用户名').notSortable(),
								DTColumnBuilder.newColumn('mobile').withTitle('手机号').notSortable(),
								DTColumnBuilder.newColumn('email').withTitle('邮箱').notSortable(),
								DTColumnBuilder.newColumn('status').withTitle('用户激活状态').notSortable(),
								DTColumnBuilder.newColumn(null).withTitle('操作').notSortable()
							];
						}
						else if($rootScope.productlineCode == 'nc'){
							vm.userColumnDefs = [
								DTColumnDefBuilder.newColumnDef(0).renderWith(function (data, type, full) {
									return '<span class="accountCode">'+full.accountCode+'</span><span class="id hide">'+full.id+'</span><span class="instanceId hide">'+full.instanceId+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(1).renderWith(function (data, type, full) {
									return '<span class="account">'+full.account+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(2).renderWith(function (data, type, full) {
									return '<span class="mobile">'+full.mobile+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(3).renderWith(function (data, type, full) {
									if (full.email == null){
										full.email = '';
									}
									return '<span class="email">'+full.email+'</span>'
								}),
								DTColumnDefBuilder.newColumnDef(4).renderWith(function (data, type, full) {
									if(full.status==null || full.status=='0'){
										return '<span class="status">已激活</span>'
									}else if(full.status=='1'){
										return '<span class="status">未激活</span>'
									}else if(full.status=='2'){
										return '<span class="status">已注销</span>'
									}
								})
							];
							vm.userColumns = [
								DTColumnBuilder.newColumn('accountCode').withTitle('编码').notSortable(),
								DTColumnBuilder.newColumn('account').withTitle('用户名').notSortable(),
								DTColumnBuilder.newColumn('mobile').withTitle('手机号').notSortable(),
								DTColumnBuilder.newColumn('email').withTitle('邮箱').notSortable(),
								DTColumnBuilder.newColumn('status').withTitle('用户激活状态').notSortable()
							];
						}

						vm.userInstance = {};
						vm.reloadUserData = reloadUserData;
						function reloadUserData () {
							vm.userInstance.reloadData();
						}
						vm.userOptions.withOption('fnRowCallback',
							function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
								$compile(nRow)($scope);
								$('td', nRow).unbind('click');
								$('td', nRow).bind('click', function(e) {
									var status = $(e.target).siblings("button.btn-warning").attr("data-status");
									$scope.checkToDeleteUser = function () {
										$scope.clicked = 'true';
										$http({
											method:"POST",
											url: URLInit.instanceuserLogout,
											data: JSON.stringify($scope.deleteUserId),
											headers: {
												'Content-Type': 'application/json'
											}
										}).success(function(data) {
											$scope.clicked = 'false';
											//响应成功
											if(data.flag == '000000'){
												$scope.deleteUserBox = 'CLOSE';
												//先把注销图标隐藏
												$(e.target).attr("ng-show",false);
												$(e.target).attr("class","ng-hide");
												//再把启用显示
												$(e.target).siblings("button#success").attr("ng-show",true);
												$(e.target).siblings("button#success").attr("class","btn fa fa-key btn-padding btn-success btn-sm");
												$(e.target).parent().siblings().children("span.status").html('已注销');
											}
										}).error(function(data, header, config, status) {
											//处理响应失败
											$scope.clicked = 'false';
											$scope.netError = 'true';
											$scope.errorMsg = "发送请求失败，请重试！";
										});
									};
									$scope.checkToStartUser = function () {
										$scope.clicked = 'true';
										$http({
											method:"POST",
											url: URLInit.instanceuserStartup,
											data: JSON.stringify($scope.startUpUser),
											headers: {
												'Content-Type': 'application/json'
											}
										}).success(function(data) {
											$scope.clicked = 'false';
											//响应成功
											if(data.flag == '000000'){
												$scope.startUpUserBox = 'CLOSE';
												//先把启用图标隐藏
												$(e.target).attr("ng-show",false);
												$(e.target).attr("class","ng-hide");
												//再把注销显示
												$(e.target).siblings("#danger").attr("ng-show",true);
												$(e.target).siblings("#danger").attr("class","btn fa fa-trash-o btn-padding btn-danger btn-sm");
												$(e.target).parent().siblings().children("span.status").html('未激活');
											}else {
												$scope.netError = 'true';
												$scope.errorMsg = data.desc;
											}
										}).error(function(data, header, config, status) {
											$scope.clicked = 'false';
											//处理响应失败
											$scope.netError = 'true';
											$scope.errorMsg = "发送请求失败，请重试！";
										});
									};

									if ($(e.target).attr('id')=='edit'){
										var code = $(e.target).parent().siblings().children("span.accountCode");
										var account = $(e.target).parent().siblings().children("span.account");
										var mobile = $(e.target).parent().siblings().children("span.mobile");
										var email = $(e.target).parent().siblings().children("span.email");
										var id = $(e.target).parent().siblings().children("span.id");
										var instanceId = $(e.target).parent().siblings().children("span.instanceId");
										$('#code').text(code.html());
										$('#accountInput').val(account.html());
										$('#mobileInput').val(mobile.html());
										$('#emailInput').val(email.html());
										$scope.handleUpdateUser = function () {
											var newAccount = $('#accountInput').val();
											var newMobile = $('#mobileInput').val();
											var newEmail = $('#emailInput').val();
											$scope.updateUserFormData = {
												"accountCode" : $('#code').text(),
												"account" : newAccount,
												"mobile" : newMobile,
												"email" : newEmail,
												"id" : id.html(),
												"instanceId" : instanceId.html()
											};
											$scope.clicked = 'true';
											$http({
												method:"POST",
												url: URLInit.instanceuserUpdate,
												data: JSON.stringify($scope.updateUserFormData),
												headers: {
													'Content-Type': 'application/json'
												}
											}).success(function(data) {
												//响应成功
												$scope.clicked = 'false';
												if(data.flag == '000000'){
													$scope.responseError = 'success';
													account.html(newAccount);
													mobile.html(newMobile);
													email.html(newEmail);
													if (data.data.status == '0'){
														$(e.target).parent().siblings().children("span.status").html('已激活');
													} else if(data.data.status == '1'){
														$(e.target).parent().siblings().children("span.status").html('未激活');
													} else if(data.data.status == '2'){
														$(e.target).parent().siblings().children("span.status").html('已注销');
													}
												}else {
													$scope.responseError = 'true';
													$scope.errorMsg = data.desc;
												}
											}).error(function(data, header, config, status) {
												$scope.clicked = 'false';
												$scope.netError = 'true';
												$scope.errorMsg = "发送请求失败，请重试！";
											});
										};
									}
								});
								return nRow;
							});
						//具体信息查询数据源用户
						$scope.searchAndRerender=function(){
							reloadUserData();
						};
						//点击数据源tab页签时，拿到数据源id
						$scope.changeInstance = function (instance,id,name,source) {
							$rootScope.searchDetailInstance={};
							$scope.showInput = 'false';
							$rootScope.searchInstanceId = instance;
							$rootScope.instanceName = name;
							$rootScope.instanceSource = source;
							delCookie('instanceId');
							setCookie("instanceId",$rootScope.searchInstanceId);
							setCookie("id",id);
							// getInstanceId();
							reloadUserData();
						};
						//注销用户
						vm.delete = function (person) {
							$scope.deleteUserBox = 'OPEN';
							$scope.deleteUserId = {
								"id": person
							};
						};
						vm.startup = function (id,mobile,productlineId) {
							$scope.startUpUserBox = 'OPEN';
							$scope.startUpUser = {
								"id": id,
								"mobile":mobile,
								"productlineId":productlineId
							}
						};
						vm.edit = function () {
							$scope.updateUserData = 'true';
						};
						//修改用户信息
						$scope.updateUserData = 'false';
						$scope.responseError = 'false';
						$scope.errorMsg = '';
						//管理关闭弹窗
						$scope.closeImport = function () {
							$scope.failUrl = 'false';
							$scope.progress = 0;
							$scope.progressStyle = {
								'width' : $scope.progress+'%'
							};
							$scope.responseError = 'false';
							$scope.response = 'false';
							$scope.importUser = 'false';
							$scope.addSuccess = 'false';
							$scope.addFile = '';
							$scope.addFiles = '';
							$scope.createUser = 'false';
							reloadUserData();
							//getInstanceId();
						};
						function createdRow(row, data, dataIndex) {
							// Recompiling so we can bind Angular directive to the DT

							$compile(angular.element(row).contents())($scope);
						}
						$scope.allFile = 'no';
						$scope.adding = '';
						$scope.cancelWindow = 'CLOSE';
						$scope.canzjg = 'yes';
						$scope.noticeClose = function () {
							$scope.cancelWindow = 'OPEN';
						};
						$scope.checkToCancel = function () {
							$scope.clicked = 'true';
							//关闭导入窗口
							$scope.clicked = 'false';
							$scope.canzjg = 'yes';
							$scope.importUser = 'false';
							$scope.cancelWindow = 'CLOSE';
							window.clearInterval($scope.t4);
						};
						$scope.cancelCancel = function () {
							$scope.cancelWindow = 'CLOSE';
						};
						$scope.btnImport = function () {
							$scope.clicked = 'true';
							$scope.adding = '0';
						};
						$scope.handleImport = function () {
							$scope.allFile = 'no';
							$scope.importUser = 'true';
							//文件
							$scope.addFile = 'false';
							$scope.progress = 0;
							$scope.progressStyle = {
								'width' : $scope.progress+'%'
							};
							//失败的下载链接
							$scope.failUrl = 'false';
							var uploader = $scope.uploader = new FileUploader({
								url : URLInit.importuser + getCookie('instanceId'),
								queueLimit: 1,     //文件个数
								removeAfterUpload: true   //上传后删除文件
							});
							//重新选择文件时，清空队列，达到覆盖文件的效果
							$scope.clearItems = function(){
								uploader.clearQueue();
								window.clearInterval($scope.t4);
								$scope.errorMsg = '';
								$scope.progress = 0;
								$scope.progressStyle = {
									'width' : $scope.progress+'%'
								};
								$scope.adding = '';
								$scope.importFile = 'false';
								$scope.addFiles = 'false';
								$scope.clicked = 'false';
							};
							//添加文件之后，把文件信息赋给scope
							uploader.onAfterAddingFile = function(fileItem) {
								$scope.addFile = 'true';
								$scope.failUrl = 'false';
								$scope.fileItem = fileItem._file;
							};
							//文件上传成功之后回调函数
							uploader.onSuccessItem = function(fileItem, response, status, headers) {
								$scope.adding = '100';
								$scope.scheduleId = response.data;
								$scope.canzjg = 'no';
								$scope.allFile = 'begin';
								$scope.clicked = 'hide';
								if (response.flag=='000000'){
									$scope.importFile = 'true';
									$scope.t4 = window.setInterval(progressFn,5000);
									function progressFn() {
										$http({
											method: "GET",
											url: "/onecloud-manager/instanceuser/getschedule/"+$scope.scheduleId
										}).success(function (data) {
											$scope.adding = '';
											if (data == null){
												$scope.netError = 'true';
												$scope.errorMsg = "上传失败，请重试！";
												window.clearInterval($scope.t4);
											}
											else if (data.flag=='000000'){
												$scope.clicked = 'false';
												if(data.data.result=='0'){
													$scope.progress = data.data.percentage;
													if($scope.progress==null){
														$scope.progressStyle = {
															'width' : '0%'
														}
													}
													$scope.progressStyle = {
														'width' : $scope.progress+'%'
													}
												}
												else if(data.data.result=='1'){
													$scope.progress = data.data.percentage;
													$scope.progressStyle = {
														'width' : $scope.progress+'%'
													};
													$scope.successes = data.data.achievenum;
													$scope.fails = data.data.totalnum - data.data.achievenum;
													window.clearInterval($scope.t4);
													$scope.addFiles = 'success';
													$scope.allFile = 'true';
													$scope.canzjg = 'yes';
													if($scope.fails>0){
														$scope.allFile = 'again';
														$scope.failUrl = 'true';
													}
												}
												else if(data.data.result=='2'){
													window.clearInterval($scope.t4);
													$scope.allFile = 'no';
													$scope.canzjg = 'yes';
													$scope.addFiles = 'fail';
													$scope.errorMsg = "系统错误";
												}
											}else{
												$scope.allFile = 'no';
												$scope.addFiles = 'fail';
												$scope.canzjg = 'yes';
												$scope.netError = 'true';
												$scope.errorMsg = data.desc;
												window.clearInterval($scope.t4);
											}
										}).error(function (data) {
											$scope.allFile = 'no';
											$scope.netError = 'true';
											$scope.errorMsg = "发送请求失败，请重试！";
											window.clearInterval($scope.t4);
											$scope.canzjg = 'yes';
											$scope.clicked = 'false';
										})
									}
								}else{
									$scope.importFile = '';
									$scope.adding = '';
									$scope.allFile = 'no';
									$scope.canzjg = 'yes';
									$scope.addFiles = 'fail';
									$scope.errorMsg = response.desc;
									$scope.clicked = 'false';
								}
							};
							//文件上传失败之后回调函数
							uploader.onErrorItem = function(fileItem, response, status, headers) {
								$scope.netError = 'true';
								$scope.errorMsg = "发送请求失败，请重试！";
								$scope.clicked = 'false';
							};
						};
						//新建用户
						$scope.createUser = 'false';
						$scope.createOpen = function () {

							$scope.createUser = 'true';
							$scope.responseError='false';
							$scope.createUserFormData = {};
							$scope.handleCreateUser = function () {
								$scope.clicked = 'true';
								$scope.createUserFormData.instanceId = getCookie('instanceId');
								$scope.createUserFormData.companyId = getCookie('companyId');
								$http({
									method :"POST",
									url: URLInit.instanceuserSave,
									data : JSON.stringify($scope.createUserFormData),
									headers : {
										'Content-Type': 'application/json'
									}
								}).success(function(data){
									$scope.clicked = 'false';
									if(data.flag =='000000'){
										$scope.responseError='success';
										$scope.createUserFormData = {};

										reloadUserData();
									}else {
										$scope.responseError='true';
										$scope.errorMsg = data.desc;
									}
								}).error(function(data, header, config, status) {
									//处理响应失败
									$scope.clicked = 'false';
									$scope.netError = 'true';
									$scope.errorMsg = "发送请求失败，请重试！";
								});
							}
						}

					}
					searchIns();
					$scope.deleteDateTable=function(){
						$scope.canLoadTable = 'false';
						//console.log("设置了false");
					}
				}else{
					$scope.requestSuccess = 'false';
				}
			}else{
				$scope.netError = 'true';
				$scope.errorMsg = data.desc;
			}
		}).error(function (data) {
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		});
	}
	
	getInstanceId();
	//设置productId的cookie
	$scope.handleProductId =function(productId,productlineCode){
		$scope.showInput = 'false';
		$scope.canLoadTable = 'false';
		delCookie('productId');
		setCookie('productId',productId);
		$rootScope.productId = getCookie("productId");
		delCookie('productlineCode');
		setCookie('productlineCode',productlineCode);
		$rootScope.productlineCode = getCookie("productlineCode");
		getInstanceId();
	};

	//控制切换数据源tab页的activeclass
	$scope.itemClickHandler = function(event) {
		var currentElement = event.target;
		var $li = $(currentElement.parentNode);
		$li.siblings().removeClass("active");
		$li.addClass("active");
	};

	$scope.addSuccess = 'false';
	vm.message = '';
	vm.persons = {};
	$scope.addExampleHandler = 'false';
	$scope.addExample = function () {
		$scope.newInstanceData.name ='';
		$scope.newInstanceData.source ='';
		$scope.addExampleHandler = 'true';
	};
	$scope.closeWindow = function () {
		$scope.responseError = 'false';
		$scope.addExampleHandler = 'false';
		$scope.changeExampleHandler = 'false';
		$scope.updateUserData = 'false';
	};
	//展示查询条件
	$scope.showInput = 'false';
	$scope.handleShowInput = function () {
		$scope.showInput = 'true';
	};
	//导出当前页用户
	$scope.downData = {};
	$scope.byId=function () {
		var obj =document.getElementsByClassName('dataTables_length')[0]
			.firstElementChild.firstElementChild; //定位select

		var index = obj.selectedIndex; // 选中索引

		var value = obj.options[index].value; // 选中值

		var arr = $scope.currentData.slice(0,value);
		if(arr.length>0){
			$http({
				method : "POST",
				url : URLInit.byid,
				data : arr,
				headers: {'Content-Type': 'application/json'}
			}).success(function (data) {
				if(data.flag=='000000'){
					$scope.downData.fileUrl = data.data.fileUrl;
					$scope.downData.groupName = data.data.groupName;
					$scope.downData.remoteFileName = data.data.remoteFileName;
					$scope.downFlag='?fileUrl='+$scope.downData.fileUrl+'&groupName='+$scope.downData.groupName+'&remoteFileName='+$scope.downData.remoteFileName;
					if ($scope.downFlag.indexOf('?fileUrl') !== -1){
						var link = document.getElementById('alink');
						link.href = "/onecloud-manager/instanceuser/download/account/byid"+$scope.downFlag;
						link.click();
					}
				}else {
					$scope.netError = 'true';
					$scope.errorMsg = data.desc;
				}
			}).error(function(data){
				$scope.netError = 'true';
				$scope.errorMsg = "发送请求失败，请重试！";
			});
		}else if(arr.length==0){
			$scope.netError = 'true';
			$scope.errorMsg = "当前页没有用户";
		}
	};
	$scope.instanceStatus = "";
	//新增数据源
	$rootScope.newInstanceData = {};
	$scope.addNewInstance = function () {
		$scope.clicked = 'true';
		$rootScope.newInstanceData.productId = getCookie("productId");
		$rootScope.newInstanceData.companyId = getCookie("companyId");
		$http({
			method : "POST",
			url : URLInit.instanceSave,
			data : $rootScope.newInstanceData,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			$scope.clicked = 'false';
			if(data.flag=='000000'){
				$scope.addExampleHandler = 'false';
				$scope.addSuccess = 'true';
				$scope.instanceStatus = "new";
				$rootScope.newInstanceData = {};
				$scope.canLoadTable = 'false';
				getInstanceId();
			}else {
				// alert(data.desc);
				$scope.addExampleHandler = 'false';
				$scope.addSuccess = 'true';
				$scope.instanceStatus = "error";
				$rootScope.newInstanceData = {};
				$scope.errorMsg = data.desc;
			}
		}).error(function(data){
			$scope.clicked = 'false';
			$scope.addExampleHandler = 'false';
			$scope.addSuccess = 'true';
			$scope.instanceStatus = "error";
			$rootScope.newInstanceData = {};
			$scope.errorMsg = "发送请求失败，请重试！";
		});
	};
	//修改数据源名称
	$scope.changeExampleHandler = 'false';
	$rootScope.updateInstanceData = {};
	$scope.showChangeInstanceName = function () {
		$scope.changeExampleHandler = "true";
		$rootScope.updateInstanceData.id = getCookie("id");
		$rootScope.updateInstanceData.name =  $rootScope.instanceName ;
		$rootScope.updateInstanceData.source = $rootScope.instanceSource;
	};
	$scope.changeInstanceName = function () {
		$scope.clicked = 'true';
		$rootScope.updateInstanceData.productId = getCookie("productId");
		$rootScope.updateInstanceData.companyId = getCookie("companyId");
		$http({
			method : "POST",
			url : URLInit.instanceUpdate,
			data : $rootScope.updateInstanceData,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			$scope.clicked = 'false';
			if(data.flag=='000000'){
				$scope.changeExampleHandler = 'false';
				$scope.addSuccess = 'true';
				$scope.instanceStatus = "update";
				$rootScope.updateInstanceData = {};
				$scope.canLoadTable = 'false';
				getInstanceId();
			}else {
				$scope.changeExampleHandler = 'false';
				$scope.addSuccess = 'true';
				$scope.instanceStatus = "error";
				$scope.errorMsg = data.desc;
				$rootScope.updateInstanceData = {};
			}
		}).error(function(data){
			$scope.clicked = 'false';
			$scope.changeExampleHandler = 'false';
			$scope.addSuccess = 'true';
			$scope.instanceStatus = "error";
			$scope.errorMsg = "发送请求失败，请重试！";
			$rootScope.updateInstanceData = {};
		});
	};
	$scope.importUser = 'false';
	$scope.failUrl = '';
	//删除无用户数据源
	$scope.deleteInstance = 'CLOSE';
	$scope.delInstance = function () {
		$scope.deleteInstance = 'OPEN';
	};
	$scope.cancelToDeleteInstance =function () {
		$scope.deleteInstance = 'CLOSE';
	};
	$scope.closeInsWindow = function () {
		$scope.addSuccess = 'false';
	};
	$scope.closeNet = function () {
		$scope.netError = 'false';
	};
	$scope.checkToDeleteInstance = function () {
		$scope.iid = {"id": getCookie("id")};
		$scope.clicked = 'true';
		$http({
			method : "POST",
			url : URLInit.instanceDel,
			data : $scope.iid,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
			$scope.clicked = 'false';
			if(data.flag=='000000'){
				$scope.deleteInstance = 'CLOSE';
				$scope.canLoadTable = 'false';
				getInstanceId();
			}else {
				$scope.netError = 'true';
				$scope.errorMsg = data.desc;
			}
		}).error(function(data){
			$scope.clicked = 'false';
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		});
	};
	$scope.close = function () {
		$scope.showInput = 'false';
	};
	$scope.cancelToDeleteUser = function () {
		$scope.deleteUserBox = 'CLOSE';
		$scope.startUpUserBox = 'CLOSE';
	};
	$scope.handleDownProduct = function (id) {
		$http({
			method: "GET",
			url: URLInit.configzip+id
		}).success(function (data) {
		}).error(function (data) {
		})
	};
	$scope.handleDownUser = function () {
		$http({
			method: "GET",
			url: URLInit.config+$rootScope.productId
		}).success(function (data) {
		}).error(function (data) {
		})
	};
	$scope.handelShowOld = 'close';
	$scope.showOld = function () {
		$scope.handelShowOld = 'open';

	};
	$scope.closeOld = function () {
		$scope.handelShowOld = 'close';
		$scope.response = 'false';
		$scope.netError = 'false';
		$scope.deleteInstance = 'CLOSE';
		$scope.deleteUserBox = 'CLOSE';
		$scope.startUpUserBox = 'CLOSE';
		$scope.linkOldFormData = {};
	};
	//产品线列表查询
	// $scope.selectProductLineId = function () {
    //
	// };
	$http({
		method: 'POST',
		url: URLInit.getList,
		data: {},
		headers : { 'Content-Type': 'application/json' }
	}).success(function (data) {
		$scope.productLines = data.data;
	}).error(function (data) {
		$scope.netError = 'true';
		$scope.errorMsg = "发送请求失败，请重试！";
	});
	//新产品注册
	$rootScope.productData = {};
	$rootScope.productData.productlineIdUrl = '';
	$scope.newProductReg = function () {
		$rootScope.productData.productlineId = $scope.productData.productlineIdUrl.split("@")[0];
		$rootScope.regUrl = $scope.productData.productlineIdUrl.split("@")[1];
		setCookie('companyId',$rootScope.businessId);
		setCookie('productlineId',$rootScope.productData.productlineId);
		setCookie('regUrl',$rootScope.regUrl);
	};
}]);
app.controller('addProbationCtrl',['DTOptionsBuilder','DTColumnDefBuilder', 'DTColumnBuilder','$state', '$rootScope', '$scope', '$http', '$q','$compile',function(DTOptionsBuilder,DTColumnDefBuilder, DTColumnBuilder,$state, $rootScope, $scope, $http, $q,$compile){
	$scope.productlineId = getCookie('productlineId');
	$http({
		method: 'POST',
		url: URLInit.getTrialProduct,
		data: 'productlineId='+ $scope.productlineId,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).success(function (data) {
		if(data.flag == '000000'){
			$scope.probationProductList = data.data;
		}else{
			$scope.netError = 'true';
			$scope.errorMsg = data.desc;
		}
	}).error(function (data) {
		$scope.netError = 'true';
		$scope.errorMsg = "发送请求失败，请重试！";
	});
	$scope.probationProductdata = {};
	$scope.probationProductdata.trialProductId = '';
	$scope.addSuccess = '';
	$scope.close = function () {
		$scope.addSuccess = '';
		$scope.showInput = 'false';
	};
	$scope.handleProbation = function () {
		$scope.probationProductdata.companyId = $rootScope.businessId;
		$http({
			method: 'POST',
			url: URLInit.productTrial,
			data: $.param($scope.probationProductdata),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function (data) {
			if (data.flag == '000000'){
				$scope.addSuccess = 'true';
			}else {
				$scope.addSuccess = 'false';
				$scope.addMsg = data.desc;
			}
		}).error(function (data) {
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		});
	};

	function getCookie(name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

		if(arr=document.cookie.match(reg))

			return (arr[2]);
		else
			return null;
	}

}]);
app.controller('fastRegCtrl',function($rootScope,$scope,$http,$state){
	$scope.regFlag = 0;
	$scope.regStatus = '';
	$scope.regFollow = '';
	$scope.confirmData = {};
	$scope.copy = 'false';
	$scope.clicked = 'false';
	$scope.confirmData.unContinueId=[];
	$rootScope.regUrl = getCookie('regUrl');
	//默认不沿用数据源
	$scope.followMore = {
		"status" : '0'
	};
	$scope.followOne = {
		"status" : '0'
	};
	$rootScope.productData = {};
	$rootScope.productData.companyId = getCookie('companyId');
	$rootScope.productData.productlineId = getCookie('productlineId');
	// console.log($rootScope.productData);
	$http({
		method: 'POST',
		url: URLInit.generateOrder,
		data: $.param($rootScope.productData),
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).success(function(data){
		// console.log(data);
		if(data.flag=='000000'){
			$rootScope.sendaData = {};
			$rootScope.sendaData.recordId = data.data;
			$scope.handurl = decodeURIComponent('http://'+$rootScope.regUrl+'?companyId='+getCookie('companyId')+'&productlineId='+getCookie('productlineId')+'&id='+$rootScope.sendaData.recordId);
		}else {
			$scope.netError = 'true';
			$scope.errorMsg = data.desc;
		}
	}).error(function (data) {
		$scope.netError = 'true';
		$scope.errorMsg = "发送请求失败，请重试！";
	});
	//0 注册中，一直调用
	//1 用户确认中
	//2 完成
	$rootScope.t1 = window.setInterval(myInterval,10000);//每10秒发送执行一次函数
	window.setTimeout(myInterval,500);//立即执行一次函数
	// $rootScope.t2 = window.setInterval(time,1000);//1s执行一次函数
	function myInterval() {
		if($rootScope.sendaData && $scope.regFlag==0){
			// if($rootScope.sendaData && $scope.showStep1=='true' && $scope.regFlag==0){
			$scope.confirmData.recordId = $rootScope.sendaData.recordId;
			$http({
				method: 'POST',
				url: URLInit.getConfirmInfo,
				data: $.param($rootScope.sendaData),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(data){
				if(data.flag=='000000'){
					$scope.regFlag = data.data.status;
					if ($scope.regFlag == 0){
						//第一步
						$scope.showStep1 = 'true';
						$scope.showStep2 = 'false';
						$scope.showStep3 = 'false';
					}
					else if($scope.regFlag == 1){
						//第二步
						$scope.copy = 'hide';
						$scope.showStep1 = 'false';
						$scope.showStep2 = 'true';
						$scope.showStep3 = 'false';
						//处理不同情况
						//新购
						$scope.newProduct = data.data.newProduct;
						if(data.data.oldProduct==null && data.data.flag=='0'){
							$scope.regStatus = 'new';
						}
						//旧的只有一条
						else if(data.data.oldProduct.length == 1){
							$scope.regStatus = 'unpack';
							$scope.oldProductList = data.data.oldProduct;
							//判断这一条是否沿用
							if(data.data.flag=='0'){
								//必沿用
								$scope.followOne.status = '1';
								$scope.confirmData.continueId = $scope.oldProductList[0].id;
							}
							//选择是否沿用
							else if(data.data.flag=='1'){
								$scope.flags = '1';
								$scope.regFollow = 'followOne';
							}
							else if(data.data.flag=='2'){
								$scope.flags = '2';
								$scope.regFollow = 'followOne';
							}
						}
						else if(data.data.oldProduct.length > 1){
							//旧的有多个
							$scope.regStatus = 'pack';
							$scope.oldProductList = data.data.oldProduct;
							$rootScope.sendArray = [];
							for (var i = 0;i<data.data.oldProduct.length;i++){
								$rootScope.sendArray.push(data.data.oldProduct[i].id);
								if(data.data.oldProduct[i].status=='0'){
									data.data.oldProduct[i].status = '正式'
								} else if(data.data.oldProduct[i].status=='1'){
									data.data.oldProduct[i].status = '试用'
								} else if(data.data.oldProduct[i].status=='3'){
									data.data.oldProduct[i].status = '借用'
								}
							}
							if(data.data.flag=='1') {
								//要传uncontinueid
								$scope.flags = '1';
							}
							else if(data.data.flag=='2'){
								//不传uncontinueid
								$scope.flags = '2';
							}
						}
					}
					else if($scope.regFlag == 2 ){
						//第三步
						$scope.cannot = 'false';
						$scope.showStep1 = 'false';
						$scope.showStep2 = 'false';
						$scope.showStep3 = 'true';
					}
				}else{
					$scope.cannot = 'false';
					$scope.netError = 'true';
					$scope.errorMsg = data.desc;
					window.clearInterval($rootScope.t1);
				}
			}).error(function (data) {
				$scope.cannot = 'false';
				$scope.netError = 'true';
				$scope.errorMsg = "发送请求失败，请重试！";
			})
		}else{
			window.clearInterval($rootScope.t1);
		}
	}
	$scope.goProduct = function () {
		$state.go('admin.productAdmin');
		$scope.netError = 'false';
	};
	$scope.showConfirm = 'false';
	$scope.showConfirmBtn =function () {
		if($scope.oldProductList.length > 1){
			$scope.showConfirm = 'true';
			var d = document.getElementsByName("follows");
			if(d){
				for(var i=0;i<d.length;i++){
					if(d[i].checked){
						$scope.pName = $(d[i]).prev().text();
						var pCode = $(d[i]).parent().parent().siblings().children().children("p.pCode").children().text();
						pCode == ''? $scope.pCode = '无': $scope.pCode = pCode;
					}
				}
			}
		} else if($scope.oldProductList.length == 1){
			$scope.showConfirm = 'one';
			var e = document.getElementById("onePName");
			var f = document.getElementById("onePCode");
			$scope.pName = e.innerHTML;
			f.innerHTML==''? $scope.pCode = '无':$scope.pCode = f.innerHTML;
		}

		if ($scope.followMore.status=='1' && $scope.confirmData.continueId==undefined){
			$scope.showConfirm = 'danger';
		}
	};
	$scope.confirmBtn = function () {
		//沿用情况
		//新购
		if($scope.regStatus=='new'){
			delete $scope.confirmData.continueId;
			delete $scope.confirmData.unContinueId;
		}
		//只有一个旧企业
		else if($scope.oldProductList.length == 1){
			//沿用和不沿用的id都传
			if ($scope.flags == '1'){
				//沿用
				if($scope.followOne.status=='1'){
					$scope.confirmData.continueId = $scope.oldProductList[0].id;
					$scope.confirmData.unContinueId = [];
				}
				//不沿用
				else if($scope.followOne.status=='0'){
					$scope.confirmData.unContinueId.push($scope.oldProductList[0].id);
					$rootScope.sendArray = $scope.confirmData.unContinueId;
				}
			}
			//只传沿用的id
			else if($scope.flags == '2'){
				if($scope.followOne.status=='1'){
					$scope.confirmData.continueId = $scope.oldProductList[0].id;
					delete $scope.confirmData.unContinueId;
				}if($scope.followOne.status=='0'){
					delete $scope.confirmData.unContinueId;
				}
			}
		}
		//有多个旧企业
		else if ($scope.oldProductList.length > 1){
			var d = document.getElementsByName("follows");
			//沿用和不沿用的id都传
			if($scope.flags == '1'){
				//沿用
				if($scope.followMore.status == '1'){
					if(d){
						$scope.confirmData.unContinueId = [];
						for(var i=0;i<d.length;i++){
							if(!d[i].checked){
								$scope.confirmData.unContinueId.push(d[i].value);
							}else if(d[i].checked){
								$scope.confirmData.continueId = d[i].value;
							}
						}
					}
				}else if($scope.followMore.status == '0'){
					$scope.confirmData.unContinueId = $rootScope.sendArray;
					delete $scope.confirmData.continueId;
				}
			}
			//只传沿用的id
			else if($scope.flags == '2'){
				//沿用
				if($scope.followMore.status == '1'){
					if(d){
						for(var i=0;i<d.length;i++){
							if(d[i].checked){
								$scope.confirmData.continueId = d[i].value;
							}
						}
					}
				}else if($scope.followMore.status == '0'){
					delete $scope.confirmData.continueId;
					delete $scope.confirmData.unContinueId;
				}
			}
		}
		// console.log("发送的参数是"+JSON.stringify($scope.confirmData));
		$http({
			method : 'POST',
			url : URLInit.confirmRegister,
			data : $scope.confirmData,
			headers : { 'Content-Type': 'application/json' }
		}).success(function (data) {
			if(data.flag == '000000'){
				$scope.showStep1 = 'false';
				$scope.showStep2 = 'false';
				$scope.showStep3 = 'true';
				$scope.followOne.status = '';
				$scope.followMore.status = '';
			}else {
				$scope.netError = 'true';
				$scope.errorMsg = data.desc;
			}
		}).error(function (data) {
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		})
	};
	$scope.remove = function (scope) {
		scope.remove();
	};
	$scope.close = function () {
		$scope.copy = 'false';
		$scope.netError = 'false';
		$scope.showConfirm = 'false';
	};
	// $scope.cannot = 'false';
	// $scope.openDisabled = function () {
	// 	$scope.cannot = 'true';
	// };
	var clipboard = new Clipboard('.btn');

	$scope.copyClick = function () {
		$scope.clicked = 'true';
	};

	clipboard.on('success', function(e) {
		$scope.copy = 'true';
		$scope.clicked = 'false';
		e.clearSelection();
	});

	clipboard.on('error', function(e) {
		$scope.copy = 'error';
		$scope.clicked = 'false';
	});

});
app.controller('settingCtrl', ['$scope','$rootScope', '$http', 'FileUploader', function($scope,$rootScope, $http, FileUploader) {
	$rootScope.sendCode = 'no';
	$rootScope.sendCode1 = 'no';
	$rootScope.sendCode2 = 'no';
	$rootScope.sendCode3 = 'no';
	$scope.clicked = 'false';
	$scope.time = 60000;
	//修改头像接口
	$scope.head = "";
	var uploader = $scope.uploader = new FileUploader({
		url : URLInit.upload,
		queueLimit: 1,     //文件个数
		removeAfterUpload: true   //上传后删除文件
	});
	//重新选择文件时，清空队列，达到覆盖文件的效果
	$scope.clearItems = function(){
		$scope.userLogoImgError=false;
		uploader.clearQueue();
	};
	//添加文件之后，把文件信息赋给scope
	uploader.onAfterAddingFile = function(fileItem) {
		$scope.fileItem = fileItem._file;
		var nowFileSize=Math.floor(uploader.queue[0].file.size/1024);
		var nowFileType=uploader.queue[0].file.type;
		//console.log(nowFileSize);
		//console.log(nowFileType);
		if(nowFileSize>5120){
			$scope.userLogoImgError=true;
			$scope.userLogoImgErrorInfo="图片大小限制为5MB，所选图片大于5MB！";
		}else{
			$scope.userLogoImgError=false;
			if(nowFileType=='image/jpeg'||nowFileType=='image/png'||
				nowFileType=='image/gif'||nowFileType=='like/jpg'||
				nowFileType=='like/png'||nowFileType=='like/gif'||
				nowFileType=='like/jpeg'){
				$scope.userLogoUpIsReady=true;
				uploader.queue[0].upload();
			}else{
				$scope.userLogoUpIsReady=false;
				$scope.userLogoImgError=true;
				$scope.userLogoImgErrorInfo="格式错误,请选择(jpg/png/jpeg/gif)图片格式！";
			}
		}
	};
	//console.log(uploader.onAfterAddingFile());
	uploader.onSuccessItem = function(fileItem, response, status, headers) {
		//console.log(response);
		$scope.userLogoUpIsReady=false;
		if (response.flag == '000000'){
			$scope.userLogoImgError=false;
			$scope.headPicUrl=response.data.fileUrl;
			$rootScope.headPicUrl=$scope.headPicUrl;
			$http({
				method: 'POST',
				url: URLInit.headportrait,
				data: "portraitUrl="+$scope.headPicUrl,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).success(function(data) {
				//响应成功
				if(data.flag == '000000'){
					$scope.userLogoImgError=false;
				}else {
					$scope.userLogoImgError=true;
					$scope.userLogoImgErrorInfo=data.desc;
				}
			}).error(function(data, header, config, status) {
				//处理响应失败
				fileItem.isSuccess = false;
				fileItem.isError = true;
				$scope.head = "";
			});
			$scope.head = "true";
			fileItem.isSuccess = true;
			fileItem.isError = false;
		}else {
			$scope.userLogoImgError=true;
			$scope.userLogoImgErrorInfo=response.desc;
			fileItem.isSuccess = false;
			fileItem.isError = true;
			$scope.head = "";
		}
	};
	uploader.onErrorItem = function(fileItem, response, status, headers) {
		fileItem.isSuccess = false;
		fileItem.isError = true;
		$scope.head = "";
	};//上传身份证照片正反面
	$scope.canSubmit='';
	$scope.canSubmit1='';
	var uploaderFront = $scope.uploaderFront = new FileUploader({
		url : URLInit.upload,
		queueLimit: 1,     //文件个数
		removeAfterUpload: true ,  //上传后删除文件
		autoUpload:true
	});
	var uploaderBack = $scope.uploaderBack = new FileUploader({
		url : URLInit.upload,
		queueLimit: 1,     //文件个数
		removeAfterUpload: true ,  //上传后删除文件
		autoUpload:true
	});
	$scope.clearItems1 = function(){
		uploaderFront.clearQueue();
		uploaderBack.clearQueue();
	};
	uploaderFront.onAfterAddingFile = function(fileItem) {
		$scope.fileItem = fileItem._file;
	};
	uploaderBack.onAfterAddingFile = function(fileItem) {
		$scope.fileItem = fileItem._file;
	};
	uploaderFront.onSuccessItem = function(fileItem, response, status, headers) {
		if (response.flag == '000000'){
			$scope.userIdentityInfo.cardPicFrontUrl=response.data.fileUrl;
			fileItem.isSuccess = true;
			fileItem.isError = false;
			$scope.canSubmit='true';
		}else {
			fileItem.isSuccess = false;
			fileItem.isError = true;
			$scope.canSubmit='';
		}
	};
	uploaderBack.onSuccessItem = function(fileItem, response, status, headers) {
		if (response.flag == '000000'){
			$scope.userIdentityInfo.cardPicBackUrl=response.data.fileUrl;
			fileItem.isSuccess = true;
			fileItem.isError = false;
			$scope.canSubmit1='true';
		}else {
			fileItem.isSuccess = false;
			fileItem.isError = true;
			$scope.canSubmit1='';
		}
	};

	//旧手机号发送验证码接口
	$scope.oldPhoneCode = function() {
		if($scope.services.data.mobile != null) {
			var data = {
				"username":$scope.services.data.mobile
			};
			$http({
				method: 'POST',
				url: URLInit.getCaptcha,
				data: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data) {
				//响应成功
				if(data.flag == '000000'){
					$rootScope.sendCode = 'yes';
				}else {
					alert(data.desc);
				}
			}).error(function(data, header, config, status) {
				//处理响应失败
				console.log("发送失败")
			});
		} else {
			alert("出错了,请刷新页面!")
		}

	};
	//旧邮箱发送验证码接口
	$scope.oldEmailCode = function() {
		if($scope.services.data.email != null) {
			var data = {
				"username":$scope.services.data.email
			};
			$http({
				method: 'POST',
				url: URLInit.getCaptcha,
				data: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data) {
				//响应成功
				if(data.flag == '000000'){
					$rootScope.sendCode2 = 'yes';
				}else {
					alert(data.desc);
				}
			}).error(function(data, header, config, status) {
				//处理响应失败
				console.log("发送失败")
			});
		} else {
			alert("出错了,请刷新页面!")
		}

	};

	$scope.emailCode = function() {
		if($scope.services.data.email != null) {
			var username = $scope.services.data.email;
			$http.post(URLInit.getCaptcha, username).then(function() {
				// console.log(username);
				alert("验证码已发送");
			});
		}

	};

	//打开关闭modal框
	$scope.changePhone = function() {
		$scope.handelChangePhone = "open";
	};
	$scope.changeEmail = function() {
		$scope.handelChangeEmail = "open";
	};
	$scope.handelClose = function() {
		$scope.handelChangePhone = "";
		$scope.handelChangeEmail = "";
	};

	//保存修改登录信息
	$scope.wrong = 'false';
	$scope.nextBtn ='false';
	$http.get(URLInit.userinfo).then(function(response) {
		$scope.openid = response.data.data.openid;
		$scope.userLoginInfo = {};
		$scope.userLoginInfo.openid = $scope.openid;
		//正则校验参数
		$scope.isDisabled = "";
		//旧手机号验证码是否正确
		$scope.isValidateOldMobile = "";
		//新手机号验证码是否正确
		$scope.isValidateNewMobile = "";
		//旧邮箱验证码是否正确
		$scope.isValidateOldEmail = "";
		//新邮箱验证码是否正确
		$scope.isValidateNewEmail = "";

		response.data.data.mobile == null ? $scope.isValidateOldMobile = "true":$scope.isValidateOldMobile = "";
		response.data.data.email == null ? $scope.isValidateOldEmail = "true":$scope.isValidateOldEmail = "";

		//初始化用户一般信息参数
		var birthday = response.data.data.birthday;
		var date = new Date(birthday);
		Y = date.getFullYear() + '-';
		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		D = date.getDate() < 10 ?  '0' + date.getDate() : date.getDate();
		response.data.data.birthday = Y+M+D;
		// $scope.age = new Date().getFullYear() - date.getFullYear();
		$scope.showSex = '未知';
		if(response.data.data.sex == 1 ){
			$scope.showSex = '男';
		} else if(response.data.data.sex == 0){
			$scope.showSex = '女';
		} else {
			$scope.showSex = '未知';
		}
		$scope.userBaseInfo = {
			'nickname':response.data.data.nickname,
			'birthday':response.data.data.birthday,
			'address':response.data.data.address,
			'sex': response.data.data.sex,
			'telephone':response.data.data.telephone
		};
		$scope.userBaseInfo.openid = $scope.openid;
		$scope.updateSuccess = '';
		$scope.netError = '';
		$scope.close = function () {
			$scope.updateSuccess = '';
			$scope.netError = '';
		};
		$scope.userBase = function () {
			$scope.clicked = 'true';
			$http({
				method: 'POST',
				url: URLInit.common,
				data: JSON.stringify($scope.userBaseInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data) {
				//响应成功
				$scope.clicked = 'false';
				if(data.flag == '000000'){
					$rootScope.headPicUrl = $scope.services.data.headPicUrl;
					$rootScope.nickname = data.data.nickname;
					$rootScope.birthday = data.data.birthday;
					$rootScope.sex = data.data.sex;
					$rootScope.telphone = data.data.telphone;
					$rootScope.address = data.data.address;
					$scope.updateSuccess = 'true';
					//更新性别信息
					if(data.data.sex == 1 ){
						$scope.showSex = '男';
					} else if(data.data.sex == 0){
						$scope.showSex = '女';
					} else {
						$scope.showSex = '未知';
					}
				}else {
					$scope.netError = 'true';
					$scope.errorMsg = data.desc;
				}
			}).error(function(data, header, config, status) {
				//处理响应失败
				$scope.clicked = 'false';
				$scope.netError = 'true';
				$scope.errorMsg = "发送请求失败，请重试！";
			});
		};
		//初始化用户认证信息参数
		$scope.userIdentityInfo = {};
		$scope.userIdentityInfo.openid = $scope.openid;
		//更新用户认证信息接口
		$scope.userIdentity=function () {
			$http({
				method: 'POST',
				url: URLInit.identity,
				data: JSON.stringify($scope.userIdentityInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data) {
				//响应成功
				if(data.flag == '000000'){
					// console.log(history.go(0));
					$http.get(URLInit.userinfo);
				}else {
					alert(data.desc);
				}
			}).error(function(data, header, config, status) {
				//处理响应失败
				console.log("发送失败")
			});
		};
		//正则校验
		$scope.regPhone=function () {
			var reg = /^1[34578][0-9]\d{8}$/;
			reg.test($scope.userLoginInfo.mobile) ? $scope.isDisabled = "open" : $scope.isDisabled = "";
		};
		$scope.regEmail=function () {
			var reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			reg.test($scope.userLoginInfo.email) ? $scope.isDisabled = "open" : $scope.isDisabled = "";
		};
		//新手机号发送验证码接口
		$scope.newPhoneCode = function() {
			var data = {
				"username":$scope.userLoginInfo.mobile
			};
			$http({
				method: 'POST',
				url: URLInit.getCaptcha,
				data: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data) {
				//响应成功
				if(data.flag == '000000'){
					$rootScope.sendCode1 = 'yes';
				}else {
					alert(data.desc);
				}
			}).error(function(data, header, config, status) {
				//处理响应失败
				console.log("发送失败")
			});

		};
		//新邮箱发送验证码接口
		$scope.newEmailCode = function() {
			var data = {
				"username":$scope.userLoginInfo.email
			};

			$http({
				method: 'POST',
				url: URLInit.getCaptcha,
				data: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data) {
				//响应成功
				if(data.flag == '000000'){
					$rootScope.sendCode3 = 'yes';
				}else {
					alert(data.desc);
				}

			}).error(function(data, header, config, status) {
				//处理响应失败
				console.log("发送失败")
			});

		};
		$scope.result0 = '';
		$scope.result1 = '';
		$scope.result2 = '';
		$scope.result3 = '';
		//校验旧手机验证码
		$scope.oldMobileValidateCaptcha = function () {
			if ($scope.userLoginInfo.oldMobileCaptcha && $scope.userLoginInfo.oldMobileCaptcha.length >= 4){
				$scope.userLoginInfo.key = response.data.data.mobile;
				var data = {
					"key":$scope.userLoginInfo.key,
					"captcha":$scope.userLoginInfo.oldMobileCaptcha
				};
				// console.log(data);
				$http({
					method: 'POST',
					url: URLInit.validateCaptcha,
					data: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					}
				}).success(function(data) {
					if(data.flag == '000000') {
						$scope.isValidateOldMobile = "true";
						// console.log("验证码正确");
						$scope.result0.flag='000000';
					} else {
						$scope.isValidateOldMobile = "";
						$scope.result0 = data;
					}

				}).error(function(data) {

				});
			}
		};
		//校验新手机验证码
		$scope.newMobileValidateCaptcha = function () {
			if ($scope.userLoginInfo.newMobileCaptcha && $scope.userLoginInfo.newMobileCaptcha.length >= 4){
				var data = {
					"key":$scope.userLoginInfo.mobile,
					"captcha":$scope.userLoginInfo.newMobileCaptcha
				};
				// console.log(data);
				$http({
					method: 'POST',
					url: URLInit.validateCaptcha,
					data: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					}
				}).success(function(data) {
					if(data.flag == '000000') {
						$scope.isValidateNewMobile = "true";
						$scope.result1.flag='000000';
					} else {
						$scope.isValidateNewMobile = "";
						$scope.result1 = data;
					}
				}).error(function(data) {

				});
			}
		};
		//校验旧邮箱验证码
		$scope.oldEmailValidateCaptcha = function () {
			if ($scope.userLoginInfo.oldEmailCaptcha && $scope.userLoginInfo.oldEmailCaptcha.length >= 4){
				$scope.userLoginInfo.key = response.data.data.email;
				var data = {
					"key":$scope.userLoginInfo.key,
					"captcha":$scope.userLoginInfo.oldEmailCaptcha
				};
				// console.log(data);
				$http({
					method: 'POST',
					url: URLInit.validateCaptcha,
					data: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					}
				}).success(function(data) {
					if(data.flag == '000000') {
						$scope.isValidateOldEmail = "true";
						$scope.result2.flag='000000';
					} else {
						$scope.isValidateOldEmail = "";
						$scope.result2 = data;
					}

				}).error(function(data) {

				});
			}
		};
		//校验新邮箱验证码
		$scope.newEmailValidateCaptcha = function () {
			if ($scope.userLoginInfo.newEmailCaptcha && $scope.userLoginInfo.newEmailCaptcha.length >= 4){
				var data = {
					"key":$scope.userLoginInfo.email,
					"captcha":$scope.userLoginInfo.newEmailCaptcha
				};
				// console.log(data);
				$http({
					method: 'POST',
					url: URLInit.validateCaptcha,
					data: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					}
				}).success(function(data) {
					if(data.flag == '000000') {
						$scope.isValidateNewEmail = "true";
						$scope.result3.flag='000000';
					} else {
						$scope.isValidateNewEmail = "";
						$scope.result3 = data;
					}

				}).error(function(data) {

				});
			}
		};
		$scope.mobileExist = 'true';
		$scope.emailExist = 'true';
		//校验新手机是否已存在
		$scope.mobileIsExist = function () {
			if ($scope.userLoginInfo.mobile.length = 11){
				$http({
					method: 'POST',
					url: URLInit.validate,
					data: "emailormobile=" + $scope.userLoginInfo.mobile,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).success(function(data) {
					if(data.flag == '000000') {
						$scope.mobileExist = 'false';
						$scope.mobileRe.flag='000000';
					} else {
						$scope.mobileRe = data;
						$scope.mobileExist = 'true';
					}

				}).error(function(data) {

				});
			}
		};
		//校验新邮箱是否已存在
		$scope.emailIsExist = function () {
			if ($scope.userLoginInfo.email.length >= 4){
				$http({
					method: 'POST',
					url: URLInit.validate,
					data: "emailormobile=" + $scope.userLoginInfo.email,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).success(function(data) {
					if(data.flag == '000000') {
						$scope.emailExist = 'false';
						$scope.emailRe.flag='000000';
					} else {
						$scope.emailExist = 'true';
						$scope.emailRe = data;
					}

				}).error(function(data) {

				});
			}
		};

		//保存手机按钮
		$scope.saveMobileChange = function() {
			$scope.userLoginInfo = {
				"openid":$scope.openid,
				"mobile":$scope.userLoginInfo.mobile
			};
			$http({
				method: 'POST',
				url: '/onecloud-manager/user/userinfo/auth',
				data: JSON.stringify($scope.userLoginInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data) {
				if(data.flag == '000000') {
					$rootScope.mobile=$scope.userLoginInfo.mobile;
					$scope.userLoginInfo = "";
				} else {
					alert(data.desc);
				}

			}).error(function(data) {

			});

		};
		//保存邮箱按钮
		$scope.saveEmailChange = function() {
			$scope.userLoginInfo = {
				"openid":$scope.openid,
				"email":$scope.userLoginInfo.email
			};
			$http({
				method: 'POST',
				url: URLInit.auth,
				data: JSON.stringify($scope.userLoginInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data) {
				if(data.flag == '000000') {
					$scope.handelClose();
					alert("修改成功,请刷新网页！");
					$scope.userLoginInfo = "";
				} else {
					alert(data.desc);
				}

			}).error(function(data) {

			});

		};
	});
	//修改密码
	$scope.step = 'first';
	//初始获取验证码按钮置灰
	$rootScope.btnGrey = 'true';
	//校验用户手机号是否已经存在
	$scope.checkUser = function () {
		$scope.wrong = 'false';
		if (/^1[34578][0-9]\d{8}$/.test($scope.userMobile)) {
			var data = {
				emailormobile:$scope.userMobile
			};
			$http({
				method : 'POST',
				url : '/onecloud-manager/user/validate',
				data : $.param(data),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function (data) {
				if(data.flag == '000000'){
					$scope.wrong = 'false';
					$rootScope.btnGrey = 'false';
				}else {
					$scope.wrong = 'true';
					$scope.errorMsg = data.desc;
				}
			}).error(function (data) {
				$scope.netError = 'true';
				$scope.errorMsg = "发送请求失败，请重试！";
			})
		}else {
			$rootScope.btnGrey = 'true';
			$scope.wrong = 'true';
			$scope.errorMsg = "手机号格式不正确";
		}
	};
	//获取验证码按钮
	$scope.captchaBtn = '获取验证码';
	$scope.getCaptcha = function () {
		var data = {
			username:$scope.userMobile
		};
		$http({
			method : 'POST',
			url : URLInit.getCaptcha,
			data : JSON.stringify(data),
			headers : { 'Content-Type': 'application/json' }
		}).success(function (data) {
			if(data.flag == '000000'){
				$rootScope.btnGrey = 'count';
				$scope.nextBtn ='true';
				$scope.wrong = 'true';
				$scope.errorMsg = "发送成功！"
			}else {
				console.log(data)
			}
		}).error(function (data) {
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		})
	};
	//校验验证码是否正确
	$scope.userMobile = '';
	$scope.userCaptcha = '';
	$scope.checkCaptcha = function () {
		var data = {
			key: $scope.userMobile,
			captcha: $scope.userCaptcha
		};
		$http({
			method : 'POST',
			url : '/onecloud-portal/captcha/validateCaptcha',
			data : JSON.stringify(data),
			headers : { 'Content-Type': 'application/json' }
		}).success(function (data) {
			if(data.flag == '000000'){
				$scope.wrong = 'false';
				$scope.step = 'second';
				$scope.nextBtn = 'hide';
			}else {
				$scope.wrong = 'true';
				$scope.errorMsg = data.desc;
			}
		}).error(function (data) {
			$scope.netError = 'true';
			$scope.errorMsg = "发送请求失败，请重试！";
		})
	};
	//验证新密码是否符合规则
	$scope.wrongs = 'false';
	$scope.twoPassword = {};
	$scope.formData = {};
	$scope.logout = 'false';
	$scope.formData.password = '';
	$scope.twoPassword.password = '';
	$scope.checkReset = function () {
		$scope.formData.username = $scope.userMobile;
		$scope.formData.captcha = $scope.userCaptcha;
		if($scope.twoPassword.password =='' || $scope.formData.password == ''){
			$scope.wrongs = 'true';
			$scope.errorMsg = "请把密码填写完整！";
		}
		else if ($scope.formData.password.length >= 8 && /^[a-zA-Z0-9]+$/.test($scope.formData.password)){
			if($scope.twoPassword.password == $scope.formData.password){
				$http({
					method : 'POST',
					url : '/onecloud-portal/register/resetpassword',
					data : JSON.stringify($scope.formData),
					headers : { 'Content-Type': 'application/json' }
				}).success(function (data) {
					if(data.flag == '000000'){
						$scope.netError = 'true';
						$scope.logout = 'true';
						$scope.errorMsg = "修改成功，请点击确定重新登录！";
					}else {
						$scope.wrongs = 'true';
						$scope.errorMsg = data.desc;
					}
				}).error(function (data) {
					$scope.netError = 'true';
					$scope.errorMsg = "发送请求失败，请重试！";
				})
			}else{
				$scope.wrongs = 'true';
				$scope.errorMsg = "两次密码输入不一致，请重新输入！";
			}

		} else{
			$scope.wrongs = 'true';
			$scope.errorMsg = "请输入8-16位字母或数字组合！";
		}
	};
}]);
app.controller('messageCtrl',['DTOptionsBuilder','DTColumnDefBuilder','DTColumnBuilder', '$rootScope','$scope','$http','$interval',"$compile",function(DTOptionsBuilder,DTColumnDefBuilder,DTColumnBuilder,$rootScope,$scope,$http){
	$scope.getUnreadForm={};
	$scope.getReadForm={};
	$scope.readyToLoadRead=true;
	$scope.readyToLoadUnread=true;
	$scope.loadUnreadFail=false;
	$scope.loadReadFail=false;
	$scope.unreadPageSize=10;
	$scope.readPageSize=10;
	$http({
		method: 'GET',
		url: URLInit.userinfo+"?DT="+new Date().getTime()
	}).success(function(response) {
		if(response.flag=='000000'){
			$rootScope.userId=response.data.id;
			getUnread(response.data.id);
		}else{
			$scope.readyToLoadRead=false;
			$scope.readyToLoadUnread=false;
			$scope.loadUnreadFail=true;
			$scope.loadUnreadFailMessage="获取用户信息失败导致消息列表加载失败！";
			$scope.loadReadFail=true;
			$scope.loadReadFailMessage="获取用户信息失败导致消息列表加载失败！";
		}
		$scope.goTargetUnreadPage = function(page){
			$scope.unreadPageNumber = page;
			getUnread(response.data.id);
		};
		$scope.goTargetReadPage = function(page){
			$scope.readPageNumber = page;
			getRead(response.data.id);
		};
		$scope.goUnreadPage = function(){
			$scope.unreadPageNumber = 1;
			getUnread(response.data.id);
		};
		$scope.goReadPage = function(){
			$scope.readPageNumber = 1;
			getRead(response.data.id);
		};

	}).error(function(response) {
		$scope.loadUnreadFail=true;
		$scope.loadUnreadFailMessage="网络错误导致消息列表加载失败！";
		$scope.loadReadFail=true;
		$scope.loadReadFailMessage="网络错误导致消息列表加载失败！";
	});
	$scope.showUnread=function(unread){
		//console.log(unread);
		$scope.detailMessageTitle=unread.title;
		$scope.detailMessageContent=unread.content;
		//调用主控制器的方法设消息为已读
		$rootScope.setRead(unread.id);
		getUnread($rootScope.userId);
	};
	$scope.showRead=function(read){
		//console.log(read);
		$scope.detailMessageTitle=read.title;
		$scope.detailMessageContent=read.content;
	};
	function getUnread(uid){
		$scope.unreadInfo=[];
		$scope.unreadInfoNull=false;
		$scope.loadUnreadFail=false;
		$scope.readyToLoadUnread=true;
		if($scope.unreadPageNumber==undefined){
			$scope.unreadPageNumber=1;
		}
		var currentCount=1+($scope.unreadPageSize*$scope.unreadPageNumber)-10;//设置序号
		$scope.getUnreadForm.pageNum=$scope.unreadPageNumber;
		$scope.getUnreadForm.pageSize=10;
		//console.log($scope.getUnreadForm);
		$http({
			method: 'GET',
			url: URLInit.unreadMes+uid+"&pageSize=10&pageNum="+$scope.getUnreadForm.pageNum+"&DT="+new Date().getTime()
		}).success(function(response) {
			$scope.readyToLoadUnread=false;
			if (response.flag==="000000") {
				$scope.unreadPages = response.data.navigatepageNums;
				$scope.unreadTotalPage=response.data.lastPage;
				if(response.data.list.length>0){
					$scope.unreadInfo=response.data.list;
					for(var i=0;i<response.data.list.length;i++){
						if(response.data.list[i].createtime==null){
							response.data.list[i].createtime="无时间信息"
						}else{
							var newDate = new Date();
							newDate.setTime(response.data.list[i].createtime);
							response.data.list[i].createtime=newDate.format('yyyy/MM/dd h:m:s');
						}
						response.data.list[i].count=currentCount;
						currentCount++;
					}
				}else{
					$scope.unreadInfo=[];
					$scope.unreadInfoNull=true;
				}
			} else{
				$scope.loadUnreadFail=true;
				$scope.loadUnreadFailMessage="获取数据失败！错误描述："+response.desc;
			}
		}).error(function(response) {
			$scope.readyToLoadUnread=false;
			$scope.loadUnreadFail=true;
			$scope.loadUnreadFailMessage="获取数据失败,请检测网络!";
		});
	}
	function getRead(uid){
		$scope.readInfo=[];
		$scope.readInfoNull=false;
		$scope.loadReadFail=false;
		$scope.readyToLoadRead=true;
		if($scope.readPageNumber==undefined){
			$scope.readPageNumber=1;
		}
		var currentCount=1+($scope.readPageSize*$scope.readPageNumber)-10;//设置序号
		$scope.getReadForm.pageNum=$scope.readPageNumber;
		$scope.getReadForm.pageSize=10;
		//console.log($scope.getReadForm);
		$http({
			method: 'GET',
			url: URLInit.readMes+uid+"&pageSize=10&pageNum="+$scope.getReadForm.pageNum+"&DT="+new Date().getTime()
		}).success(function(response) {
			$scope.readyToLoadRead=false;
			if (response.flag==="000000") {
				$scope.readPages = response.data.navigatepageNums;
				$scope.readTotalPage=response.data.lastPage;
				if(response.data.list.length>0){
					$scope.readInfo=response.data.list;
					for(var i=0;i<response.data.list.length;i++){
						if(response.data.list[i].createtime==null){
							response.data.list[i].createtime="无时间信息"
						}else{
							var newDate = new Date();
							newDate.setTime(response.data.list[i].createtime);
							response.data.list[i].createtime=newDate.format('yyyy/MM/dd h:m:s');
						}
						response.data.list[i].count=currentCount;
						currentCount++;
					}
				}else{
					$scope.unreadInfo=[];
					$scope.readInfoNull=true;
				}
			} else{
				$scope.loadReadFail=true;
				$scope.loadReadFailMessage="获取数据失败！错误描述："+response.desc;
			}
		}).error(function(response) {
			$scope.readyToLoadRead=false;
			$scope.loadReadFail=true;
			$scope.loadReadFailMessage="获取数据失败,请检测网络!";
		});
	}
}]);
app.directive('timerbutton', function($timeout, $interval,$rootScope){
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			showTimer: '=',
			onClick: '&',
			timeout: '='
		},
		link: function(scope, element, attrs){
			scope.timer = true;
			scope.timerCount = scope.timeout;
			var counter = $interval(function(){
				scope.timerCount = scope.timerCount - 1000;
			}, 1000);

			$timeout(function(){
				scope.timer = false;
				$interval.cancel(counter);
				scope.showTimer = false;
				$rootScope.sendCode = 'no';
				$rootScope.btnGrey = 'false';
				$rootScope.sendCode1 = 'no';
				$rootScope.sendCode2 = 'no';
				$rootScope.sendCode3 = 'no';
			}, scope.timeout);
		},
		template: '<button type="button" class="btn width-150 btn-primary btn-code fr" ng-click="onClick()" ng-disabled="timer"><span ng-transclude></span>&nbsp<span ng-if="showTimer">({{ timerCount / 1000 }}s)</span></button>'
	};
});
app.directive('select2', function (select2Query) {
	return {
		restrict: 'A',
		scope: {
			config: '=',
			ngModel: '=',
			select2Model: '='
		},
		link: function (scope, element, attrs) {
			// 初始化
			var tagName = element[0].tagName,
				config = {
					allowClear: true,
					multiple: !!attrs.multiple,
					placeholder: attrs.placeholder || ' '   // 修复不出现删除按钮的情况
				};

			// 生成select
			if(tagName === 'SELECT') {
				// 初始化
				var $element = $(element);
				delete config.multiple;
				$element
					.prepend('<option value=""></option>')
					.val('')
					.select2(config);

				// model - view
				scope.$watch('ngModel', function (newVal) {
					setTimeout(function () {
						$element.find('[value^="?"]').remove();    // 清除错误的数据
						$element.select2('val', newVal);
					},0);
				}, true);
				return false;
			}

			// 处理input
			if(tagName === 'INPUT') {
				// 初始化
				var $element = $(element);

				// 获取内置配置
				if(attrs.query) {
					scope.config = select2Query[attrs.query]();
				}

				// 动态生成select2
				scope.$watch('config', function () {
					angular.extend(config, scope.config);
					$element.select2('destroy').select2(config);
				}, true);

				// view - model
				$element.on('change', function () {
					scope.$apply(function () {
						scope.select2Model = $element.select2('data');
					});
				});

				// model - view
				scope.$watch('select2Model', function (newVal) {
					$element.select2('data', newVal);
				}, true);

				// model - view
				scope.$watch('ngModel', function (newVal) {
					// 跳过ajax方式以及多选情况
					if(config.ajax || config.multiple) { return false }

					$element.select2('val', newVal);
				}, true);
			}
		}
	}
});
app.directive('placehold', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attr, ctrl) {
			var value;
			var placehold = function () {
				element.val(attr.placehold)
			};
			var unplacehold = function () {
				element.val('');
			};
			scope.$watch(attr.ngModel, function (val) {
				value = val || '';
			});
			element.bind('focus', function () {
				if(value == '') unplacehold();
			});
			element.bind('blur', function () {
				if (element.val() == '') placehold();
			});
			ctrl.$formatters.unshift(function (val) {
				if (!val) {
					placehold();
					value = '';
					return attr.placehold;
				}
				return val;
			});
		}
	};
});
app.directive("fileinput", [function () {
	return {
		restrict:'AE',
		scope: {
			fileread: "="
		},
		template:'<input type="file" ng-model="fileread"  id="import" name="import" class="hide">',
		link: function (scope, element, attributes) {
			element.bind("change", function (changeEvent) {
				var reader = new FileReader();
				reader.onload = function (loadEvent) {
					scope.$apply(function () {
						scope.fileread = loadEvent.target.result;
					});
				};
				reader.readAsDataURL(changeEvent.target.files[0]);
				scope.fileread = changeEvent.target.files[0];
				// console.log(scope.fileread);
			});
		}
	}
}]);
app.directive('toggleClass', function(){
	return {
		restrict: 'A',
		scope: {
			toggleClass: '@'
		},
		link: function($scope, $element){
			$element.on('click', function(){
				$element.toggleClass($scope.toggleClass);
			});
		}
	};
});
app.factory('select2Query', function ($timeout) {
	return {
		enterBusinessAJAX: function () {
			var config = {
				minimumInputLength: 2,
				ajax: {
					type:"POST",
					url: "/onecloud-manager/company/fuzzyQueryByName",
					dataType: 'json',
					data: function (inputData) {
						return {
							//用户输入用于检验的企业名称
							name: inputData
						};
					},
					results: function (data, page) {
						console.log(data.data);
						return {results: data.data};
					}
				}
			};
			return config;
		}
	}
});
$(document).ready(function(){
	
	$oLis=$(".main-navigation-menu").children("li");
	$oLis.each(function(){
		$(this).bind('mouseleave',function () {
			$(this).removeClass("hover");
		});
	});
	/*datatables*/
	if (typeof Object.create != 'function') {
		Object.create = (function(undefined) {
			var Temp = function() {};
			return function (prototype, propertiesObject) {
				if(prototype !== Object(prototype) && prototype !== null) {
					throw TypeError('Argument must be an object, or null');
				}
				Temp.prototype = prototype || {};
				var result = new Temp();
				Temp.prototype = null;
				if (propertiesObject !== undefined) {
					Object.defineProperties(result, propertiesObject);
				}

				// to imitate the case of Object.create(null)
				if(prototype === null) {
					result.__proto__ = null;
				}
				return result;
			};
		})();
	}
	/**
	 *删除数组指定下标或指定对象
	 */
	Array.prototype.remove=function(obj){
		for(var i =0;i <this.length;i++){
			var temp = this[i];
			if(!isNaN(obj)){
				temp=i;
			}
			if(temp == obj){
				for(var j = i;j <this.length;j++){
					this[j]=this[j+1];
				}
				this.length = this.length-1;
			}
		}
	};
});
function banBackSpace(e){
	var ev = e || window.event;//获取event对象
	var obj = ev.target || ev.srcElement;//获取事件源
	var t = obj.type || obj.getAttribute('type');//获取事件源类型
	//获取作为判断条件的事件类型
	var vReadOnly = obj.getAttribute('readonly');
	var vEnabled = obj.getAttribute('enabled');
	//处理null值情况
	vReadOnly = (vReadOnly == null) ? false : vReadOnly;
	vEnabled = (vEnabled == null) ? true : vEnabled;

	//当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	//并且readonly属性为true或enabled属性为false的，则退格键失效
	var flag1=!!(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")
	&& (vReadOnly==true || vEnabled!=true));
	//当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2=!!(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea");
	//判断
	if(flag2){
		return false;
	}
	if(flag1){
		return false;
	}
}
//禁止后退键 作用于Firefox、Opera
document.onkeypress=banBackSpace;
//禁止后退键 作用于IE、Chrome
document.onkeydown=banBackSpace;