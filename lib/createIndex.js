import { readdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

// create an index of the jerbs folder
async function createIndex() {
	try {
		let jerbsFolder = '';
		let jerbsindex = '';
		if (process.env.NODE_ENV === 'test') {
			jerbsFolder = resolve('./__mocks__');
			jerbsindex = 'testJerbsIndex.js';
		} else {
			jerbsFolder = join(process.cwd(), 'jerbs');
			jerbsindex = 'jerbsIndex.js';
		}
		const files = await readdir(jerbsFolder);
		const jerbsFilesList = files.filter((fileName) => {
			if (fileName.indexOf('.js') !== -1 && fileName !== jerbsindex) {
				return fileName;
			}
		});

		let indexString = '';
		jerbsFilesList.forEach((fileName) => {
			indexString += `export * as ${fileName.slice(
				0,
				-3
			)} from './${fileName}';\n`;
		});

		if (process.env.NODE_ENV === 'test') {
			return new Promise((resolve) => {
				resolve(indexString);
			});
		} else {
			await writeFile(join(jerbsFolder, jerbsindex), indexString);
		}
	} catch (err) {
		if (process.env.NODE_ENV === 'test') {
			return 'createIndex() ' + err.message;
		} else {
			console.log('Error:', err.message);
		}
	}
}

export { createIndex };
