# jerbs

Jerbs is a simple, modern task runner.

### Simple

Jerbs has no dependencies. The whole thing is fewer than a hundred lines of code. It runs off the back of npm scripts, why reinvent the wheel?

Tasks in Jerbs are async functions you write, in file modules you set up. There are no magic incantations to learn.

### Modern

Jerbs uses modules and imports/exports. Jerbs is async.

## Requirements, installation & use

Add <code>"type": "module"</code> to package.json

Install Jerbs with <code>npm i jerbs</code>, or globally if you want.

Add the following two scripts to any others you have in the scripts tag in package.json (assuming you installed jerbs locally)

```
"scripts": {
	"indexer": "node ./node_modules/jerbs/bin/createIndex.js",
	"jerbs": "node ./node_modules/jerbs/bin/jerbs.js"
}
```

If you installed jerbs globally you'll need to adjust the paths to those files based on where your global node modules are.

Add a directory called **jerbs** for your task module files. Then add your tasks.

## Jerbs tasks

An example module called **server.js** might export the following simple functions (AKA tasks):

```
async function init(withArgs) {
	console.log('something', withArgs);
}
init.description = 'Do some setup things';

async function run() {
	console.log('Run has no arguments');
}
run.description = 'Do even things';

export { init, run };
```

Run <code>npm run indexer</code> which will generate a **jerbsIndex.js** file with import/export calls for your tasks. You should re-run indexer whenever you change the names/structure of your modules & tasks. You can create this file manually if you want.

Run <code>npm run jerbs ls</code> to see the available tasks, or after you set up the alias discussed next: <code>jerbs ls</code>

## Useful aliases

You can set up an alias 'jerbs' for 'npm run jerbs' to save some typing.

### In bash

```
alias jerbs='npm run jerbs'
```

### In fish

```
alias jerbs='npm run jerbs' -s
```

Then eg <code>npm run jerbs ls</code> becomes <code>jerbs ls</code>.

## Running tasks

npm run jerbs (or an alias for that) is followed by the module name, the function name, and if the function has arguments, two dashes and the function arguments, eg <code>npm run jerbs server init -- Friday</code>

Without arguments you can call eg <code>npm run jerbs server run</code> or with an alias, eg <code>jerbs server run</code>

The names of the modules, and the functions are up to you. What they do is up to you, it's just JavaScript.
