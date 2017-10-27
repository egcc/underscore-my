(function() {
	var obj = {one: 1, two: 2, three: 3};

	console.log(_.keys(obj));

	console.log(_.values(obj));

	console.log(_.pairs(obj));

	console.log(_.invert(obj));

	obj.showme = function() {
		console.log('this is test function');
	};
	console.log(_.functions(obj));





	console.log(_.isElement(obj));
	console.log(_.isArray(obj));
	console.log(_.isArguments(obj));
}());