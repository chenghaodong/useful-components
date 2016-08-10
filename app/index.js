'use strict';
angular.module('myApp', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'button_list/button_list.html',
				controller : "buttonListController"
			})
			.when('/radioOptions',{
				templateUrl:'radio-options/radio-options.html',
				controller : "radioOptions"
			})
			.when('/multiOptions',{
				templateUrl:'multi-options/multi-options.html',
				controller : "multiOptions"
			})
			.otherwise({redirectTo:'/'});
	}])
	.controller('buttonListController',function($scope,$location){
		$scope.radioOptions = function(){
			$location.path("/radioOptions")
		};
		$scope.multiOptions = function(){
			$location.path("/multiOptions")
		};
	})
	.controller('radioOptions', function ($scope) {
		$scope.field = {
			options:[
				{"value":"1111"},
				{"value":"2222"},
				{"value":"3333"},
				{"value":"4444"},
				{"value":"5555"},
				{"value":"你好啊"},
				{"value":"你是谁啊"},
				{"value":"我是"},
				{"value":"aaaa"},
				{"value":"cccc"},
				{"value":"dddd"},
				{"value":"eeee"},
				{"value":"ffff"},
				{"value":"gggg"},
				{"value":"hhhh"},
				{"value":"iiii"},
				{"value":"kkkkk"},
				{"value":"rrrr"},
				{"value":"rrrr"},
				{"value":"cccc"}
			]
		}
		$scope.field.openSearch = true;
		$scope.copyOptions = angular.copy($scope.field.options);
		//下拉单选菜单搜索
		$scope.dropdownRadioSearch = function($event,options) {
			//先清除数组里面的值
			options.splice(0);
			//取输入框里面的值
			var searchText = $event.target.value.trim();
			angular.forEach($scope.copyOptions,function(option) {
				if (option.value && option.value.search(new RegExp(searchText,'i')) > -1) {
					options.push(option);
				}
			});
		};
		//点击下拉菜单单选
		$scope.chooseDropdownRadio = function(field,option){
			field.value = option.value;
		}
	})
	.controller('multiOptions', function ($scope) {
		$scope.field = {
			options:[
				{"value":"1111"},
				{"value":"2222"},
				{"value":"3333"},
				{"value":"4444"},
				{"value":"5555"},
				{"value":"你好啊"},
				{"value":"你是谁啊"},
				{"value":"我是"},
				{"value":"aaaa"},
				{"value":"cccc"},
				{"value":"dddd"},
				{"value":"eeee"},
				{"value":"ffff"},
				{"value":"gggg"},
				{"value":"hhhh"},
				{"value":"iiii"},
				{"value":"kkkkk"},
				{"value":"rrrr"},
				{"value":"rrrr"},
				{"value":"cccc"}
			]
		}
		var list = [];
		angular.forEach( $scope.field.options,function(option){
			if (option.selectValue) {
				list.push(option.value);
			}
		})
		$scope.catSelected = list.length > 0 ? true : false;
		$scope.field.value = list.join(',');
		$scope.field.openSearch = true;
		$scope.copyOptions = angular.copy($scope.field.options);
		$scope.dropdownMultiselectSearch = function ($event,options){
			//先清除数组里面的值
			options.splice(0);
			//取输入框里面的值
			var searchText = $event.target.value.trim();
			angular.forEach($scope.copyOptions,function(option) {
				if (option.value && option.value.search(new RegExp(searchText,'i')) > -1) {
					options.push(option);
				}
			});
		};
		$scope.selected = function($event,option){
			if (option.selectValue == true) {
				list.push(option.value)
			} else {
				angular.forEach(list,function(item){
					if (item == option.value) {
						list.splice(list.indexOf(item), 1);
					}
				})
			}
			$scope.catSelected = list.length > 0 ? true : false;
			$scope.field.value = list.join(',');
		};
		$scope.clear = function(){
			$scope.field.value = '';
			list = [];
			$scope.catSelected = false;
			angular.forEach($scope.field.options,function(option){
				option.selectValue = false;
			})
		}
	});
