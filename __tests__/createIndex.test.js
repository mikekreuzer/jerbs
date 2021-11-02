import { createIndex } from '../lib/createIndex.js';

describe('createIndex()', () => {
	test('creates an index list of javascript files in the jerbs directory', async () => {
		const testReturn = await createIndex();
		expect(testReturn).toBe("export * as testJerbs from './testJerbs.js';\n");
	});
});
