// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { dirname, normalize } from 'path';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "nyan-mode-vsc" is now active!');
  const filenameStr = require.main?.filename;

  if (filenameStr) {
    const main_file_path = dirname(filenameStr);
    const workbench_html_path = `${main_file_path}/vs/code/electron-browser/workbench/workbench.html`;

    let htmlFileContent = fs.readFileSync(workbench_html_path, 'utf-8');
    // htmlFileContent = htmlFileContent.replace(/\t?<script.*NyanCatConfiguration.*script>\n?/g, '');
    // htmlFileContent = htmlFileContent.replace('</body>', `${inject}\n</body>`);
    // fs.writeFileSync(htmlFilePath, htmlFileContent, 'utf-8');

    htmlFileContent = htmlFileContent.replace('</html>', `<script>window.zyhua=1111109;</script></html>`);

    fs.writeFileSync(workbench_html_path, htmlFileContent, 'utf-8');
  }

  const bar_item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  bar_item.text = 'Y $(nyan-zombie) ES';
  bar_item.tooltip = 'Nyan Cat';
  bar_item.show();

  vscode.window
    .showInformationMessage('Nyan Cat: refresh successful, reload Window to take effect.', 'Reload Window')
    .then(msg => {
      msg === 'Reload Window' && vscode.commands.executeCommand('workbench.action.reloadWindow');
    });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!' + (vscode.window as any).zyhua);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log('您的扩展“vscode-plugin-demo”已被释放！');
}
