var app = angular.module('app', ['ui.router','angularFileUpload','datatables','ngResource','datatables.light-columnfilter']);
var userRightsRes,globalProductline;
var loginUrl = window.location.href;
var loginArr = loginUrl.split(';');
//接口信息
var URLInit={
	/*--获取个人信息--*/
	"userinfo":"/onecloud-verify-server/user/userinfo"
	/*--公告部分--*/
	,"noticeList":"/onecloud-verify-server/notice/list"
	,"noticeStatus":"/onecloud-verify-server/notice/updateStatus"
	,"noticeDel":"/onecloud-verify-server/notice/delete"
	,"noticeSave":"/onecloud-verify-server/notice/save"
	,"noticeUpdate":"/onecloud-verify-server/notice/update"
	/*--企业审核部分--*/
	// ,"companyInfoList":"/onecloud-manager/company/getCompanyInfoList"
	,"auditList":"/onecloud-verify-server/company/auditList"
	,"auditCompany":"/onecloud-verify-server/company/auditCompany"
	,"selectByCompanyId":"/onecloud-verify-server/companyProduct/selectByCompanyId"
	,"getCompanyInfo":"/onecloud-verify-server/company/getCompanyInfo?companyId="
	/*--白名单部分--*/
	,"getProLineList":"/onecloud-verify-server/phoneLimit/getProductLineList?pageSize=10000&pageNum=1"
	,"getPrdLineByUserid":"/onecloud-verify-server/whiteList/getPrdLineByUserid"
	,"savePhoneLimit":"/onecloud-verify-server/phoneLimit/savePhoneLimit"
	,"wlUpdate":"/onecloud-verify-server/whiteList/update"
	,"getPhoneNumById":"/onecloud-verify-server/whiteList/getPhoneNumById"
	,"phoneSave":"/onecloud-verify-server/whiteList/save"
	,"phoneDel":"/onecloud-verify-server/whiteList/del"
	,"findByMobile":"/onecloud-verify-server/whiteList/findByMobile"
	/*--角色权限部分--*/
	,"roleSave":"/onecloud-verify-server/role/save"
	,"roleList":"/onecloud-verify-server/role/list"
	,"menuList":"/onecloud-verify-server/role/menuList"
	,"menuByRoleid":"/onecloud-verify-server/role/menuByRoleid?id="
	,"prdLineByRoleid":"/onecloud-verify-server/role/getRolePrdLineByRoleId?roleid="
	,"saveRoleMenu":"/onecloud-verify-server/role/saveRoleMenu"
	,"saveRolePrdLine":"/onecloud-verify-server/role/saveRolePrdLine"
	,"roleDel":"/onecloud-verify-server/role/delete"
	,"saveUserRole":"/onecloud-verify-server/role/saveUserRole"
	,"findUserByRoleid":"/onecloud-verify-server/role/findUserByRoleid?roleid="
	,"deleteUserRole":"/onecloud-verify-server/role/batchDeleteUserRole"
	,"findUserRights":"/onecloud-verify-server/role/findUserRights"
	/*--用户激活码--*/
	,"instanceuserList":"/onecloud-verify-server/instanceuser/list"
	,"getactivecode":"/onecloud-verify-server/instanceuser/getactivecode"
	,"sendactivecode":"/onecloud-verify-server/instanceuser/sendactivecode"
	/*--防伪验证--*/
	,"antiPiracyDataList":"/onecloud-verify-server/antiPiracyData/list"
	,"listById":"/onecloud-verify-server/antiPiracyData/listById"
	,"load":"/onecloud-verify-server/antiPiracyData/load"
	,"deal":"/onecloud-verify-server/antiPiracyData/deal"
	/*--特殊设置--*/
	,"auditedList":"/onecloud-verify-server/company/auditedList"
	,"updateConfidential":"/onecloud-verify-server/company/updateConfidential"
};
//格式化时间函数
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
angular.element(document).ready(function() {
	//获取权限菜单后，再动态启动angular的App
	$.ajax({
		type : "GET",
		url : URLInit.findUserRights+"?DT="+new Date().getTime(),
		success : function(data) {
			if(typeof(data)=='string'){
				if(data.indexOf('请输入您的手机号和密码来登录') !== -1){
					//如果返回的文本包含"登陆页面"，就跳转到登陆页面
					window.location.href= loginArr[0];
					return;
				}
			}
			if(data.flag=='000000'){
				userRightsRes = data;
				var userRightsResCbList=[];
				if(userRightsRes.data.dataRoleCustomobjectList.length>0){
					for (var i = 0; i<userRightsRes.data.dataRoleCustomobjectList.length;i++){
						userRightsResCbList.push(userRightsRes.data.dataRoleCustomobjectList[i].customobjid);
					}
				}
				//将数据权限保存在全局变量中以供调用
				globalProductline=userRightsResCbList.join(",");
				//根据获取的菜单权限配置路由
				if(userRightsRes.data.menuList.length==0){
					app.config(function($stateProvider,$locationProvider, $urlRouterProvider) {
						$urlRouterProvider.otherwise('/home');
						//没有菜单的时候不分配相关的路由
						$stateProvider
							.state('home', {
								url:'/home',
								templateUrl: 'system-manager/home.html'
							})
					});
				}
				else{
					//将获取的第一个菜单项设置为默认菜单
					var currentStatus="/"+userRightsRes.data.menuList[0].url;
					app.config(function($stateProvider,$locationProvider, $urlRouterProvider) {
						$urlRouterProvider.otherwise(currentStatus);
						$stateProvider
							.state('home', {
								url:'/home',
								templateUrl: 'system-manager/home.html'
							})
							.state('announcement', {
								url:'/announcement',
								templateUrl: 'system-manager/announcement.html',
								controller: 'announcementCtrl as app'
							})
							.state('certificationAudit', {
								url:'/certificationAudit',
								templateUrl: 'system-manager/certificationAudit.html',
								controller: 'certificationAuditCtrl as app'
							})
							.state('whiteList', {
								url:'/whiteList',
								templateUrl: 'system-manager/whiteList.html',
								controller: 'whiteListCtrl as app'
							})
							.state('rolePermission', {
								url:'/rolePermission',
								templateUrl: 'system-manager/rolePermission.html',
								controller: 'rolePermissionCtrl as app'
							})
							.state('activationCode', {
								url:'/activationCode',
								templateUrl: 'system-manager/activationCode.html',
								controller: 'activationCodeCtrl as app'
							})
							.state('verification', {
								url:'/verification',
								templateUrl: 'system-manager/verification.html',
								controller: 'verificationCtrl as app'
							})
							.state('specialSettings', {
								url:'/specialSettings',
								templateUrl: 'system-manager/specialSettings.html',
								controller: 'specialSettingsCtrl as app'
							})
					});
				}
				angular.bootstrap(document, ['app']);
				//页面加载完成，可设置菜单样式
				$oLis=$(".main-navigation-menu").children("li");
				$oLis.each(function(){
					$(this).bind('mouseleave',function () {
						$(this).removeClass("hover");
					});
				});
				var locationHash=window.location.hash;
				var checkVal;
				function changeCssStyle(name){
					$oLis.each(function(){
						if($(this).attr("data-content")==name){
							$(this).siblings().removeClass("active open");
							$(this).addClass("active open");
						}
					});
				}
				if(/announcement/.test(locationHash)){
					checkVal="发布公告";
					changeCssStyle(checkVal);
				}else if(/certificationAudit/.test(locationHash)){
					checkVal="企业认证审核";
					changeCssStyle(checkVal);
				}else if(/whiteList/.test(locationHash)){
					checkVal="用户白名单";
					changeCssStyle(checkVal);
				}else if(/rolePermission/.test(locationHash)){
					checkVal="角色权限";
					changeCssStyle(checkVal);
				}else if(/activationCode/.test(locationHash)){
					checkVal="用户激活码";
					changeCssStyle(checkVal);
				}else if(/verification/.test(locationHash)){
					checkVal="防伪验证";
					changeCssStyle(checkVal);
				}else if(/specialSettings/.test(locationHash)){
					checkVal="保密单位";
					changeCssStyle(checkVal);
				}
				$oLis.on("click",function(){
					$(this).siblings().removeClass("active open");
					$(this).addClass("active open");
				});
			}else{
				//接口返回错误跳转登录
				window.location.href= loginArr[0];
			}
		},
		error:function(){
			//网络或者系统错误跳转登录
			window.location.href= loginArr[0];
		}
	});
});
app.config(function($httpProvider){
	$httpProvider.interceptors.push("yourInterceptors");
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
					window.location.href= loginArr[0];
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
app.run(function(DTDefaultOptions,$rootScope,$templateCache,permissions) {
	permissions.setPermissions(userRightsRes);
	//DTDefaultOptions用于设置DT默认选项
	DTDefaultOptions.setDOM('rti').setLanguage({
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
			//console.log("清除了缓存");
			$templateCache.removeAll();
		})
});
app.controller('appCtrl',function($scope,$http,$rootScope){
	$rootScope.getCompanyInfo=function getCompanyInfo(busId){
		//每次获取企业信息前先重置
		$rootScope.detailBusInfo={};
		$http({
			method: "GET",
			url: URLInit.getCompanyInfo+busId+"&DT="+new Date().getTime()
		}).success(function(response) {
			if (response.flag==="000000") {
				$rootScope.detailBusInfo=response.data;
				if(response.data!=null){
					$rootScope.busInfoNull=false;
					if($rootScope.detailBusInfo.confidential=='1'){
						$rootScope.detailBusInfo.showConfidential="是";
					}else if($rootScope.detailBusInfo.confidential=='0'){
						$rootScope.detailBusInfo.showConfidential="否";
					}
					$rootScope.detailBusInfo.virtual=='1'?$rootScope.detailBusInfo.showVirtual="是":$rootScope.detailBusInfo.showVirtual="否";
					$rootScope.detailBusInfo.partner=='1'?$rootScope.detailBusInfo.showPartner="是":$rootScope.detailBusInfo.showPartner="否";
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
				}else{
					//查询到的企业信息为空
					$rootScope.busInfoNull=true;
				}
			}else {
				$rootScope.busInfoNull=true;
			}
		})
	};
	$scope.services=userRightsRes.data.userInfoList[0];
	$rootScope.enterpriseTransferId=$scope.services.id;
	$scope.oldName = $scope.services.nickname;
	for(var i in $scope.services) {
		if($scope.services[i] == null) {
			$scope.isNull = " ";
		}
	}
	$rootScope.headPicUrl = $scope.services.headPicUrl;
	if($rootScope.headPicUrl == null) {
		$rootScope.headPicUrl = "assets/images/media-user.png";
	}
	$rootScope.nickname = $scope.services.nickname;
	$rootScope.birthday = $scope.services.birthday;
	$rootScope.sex = $scope.services.sex;
	$rootScope.telphone = $scope.services.telphone;
	$rootScope.address = $scope.services.address;
	$rootScope.mobile = $scope.services.mobile;
	//查权限菜单
	$scope.menuLists=userRightsRes.data.menuList;
	if($scope.menuLists.length==0){
		$rootScope.menuListsIsNull=true;
	}else{
		$rootScope.menuListsIsNull=false;
		$scope.menuLists.forEach(function(item){
			if(item.url=="announcement"){
				$rootScope.announcementIs=true;
			}else if(item.url=="certificationAudit"){
				$rootScope.certificationAuditIs=true;
			}else if(item.url=="specialSettings"){
				$rootScope.specialSettingsIs=true;
			}else if(item.url=="whiteList"){
				$rootScope.whiteListIs=true;
			}else if(item.url=="rolePermission"){
				$rootScope.rolePermissionIs=true;
			}else if(item.url=="activationCode"){
				$rootScope.activationCodeIs=true;
			}else if(item.url=="verification"){
				$rootScope.verificationIs=true;
			}
		});
	}
});
app.controller('announcementCtrl',function(DTOptionsBuilder,DTColumnDefBuilder, DTColumnBuilder, $rootScope, $scope, $http, $q,$compile){
	var vm = this;
	$scope.noticeList=[];
	$scope.pageSizeForm={};
	$scope.pageSizeForm.nlPageSize="10";
	$scope.nlPageNumber=1;//第一次加载第一页
	vm.dtOptions = DTOptionsBuilder
		.fromFnPromise(function() {
			var defer = $q.defer();
			$scope.goTargetNlPage = function(page){
				$scope.nlPageNumber = page;
				reloadData();
			};
			//请求公告列表信息
			function getList(){
				var orderByCount=1;
				$http({
					method: 'GET',
					url: URLInit.noticeList+"?pageSize="+$scope.pageSizeForm.nlPageSize+"&pageNum="+$scope.nlPageNumber+"&DT="+new Date().getTime()
				}).success(function(response) {
					//console.log(response);
					if (response.flag==="000000") {
						$scope.nlPages = response.data.navigatepageNums;
						$scope.nlTotalPage=response.data.lastPage;
						$scope.noticeList=[];
						for(var i=0;i<response.data.list.length;i++){
							response.data.list[i].count=orderByCount+((response.data.pageNum)*($scope.pageSizeForm.nlPageSize)-($scope.pageSizeForm.nlPageSize));
							orderByCount++;
							if(response.data.list[i].reportTime!=null){
								var newDate = new Date();
								newDate.setTime(response.data.list[i].reportTime);
								response.data.list[i].formatTime=newDate.format('yyyy/MM/dd h:m:s');
							}else{
								response.data.list[i].formatTime="无时间信息"
							}
							$scope.noticeList.push(response.data.list[i]);
						}
					} else{
						console.log(response.desc);
					}
					//console.log($scope.noticeList);
					defer.resolve($scope.noticeList);
				}).error(function(response, status) {
					$scope.status = status;
				});
			}
			getList();
			return defer.promise;
		})
		.withOption('processing', true)
		.withOption('stateSave', true)

	//重新设置第4、5列
	vm.dtColumnDefs = [
		DTColumnDefBuilder.newColumnDef(3).renderWith(function (data, type, full) {
			var html = '<div class="dropdown">'+
				'<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'+
				'操作'+
				'<span class="caret margin-left-10"></span>'+
				'</button>'+
				'<ul class="dropdown-menu">'+
				'<li><a ng-click="operationInfo('+"'"+full.id+"'"+')">编辑</a></li>'+
				'<li><a ng-click="deleteInfo('+"'"+full.id+"'"+')">删除</a></li>'+
				'</ul>'+
				'</div>';
			return html;
		})
		,DTColumnDefBuilder.newColumnDef(4).renderWith(function (data, type, full) {
			var html='';
			if(full.status==null||full.status==0){
				html =
					'<button class="btn btn-default" ' +
					'type="button" ng-click="onOrOffInfo('+"'"+full.id+"'"+','+"'"+full.status+"'"+')">'+
					'发布'+ '</button>';
			}else if(full.status==1){
				html =
					'<button class="btn btn-primary" ' +
					'type="button" ng-click="onOrOffInfo('+"'"+full.id+"'"+','+"'"+full.status+"'"+')">'+
					'下线'+ '</button>';
			}
			return html;
		})
	];
	//配置可见列表
	vm.dtColumns = [
		DTColumnBuilder.newColumn('count').withTitle('序号'),
		DTColumnBuilder.newColumn('title').withTitle('公告标题'),
		DTColumnBuilder.newColumn('formatTime').withTitle('发布时间')
	];
	vm.dtOptions.withOption('fnRowCallback',
		function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			$compile(nRow)($scope);
		});

	//重新加载
	vm.dtInstance = {};
	vm.reloadData = reloadData;
	function reloadData () {
		vm.dtInstance.reloadData();
	}
	//打开编辑器
	$scope.openRichText=function(){
		$scope.openRichTextBox="true";
		//因为是公用的同一个编辑器，打开的时候首先清空内容
		$scope.editorFormData={};
		window.wangEditor.initContent="";
	};
	//关闭编辑器
	$scope.closeRichText=function(){
		$scope.openRichTextBox="false";
		//因为是公用的同一个编辑器，关闭的时候再次清空内容
		$scope.editorFormData={};
		window.wangEditor.initContent="";
	};
	//用于保存公告内容：包括标题、内容
	$scope.editorFormData={};
	//编辑公告
	$scope.operationInfo=function(dataID){
		//点击了编辑，把公告的id赋给当前的编辑器
		$scope.editorFormData.id=dataID;
		$scope.openRichTextBox="true";
		//筛选出当前公告
		for(var i=0;i<$scope.noticeList.length;i++){
			if($scope.noticeList[i].id==dataID){
				$scope.editorFormData.title=$scope.noticeList[i].title;
				$scope.editorFormData.content=$scope.noticeList[i].content;
				window.wangEditor.initContent=$scope.noticeList[i].content;
			}
		}
	};
	//公告发布
	$scope.onOrOffInfo=function(dataID,status){
		if(status==1){
			$scope.sendData={"id":dataID,"status" : 0}
		}else if(status=="null"||status==0){
			$scope.sendData={"id":dataID,"status" : 1}
		}
		$http({
			method: 'POST',
			url: URLInit.noticeStatus,
			data: $scope.sendData,
			headers : {'Content-Type': 'application/json'}
		}).success(function(response) {
			if (response.flag==="000000") {
				$scope.noticeList=[];
				reloadData();
			}
		}).error(function(response, status) {
			$scope.status = status;
		});
	};
	//确定删除公告
	$scope.checkToDelete=function(){
		$http({
			method: 'POST',
			url: URLInit.noticeDel,
			data: {"id":$scope.noticeId},
			headers : {'Content-Type': 'application/json'}
		}).success(function(response) {
			if (response.flag==="000000") {
				$scope.noticeList=[];
				reloadData();
			} else{}
		}).error(function(response, status) {
			$scope.status = status;
		});
		$scope.deleteNoticeBox="CLOSE";
	};
	//取消删除操作
	$scope.cancelToDelete=function(){
		$scope.deleteNoticeBox="CLOSE";
	};
	//删除公告
	$scope.deleteInfo=function(dataID){
		//dataID保存了当前点击的公告的id
		$scope.deleteNoticeBox="OPEN";
		$scope.noticeId=dataID;
	};
	//保存公告
	$scope.sendEditorContent=function(){
		//console.log($scope.editorFormData);
		if($scope.editorFormData.content===undefined){
			alert("保存失败，公告内容不得为空!")
		}else{
			if($scope.editorFormData.id===undefined){
				//console.log("没有id，这是新建的公告");
				//console.log("将要新建的公告："+$scope.editorFormData);
				$http({
					method: 'POST',
					url: URLInit.noticeSave,
					data: $scope.editorFormData,
					headers : { 'Content-Type': 'application/json' }
				}).success(function(response) {
					if (response.flag==="000000") {
						$scope.noticeList=[];
						reloadData();
						$scope.openRichTextBox="false";
					} else{
						console.log(response.desc);
					}
				}).error(function(response, status) {
					$scope.status = status;
				});
			}else{
				//console.log("id存在，这是在更新公告");
				//console.log("将要提交的更新："+ $scope.editorFormData);
				$http({
					method: 'POST',
					url: URLInit.noticeUpdate,
					data: $scope.editorFormData,
					headers : { 'Content-Type': 'application/json' }
				}).success(function(response) {
					if (response.flag==="000000") {
						$scope.noticeList=[];
						reloadData();
						$scope.openRichTextBox="false";
					} else{
						console.log(response.desc);
					}
				}).error(function(response, status) {
					$scope.status = status;
				});
			}

		}
	};
	//监视富文本编辑器的状态
	$scope.openRichStatus ="SHOW";
	$scope.$watch('openRichTextBox',function(newValue,oldValue, scope){
		if(newValue=="true"){
			$scope.openRichStatus ="";
			//console.log("打开编辑器");
		}else{
			$scope.openRichStatus ="SHOW";
			//console.log("关闭编辑器");
		}
	});
});
app.controller('certificationAuditCtrl',function($rootScope,$scope,$http,DTOptionsBuilder,DTColumnDefBuilder, DTColumnBuilder,$q){
	var vm = this;
	//是否保密单位设置为默认否
	$scope.auditFormData = {};
	$scope.auditFormData.confidential="0";
	$scope.confidentialShow=true;
	$rootScope.openVerifyBox = 'false';
	$scope.pageSizeForm={};
	$scope.pageSizeForm.alPageSize="10";
	$scope.alPageNumber=1;//第一次加载第一页
	$scope.selectBusDate={};
	$scope.selectBusDate.identity = "1";

	function certificationList(){
		$scope.certificationList=[];
		$scope.certListsReady=true;
		$scope.certListsIsNull=false;
		$scope.certListsIsError=false;

		//审核列表查询条件
		$scope.goTargetAlPage = function(page){
			$scope.alPageNumber = page;
			certificationList();
		};
		$scope.sortByLastAuditTime = function($event){
			//按最迟审核时间排序
			var className=$($event.target).attr("class");
			if(/desc/.test(className)){
				$scope.selectBusDate.lastAuditTime="asc";
				$scope.sortAmount=false;
			}else if(/asc/.test(className)){
				$scope.selectBusDate.lastAuditTime="desc";
				$scope.sortAmount=true;
			}
			certificationList();
		};
		if($scope.selectBusDate.lastAuditTime==undefined){
			//默认升序
			$scope.selectBusDate.lastAuditTime="asc";
			$scope.sortAmount=false;
		}
		var currentData={
			"productlineIds": globalProductline,
			"pageSize": $scope.pageSizeForm.alPageSize,
			"pageNum": $scope.alPageNumber,
			"identity": $scope.selectBusDate.identity,
			"name":$scope.selectBusDate.name,
			"phone":$scope.selectBusDate.phone,
			"mobile":$scope.selectBusDate.mobile,
			"lastAuditTime":$scope.selectBusDate.lastAuditTime
		};

		$http({
			method: "POST",
			url: URLInit.auditList,
			data: $.param(currentData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
		}).success(function(response) {
			$scope.certListsReady=false;
			$scope.certificationList=[];
			if (response.flag==="000000") {
				$scope.alPages = response.data.navigatepageNums;
				$scope.alTotalPage=response.data.lastPage;
				if(response.data.list.length>0){
					$scope.certListsIsNull=false;
					$scope.certificationList=response.data.list;
					$rootScope.certificationList=response.data.list;
					for (var i=0;i<response.data.list.length;i++){
						switch (response.data.list[i].identity){
							case 1 : response.data.list[i].identity = "未审核";
								break;
							case 2 : response.data.list[i].identity = "审核通过";
								break;
							case 3 : response.data.list[i].identity = "审核不通过";
								break;
							case 4 : response.data.list[i].identity = "审核通过待处理";
						}
						if(response.data.list[i].busLicence==null){
							response.data.list[i].busLicence = "未上传营业执照号码"
						}
						if(response.data.list[i].auditorName==null||response.data.list[i].auditorName==""){
							//如果审核人为空，但审核手机不为空，则显示手机信息
							if(response.data.list[i].auditorMobile!=null){
								response.data.list[i].auditorName = response.data.list[i].auditorMobile;
							}else{
								response.data.list[i].auditorName = "无审核人信息";
							}
						}
						if(response.data.list[i].submitAuditTime!=null){
							var newDate = new Date();
							newDate.setTime(response.data.list[i].submitAuditTime);
							response.data.list[i].submitAuditTime=newDate.format('yyyy/MM/dd h:m:s');
						}else{
							response.data.list[i].submitAuditTime="无时间信息"
						}
						if(response.data.list[i].lastAuditTime!=null){
							var newDate = new Date();
							newDate.setTime(response.data.list[i].lastAuditTime);
							response.data.list[i].lastAuditTime=newDate.format('yyyy/MM/dd h:m:s');
						}else{
							response.data.list[i].lastAuditTime="无时间信息"
						}
						if(response.data.list[i].auditTime!=null){
							var newDate = new Date();
							newDate.setTime(response.data.list[i].auditTime);
							response.data.list[i].auditTime=newDate.format('yyyy/MM/dd h:m:s');
						}else{
							response.data.list[i].auditTime="无时间信息"
						}
					}
				}else{
					$scope.certListsIsNull=true;
				}
			} else{
				$scope.certListsIsNull=false;
				$scope.certListsIsError=true;
				$scope.certListsIsErrorMessage=response.desc;
			}
		}).error(function(response) {
			$scope.certListsReady=false;
			$scope.certListsIsError=true;
			$scope.certListsIsErrorMessage="加载失败";
		});
	}
	certificationList();
	$scope.showSelectDate=function(){
		//console.log($scope.selectBusDate.name);
		var arr=window.resCertification;
		if(arr!=undefined){
			arr.forEach(function(list){
				if(list.id==$scope.selectBusDate.name){
					$scope.selectBusDate.name=list.name;
				}
			});
			$scope.alPageNumber=1;
		}
		//console.log($scope.selectBusDate.name);
		certificationList();
	};
	$scope.checkThenRerender=function(){
		//console.log($scope.selectBusDate.identity);
		$scope.alPageNumber = 1;
		certificationList();
	};
	$rootScope.handleVerifyBox=function (data) {
		$scope.confidentialShow=true;
		$rootScope.openVerifyBox = 'true';
		$rootScope.id = data.id;
		$rootScope.businessName = data.name;
		$rootScope.businessType = data.type;
		$rootScope.busLegalPerson = data.legalPerson;
		$rootScope.busLicence = data.busLicence;
		$rootScope.busLicenceUrl = data.busLicenceUrl;
		$scope.emptyProduct = 'false';
		$scope.errorRequest = 'false';
		$scope.disaccord = '';
		if(data.busLicenceUrl==null||data.busLicenceUrl==""){
			$scope.urlNull = 'true';
		}else{
			$scope.urlNull = 'false';
		}
		vm.DBOptions = DTOptionsBuilder.fromFnPromise(function() {
			var defer = $q.defer();
			//根据企业id查企业产品信息
			$http({
				method: 'GET',
				url: URLInit.selectByCompanyId+"?companyId="+$rootScope.id
			}).success(function(response) {
				if (response.flag==="000000") {
					if (response.data.length==0){
						$scope.emptyProduct = 'true';
					} else {
						$scope.emptyProduct = 'false';
						for (var i=0;i<response.data.length;i++){
							//console.log($rootScope.businessName);
							//console.log(response.data[i].CUSTOMERNAME);
							if($rootScope.businessName == response.data[i].CUSTOMERNAME){
								$scope.disaccord = 'false';
							}else{
								$scope.disaccord = 'true';
							}
						}
					}
					defer.resolve(response.data);
				} else {
					$scope.errorRequest = 'true';
				}
			}).error(function(response, status) {
				$scope.status = status;
			});
			return defer.promise;
		}).withPaginationType('simple_numbers');
		vm.DBColumns = [
			DTColumnBuilder.newColumn('SOFTDOG').withTitle('产品条码'),
			DTColumnBuilder.newColumn('PRODUCTNAME').withTitle('产品名称'),
			DTColumnBuilder.newColumn('CUSTOMERNAME').withTitle('DB系统客户名称'),
			DTColumnBuilder.newColumn('AGENTNAME').withTitle('出货机构'),
			DTColumnBuilder.newColumn('SERVICEAGENTNAME').withTitle('服务商')
		];
	};
	$rootScope.linkWithBus= function (busId) {
		//console.log(busId);
		$rootScope.getCompanyInfo(busId);
	};
	$rootScope.closeVerifyBox = function () {
		$rootScope.openVerifyBox = 'false';
		$scope.auditFormData = {};
		$scope.auditFormData.confidential="0";
		$scope.selectBusDate.name="";
	};
	$scope.auditFormData = {};
	$scope.auditFormData.confidential="0";
	if(userRightsRes.data.dataRoleCustomobjectList.length>0){
		$scope.auditFormData.productlineId = userRightsRes.data.dataRoleCustomobjectList[0].customobjid;
	}
	$scope.handlerConfidential=function(){
		if($scope.auditFormData.identity=='3'){
			$scope.confidentialShow=false;
			$scope.auditFormData.confidential="0";
		}else{
			$scope.confidentialShow=true;
		}

	};
	$scope.auditHandler = function () {
		$scope.auditFormData.id = $scope.id;
		var ur = URLInit.auditCompany;
		$http({
			method : 'POST',
			contentType : 'application/json;charset=utf-8',
			dataType : 'json',
			url : ur,
			data : JSON.stringify($scope.auditFormData)
		}).success(function(data) {
			if (data.flag == '000000'){
				$rootScope.openVerifyBox = 'false';
				certificationList();
				$scope.auditFormData = {};
				$scope.auditFormData.confidential="0";
			}
		}).error(function() {
			alert('调用服务出错!')
		});
	}
});
app.controller('specialSettingsCtrl',function($rootScope,$scope,$http){
	var vm = this;
	$scope.pageSizeForm={};
	$scope.pageSizeForm.blPageSize="10";
	$scope.blPageNumber=1;//第一次加载第一页
	$scope.selectDate={};//保存查询条件
	$scope.selectDate.confidential="";//默认查询全部保密单位状态

	function specialList(){
		$scope.specialList=[];
		$scope.specialListsReady=true;
		$scope.specialListsIsNull=false;
		$scope.specialListsIsError=false;

		$scope.goTargetBlPage = function(page){
			$scope.blPageNumber = page;
			specialList();
		};
		//列表查询条件
		var currentData={
			"productlineIds": globalProductline,
			"pageSize": $scope.pageSizeForm.blPageSize,
			"pageNum": $scope.blPageNumber,
			"name":$scope.selectDate.name,
			"phone":$scope.selectDate.phone,
			"confidential":$scope.selectDate.confidential
		};
		$http({
			method: "POST",
			url: URLInit.auditedList,
			data: $.param(currentData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
		}).success(function(response) {
			$scope.specialListsReady=false;
			$scope.specialList=[];
			if (response.flag==="000000") {
				if(response.data.list.length>0){
					$scope.specialListsIsNull=false;
					$scope.specialList=response.data.list;
					$rootScope.specialList=response.data.list;
					$scope.blPages = response.data.navigatepageNums;
					$scope.blTotalPage=response.data.lastPage;
					for(var i=0;i<response.data.list.length;i++){
						if(response.data.list[i].confidential==0){
							response.data.list[i].confidential="否";
						}else if(response.data.list[i].confidential==1){
							response.data.list[i].confidential="是";
						}
					}
				}else{
					$scope.specialListsIsNull=true;
				}
			} else{
				$scope.specialListsIsNull=false;
				$scope.specialListsIsError=true;
				$scope.specialListsIsErrorMsg=response.desc;
			}
		}).error(function(response) {
			$scope.specialListsReady=false;
			$scope.specialListsIsError=true;
			$scope.specialListsIsErrorMsg="加载失败";
		});
	}
	specialList();
	//处理企业名称模糊查询
	$scope.showSelectBusDate=function(){
		//console.log($scope.selectDate.name);
		var arr=window.resSpecialSet;
		if(arr!=undefined){
			arr.forEach(function(list){
				if(list.id==$scope.selectDate.name){
					$scope.selectDate.name=list.name;
				}
			});
			$scope.blPageNumber=1;
		}
		specialList();
	};

	$scope.handleSpecilVerifyBox=function (id,status) {
		$scope.openDealModal=true;
		if(status=='是'){
			$scope.Dealstatus=true;
		}else if(status=='否'){
			$scope.Dealstatus=false;
		}
		$scope.updateConfidential= function () {
			$scope.openDealModal=false;
			var data={"id":id};
			$http({
				method: "POST",
				url: URLInit.updateConfidential,
				data: $.param(data),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
			}).success(function (response) {
				$scope.updateCfSuccess=true;
				if (response.flag=='000000'){
					$scope.updateCfMsg="修改成功!";
					specialList();
				}else{
					$scope.updateCfMsg="修改失败!";
				}
			});
		};
		$scope.closeDealModal= function () {
			$scope.openDealModal=false;
		};
		$scope.closeCfResponse= function () {
			$scope.updateCfSuccess=false;
		};
	};
	//按是否保密单位查询
	$scope.rerenderConfidential= function() {
		$scope.blPageNumber=1;
		specialList();
	};
	$scope.linkWithSpecilBus= function (busId) {
		$rootScope.getCompanyInfo(busId);
	};
});
app.controller('whiteListCtrl',function($rootScope,$scope,$http){
	$scope.showPencil="OPEN";
	$scope.batchSettingBox="CLOSE";
	//打开编辑手机号个数限制
	$scope.savePhoneLimit=function(){
		$scope.showPencil="CLOSE";
	};
	//窗口开闭状态控制字段
	$scope.showWhiteLists="OPEN";
	//产品线列表查询
	$scope.pageSizeForm={};
	$scope.pageSizeForm.prdPageSize="10";
	$scope.prdPageNumber=1;
	$scope.goTargetPrdPage = function(page){
		$scope.prdPageNumber = page;
		getProductLineList();
	};
	//新增的时候校验手机限制数是否合理
	$scope.checkLimit=function(){
		$scope.getPhoneNumSuccessMes=false;
		var phoneReg=/^([1-9]\d{0,3})$/;
		$scope.addPhoneNumLimit=!(phoneReg.test($scope.addPhoneNum.limitNum));
	};
	function getProductLineList(){
		$scope.whiteLists=[];
		$scope.whiteListsReady=true;
		$scope.whiteListsIsNull=false;
		$scope.whiteListsIsError=false;
		$http({
			method: 'GET',
			url: URLInit.getPrdLineByUserid+"?pageSize="+$scope.pageSizeForm.prdPageSize+"&pageNum="+$scope.prdPageNumber+"&DT="+new Date().getTime()
		}).success(function(response) {
			$scope.whiteListsReady=false;
			$scope.whiteLists=[];
			if (response.flag==="000000") {
				$scope.prdPages = response.data.navigatepageNums;
				$scope.prdTotalPage=response.data.lastPage;
				if(response.data.list.length>0){
					$scope.whiteListsIsNull=false;
					$scope.whiteLists=response.data.list;
					$rootScope.whiteLists=response.data.list;
				}else{
					$scope.whiteListsIsNull=true;
				}
			} else{
				$scope.whiteListsIsError=true;
				$scope.whiteListsIsErrorMsg=response.desc;
			}
		}).error(function(response) {
			$scope.whiteListsReady=false;
			$scope.whiteListsIsError=true;
			$scope.whiteListsIsErrorMsg="数据加载失败!";
		});
	}
	getProductLineList();
	//保存手机号个数限制
	$scope.sendSavePhoneLimit=function(list){
		$http({
			method: 'POST',
			url: URLInit.savePhoneLimit,
			data: list,
			headers : { 'Content-Type': 'application/json' }
		}).success(function(response) {
			if (response.flag==="000000") {
				getProductLineList();
				$scope.showPencil="OPEN";
				//console.log(response);
			} else{
				console.log("发送失败，请重试!");
			}
		}).error(function(response, status) {
			$scope.status = status;
		});
	};
	//编辑手机号限制
	$scope.closeLimitNumBox=function(){
		$scope.changeLimitNumBox=false;
	};
	//点击编辑白名单
	$scope.editWhiteList=function(list){
		//console.log(list);
		$scope.batchSettingBox="CLOSE";
		$scope.backToshowWhiteListStatus="CLOSE";
		$scope.curListName=list.name;
		$scope.showWhiteLists="CLOSE";
		//根据产品线id查询手机号
		var whiteListId=$rootScope.whiteListId=list.id;
		function getPhoneNumById(id){
			$scope.phoneLists=[];
			$scope.whiteListNotFound=false;
			$http({
				method: 'POST',
				url: URLInit.getPhoneNumById,
				data: {"productlineId":id},
				headers : { 'Content-Type': 'application/json' }
			}).success(function(response) {
				if (response.flag==="000000") {
					$scope.whiteListNotFound=false;
					if(response.data==null || (response.data.length==0)){
						$scope.whiteListPhoneStatus="isNull";
						$scope.batchSettingBox="CLOSE";
						//console.log(response.data);
					}else{
						$scope.whiteListPhoneStatus="notNull";
						$scope.phoneLists=response.data;
						//先给每个白名单默认不选中状态
						$scope.phoneLists.forEach(function(list){
							list.selected = false;
						});
					}
				} else{
					$scope.whiteListNotFound=true;
					$scope.whiteListNotFoundError="请求发送失败";
				}
			}).error(function(response) {
				$scope.whiteListNotFound=true;
				$scope.whiteListNotFoundError="请求发送失败";
			});
		}
		$scope.reFoundWhiteList=function(){
			getPhoneNumById(whiteListId);
		};
		$scope.cancelFoundWhiteList=function(){
			$scope.whiteListNotFound=false;
		};
		getPhoneNumById(whiteListId);
		//批量添加手机号
		$scope.addPhoneNum={};
		//批量查询白名单
		$scope.searchPhoneNum={};
		$scope.getPhoneNumSuccessStatus=function(){
			$scope.closeAddPhoneNum=false;
			$scope.getPhoneNumSuccessMes=false;
			//每次打开后清空手机号
			$scope.addPhoneNum.mobile=null;
			$scope.addPhoneNum.limitNum=null;
		};
		//批量添加手机号
		$scope.batchIncrease=function(){
			$scope.addPhoneNum.productlineId=whiteListId;
			var mobile=$scope.addPhoneNum.mobile;
			var limitNum=$scope.addPhoneNum.limitNum;
			//先校验手机号是否存在
			if(mobile==null||mobile==''||mobile==undefined){
				$scope.getPhoneNumSuccessMes=true;
				$scope.getPhoneNumSuccess="请先输入手机号";
			}else{
				if(limitNum==null||limitNum==''||limitNum==undefined){
					$scope.getPhoneNumSuccessMes=true;
					$scope.getPhoneNumSuccess="请输入有效限制数";
				}else{
					$scope.getPhoneNumSuccessMes=false;
					if((/^([1-9]\d{0,3})$/.test($scope.addPhoneNum.limitNum))){
						$scope.addPhoneNumLimit=false;
						$http({
							method: 'POST',
							url: URLInit.phoneSave,
							data:$scope.addPhoneNum,
							headers : { 'Content-Type': 'application/json' }
						}).success(function(response) {
							$scope.getPhoneNumSuccessMes=true;
							if (response.flag==="000000") {
								getPhoneNumById(whiteListId);
								$scope.getPhoneNumSuccess="已经成功添加白名单";
								$scope.closeAddPhoneNum=true;
							} else{
								$scope.closeAddPhoneNum=false;
								$scope.getPhoneNumSuccess=response.desc;
							}
						}).error(function(response, status) {
							$scope.status = status;
						});
					}else{
						$scope.addPhoneNumLimit=true;
					}
				}

			}
		};
		//返回白名单
		$scope.backToshowWhiteList=function(){
			getPhoneNumById(whiteListId);
			$scope.backToshowWhiteListStatus="CLOSE";
		};
		//批量查询白名单
		$scope.batchSearchIncrease=function(){
			$scope.searchPhoneNum.prdlineid=whiteListId;
			//console.log($scope.searchPhoneNum);
			$http({
				method: 'POST',
				url: URLInit.findByMobile,
				data:$scope.searchPhoneNum,
				headers : { 'Content-Type': 'application/json' }
			}).success(function(response) {
				//console.log(response);
				//返回白名单
				$scope.backToshowWhiteListStatus="OPEN";
				if (response.flag==="000000") {
					if(response.data==null || (response.data.length==0)){
						$scope.whiteListPhoneStatus="isNull";
						$scope.batchSettingBox="CLOSE";
						//console.log(response.data);
					}else{
						$scope.whiteListPhoneStatus="notNull";
						$scope.phoneLists=response.data;
						//先给每个白名单默认不选中状态
						$scope.phoneLists.forEach(function(list){
							list.selected = false;
						});
						//console.log(response.data);
					}
				} else{

				}
			}).error(function(response, status) {
				$scope.status = status;
			});
		};
		//批量删除白名单
		$scope.batchDelete=function($event,listId){
			//console.log($scope.phoneLists);
			/*var arr=[];
			 $scope.phoneLists.forEach(function(list){
			 if(list.selected==true){
			 arr[arr.length]={"id":list.id};
			 }
			 });*/
			$scope.openCheckDeleteBox=true;
			$scope.closeCheckDeleteBox=function(){
				$scope.openCheckDeleteBox=false;
			};
			$scope.sureToBatchDelete=function(){
				$scope.openCheckDeleteBox=false;
				var arr=[{"id":listId}];
				$scope.checkBoxPhone={"phoneWhiteList":arr};
				//console.log($scope.checkBoxPhone);
				if(arr.length>0){
					$http({
						method: 'POST',
						url: URLInit.phoneDel,
						data: $scope.checkBoxPhone,
						headers : { 'Content-Type': 'application/json' }
					}).success(function(response) {
						$scope.deletePhoneSuccess = true;
						if (response.flag==="000000") {
							$scope.deletePhoneMsg = "删除成功";
							$scope.checkAll = false;
							getPhoneNumById($rootScope.whiteListId);
						} else{
							$scope.deletePhoneMsg = "删除失败";
						}
					}).error(function(response) {
						$scope.deletePhoneMsg = "删除失败";
					});
				}
			};
		};
		$scope.closeDeletePhoneBox=function(){
			$scope.deletePhoneSuccess = false;
		};
		//单独修改手机号限制
		$scope.checkLimitNum={};
		$scope.clickPencilEvent=function($event){
			$($event.target).parent().attr("class","ng-binding ng-hide");
			$($event.target).parent().next().attr("class","ng-binding");
			$($event.target).parent().next().children("input").focus();
		};
		$scope.clickSaveEvent=function($event,listId){
			var inputData=$($event.target).siblings("input").val();
			var phoneReg=/^([1-9]\d{0,3})$/;
			var data={"id":listId,"limitNum":inputData};
			if(phoneReg.test(inputData)){
				$http({
					method: 'POST',
					url: URLInit.wlUpdate,
					data: data,
					headers : { 'Content-Type': 'application/json' }
				}).success(function(response) {
					$scope.changeLimitNumBox=true;
					if (response.flag==="000000") {
						$scope.LimitNumBoxMsg="修改成功";
						$($event.target).parent().attr("class","ng-binding ng-hide");
						$($event.target).parent().siblings("div").attr("class","ng-binding");
						$($event.target).parent().siblings("div").children("span").html(response.data.limitNum);
					} else{
						$scope.LimitNumBoxMsg=response.desc;
					}
				}).error(function(response) {
					$scope.changeLimitNumBox=true;
					$scope.LimitNumBoxMsg="发送失败";
				});
			}else{
				//手机号格式不对
				$scope.changeLimitNumBox=true;
				$scope.LimitNumBoxMsg="限制数需大于0小于10000";
			}

		};
	};
	//批量删除按钮状态设置
	$scope.batchSetting=function(){
		$scope.batchSettingBox="OPEN";
	};
	//用于保存选中的批量数据
	$scope.checkBoxPhone={};
	//是否全选变量默认为false
	$scope.checkAll = false;
	$scope.closeBatchSetting=function(){
		$scope.batchSettingBox="CLOSE";
	};
	$scope.selectAll = function(){
		//console.log($scope.phoneLists);
		if($scope.checkAll){
			$scope.phoneLists.forEach(function(list){
				list.selected = false;
			})
		}else{
			$scope.phoneLists.forEach(function(list){
				list.selected = true;
			})
		}
		//每次选择后，全选状态都必须取反
		$scope.checkAll = !$scope.checkAll;
	};
	//每次选中其中一个
	$scope.selectOne = function(list){
		list.selected = !list.selected;
		//console.log(list.selected);
		//获取未选中的数量
		var unselectedLength = $scope.phoneLists.filter(function(list){
			return !list.selected;
		}).length;
		//console.log(unselectedLength);
		//如果全部选中，那么全选状态为true
		//如果至少有一个未被选中，那么全选状态为false
		$scope.checkAll = (unselectedLength==0);
	};
	//点击关闭编辑页
	$scope.closeEditText=function(){
		//console.log("关闭编辑页");
		$scope.showWhiteLists="OPEN";
	};
	$scope.closeEdit=function(){
		console.log("关闭");
	}
});
app.controller('rolePermissionCtrl',function($rootScope,$scope,$http,DTOptionsBuilder,DTColumnDefBuilder, DTColumnBuilder,$q,$compile){
	var vm = this;
	$scope.currentResRoleData={};
	//产品线查询
	function getProductLineList(){
		//console.log($scope.currentResRoleData.id);
		$http({
			method: 'GET',
			url: URLInit.getProLineList+"&DT="+new Date().getTime()
		}).success(function(response) {
			if (response.flag==="000000") {
				$scope.proLisWhiteLists=response.data.list;
				$scope.proLisWhiteLists.forEach(function(item){
					item.isSelected=false;
				});
				//console.log($scope.proLisWhiteLists);
				//查询数据权限菜单（具体角色的菜单）
				function queryOneprdLine(){
					$http({
						method: 'GET',
						url: URLInit.prdLineByRoleid+$scope.currentResRoleData.id+"&DT="+new Date().getTime()
					}).success(function(response) {
						//console.log(response.data);
						//console.log($scope.proLisWhiteLists);
						if (response.flag==="000000") {
							if(response.data.length>0){
								for(var i=0;i<response.data.length;i++){
									if($scope.proLisWhiteLists.length>0){
										for(var j=0;j<$scope.proLisWhiteLists.length;j++){
											if(response.data[i].customobjid==$scope.proLisWhiteLists[j].id){
												//将角色已勾选的菜单项查出来
												$scope.proLisWhiteLists[j].isSelected=true;
											}
										}
									}
								}
							}
						}
						//console.log($scope.proLisWhiteLists);
					}).error(function(response, status) {
						$scope.status = status;
					});
				}
				queryOneprdLine();
			} else{
				console.log(response);
			}
		}).error(function(response, status) {
			$scope.status = status;
		});

	}
	//产品线勾选
	$scope.selectDataAuthority=function(proLis){
		proLis.isSelected=!proLis.isSelected;
		//显示提示信息开关
		$scope.showSaveProLisMes=false;
	};
	//关联用户：保存要关联的用户
	$scope.searchRoleFormData={};
	//关联用户
	$scope.linkWithUser=function(dataID,dataName){
		$scope.frlPageNumber=1;
		$scope.searchRoleFormData.mobile=null;
		$scope.saveUserRoleStatus=false;
		$scope.roleDataId=dataID;//当前的角色ID
		//showUserTable为true时，datatable首次加载
		$scope.showUserTable=true;
		$scope.userLists=[];//每次先清空
		//第一次调，因为datatable还未加载完成，方法会报不存在的错
		try{
			reloadDataB();
		}catch(e){
			//console.log(e);
		}
		//console.log(dataID);
		$scope.searchRoleFormData.roleid=dataID;
	};
	//加载关联用户的datatable
	$scope.frlPageSize=5;//每次请求数据量
	$scope.frlPageNumber=1;//第一次加载第一页
	vm.userDtOptions = DTOptionsBuilder
		.fromFnPromise(function() {
			var defer = $q.defer();
			$scope.goTargetFrlPage = function(page){
				$scope.frlPageNumber = page;
				reloadDataB();
			};
			//根据角色id查关联的用户
			function getList(){
				$scope.userLists=[];
				$http({
					method: 'GET',
					url: URLInit.findUserByRoleid+$scope.roleDataId+"&pageSize="+$scope.frlPageSize+"&pageNum="+$scope.frlPageNumber+"&DT="+new Date().getTime()
				}).success(function(response) {
					//console.log(response.data);
					if (response.flag==="000000") {
						$scope.frlPages = response.data.navigatepageNums;
						$scope.frlTotalPage=response.data.lastPage;
						if(response.data.list&&response.data.list.length){
							for(var i=0;i<response.data.list.length;i++){
								$scope.userLists.push(response.data.list[i]);
							}
						}
					}else{
						console.log(response.desc);
					}
					//console.log($scope.userLists);
					defer.resolve($scope.userLists);
				}).error(function(response, status) {
					$scope.status = status;
				});
			}
			getList();
			//console.log($scope.userLists);
			return defer.promise;
		})
		.withOption('processing', true)
		.withOption('stateSave', true)
	//重新设置列
	vm.userDtColumnDefs = [
		DTColumnDefBuilder.newColumnDef(2).renderWith(function (data, type, full) {
			var html =
				'<button class="btn activation" ' +
				'type="button" ng-click="deleteSearchUserFormData('+"'"+full.id+"'"+','+"'"+full.name+"'"+')">'+
				'删除'+ '</button>';
			return html;
		})
	];
	//配置可见列表
	vm.userDtColumns = [
		DTColumnBuilder.newColumn('nickname').withTitle('已关联用户')
		,DTColumnBuilder.newColumn('mobile').withTitle('手机号')
	];
	vm.userDtOptions.withOption('fnRowCallback',
		function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			$compile(nRow)($scope);
		});
	//重新加载
	vm.userDtInstance = {};
	vm.reloadDataB = reloadDataB;
	function reloadDataB() {
		vm.userDtInstance.reloadData();
	}
	//手机号码改变的时候去掉提示信息
	$scope.changeUserRoleStatus=function(){
		$scope.saveUserRoleStatus=false;
	};
	//关联用户：添加
	$scope.sendSearchUserFormData=function(){
		//console.log($scope.searchRoleFormData);
		if($scope.searchRoleFormData.mobile!=undefined){
			$http({
				method: 'POST',
				url: URLInit.saveUserRole,
				data: $scope.searchRoleFormData,
				headers : {'Content-Type': 'application/json'}
			}).success(function(response) {
				//console.log(response);
				$scope.saveUserRoleStatus=true;
				if (response.flag==="000000") {
					$scope.saveUserRoleMes="已成功添加!";
					reloadDataB();
				} else{
					$scope.saveUserRoleMes=response.desc;
				}
			}).error(function(response, status) {
				$scope.status = status;
			});
		}
	};
	//删除关联的用户
	$scope.deleteSearchUserFormData=function(dataId,dataName){
		$scope.currentDeleteUserId=dataId;
		//console.log($scope.currentDeleteUserId);
		//console.log(dataName);
		$scope.deleteSearchUser=true;//打开弹出框
	};
	//确认删除用户
	$scope.checkToDeleteSearchUser=function(){
		//console.log($scope.roleDataId);
		//console.log($scope.currentDeleteUserId);
		var sendData={"userRoleList":[{
			"roleid":$scope.roleDataId,
			"userid":$scope.currentDeleteUserId
		}]};
		$http({
			method: 'POST',
			url: URLInit.deleteUserRole,
			data: sendData,
			headers : {'Content-Type': 'application/json'}
		}).success(function(response) {
			//console.log(response);
			if (response.flag==="000000") {
				$scope.saveUserRoleStatus=false;
				$scope.deleteSearchUser=false;
				reloadDataB();
			} else{

			}
		}).error(function(response, status) {
			$scope.status = status;
		});
	};
	//取消删除用户
	$scope.cancelToDeleteSearchUser=function(){
		$scope.deleteSearchUser=false;
	};
	//保存新增角色数据
	$scope.addRoleFormData={};
	//每次点击新增角色
	$scope.openAddNewRoleModal=function(){
		//置空角色信息
		$scope.addRoleFormData={};
		$scope.currentResRoleData={};
		$scope.showSaveProLisMes=false;
		$scope.showSaveRoleMenuMes=false;//权限提交后的提示信息开关
		$scope.showRoleNameError = false;//新增角色提交后的提示信息开关
		$scope.showRoleFunctionMenu = false;//权限树开关
	};
	//新增角色
	$scope.sendAddRoleFormData=function(){
		$scope.showRoleNameError = false;
		//console.log($scope.addRoleFormData);
		$http({
			method: 'POST',
			url: URLInit.roleSave,
			data: $scope.addRoleFormData,
			headers : {'Content-Type': 'application/json'}
		}).success(function(response) {
			//console.log(response);
			if (response.flag==="000000") {
				$scope.currentResRoleData=response.data;
				$scope.showRoleNameError = true;
				$scope.showRoleFunctionMenu = true;
				$scope.resRoleNameMes="角色"+$scope.currentResRoleData.name+"创建成功！";
				//查询功能权限菜单（第一次查询）
				queryRolePermissionsMenu();
				//查询数据权限菜单（第一次查询）
				getProductLineList();
				$scope.roleLists=[];
				reloadDataA();
			} else{
				$scope.showRoleNameError = true;
				$scope.resRoleNameMes=response.desc;
			}
		}).error(function(response, status) {
			$scope.status = status;
		});
	};
	//加载角色列表datatable
	$scope.pageSizeForm={};
	$scope.pageSizeForm.rlPageSize="10";
	$scope.rlPageNumber=1;//第一次加载第一页
	vm.roleDtOptions = DTOptionsBuilder
		.fromFnPromise(function() {
			var defer = $q.defer();
			$scope.goTargetRlPage = function(page){
				$scope.rlPageNumber = page;
				reloadDataA();
			};
			//请求角色列表信息
			function getList(){
				$http({
					method: 'GET',
					url: URLInit.roleList+"?pageSize="+$scope.pageSizeForm.rlPageSize+"&pageNum="+$scope.rlPageNumber+"&DT="+new Date().getTime()
				}).success(function(response) {
					if (response.flag==="000000") {
						$scope.rlPages = response.data.navigatepageNums;
						$scope.rlTotalPage=response.data.lastPage;
						//console.log(response.data.list);
						$scope.roleLists=[];
						for(var i=0;i<response.data.list.length;i++){
							$scope.roleLists.push(response.data.list[i]);
						}
					} else{
						console.log(response.desc);
					}
					//console.log($scope.roleLists);
					defer.resolve($scope.roleLists);
				}).error(function(response, status) {
					$scope.status = status;
				});
			}
			getList();
			//console.log($scope.roleLists);
			return defer.promise;
		})
		.withOption('processing', true)
		.withOption('stateSave', true)

	//重新设置列
	vm.roleDtColumnDefs = [
		DTColumnDefBuilder.newColumnDef(1).renderWith(function (data, type, full) {
			var html =
				'<a class="activation" ' +
				'data-toggle="modal" data-target="#setRoleModal" ' +
				'ng-click="editPermissions('+"'"+full.id+"'"+','+"'"+full.name+"'"+')' +
				'">'+
				'<i class="fa fa-edit"></i>'+'编辑权限'+'</a>'+
				'<a class="activation" ' +
				'data-toggle="modal" data-target="#linkWithUserModal" ' +
				'ng-click="linkWithUser('+"'"+full.id+"'"+','+"'"+full.name+"'"+')">'+
				'<i class="fa fa-link"></i>'+'关联用户'+'</a>';
			return html;
		})
		,DTColumnDefBuilder.newColumnDef(2).renderWith(function (data, type, full) {
			var html =
				'<button class="btn activation" ' +
				'type="button" ng-click="deleteRoleInfo('+"'"+full.id+"'"+')">'+
				'删除'+ '</button>';
			return html;
		})
	];
	//配置可见列表
	vm.roleDtColumns = [
		DTColumnBuilder.newColumn('name').withTitle('角色名单'),
		DTColumnBuilder.newColumn('name').withTitle('相关配置'),
		DTColumnBuilder.newColumn('name').withTitle('操作')
	];
	vm.roleDtOptions.withOption('fnRowCallback',
		function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			$compile(nRow)($scope);
		});
	//重新加载
	vm.roleDtInstance = {};
	vm.reloadDataA = reloadDataA;
	function reloadDataA () {
		vm.roleDtInstance.reloadData();
	}
	//查询角色权限菜单（全体未选菜单）
	function queryRolePermissionsMenu(){
		$http({
			method: 'GET',
			url: URLInit.menuList+"?DT="+new Date().getTime()
		}).success(function(response) {
			var dataList=response.data;
			var topMenu=[];//保存顶级权限菜单
			if (response.flag==="000000") {
				if(dataList.length&&dataList.length>0){
					dataList.forEach(function(itemA){
						//首先把全部勾选状态设为false
						itemA.isSelected=false;
						//把所有的非一级菜单查出来
						dataList.forEach(function(itemB){
							var arr=[];
							if(itemA.parentid==itemB.id){
								itemA.isChild=true;//标识为子菜单
								itemB.hasChild=true;//标识此菜单项目含有子菜单
								arr[arr.length]=itemA;
								itemB.children=arr;//把子菜单存入父菜单下
							}
						});
					});
				}
				//把所有的一级菜单查出来,存入topMenu中
				dataList.forEach(function(item){
					//没有isChild说明是个顶级菜单项
					if(item.isChild==undefined){
						topMenu[topMenu.length]=item;
					}
				});
				$scope.topMenu=topMenu;
				$scope.dataList=dataList;
				vm.rolePermissionTree =$scope.topMenu;
				//点击勾选事件
				vm.itemClicked = function ($item) {
					$scope.showSaveRoleMenuMes=false;
					vm.selectedItem = $item;
					$scope.selectedItem = $item;
					$item.isSelected=!($item.isSelected);
					//此函数遍历下级菜单
					function selectedChildMenu(data){
						if(data.children&&data.children.length>0){
							//console.log(data.children);
							for(var i=0;i<data.children.length;i++){
								data.children[i].isSelected=data.isSelected;
								selectedChildMenu(data.children[i]);
							}
						}
					}
					//此函数遍历上级菜单
					function selectedParentMenu(data){
						//console.log(data);
						dataList.forEach(function(item){
							if(data.parentid==item.id){
								item.isSelected=false;
								selectedParentMenu(item);
							}
						});
					}
					if($item.isChild==undefined){
						//如果是顶级菜单，只需概念下属菜单和自身状态即可
						selectedChildMenu($item);
						//console.log($scope.dataList);
					}else if($item.isChild==true){
						//如果不是顶级菜单，除了改变自身和下属菜单，还要把上级菜单置为未选
						selectedParentMenu($item);
						selectedChildMenu($item);
						//console.log($scope.dataList);
					}
				};
				vm.itemCheckedChanged = function($item){
					$item.isSelected=!($item.isSelected);
					//此函数遍历下级菜单
					function selectedChildMenu(data){
						if(data.children&&data.children.length>0){
							//console.log(data.children);
							for(var i=0;i<data.children.length;i++){
								data.children[i].isSelected=data.isSelected;
								selectedChildMenu(data.children[i]);
							}
						}
					}
					//此函数遍历上级菜单
					function selectedParentMenu(data){
						//console.log(data);
						dataList.forEach(function(item){
							if(data.parentid==item.id){
								item.isSelected=false;
								selectedParentMenu(item);
							}
						});
					}
					if($item.isChild==undefined){
						//如果是顶级菜单，只需概念下属菜单和自身状态即可
						selectedChildMenu($item);
						console.log($scope.dataList);
					}else if($item.isChild==true){
						//如果不是顶级菜单，除了改变自身和下属菜单，还要把上级菜单置为未选
						selectedParentMenu($item);
						selectedChildMenu($item);
						//console.log($scope.dataList);
					}
				};
			}
			//console.log($scope.dataList);
			//查询角色权限菜单（具体角色的菜单）
			function queryOnePermissionsMenu(){
				$http({
					method: 'GET',
					url: URLInit.menuByRoleid+$scope.currentResRoleData.id+"&DT="+new Date().getTime()
				}).success(function(response) {
					//console.log(response.data);
					if (response.flag==="000000") {
						if(response.data.length&&response.data.length>0){
							response.data.forEach(function(itemA){
								$scope.dataList.forEach(function(itemB){
									if(itemA.id==itemB.id){
										//将角色已勾选的菜单项查出来
										itemB.isSelected=true;
									}
								});
							});
						}
					}
				}).error(function(response, status) {
					$scope.status = status;
				});
			}
			queryOnePermissionsMenu();
		}).error(function(response, status) {
			$scope.status = status;
		});
	}
	//给角色设置权限菜单
	$scope.sendRolePermissionsMenu=function(){
		//console.log($scope.dataList);
		//console.log($scope.currentResRoleData);
		//$scope.dataList的值是实时的
		var Lis=$scope.dataList;
		var role=$scope.currentResRoleData;
		var menuArray=[];
		var proLisArray=[];
		for(var i=0;i<Lis.length;i++){
			//筛选出所有被选中的权限菜单
			if(Lis[i].isSelected==true){
				menuArray[menuArray.length]={
					"roleid":role.id,
					"menuid":Lis[i].id
				};
			}
		}
		//再次遍历产品线，筛选出已勾选的
		$scope.proLisWhiteLists.forEach(function(item){
			if(item.isSelected==true){
				proLisArray[proLisArray.length]={
					"roleid":role.id,
					"customobjid":item.id
				};
			}
		});
		if(menuArray.length==0){
			menuArray[0]={
				"roleid":role.id,
				"menuid":""
			};
		}
		if(proLisArray.length==0){
			proLisArray[0]={
				"roleid":role.id,
				"customobjid":""
			};
		}
		var sendMenuData={"roleMenuList":menuArray};
		var sendProLisData={"dataRoleCustomobjectList":proLisArray};
		//console.log(sendMenuData);
		//console.log(sendProLisData);
		$http({
			method: 'POST',
			url: URLInit.saveRoleMenu,
			data: sendMenuData,
			headers : {'Content-Type': 'application/json'}
		}).success(function(response) {
			//console.log(response);
			$scope.showSaveRoleMenuMes=true;
			if (response.flag==="000000") {
				$scope.resSaveRoleMenu="功能权限保存成功！";
			} else{
				$scope.resSaveRoleMenu=response.desc;
			}
		}).error(function(response, status) {
			$scope.status = status;
		});
		$http({
			method: 'POST',
			url: URLInit.saveRolePrdLine,
			data: sendProLisData,
			headers : {'Content-Type': 'application/json'}
		}).success(function(response) {
			//console.log(response);
			$scope.showSaveProLisMes=true;
			if (response.flag==="000000") {
				$scope.resSaveProLis="数据权限保存成功！";
			} else{
				$scope.resSaveProLis=response.desc;
			}
		}).error(function(response, status) {
			$scope.status = status;
		});
	};
	//确定删除角色
	$scope.checkToDeleteRole=function(){
		$http({
			method: 'POST',
			url: URLInit.roleDel,
			data: {"id":$scope.currentDeleteRoleId},
			headers : {'Content-Type': 'application/json'}
		}).success(function(response) {
			//console.log(response);
			if (response.flag==="000000") {
				$scope.roleLists=[];
				reloadDataA();
				$scope.deleteRoleBox="CLOSE";
			} else{
				$scope.somethingIsExist=true;
			}
		}).error(function(response, status) {
			$scope.status = status;
		});
	};
	//取消删除操作
	$scope.cancelToDeleteRole=function(){
		$scope.deleteRoleBox="CLOSE";
	};
	//删除角色
	$scope.deleteRoleInfo=function(dataID){
		//dataID保存了当前点击的角色的id
		$scope.deleteRoleBox="OPEN";
		$scope.currentDeleteRoleId=dataID;
		$scope.somethingIsExist=false;
	};
	//编辑权限
	$scope.editPermissions=function(dataID,dataName){
		//dataID保存了当前点击的角色的id
		$scope.currentResRoleData={};
		$scope.currentDeleteRoleId=dataID;
		$scope.currentResRoleData.id=dataID;
		$scope.currentDeleteRoleName=dataName;
		$scope.showSaveRoleMenuMes=false;
		$scope.showSaveProLisMes=false;
		//先加载完整的功能权限树
		queryRolePermissionsMenu();
		//先加载完整的数据权限树
		getProductLineList();
		//console.log($scope.currentDeleteRoleId);
	};

	return vm;
});
app.controller('activationCodeCtrl',function($rootScope,$scope,$http) {
	$scope.mobileIsNull=false;
	$scope.userInformationIsNull=false;
	//用户保存用户输入的查询条件
	$scope.getActivationForm={};
	$scope.userInfoPageNumber=1;
	$scope.userInfoPageSize=10;
	$scope.goTargetPage = function(page){
		//这里的$scope是控制器的
		$scope.userInfoPageNumber = page;
		getActivationCode();
	};
	//用户查找
	function getActivationCode(){
		var currentCount=1+($scope.userInfoPageSize*$scope.userInfoPageNumber)-10;//设置序号
		$scope.getActivationForm.pageNum=$scope.userInfoPageNumber;
		$scope.getActivationForm.pageSize=10;
		$scope.getActivationForm.productlines=globalProductline;
		//console.log($scope.getActivationForm);
		$http({
			method: 'POST',
			url: URLInit.instanceuserList,
			data: $scope.getActivationForm,
			headers : {'Content-Type': 'application/json'}
		}).success(function(response) {
			//console.log(response.data.list);
			if (response.flag==="000000") {
				$scope.pages = response.data.navigatepageNums;
				$scope.totalPage=response.data.lastPage;
				//console.log($scope.pages);
				//console.log($scope.totalPage);
				if(response.data.list.length>0){
					$scope.userInformationIsNull=false;
					$scope.userInformation=response.data.list;
					for(var i=0;i<response.data.list.length;i++){
						if(response.data.list[i].companyName==null){
							response.data.list[i].companyName="公司名称为空"
						}
						if(response.data.list[i].name==null){
							response.data.list[i].name="用户名为空"
						}
						if(response.data.list[i].uid==null){
							response.data.list[i].uid="用户ID为空"
						}
						//每一条的详情默认关闭
						response.data.list[i].showDetail=false;
						response.data.list[i].count=currentCount;
						currentCount++;
					}
				}else{
					$scope.userInformation=[];
					$scope.userInformationIsNull=true;//查询结果为空的时候
				}
			} else{
				$scope.userInformationIsNull=false;
				$scope.userInformationIsError=true;
				$scope.userInformationIsErrorMsg=response.desc;
			}
		}).error(function(response) {
			$scope.userInformationIsNull=false;
			$scope.userInformationIsError=true;
			$scope.userInformationIsErrorMsg="数据加载失败！";
		});
	}
	$scope.getActivationCode=function(){
		var mobile=$scope.getActivationForm.mobile;
		if((mobile==undefined)||(mobile=="")){
			$scope.userInformation=[];
			$scope.mobileIsNull=true;
			$scope.userInformationIsNull=false;
		}else{
			$scope.mobileIsNull=false;
			getActivationCode();
		}
	};
	$scope.changeBoxStatus=function(user){
		//console.log(user);
		user.showDetail=!user.showDetail;
	};
	$scope.activationCode=function(user){
		$("#SendActToUserBtn").bind("click",function(e){
			//设置60秒倒计时
			var count=60;
			$(e.target).attr("disabled","disabled");
			function timeout(){
				count--;
				if(count>0){
					$(e.target).val(count +"秒后可再次发送！");
					setTimeout(function(){
						timeout();
					},1000);
				}else{
					$(e.target).val("发送给用户");
					$(e.target).removeAttr("disabled");
				}
			}
			timeout();
		});
		$scope.SendActToUser=function(){
			var data={
				"id":user.id
			};
			$http({
				method: 'POST',
				url: URLInit.sendactivecode,
				data: $.param(data),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(response) {
				//console.log(response);
				if (response.flag==="000000") {

				}else{


				}
			}).error(function(response) {
				$scope.status = status;
			});
		};
		//console.log(user);
		$scope.showSendActBtn=false;
		var data={
			"id":user.id,
			"productlineId":user.productlineId
		};
		$http({
			method: 'POST',
			url: URLInit.getactivecode,
			data: $.param(data),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function(response) {
			//console.log(response.data);
			if (response.flag==="000000") {
				$scope.showSendActBtn=true;
				$scope.responseActivationCode=response.data;
			}else{
				$scope.showSendActBtn=false;
				$scope.responseActivationCode="获取失败,错误信息："+response.desc;
			}
		}).error(function(response, status) {
			$scope.showSendActBtn=false;
			$scope.status = status;
		});
	};
});
app.controller('verificationCtrl',function($rootScope,$scope,$http,FileUploader){
	/*--文件导入--*/
	$scope.uploadFormData={};
	var vcUploader = $scope.vcUploader = new FileUploader({
		url : URLInit.load,
		queueLimit: 1,     			//文件个数
		removeAfterUpload: true   	//上传后删除文件
	});
	$scope.openUploadModal = function(){
		$scope.nowfileName="尚未选择文件";
		$scope.openUploadBox=true;
		$scope.uploadError=false;
		$scope.uploadIsReady=false;
		$scope.uploadSuccess=false;
	};
	$scope.closeUploadModal = function(){
		$scope.openUploadBox=false;
	};
	$scope.clearItems = function(){
		$scope.uploadError=false;
		$scope.uploadIsReady=false;
		$scope.uploadSuccess=false;
		$scope.uploadFormData.logoUrl=null;
		$scope.nowfileName='';
		vcUploader.clearQueue();//文件列表清空
	};
	vcUploader.onAfterAddingFile = function(fileItem) {
		$scope.fileItemA = fileItem._file;
		$scope.nowfileName=vcUploader.queue[0].file.name;
		$scope.uploadError=false;
		var nowFileSize=Math.floor(vcUploader.queue[0].file.size/1024);
		var nowFileType=vcUploader.queue[0].file.type;
		//console.log(vcUploader.queue[0].file);
		//console.log(nowFileSize);
		//console.log(nowFileType);
		if(nowFileSize>5120){
			$scope.uploadError=true;
			$scope.uploadErrorInfo="文件大小限制为5MB！";
		}else{
			$scope.uploadIsReady=true;
			vcUploader.queue[0].upload();
		}
	};
	vcUploader.onSuccessItem = function(fileItem, response, status, headers) {
		//上传完成后要重新加载历史数据信息
		//console.log(response);
		$scope.uploadIsReady=false;
		if(response.flag=="000000"){
			$scope.uploadError=false;
			$scope.uploadSuccess=true;
			getHistoryData();
		}else{
			$scope.uploadError=true;
			$scope.uploadErrorInfo=response.desc;
		}
	};
	vcUploader.onErrorItem = function(fileItem, response, status, headers) {
		$scope.uploadIsReady=false;
		$scope.uploadError=true;
		$scope.uploadErrorInfo="导入失败！";
	};
	/*--导出测试--*/
	$scope.exportPdf=function(){

	};
	/*--历史数据加载--*/
	$scope.showHistoryTable=true;
	$scope.closeHistoryTable=function(){
		$scope.showHistoryTable=true;
	};

	$scope.getHistoryForm={};
	$scope.readyToLoadHistory=true;//数据加载中提示
	$scope.loadHistoryFail=false;//加载失败初始状态
	$scope.getHistoryForm.pageSize="10";
	$scope.hisDataPageNumber=1;//第一次加载第一页
	$scope.getHistoryForm.dealResult="0";
	//获取历史上传数据
	function getHistoryData(){
		$scope.loadHistoryFail=false;
		$scope.readyToLoadHistory=true;
		$scope.historyInfo=[];
		$scope.historyInfoNull=false;
		$scope.getHistoryForm.pageNum=$scope.hisDataPageNumber;
		$scope.getHistoryForm.productlines=globalProductline;
		//console.log($scope.getHistoryForm);
		$http({
			method: 'POST',
			url: URLInit.antiPiracyDataList,
			data: $.param($scope.getHistoryForm),
			headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
		}).success(function(response) {
			//console.log(response);
			$scope.readyToLoadHistory=false;
			if (response.flag==="000000") {
				var responseList=response.data.list;
				$scope.historyPages = response.data.navigatepageNums;
				$scope.hisTotalPage=response.data.lastPage;
				//console.log($scope.historyPages);
				//console.log($scope.hisTotalPage);
				if(responseList.length>0){
					for(var i=0;i<responseList.length;i++){
						//处理校验状态
						if(responseList[i].status==0){
							responseList[i].showStatus="待校验";
						}else if(responseList[i].status==1){
							responseList[i].showStatus="校验中";
						}else if(responseList[i].status==2){
							responseList[i].showStatus="校验完成";
						}else if(responseList[i].status==3){
							responseList[i].showStatus="文件异常";
						}else if(responseList[i].status==4){
							responseList[i].showStatus="系统异常";
						}
						//处理认证状态
						switch (responseList[i].identity)
						{
							case 0:
								responseList[i].showIdentity="未认证";
								break;
							case 1:
								responseList[i].showIdentity="审核中";
								break;
							case 2:
								responseList[i].showIdentity="已认证";
								break;
							case 3:
								responseList[i].showIdentity="审核不通过";
								break;
							case 4:
								responseList[i].showIdentity="已认证";
								break;
							default :
								responseList[i].showIdentity="状态获取失败";
						}
						//处理是否保密单位
						if(responseList[i].confidential==1){
							responseList[i].showConfidential="是";
						}else{
							responseList[i].showConfidential="否";
						}
						//处理导入时间
						var newDate = new Date();
						if(responseList[i].createTime!=null){
							newDate.setTime(responseList[i].createTime);
							responseList[i].showCreateTime=newDate.format('yyyy/MM/dd h:m:s');
						}else{
							responseList[i].showCreateTime="无时间信息"
						}
						//处理试用到期日
						if(responseList[i].endtimeLocal!=null){
							newDate.setTime(responseList[i].endtimeLocal);
							responseList[i].showEndtimeLocal=newDate.format('yyyy/MM/dd h:m:s');
						}else{
							responseList[i].showEndtimeLocal="无时间信息"
						}
						//处理各项值
						if(responseList[i].dealResult==0){
							responseList[i].dealResult='未处理';
						}else if(responseList[i].dealResult==1){
							responseList[i].dealResult='盗版';
						}else if(responseList[i].dealResult==2){
							responseList[i].dealResult='操作错误';
						}else if(responseList[i].dealResult==3){
							responseList[i].dealResult='其他';
						}
						(responseList[i].companyName==null||responseList[i].companyName=="")?responseList[i].companyName='--无--':void 0;
						(responseList[i].productCode==null||responseList[i].productCode=="")?responseList[i].productCode='--无--':void 0;
					}
					$scope.historyInfoNull=false;
					$scope.historyInfo=responseList;
				}else{
					$scope.historyInfo=[];
					$scope.historyInfoNull=true;//查询结果为空的时候
				}
			} else{
				$scope.loadHistoryFail=true;
				$scope.loadHistoryFailMessage=response.desc;
			}
		}).error(function(response, status) {
			$scope.readyToLoadHistory=false;
			$scope.loadHistoryFail=true;
			$scope.loadHistoryFailMessage="请求发送失败";
		});
	}
	getHistoryData();
	$scope.goTargetHisPage = function(page){
		$scope.hisDataPageNumber = page;
		getHistoryData();
	};
	//处理企业名称模糊查询
	$scope.checkThenReload=function(){
		$scope.hisDataPageNumber = 1;
		var arr=window.resVerification;
		if(arr!=undefined){
			arr.forEach(function(list){
				if(list.id==$scope.getHistoryForm.companyName){
					$scope.getHistoryForm.companyName=list.companyName;
				}
			});
		}
		getHistoryData();
	};
	$scope.getDataDetailForm={};
	$scope.getDataDetailForm.status="";//默认查询全部状态
	$scope.readyToLoadDetail=true;//数据加载中提示
	$scope.loadDetailFail=false;//加载失败初始状态
	$scope.detailPageSize=50;//每次请求数据量
	$scope.detailNumber=1;//第一次加载第一页
	function getDataDetailById(id){
		$scope.detailInfo=[];
		$scope.detailInfoNull=false;
		/*$scope.getDataDetailForm.pageNum=$scope.detailNumber;
		 $scope.getDataDetailForm.pageSize=50;*/
		$scope.getDataDetailForm.antiPiracyId=id;
		//console.log($scope.getDataDetailForm);
		$http({
			method: 'POST',
			url: URLInit.listById,
			data: $.param($scope.getDataDetailForm),
			headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
		}).success(function(response) {
			//console.log(response);
			$scope.readyToLoadDetail=false;
			if (response.flag==="000000") {
				$scope.detailPages = response.data.navigatepageNums;
				$scope.detailTotalPage=response.data.lastPage;
				//console.log($scope.detailPages);
				//console.log($scope.detailTotalPage);
				var detailInfoList=response.data.list;
				if(detailInfoList.length>0){
					$scope.detailInfoNull=false;
					for(var i=0;i<detailInfoList.length;i++){
						if(detailInfoList[i].status==0){
							detailInfoList[i].showStatus="正常";
						}else if(detailInfoList[i].status==1){
							detailInfoList[i].showStatus="异常(许可数不匹配)";
						}else if(detailInfoList[i].status==3){
							detailInfoList[i].showStatus="异常(模块数不匹配)";
						}
					}
					$scope.detailInfo=detailInfoList;
				}else{
					$scope.detailInfo=[];
					$scope.detailInfoNull=true;//查询结果为空的时候
				}
			} else{
				$scope.loadDetailFail=true;
				$scope.loadDetailFailMessage=response.desc;
			}
		}).error(function(response, status) {
			$scope.readyToLoadDetail=false;
			$scope.loadDetailFail=true;
			$scope.loadDetailFailMessage="请求发送失败";
		});
	}
	//重新加载文件信息表
	$scope.reloadStatus=function(){
		getHistoryData();
		$scope.statusNotReady=false;
	};
	$scope.closeStatusNotReady=function(){
		$scope.statusNotReady=false;
	};
	$scope.dealResultForm={};//保存处理意见和备注
	//点击每一项的处理按钮对应的处理函数
	$scope.showHisDetail = function(data){
		//console.log(data.showStatus);
		$scope.currentDetail=data;
		if(data.showStatus!="校验完成"){
			$scope.statusNotReady=true;
		}else{
			$scope.statusNotReady=false;
			$scope.showHistoryTable=false;//隐藏主表，显示具体信息表
			var antiPiracyId=data.id;
			var companyId=data.companyId;
			//判断是否需要查询企业信息
			if($scope.currentDetail.customValidateResult==null){
				$rootScope.getCompanyInfo(companyId);
			}
			//判断是否需要查询模块信息
			if($scope.currentDetail.productValidateResult==null){
				getDataDetailById(antiPiracyId);
			}
			//按异常状态过滤
			$scope.rerenderDetailForm=function(){
				$scope.detailNumber=1;
				getDataDetailById(antiPiracyId);
			};
			//提交处理意见和备注信息
			$scope.dealResultForm.dealResult=undefined;//清除处理结果的值
			$scope.dealResultForm.remark="";//清除备注的值
			$scope.dealAntiPiracyData = function(){
				$scope.dealResultForm.id=antiPiracyId;
				var result=$scope.dealResultForm.dealResult;
				if(result==undefined||result==''){
					$scope.dealResultUndefined=true;
				}else{
					$scope.dealResultUndefined=false;
					$http({
						method: 'POST',
						url: URLInit.deal,
						data: $scope.dealResultForm,
						headers : {'Content-Type': 'application/json;charset=utf-8'}
					}).success(function(response) {
						$scope.dealResponse=true;
						if (response.flag==="000000") {
							$scope.dealResponseMsg="提交成功";
							getHistoryData();//重新加载表
						} else{
							$scope.dealResponseMsg="提交失败";
						}
					}).error(function(response, status) {
						$scope.dealResponse=true;
						$scope.dealResponseMsg="发送失败";
					});
				}
			};
			$scope.closeDealResponse=function(){
				$scope.dealResponse=false;
				if($scope.dealResultForm.dealResult=='1'){
					$scope.currentDetail.dealResult="盗版";
				}else if($scope.dealResultForm.dealResult=='2'){
					$scope.currentDetail.dealResult="操作错误";
				}else if($scope.dealResultForm.dealResult=='3'){
					$scope.currentDetail.dealResult="其他";
				}
			};
			$scope.goTargetDetailPage = function(page){
				$scope.detailNumber = page;
				getDataDetailById(antiPiracyId);
			};
		}

	};
});
app.directive('treeView',[function(){
	return {
		restrict: 'E',
		templateUrl: '/treeView.html',
		scope: {
			treeData: '=',
			canChecked: '=',
			textField: '@',
			itemClicked: '&',
			itemCheckedChanged: '&',
			itemTemplateUrl: '@'
		},
		controller:['$scope', function($scope){
			$scope.itemExpended = function(item, $event){
				item.$$isExpend = ! item.$$isExpend;
				$event.stopPropagation();
			};

			$scope.getItemIcon = function(item){
				var isLeaf = $scope.isLeaf(item);
				if(isLeaf){
					return 'fa fa-minus';
				}
				return item.$$isExpend ? 'fa fa-minus': 'fa fa-plus';
			};
			$scope.isLeaf = function(item){
				return !item.children || !item.children.length;
			};

			$scope.warpCallback = function(callback, item, $event){
				($scope[callback] || angular.noop)({
					$item:item,
					$event:$event
				});
			};
		}]
	};
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
				$rootScope.sendCode1 = 'no';
				$rootScope.sendCode2 = 'no';
				$rootScope.sendCode3 = 'no';
			}, scope.timeout);
		},
		template: '<button type="button" class="btn btn-primary btn-code fr" ng-click="onClick()" ng-disabled="timer"><span ng-transclude></span>&nbsp<span ng-if="showTimer">({{ timerCount / 1000 }}s)</span></button>'
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
app.directive('contenteditable', function() {
	return {
		restrict: 'A' ,
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			// 创建编辑器,使用ID，即editor-trigger为编辑区元素ID值
			var editor = new wangEditor('editor-trigger');
			// 从 onchange 函数中更新数据
			editor.onchange = function () {
				scope.$apply(function () {
					var html = editor.$txt.html();
					ctrl.$setViewValue(html);
				});

			};
			editor.config.emotions = {
				// 第一组
				'default': {
					title: '默认',
					data: 'http://www.wangeditor.com/wangEditor/test/emotions.data'
				},
				/*// 第二组
				'weibo': {
					title: '嗷大瞄',
					data: [
						{'icon': 'assets/images/face/0.gif', 'value': '[微笑]'},
						{'icon': 'assets/images/face/1.gif', 'value': '[大笑]'}
					]
				}*/
			};
			//富文本图片上传接口
			//editor.config.uploadImgUrl = '/onecloud-verify/file/upload';
			editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
				//去除全屏
				if (item === 'fullscreen') {
					return null;
				}
				//去除地图
				if (item === 'location') {
					return null;
				}
				return item;
			});
			//阻止输出log
			wangEditor.config.printLog = false;
			editor.create();
			editor.$txt.html(window.wangEditor.initContent);
		}
	};
});
app.factory('select2Query', function () {
	return {
		certificationAjax: function () {
			var config = {
				minimumInputLength: 1,
				ajax: {
					type:"POST",
					url: URLInit.auditList,
					dataType: 'json',

					data: function (inputData) {
						return {
							//用户输入用于检验的企业名称
							name: inputData,
							productlineIds:globalProductline,
							pageSize:100,
							pageNum:1
						};
					},
					results: function (data, page) {
						//console.log(data.data.list);
						//将返回的数据保存起来
						window.resCertification=data.data.list;
						return {results: data.data.list};
					}
				},
				templateResult: function (repo){
					return repo.name;
				},
				templateSelection: function (repo){
					return repo.name
				},
				formatResult: function (row) {
					return row.name;
				},
				formatSelection: function (data) {
					return data.name;
				}
			};
			return config;
		},
		specialSetAjax: function () {
			var config = {
				minimumInputLength: 1,
				ajax: {
					type:"POST",
					url:URLInit.auditedList,
					dataType: 'json',
					data: function (inputData) {
						return {
							//用户输入用于检验的企业名称
							name: inputData,
							productlineIds:globalProductline,
							pageSize:100,
							pageNum:1
						};
					},
					results: function (data, page) {
						//console.log(data.data.list);
						//将返回的数据保存起来
						window.resSpecialSet=data.data.list;
						return {results: data.data.list};
					}
				},
				templateResult: function (repo){
					return repo.name;
				},
				templateSelection: function (repo){
					return repo.name
				},
				formatResult: function (row) {
					return row.name;
				},
				formatSelection: function (data) {
					return data.name;
				}
			};
			return config;
		},
		verificationAjax: function () {
			var config = {
				minimumInputLength: 1,
				ajax: {
					type:"POST",
					url: URLInit.antiPiracyDataList,
					dataType: 'json',
					data: function (inputData) {
						return {
							//用户输入用于检验的企业名称
							companyName: inputData,
							productlines:globalProductline,
							pageSize:10,
							pageNum:1
						};
					},
					results: function (data, page) {
						//console.log(data.data.list);
						//将返回的数据保存起来
						window.resVerification=data.data.list;
						return {results: data.data.list};
					}
				},
				templateResult: function (repo){
					return repo.companyName;
				},
				templateSelection: function (repo){
					return repo.companyName
				},
				formatResult: function (row) {
					return row.companyName;
				},
				formatSelection: function (data) {
					return data.companyName;
				}
			};
			return config;
		}
	}
});
app.factory('permissions', function ($rootScope) {
	//将userRightsRes存放到factory变量中,
	//使之一直处于内存中,实现全局变量的作用,
	//但却没有污染命名空间.
	var userRightsRes;
	return {
		setPermissions: function(permissions) {
			userRightsRes = permissions;
			$rootScope.$broadcast('permissionsChanged')
		}
	};
});