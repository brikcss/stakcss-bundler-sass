/* eslint-env mocha */
const assert = require('assert');
const rm = require('rimraf');
const fs = require('fs-extra');
const stak = require('@brikcss/stakcss');

describe('ejs()', () => {
	afterEach(() => {
		rm.sync('.temp');
	});

	it('compiles a stylesheet from source', () => {
		return stak({
			source: 'test/fixtures/simple/test.scss',
			output: '.temp/test.css',
			bundlers: ['./lib/stakcss-bundler-sass.js']
		}).then(() => {
			assert.equal(
				fs.readFileSync('.temp/test.css', 'utf8'),
				fs.readFileSync('test/expected/simple/test.css', 'utf8').trim()
			);
			assert.ok(fs.readJsonSync('.temp/test.css.map'));
		});
	});

	it('compiles a stylesheet from content', () => {
		return stak({
			content:
				'$primary-color: orange;\n$secondary-color: gold;\n\n.parent {\n\tcolor: $primary-color;\n\tbackground: $secondary-color;\n\n\t&__child {\n\t\tcolor: $secondary-color;\n\t\tdisplay: block;\n\t}\n}',
			output: '.temp/test.css',
			bundlers: [
				{
					run: './lib/stakcss-bundler-sass.js',
					options: { file: 'test/fixtures/simple/test.scss' }
				}
			]
		}).then(() => {
			assert.equal(
				fs.readFileSync('.temp/test.css', 'utf8'),
				fs.readFileSync('test/expected/simple/test.css', 'utf8').trim()
			);
			assert.ok(fs.readJsonSync('.temp/test.css.map'));
		});
	});

	it('compiles many stylesheets to one', () => {
		return stak({
			source: ['test/fixtures/complex/**/*', '!test/fixtures/complex/three.scss'],
			output: '.temp/complex.css',
			bundlers: ['./lib/stakcss-bundler-sass.js']
		}).then(() => {
			assert.equal(
				fs.readFileSync('.temp/complex.css', 'utf8'),
				fs.readFileSync('test/expected/complex/complex.css', 'utf8').trim()
			);
			assert.ok(fs.readJsonSync('.temp/complex.css.map'));
		});
	});

	it('compiles many stylesheets to many', () => {
		return stak({
			source: [
				'test/fixtures/complex/**/*',
				'!test/fixtures/complex/{one,mixins}.scss',
				'test/fixtures/simple/test.scss'
			],
			output: '.temp/',
			rename(filepath) {
				return filepath.replace('.scss', '.css');
			},
			bundlers: ['./lib/stakcss-bundler-sass.js']
		}).then(() => {
			const twoThreeResult =
				'/* line 1, test/fixtures/complex/three.scss */\n.three {\n\tdisplay: flex;\n}\n\n/* line 4, test/fixtures/complex/three.scss */\n.three__child {\n\tdisplay: flex;\n}\n\n/*# sourceMappingURL=two.css.map */';
			assert.equal(fs.readFileSync('.temp/two.css', 'utf8'), twoThreeResult);
			assert.equal(
				fs.readFileSync('.temp/three.css', 'utf8'),
				twoThreeResult.replace('two.css.map', 'three.css.map')
			);
			assert.equal(
				fs.readFileSync('.temp/test.css', 'utf8'),
				'/* line 4, test/fixtures/simple/test.scss */\n.parent {\n\tcolor: orange;\n\tbackground: gold;\n}\n\n/* line 8, test/fixtures/simple/test.scss */\n.parent__child {\n\tcolor: gold;\n\tdisplay: block;\n}\n\n/*# sourceMappingURL=test.css.map */'
			);
			assert.ok(fs.readJsonSync('.temp/two.css.map'));
			assert.ok(fs.readJsonSync('.temp/three.css.map'));
			assert.ok(fs.readJsonSync('.temp/test.css.map'));
		});
	});
});
