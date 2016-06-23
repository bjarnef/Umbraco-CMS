angular.module("umbraco")
	.controller("Umbraco.PropertyEditors.TextboxController", function ($scope) {

		// set default max characters
	    $scope.model.maxChars = $scope.model.config.maxChars || 0;

	    if (!$scope.model.config.showCharsCount) {
	        $scope.model.config.showCharsCount = false;
	    }

	    // if max characters is set and > 0, then set showCharsCount = true
	    $scope.model.config.showCharsCount = $scope.model.maxChars > 0;
	    $scope.model.config.showWordCount = true;

		// calculate a low and medium range so we can set the CSS appropriately
		var low = Math.ceil($scope.model.maxChars * 0.25);
		var med = Math.ceil($scope.model.maxChars * 0.5);

		$scope.countOf = function (text) {
			if (!text) {
				return 0;
			}
			else {
				var matches = text.match(/[^\s\n\r]+/g);
				return matches ? matches.length : 0;
			}
		};

		$scope.update = function () {

			$scope.wordCount = $scope.countOf($scope.model.value);

			// calculate the remaining characters
			$scope.model.remainingChars = $scope.model.maxChars > 0 ? ($scope.model.maxChars - $scope.model.value.length) : $scope.model.value.length;

			// is our maximum limit reached?
			if ($scope.model.remainingChars <= 0) {
				$scope.model.remainingChars = 0;
				$scope.model.value = $scope.model.value.substr(0, $scope.model.maxChars);
				return;
			}

			// set css class
			if ($scope.model.remainingChars <= low)
				$scope.model.className = "text-error";
			else if ($scope.model.remainingChars <= med)
				$scope.model.className = "text-warning";
			else
				$scope.model.className = "text-success";
		};

		$scope.update();
});