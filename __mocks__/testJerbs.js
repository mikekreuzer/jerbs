async function simpleTestFn() {
	return new Promise((resolve) => {
		resolve('Test function output');
	});
}
simpleTestFn.description = 'A test function';

async function testFn(withArgs) {
	return new Promise((resolve) => {
		resolve(withArgs);
	});
}
testFn.description = 'A test function';

export { simpleTestFn, testFn };
