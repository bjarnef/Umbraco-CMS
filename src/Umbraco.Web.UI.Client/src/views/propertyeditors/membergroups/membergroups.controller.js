﻿function memberGroupController($scope, editorService, memberGroupResource) {

    var vm = this;

    vm.pickGroup = pickGroup;
    vm.removeGroup = removeGroup;

    vm.groups = [];

    //set the selected to the keys of the dictionary who's value is true
    for (var n in $scope.model.value) {
        if ($scope.model.value[n] === true) {
            vm.groups.push(n);
        }
    }

    function pickGroup() {
        editorService.memberGroupPicker({
            multiPicker: true,
            submit: function (model) {
                var selectedGroupIds = _.map(model.selectedMemberGroups
                    ? model.selectedMemberGroups
                    : [model.selectedMemberGroup],
                    function(id) { return parseInt(id) }
                );
                memberGroupResource.getByIds(selectedGroupIds).then(function (selectedGroups) {
                    _.each(selectedGroups, function(group) {
                        $scope.model.value[group.name] = true;
                    });
                });
                editorService.close();
            },
            close: function () {
                editorService.close();
            }
        });
    }

    function removeGroup(group) {
        $scope.model.value[group] = false;
    }
}
angular.module('umbraco').controller("Umbraco.PropertyEditors.MemberGroupController", memberGroupController);
