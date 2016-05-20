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
            	vm.status = status;
            });
        }
        
        function postData() {
//        	console.log(vm.status); return;
        	var data = editor.getData();
        	var postData = {'statusData' : data,'title':vm.status.title,'created_by':vm.user.username};
//        	console.log(postData); return;
            UserService.postData(postData)
                .then(function () {
                getPostedData(),
                CKEDITOR.instances.editor1.setData('');
                }).catch(function (error) {
                   FlashService.Error(error);
                });
         }
/*
        $scope.uploadFile = function(){
               var file = $scope.myFile;
               // var data = editor.getData();
               // console.log('file is ' );
               // console.log(file); return;
               // console.log(UserService); return;

                UserService.postPhoto(file.name)
                .then(function () {
                getPostedData(),
                CKEDITOR.instances.editor1.setData('');
                }).catch(function (error) {
                   FlashService.Error(error);
                });
               // var uploadUrl = "/fileUpload";
               // fileUpload.uploadFileToUrl(file, uploadUrl);
            };
*/
    }

})();