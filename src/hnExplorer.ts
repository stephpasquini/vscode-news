import * as vscode from 'vscode';
import HNProvider from './providers/hnProvider';
import HNItem from './providers/items/hnItem';
import * as CONST from './constants';
import WebviewPanel from './webviewPanel';

export default class HNExplorer {
  private hnViewer: vscode.TreeView<HNItem>;
  public hnProvider: HNProvider;

  constructor() {
    const treeDataProvider = new HNProvider();
    this.hnViewer = vscode.window.createTreeView('hn', {
      treeDataProvider,
    });
    this.hnProvider = treeDataProvider;
  }

  register() {
    vscode.commands.registerCommand(
      CONST.COMMAND_HN_OPEN,
      async (item: HNItem) => {
        const webview = WebviewPanel.getInstance();
        const content = await item.getContentHTML();
        webview.panel.title = 'Hacker News';
        webview.panel.webview.html = item.getHTMLDescription() + content;
        webview.panel.reveal();
      },
    );

    vscode.commands.registerCommand(CONST.COMMAND_HN_TOP, () => {
      this.hnProvider.type = 'top';
      this.hnViewer.title = 'Hacker News : Top Stories';
      this.hnProvider.refresh();
    });

    vscode.commands.registerCommand(CONST.COMMAND_HN_NEW, () => {
      this.hnProvider.type = 'new';
      this.hnViewer.title = 'Hacker News : News Stories';
      this.hnProvider.refresh();
    });

    vscode.commands.registerCommand(CONST.COMMAND_HN_BEST, () => {
      this.hnProvider.type = 'best';
      this.hnViewer.title = 'Hacker News : Best Stories';
      this.hnProvider.refresh();
    });

    vscode.commands.registerCommand('news.hnRefresh', () =>
      this.hnProvider.refresh(),
    );
  }
}
