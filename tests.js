function factorize(n) {
	var result = [];
	var primes = twoton(n);
	for (var i = 0; i < primes.length; ++i) {
		var p = primes[i];
		while(!(n % p)){
			n /= p;
			result.push(p);
		}
	}

	return result;
}

function twoton(n) {
	var index = 2,
		range = [];
	while (index <= n) {
		range.push(index);
		++index;
	}

	return range;
}

test("sample test", function() {
	deepEqual(factorize(2), [2]);
	deepEqual(factorize(3), [3]);
	deepEqual(factorize(4), [2,2]);
	deepEqual(factorize(5), [5]);
	deepEqual(factorize(6), [2,3]);
	deepEqual(factorize(8), [2,2,2]);
	deepEqual(factorize(9), [3, 3]);
	deepEqual(factorize(42), [2, 3, 7]);
});
