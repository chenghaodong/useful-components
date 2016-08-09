angular.module("com.ewei.angular.ui")
  .directive("radioOptions", [function () {  //多选下拉框
    return {
      restrict: "AE",
      templateUrl: "/source/scripts/directives/radio-options/radio-options.html",
      controller: "radioOptions",
      scope: {
        ticketField: '=',
        ticketId: '=',
        category: '@',
        noneDefaultValue: '@'
      }
    }
  }])
  .controller('radioOptions', ['$scope', '$http', 'alertService', function ($scope, $http, alertService) {
    if ($scope.category != undefined && $scope.category == 'auto') {
      $scope.field = $scope.ticketField;
    } else {
      $scope.field = $scope.ticketField.customField;
    }
    if ($scope.field.customFieldOptions) {
      $scope.field.customFieldOptions = angular.fromJson($scope.field.customFieldOptions);
    }
    $scope.copyCustomFieldOptions = angular.copy($scope.field.customFieldOptions);
    //下拉单选菜单搜索
    $scope.dropdownRadioSearch = function($event,customFieldOptions) {
      //先清除数组里面的值
      customFieldOptions.splice(0);
      //取输入框里面的值
      var searchText = $event.target.value.trim();
      angular.forEach($scope.copyCustomFieldOptions,function(option) {
        if (option.name && option.name.search(new RegExp(searchText,'i')) > -1) {
          customFieldOptions.push(option);
        }
      });
    };
    //点击下拉菜单单选
    $scope.chooseDropdownRadio = function(customField,option){
      customField.value = option.value;
      updateCustomField(customField);
    }
    var updateCustomField = function(customField){
      if ($scope.ticketId != null) {
        var url = '';
        var data = {};
        if ($scope.category == 'userCustomField') {
          url = '/updateUserCustomField.json';
          data = {
            id: customField.id,
            value: customField.value,
            userId: $scope.ticketId,
            customFieldId: customField.customField.id
          }
        } else if ($scope.category == 'userGroupCustomField') {
          url = '/updateUserGroupCustomField.json';
          data = {
            id: customField.id,
            value: customField.value,
            userGroupId: $scope.ticketId,
            customFieldId: customField.customField.id
          }
        } else {
          url = "/updateTicketCustomField.json";
          data = {
            id: customField.id,
            value: customField.value,
            ticketId: $scope.ticketId,
            customFieldId: customField.customField.id
          }
        }
        $http({
          url: url,
          method: 'POST',
          data: data
        }).success(function (response, status, headers, config) {
          if (response.success) {

          } else {
            if (response.message) {
              alertService.add(response.message, 'danger', 'left');
            } else {
              alertService.add('修改失败', 'danger', 'left');
            }
          }
        });
      }
    }
  }]);

