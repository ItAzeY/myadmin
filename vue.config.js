"use strict"
const path = require("path")

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	/**
	 * You will need to set publicPath if you plan to deploy your site under a sub path,
	 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
	 * then publicPath should be set to "/bar/".
	 * In most cases please use '/' !!!
	 * Detail: https://cli.vuejs.org/config/#publicpath
	 */
	publicPath: "/",
	outputDir: "dist",
	assetsDir: "static",
	productionSourceMap: false,
	devServer: {
		port: 8080,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		}
	},
	configureWebpack: {
		name: "myadmin",
		resolve: {
			alias: {
				"@": resolve("src")
			}
		}
	},
	chainWebpack(config) {
		// set svg-sprite-loader
		config.module
			.rule("svg")
			.exclude.add(resolve("src/icons"))
			.end()
		config.module
			.rule("icons")
			.test(/\.svg$/)
			.include.add(resolve("src/icons"))
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]"
			})
			.end()

		// set preserveWhitespace
		config.module
			.rule("vue")
			.use("vue-loader")
			.loader("vue-loader")
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true
				return options
			})
			.end()
	}
}
