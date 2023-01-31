// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('clean-my-react.clean-my-react', () => {

		console.log('clean-my-react is running!');
		
		const currentDirectory = process.cwd();

		const searchForReactApp = (dir: string): string | null => {
			const files = fs.readdirSync(dir);
			for (const file of files) {
			  const fullPath = path.join(dir, file);
			  const stats = fs.statSync(fullPath);
			  if (stats.isDirectory()) {
				if (files.includes('package.json')) {
				  return fullPath;
				} else {
				  const result = searchForReactApp(fullPath);
				  if (result) {
					return result;
				  }
				}
			  }
			}
			return null;
		  };

		const directory = searchForReactApp(currentDirectory);

		console.log(directory + " is the directory");
		
		
		

		

		function deleteFiles() {
			// let testDirectory = `C:/Users/audun/Documents/vscode extension reactapp tester/my-app`;
			//delete the files
			fs.unlink(`${directory}/public/favicon.ico`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/public/logo192.png`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/public/logo512.png`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/public/robots.txt`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/public/manifest.json`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/src/App.css`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/src/App.test.js`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/src/reportWebVitals.js`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/src/setupTests.js`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink(`${directory}/src/logo.svg`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.unlink("${directory}/src/index.css", (err) => {
				if (err) {
					console.error(err);
					return;
				}
			}
			);
			fs.writeFileSync(`${directory}/src/App.js`, `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="App">\n    	Hello World!\n    </div>\n  );\n}\n\nexport default App;\n`);
			fs.writeFileSync(`${directory}/src/index.js`, `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);`);
		}

		deleteFiles();

		vscode.window.showInformationMessage('React app cleaned!');

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
