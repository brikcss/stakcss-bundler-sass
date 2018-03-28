# Stakcss SASS Bundler

> Bundler for [Stakcss](https://github.com/brikcss/stakcss) that compiles [SASS](https://sass-lang.com/).

<!-- Shields. -->
<p>
	<!-- NPM version. -->
	<a href="https://www.npmjs.com/package/@brikcss/stakcss-bundler-sass">
		<img alt="NPM version" src="https://img.shields.io/npm/v/@brikcss/stakcss-bundler-sass.svg?style=flat-square">
	</a>
	<!-- NPM downloads/month. -->
	<a href="https://www.npmjs.com/package/@brikcss/stakcss-bundler-sass">
		<img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/@brikcss/stakcss-bundler-sass.svg?style=flat-square">
	</a>
	<!-- Travis branch. -->
	<a href="https://github.com/brikcss/stakcss-bundler-sass/tree/master">
		<img alt="Travis branch" src="https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master">
	</a>
	<!-- Codacy. -->
	<a href="https://www.codacy.com/app/thezimmee/stakcss-bundler-sass">
		<img alt="NPM version" src="https://img.shields.io/codacy/grade/f8a5424fac3b4ef6a2caf0df775487ac/master.svg?style=flat-square">
	</a>
	<!-- Coveralls -->
	<a href='https://coveralls.io/github/brikcss/stakcss-bundler-sass?branch=master'>
		<img src='https://img.shields.io/coveralls/github/brikcss/stakcss-bundler-sass/master.svg?style=flat-square' alt='Coverage Status' />
	</a>
	<!-- Commitizen friendly. -->
	<a href="http://commitizen.github.io/cz-cli/">
		<img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square">
	</a>
	<!-- Semantic release. -->
	<a href="https://github.com/semantic-release/semantic-release">
		<img alt="semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square">
	</a>
	<!-- Prettier code style. -->
	<a href="https://prettier.io/">
		<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
	</a>
	<!-- MIT License. -->
	<!-- <a href="https://choosealicense.com/licenses/mit/">
		<img alt="License" src="https://img.shields.io/npm/l/express.svg?style=flat-square">
	</a> -->
</p>

## Install

```sh
npm install @brikcss/stakcss @brikcss/stakcss-bundler-sass --save-dev
```

## Usage

Add the bundler to Stakcss and configure like any other bundler:

- Node:
	```js
	stak({
		bundlers: ['@brikcss/stakcss-bundler-sass']
	});
	```

	or with options and data:

	```js
	stak({
		bundlers: [{
			run: '@brikcss/stakcss-bundler-sass',
			options: {}
		}]
	});
	```

- CLI:
	```sh
	stak ... --bundlers=@brikcss/stakcss-bundler-sass
	```

	or with bundlers inside a config file:

	```sh
	stak --config=<path to config>
	```

### Bundler Configuration

_Note: From a CLI, you must use a config file (`--config=<path>`)_ to configure the bundler.

- **`bundler.options`** _{Object}_ Options passed to [SASS](https://github.com/sass/node-sass#options). The default options are:

	```js
	{
		data: '',
		indentType: 'tab',
		indentWidth: 1,
		outputStyle: config.isProd ? 'compressed' : 'expanded',
		outFile: config.output,
		precision: 5,
		sourceComments: !config.isProd,
		sourceMap: !config.isProd
	}
	```

_See [Stakcss](https://github.com/brikcss/stakcss) for more on using Stakcss bundlers._
