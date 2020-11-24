import * as vscode from 'vscode';

export default class WebviewPanel {
  private static instance?: WebviewPanel;
  public panel: vscode.WebviewPanel;
  private constructor() {
    this.panel = vscode.window.createWebviewPanel(
      'panel', // Identifies the type of the webview. Used internally
      '', // Title of the panel displayed to the user
      vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    );
    this.panel.onDidDispose(() => (WebviewPanel.instance = undefined));
  }

  static getInstance(): WebviewPanel {
    if (!WebviewPanel.instance) {
      WebviewPanel.instance = new WebviewPanel();
    } else {
      WebviewPanel.instance.panel.webview.html = '';
    }
    return WebviewPanel.instance;
  }
}
