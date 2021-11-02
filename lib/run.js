import { join } from 'path';
const jerbs = await dynImport(
	join(process.cwd(), 'jerbs', 'jerbsIndex.js'),
	'../__mocks__/testJerbsIndex.js'
);

async function dynImport(prodModule, testModule) {
	if (process.env.NODE_ENV !== 'test') {
		return await import(prodModule);
	} else {
		return await import(testModule);
	}
}

async function run() {
	try {
		const [moduleName, functionName, ...functionArgs] = process.argv.slice(2);
		let testReturn = '';
		if (
			moduleName == undefined ||
			(moduleName == 'ls' && functionName == null)
		) {
			testReturn = listJerbs();
		} else {
			testReturn = await jerbs[moduleName][functionName](functionArgs);
		}
		if (process.env.NODE_ENV === 'test') {
			return new Promise((resolve) => {
				resolve(testReturn);
			});
		}
	} catch (err) {
		if (process.env.NODE_ENV === 'test') {
			return 'run() ' + err.message;
		} else {
			console.log('Error:', err.message);
		}
	}
}

function listJerbs() {
	try {
		const modules = Object.keys(jerbs);
		let returnString = '';
		modules.forEach((moduleName) => {
			returnString += moduleName + '\n';
			const functionNames = Object.keys(jerbs[moduleName]);
			functionNames.forEach((functionName) => {
				let functionDesc = jerbs[moduleName][functionName].description ?? '';
				let len = 20 - functionName.length;
				len = len > 0 ? len : 1;
				let gap = '                     '.substr(0, len);
				gap = gap == ' ' && functionDesc != '' ? ' - ' : gap;
				returnString += `${functionName}${gap}${functionDesc}\n`;
			});
			returnString += '\n';
		});
		if (process.env.NODE_ENV === 'test') {
			return returnString;
		} else {
			console.log(returnString);
		}
	} catch (err) {
		if (process.env.NODE_ENV === 'test') {
			return 'listJerbs() ' + err.message;
		} else {
			console.log('Error:', err.message);
		}
	}
}

export { run };
