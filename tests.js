function MyClass(initializationVariable) {
	// Initialization Goes here
	return this;
}

MyClass.prototype.myFunction = function() {
	// Do Stuff
}

function _ScoreChance(faceValues) {
	var score = 0;

	for(var i = 0; i < faceValues.length; i++) {
		score += faceValues[i];
	}

	return score;
}

function _ScoreYahtzee(faceValues) {
	var firstValue = faceValues[0];

	for(var i = 1; i < faceValues.length; i++) {
		if (firstValue !== faceValues[i]) {
			return 0;
		}
	}

	return 50;
}

function _ScoreNs(faceValues, N) {
	return N * _CountFrequencies(faceValues)[N];
}

function _ScorePairs(faceValues) {
	var alreadySeen = {};
	
	// Initialization
	var frequencies = _CountFrequencies(faceValues);

	var topPair = 0;
	for (var i = 0; i < faceValues.length; ++i) {
		var x = faceValues[i];

		if (alreadySeen[x]) {
			if (x > topPair) {
				topPair = x;
			}
		}
		else {
			alreadySeen[x] = true;
		}
	}
	return topPair*2;
}


function _ScoreTwoPairs(faceValues) {
	// Initialization
	var frequencies = _CountFrequencies(faceValues);

	var score = 0;

	for (var dieValue = 6; dieValue > 0; --dieValue) {
		if (frequencies[dieValue] >= 4) {
			return dieValue * 4;
		} else if (frequencies[dieValue] >= 2) {
			if (score != 0) {
				// Second pair we've seen
				return score + (dieValue * 2);
			} else {
				score = (dieValue * 2);
			}
		}
	}
	return 0; // Aww... didn't get two pairs
}

function _CountFrequencies(faceValues) {
	var frequencies = {};
	for (var i = 1; i <= 6; ++i) {
		frequencies[i] = 0;
	}

	for (var dieIndex = 0; dieIndex < faceValues.length; ++dieIndex) {
		++frequencies[faceValues[dieIndex]];
	}

	return frequencies;
}


test("sample test", function() {
	equal(_ScoreChance([1,1,1,1,1]), 5);
	equal(_ScoreYahtzee([1,1,1,1,1]), 50);
	equal(_ScoreYahtzee([1,1,1,1,2]), 0);
	equal(_ScoreNs([1,1,2,3,4],1), 2);
	equal(_ScoreNs([1,1,2,2,4],2), 4);
	equal(_ScoreNs([1,1,5,5,5],5), 15);
	equal(_ScorePairs([1,3,4,3,4]), 8);
	equal(_ScorePairs([1,3,4,3,4]), 8);
	equal(_ScorePairs([1,2,3,4,5]), 0);
	equal(_ScoreTwoPairs([1,2,3,4,5]), 0);
	equal(_ScoreTwoPairs([1,2,3,4,4]), 0);
	equal(_ScoreTwoPairs([4, 3, 4, 2, 3]), 14);
	equal(_ScoreTwoPairs([5, 5, 5, 4, 4]), 18);
	equal(_ScoreTwoPairs([4, 4, 4, 4, 6]), 16);
	equal(_ScoreTwoPairs([3, 3, 3, 5, 1]), 0);
});
