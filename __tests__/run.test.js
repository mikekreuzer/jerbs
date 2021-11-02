//import { jest } from '@jest/globals';
import { run } from '../lib/run.js';

describe('run()', () => {
	test('returns a formatted list of tasks when run with no arguments', async () => {
		const testReturn = await run();
		expect(testReturn).toBe(
			'testModule\nsimpleTestFn        A test function\ntestFn              A test function\n\n'
		);
	});

	test('returns a formatted list of tasks when run with ls', async () => {
		process.argv = ['node', 'jerbs', 'ls'];
		const testReturn = await run();
		expect(testReturn).toBe(
			'testModule\nsimpleTestFn        A test function\ntestFn              A test function\n\n'
		);
	});

	test('runs a task when given module and function names', async () => {
		process.argv = ['node', 'jerbs', 'testModule', 'simpleTestFn'];
		const testReturn = await run();
		expect(testReturn).toBe('Test function output');
	});

	test('runs a task with arguments', async () => {
		process.argv = [
			'node',
			'jerbs',
			'testModule',
			'testFn',
			'some',
			'arguments',
		];
		const testReturn = await run();
		expect(testReturn).toStrictEqual(['some', 'arguments']);
	});

	test('errors when given a nonexistent module and function names', async () => {
		process.argv = ['node', 'jerbs', 'notTestModule', 'orTestFn'];
		const testReturn = await run();
		expect(testReturn).toBe(
			"run() Cannot read property 'orTestFn' of undefined"
		);
	});
});
