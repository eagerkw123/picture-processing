if (process.env.NODE_ENV === 'production') {
	module.exports = require('./dist/picture-processing.min.js')
} else {
	module.exports = require('./dist/picture-processing.js')
}