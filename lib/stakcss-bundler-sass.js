/** ------------------------------------------------------------------------------------------------
 *  @filename  stakcss-bundler-sass.js
 *  @author  brikcss  <https://github.com/brikcss>
 *  @description  Stakcss bundler which compiles sass.
 ** --------------------------------------------------------------------------------------------- */

const sass = require('node-sass');

module.exports = (config = {}, bundler = {}) => {
	// Assign options.
	bundler.options = Object.assign(
		{
			data: '',
			indentType: 'tab',
			indentWidth: 1,
			outputStyle: config.isProd ? 'compressed' : 'expanded',
			outFile: config.output,
			precision: 5,
			sourceComments: !config.isProd,
			sourceMap: !config.isProd
		},
		bundler.options || {}
	);

	// Set bundler.options.data to content or list of imports from source.
	if (config.content) {
		bundler.options.data = config.content;
	} else {
		// Create a string of @imports from the source files array.
		config.source.forEach((filepath) => {
			var index = filepath.indexOf('.css');
			if (index === filepath.length - 4) {
				bundler.options.data += '@import "' + filepath.slice(0, -4) + '"; ';
			} else {
				bundler.options.data += '@import "' + filepath + '"; ';
			}
		});
	}

	// Compile the SASS.
	return new Promise((resolve, reject) => {
		return sass.render(bundler.options, (error, result) => {
			if (error) {
				reject(error);
			}

			// Form the return object.
			config.content = result.css;
			if (bundler.options.sourceMap) {
				config.sourceMap = result.map;
			}
			return resolve(config);
		});
	});
};
