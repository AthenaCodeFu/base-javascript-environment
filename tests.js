function MyClass(initializationVariable) {
	// Initialization Goes here
	return this;
}

MyClass.prototype.myFunction = function() {
	// Do Stuff
}

function scoreForChance(diceValues) {
	return diceValues.reduce(
		function(previous, current) {
			return previous + current;
		}, 0);
}

function scoreForYahtzee(diceValues) {
	var firstValue = diceValues[0];
	for (var i = 1; i < diceValues.length; i++) {
		if (diceValues[i] != firstValue) {
			return 0;
		}
	}
	return 50;
}

function scoreForDuplicates(diceValues, pips) {
	var sum = 0;
	for (var i =0; i< diceValues.length; i++) {
		if (diceValues[i] === pips) {
			sum += pips;
		}
	}
	return sum;

}

test("sample test", function() {
	equal(scoreForChance([1,1,1,1,1]), 5);
	equal(scoreForYahtzee([1,1,1,1,2]), 0);
	equal(scoreForYahtzee([1,1,1,1,1]), 50);
	equal(scoreForDuplicates([1,1,1,3,4], 1), 3);
	equal(scoreForDuplicates([2,3,1,3,4], 3), 6);
});
