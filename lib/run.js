import * as jerbs from '../../../jerbs/jerbsIndex.js';

// Call a module/function/with any remaining arguments
// eg with scripts having
// "jerbs": "node ./node_modules/jerbs/bin/run.js"
// then
// npm run jerbs -- my_file something --why not
// calls
// something([ '--why', 'not' ]) defined in ./jerbs/my_file.js

async function run() {
	const [moduleName, functionName, ...functionArgs] = process.argv.slice(2);
	if (moduleName == 'ls' && functionName == null) {
		listJerbs();
	} else {
		await jerbs[moduleName][functionName](functionArgs);
	}
}

function listJerbs() {
	const modules = Object.keys(jerbs);
	modules.forEach((moduleName) => {
		console.log(moduleName);
		const functionNames = Object.keys(jerbs[moduleName]);
		functionNames.forEach((functionName) => {
			let functionDesc = jerbs[moduleName][functionName].description ?? '';
			let len = 20 - functionName.length;
			len = len > 0 ? len : 1;
			let gap = '                     '.substr(0, len);
			gap = gap == ' ' && functionDesc != '' ? ' - ' : gap;
			console.log(`${functionName}${gap}${functionDesc}`);
		});
		console.log('');
	});
}

export { run };
