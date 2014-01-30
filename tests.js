var TennisGame = function (players) {
	var pub = {};
	var points = {};
	var POINTS_TO_SCORE = [
		'love',
		'fifteen',
		'thirty',
		'forty'
	];

	for (var i = 0; i < players.length; ++i) {
		points[players[i]] = 0;
	}

	pub.getScore = function () {
		var score = "";
		var scoreNames = [];
		if (points[players[0]] == points[players[1]] && points[players[0]] != 0) {
			return 'deuce';
		}
		for (var i = 0; i < players.length; ++i) {
			scoreNames.push(POINTS_TO_SCORE[points[players[i]]]);
		}

		return scoreNames[0] + '-' + scoreNames[1];
	};

	pub.pointFor = function(playerName) {
		points[playerName] += 1;
	};

	return pub;
};


test("sample test", function() {
	var t = TennisGame(['Venus','Serena']);

	equal(t.getScore(), "love-love", "Sample passed!");
	t.pointFor('Venus');
	equal(t.getScore(), "fifteen-love", "score was changed by pointFor call");
	t.pointFor('Venus');
	equal(t.getScore(), "thirty-love", "score correct after second point");
	t.pointFor('Venus');
	equal(t.getScore(), "forty-love", "score correct after third point");
	t.pointFor('Serena');
	t.pointFor('Serena');
	t.pointFor('Serena');
	equal(t.getScore(), "deuce", "Same score is a deuce");

	t = TennisGame(['Venus','Serena']);
	t.pointFor('Serena');
	equal(t.getScore(), "love-fifteen", "score knows about player ordering");

});