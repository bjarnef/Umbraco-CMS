(function () {
    "use strict";

    function UserAvatarController($scope, $routeParams, usersResource, Upload, umbRequestHelper) {

        var vm = this;
        vm.loading = true;
        vm.avatarFile = {};

        vm.handleFiles = handleFiles;

        function handleFiles(files, event) {
            if (files && files.length > 0) {
                console.log("files", files);
                upload(files[0]);
            }
        }

        function upload(file) {

            vm.avatarFile.uploadProgress = 0;

            Upload.upload({
                url: umbRequestHelper.getApiUrl("userApiBaseUrl", "PostSetAvatar", { id: vm.user.id }),
                fields: {},
                file: file
            }).progress(function (evt) {

                if (vm.avatarFile.uploadStatus !== "done" && vm.avatarFile.uploadStatus !== "error") {
                    // set uploading status on file
                    vm.avatarFile.uploadStatus = "uploading";

                    // calculate progress in percentage
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total, 10);

                    // set percentage property on file
                    vm.avatarFile.uploadProgress = progressPercentage;
                }

            }).success(function (data, status, headers, config) {

                // set done status on file
                vm.avatarFile.uploadStatus = "done";
                vm.avatarFile.uploadProgress = 100;
                vm.user.avatars = data;

                getUserAvatar(vm.user);

            }).error(function (evt, status, headers, config) {

                // set status done
                vm.avatarFile.uploadStatus = "error";

                // If file not found, server will return a 404 and display this message
                if (status === 404) {
                    vm.avatarFile.serverErrorMessage = "File not found";
                }
                else if (status == 400) {
                    //it's a validation error
                    vm.avatarFile.serverErrorMessage = evt.message;
                }
                else {
                    //it's an unhandled error
                    //if the service returns a detailed error
                    if (evt.InnerException) {
                        vm.avatarFile.serverErrorMessage = evt.InnerException.ExceptionMessage;

                        //Check if its the common "too large file" exception
                        if (evt.InnerException.StackTrace && evt.InnerException.StackTrace.indexOf("ValidateRequestEntityLength") > 0) {
                            vm.avatarFile.serverErrorMessage = "File too large to upload";
                        }

                    } else if (evt.Message) {
                        vm.avatarFile.serverErrorMessage = evt.Message;
                    }
                }
            });
        }

        function onInit() {

            console.log("acceptedFileTypes", $scope.model.acceptedFileTypes);
            console.log("maxFileSize", $scope.model.maxFileSize);

            vm.acceptedFileTypes = $scope.model.acceptedFileTypes;
            vm.maxFileSize = $scope.model.maxFileSize;

            //$scope.imageSrc = "/media/UserAvatars/72e5289b7bd199b740e6e17e43c0e463d1d5c63c.jpg";

            usersResource.getUser($routeParams.id).then(function (user) {
                console.log("user", user);
                vm.user = user;

                getUserAvatar(user);

                vm.loading = false;
            });

            vm.focalPoint = {
                left: 0.5,
                top: 0.5
            };

            //vm.files = $scope.model.files;
            vm.currentCrop = {
                height: 400,
                width: 400,
                coordinates: 0,
                crops: []
            };

            var files = $scope.model.files;
            console.log("files", files);

            //if there are already files in the client assigned then set the src
            //if (files && files[0]) {
            //    $scope.imageSrc = files[0].fileSrc;
            //}
            //else {
            //    $scope.imageSrc = $scope.model.value.src;
            //}
        }

        function getUserAvatar(user) {
            var avatar = user.avatars[0];
            if (avatar) {
                if (avatar.includes("gravatar.com")) {
                    avatar = avatar.replace("s=30", "s=512");
                }
                else {
                    avatar = avatar.split('?')[0];
                }
                
                $scope.imageSrc = avatar;
            }
        }

        onInit();
    }

    angular.module("umbraco").controller("Umbraco.Overlays.UserAvatarController", UserAvatarController);

})();
