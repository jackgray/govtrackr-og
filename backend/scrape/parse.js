const rp = require('request-promise');

const parse = function(url) {
	return rp(url)
		.then(function(html) {
			console.log($('.firstHeading', html).text());
			console.log($('.bday', html).text());
		})
		.catch(function(err) {
			// handle error
		});
};

module.exports = parse;
