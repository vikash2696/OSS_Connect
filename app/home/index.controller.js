(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller)
        .filter('renderHTMLCorrectly', function($sce) {
			return function(stringToParse)
			{
				return $sce.trustAsHtml(stringToParse);
			}
		});

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.status = null;
        vm.postData = postData;

        initController();
        
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
        getPostedData();
        function getPostedData()
        {
        	UserService.getstatusData()
            .then(function (status) {
//            	console.log(status);return;
            	vm.status = status;
            });
        }
        
        function postData() {
//        	console.log(vm.status); return;
        	var data = editor.getData();
        	var postData = {'statusData' : data,'title':vm.status.title};
//        	console.log(postData); return;
            UserService.postData(postData)
                .then(function () {
                getPostedData(),
                CKEDITOR.instances.editor1.setData('');
                }).catch(function (error) {
                   FlashService.Error(error);
                });
         }
    }

})();