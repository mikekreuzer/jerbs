import { readdir, writeFile } from 'fs/promises';

// create an index of the jerbs folder
async function createIndex() {
	const files = await readdir('./jerbs');
	const jerbsFilesList = files.filter((fileName) => {
		if (fileName.indexOf('.js') !== -1 && fileName !== 'jerbsIndex.js') {
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

	await writeFile('./jerbs/jerbsIndex.js', indexString);
}

export { createIndex };
