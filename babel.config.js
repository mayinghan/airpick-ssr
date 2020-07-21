const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appSrc = resolveApp('src');

module.exports = {
	'presets': ['@babel/preset-env', '@babel/preset-react'],
	// 'sourceType': 'unambiguous',
	'plugins': [
		[
			'@babel/plugin-proposal-decorators',
			{
				'legacy': true
			}
		],
		[
			'@babel/plugin-proposal-class-properties', {
				'loose': true
			}
		],
		[
			'module-resolver',
			{
				alias: {
					'@': appSrc
				}
			}
		],
	]
};
