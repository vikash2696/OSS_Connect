(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.status = null;
        vm.postData = postData;

       /* initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }*/
        
        function postData() {
//        	console.log(vm.status); return;
        	var data = editor.getData();
        	var postData = {'statusData' : data};
            UserService.postData(postData)
                .then(function () {
                   FlashService.Success('User updated');
                }).catch(function (error) {
                   FlashService.Error(error);
                });
            }
    }

})();