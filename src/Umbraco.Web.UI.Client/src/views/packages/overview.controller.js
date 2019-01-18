(function () {
    "use strict";

    function PackagesOverviewController($scope, $location, $routeParams, localStorageService) {

        //Hack!
        // if there is a local storage value for packageInstallData then we need to redirect there,
        // the issue is that we still have webforms and we cannot go to a hash location and then window.reload
        // because it will double load it.
        // we will refresh and then navigate there.

        let packageInstallData = localStorageService.get("packageInstallData");
        let packageUri = $routeParams.method;

        if (packageInstallData) {            
            localStorageService.remove("packageInstallData");                       
        }

        if (packageInstallData && packageInstallData !== "installed" && packageInstallData.postInstallationPath) {
            //navigate to the custom installer screen, if it is just "installed" it means there is no custom installer screen
            $location.path(packageInstallData.postInstallationPath).search("packageId", packageInstallData.id);
        }
        else {
            var vm = this;

            packageUri = packageInstallData ? packageInstallData : packageUri; //use the path stored in storage over the one in the current path

            vm.page = {};
            vm.page.name = "Packages";
            vm.page.navigation = [
                {
                    "name": "Packages",
                    "icon": "icon-cloud",
                    "view": "views/packages/views/repo.html",
                    "active": !packageUri || packageUri === "repo",
                    "alias": "umbPackages",
                    "action": function () {
                        $location.path("/packages/packages/repo");
                    }
                },
                {
                    "name": "Installed",
                    "icon": "icon-box",
                    "view": "views/packages/views/installed.html",
                    "active": packageUri === "installed",
                    "alias": "umbInstalled",
                    "action": function () {
                        $location.path("/packages/packages/installed");
                    }
                },
                {
                    "name": "Install local",
                    "icon": "icon-add",
                    "view": "views/packages/views/install-local.html",
                    "active": packageUri === "local",
                    "alias": "umbInstallLocal",
                    "action": function () {
                        $location.path("/packages/packages/local");
                    }
                },
                {
                    "name": "Created",
                    "icon": "icon-add",
                    "view": "views/packages/views/created.html",
                    "active": packageUri === "created",
                    "alias": "umbCreatedPackages",
                    "action": function () {
                        $location.path("/packages/packages/created");
                    }
                }
            ];

        }

    }

    angular.module("umbraco").controller("Umbraco.Editors.Packages.OverviewController", PackagesOverviewController);

})();
