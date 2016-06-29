angular.module("umbraco")
	.controller("Umbraco.PropertyEditors.TextareaController", function ($scope, localizationService) {

		// set default max characters
	    $scope.model.maxChars = $scope.model.config.maxChars || 0;

	    // show character count
	    if ($scope.model.config.showCharsCount == null) {
	        $scope.model.config.showCharsCount = false;
	    }
	    else {
	        $scope.model.config.showCharsCount = $scope.model.config.showCharsCount === "1";
	    }

	    // show word count
	    if ($scope.model.config.showWordCount == null) {
	        $scope.model.config.showWordCount = false;
	    }
	    else {
	        $scope.model.config.showWordCount = $scope.model.config.showWordCount === "1";
	    }

        // only set limit when maxChars > 0 and chars count is enabled
	    $scope.model.config.hasCharLimit = $scope.model.maxChars > 0 && $scope.model.config.showCharsCount;

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

		$scope.getCharsText = function (remainingChars, maxChars) {
		    if ($scope.model.config.hasCharLimit) {
		        localizationService.localize("general_charactersRemaining").then(function (value) {
		            console.log(value + ": " + remainingChars + '/' + maxChars);
		            $scope.model.charsText = value + ": " + remainingChars + '/' + maxChars;
		        });
		    }
		    else {
		        localizationService.localize("general_characters").then(function (value) {
		            console.log(value + ": " + remainingChars);
		            $scope.model.charsText = value + ": " + remainingChars;
		        });
		    }
		};

		$scope.update = function () {

		    $scope.wordCount = $scope.countOf($scope.model.value);

			// calculate the remaining characters
			$scope.model.remainingChars = $scope.model.config.hasCharLimit ? ($scope.model.maxChars - $scope.model.value.length) : $scope.model.value.length;

			// is our maximum limit reached?
			if ($scope.model.remainingChars <= 0) {
				$scope.model.remainingChars = 0;
				$scope.model.value = $scope.model.value.substr(0, $scope.model.maxChars);
				return;
			}

			$scope.getCharsText($scope.model.remainingChars, $scope.model.maxChars);

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