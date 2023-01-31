// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
const path = require("path");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "clean-my-react.clean-my-react",
    () => {
      vscode.window
        .showWarningMessage(
          "Are you sure you want to clean up your React App?",
          "Yes",
          "No"
        )
        .then((selection) => {
          if (selection === "Yes") {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            console.log(workspaceFolders + " is the workspaceFolders");

            let searchDirectory: string | undefined;

            if (workspaceFolders && workspaceFolders.length > 0) {
              searchDirectory = workspaceFolders[0].uri.fsPath;
            } else {
              searchDirectory = process.cwd();
            }

            const files = fs.readdirSync(searchDirectory!);
            console.log(files + " is the files");
            const fullPath = path.join(
              workspaceFolders![0].uri.fsPath,
              files[0]
            );

            const directory = fullPath;
            console.log(directory + " is the directory");

            if (directory) {
              fs.unlink(
                path.join(directory, "public", "favicon.ico"),
                (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );

              fs.unlink(
                path.join(directory, "public", "logo192.png"),
                (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );

              fs.unlink(
                path.join(directory, "public", "logo512.png"),
                (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );

              fs.unlink(path.join(directory, "public", "robots.txt"), (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });

              fs.unlink(
                path.join(directory, "public", "manifest.json"),
                (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );

              fs.unlink(path.join(directory, "src", "App.css"), (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });

              fs.unlink(path.join(directory, "src", "index.css"), (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });

              fs.unlink(path.join(directory, "src", "App.test.js"), (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });

              fs.unlink(
                path.join(directory, "src", "reportWebVitals.js"),
                (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                }
              );

              fs.unlink(path.join(directory, "src", "setupTests.js"), (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });

              fs.unlink(path.join(directory, "src", "logo.svg"), (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
              fs.writeFileSync(
                path.join(directory, "src", "App.js"),
                `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="App">\n    	Hello World!\n    </div>\n  );\n}\n\nexport default App;\n`
              );
              fs.writeFileSync(
                path.join(directory, "src", "index.js"),
                `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);`
              );
            } else {
              console.log(`Could not find the React app in ${searchDirectory}`);
            }

            vscode.window.showInformationMessage("React app cleaned!");
          } else if (selection === "No") {
            vscode.window.showInformationMessage("Aborted!");
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
