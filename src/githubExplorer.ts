import * as vscode from 'vscode';
import * as remark from 'remark';
import * as html from 'remark-html';
import GithubProvider from './providers/githubProvider';
import GithubRepoItem from './providers/items/githubRepoItem';
import * as CONST from './constants';
import WebviewPanel from './webviewPanel';
import axios from 'axios';

export default class GithubExplorer {
  private githubViewer: vscode.TreeView<GithubRepoItem>;
  public githubProvider: GithubProvider;

  constructor() {
    const treeDataProvider = new GithubProvider();
    this.githubViewer = vscode.window.createTreeView('githubTrending', {
      treeDataProvider,
    });
    this.githubProvider = treeDataProvider;
  }

  register() {
    vscode.commands.registerCommand(
      CONST.COMMAND_GITHUB_OPEN,
      async (item: GithubRepoItem) => {
        const url = `${CONST.GITHUB_BASE_URL}/${item.repo.author}/${item.repo.name}/readme`;
        const fetchReadme = await axios.get(url);
        const decodedReadme = Buffer.from(
          fetchReadme.data.content,
          'base64',
        ).toString();
        const webview = WebviewPanel.getInstance();
        const markdownReadme = await this.markdownCompiler().process(
          decodedReadme,
        );
        webview.panel.title = item.repo.name;
        webview.panel.webview.html = markdownReadme.contents;
        webview.panel.reveal();
      },
    );

    vscode.commands.registerCommand('news.githubRefresh', () =>
      this.githubProvider.refresh(),
    );
  }

  private markdownCompiler(): any {
    return remark().use(html);
  }
}
