function TennisGame(serving, receiving) {
	this.score = "Love - Love";
	this.receiving = receiving;
	this.serving = serving;
	this.scorehash = {};
	this.scorehash[serving] = 0;
	this.scorehash[receiving] = 0;
	return this;
}

TennisGame.prototype.getScore = function() {
	if (this.scorehash[this.receiving] == this.scorehash[this.serving]) {
		return this.scorehash[this.receiving] ? "Fifteen All" : "Love - Love";
	}
	else if (this.scorehash[this.receiving]) {
		return "Love - Fifteen";
	}
	else {
		if (this.scorehash[this.serving] === 1) {
			return "Fifteen - Love";
		}
		else {
			return 'Thirty - Love';
		}

	}
}

TennisGame.prototype.scorePoint = function(player) {
	this.scorehash[player]++;
}

test("sample test", function() {
	var game = new TennisGame('Venus', 'Serena');
	ok(game);
	equal(game.getScore(), "Love - Love");
	game.scorePoint('Venus');
	equal(game.getScore(), "Fifteen - Love");
	game.scorePoint('Serena');
	equal(game.getScore(), "Fifteen All");

	var game2 = new TennisGame('Venus', 'Serena');
	game2.scorePoint('Serena');
	equal(game2.getScore(), "Love - Fifteen");
	game2.scorePoint('Venus');
	equal(game2.getScore(), "Fifteen All");

	var game3 = new TennisGame('Venus', 'Serena');
	game3.scorePoint('Venus');
	game3.scorePoint('Venus');
	equal(game3.getScore(), 'Thirty - Love');
});