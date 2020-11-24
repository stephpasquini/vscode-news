import * as vscode from 'vscode';
import axios from 'axios';
import GithubRepoItem from './items/githubRepoItem';
import { GithubTrendingRepo } from '../types';

export default class GithubProvider
  implements vscode.TreeDataProvider<GithubRepoItem> {
  getTreeItem(element: GithubRepoItem): vscode.TreeItem {
    return element;
  }

  getChildren(
    element?: GithubRepoItem,
  ): vscode.ProviderResult<GithubRepoItem[]> {
    return Promise.resolve(this.getGithubTrendingRepos());
  }

  private async getGithubTrendingRepos(): Promise<GithubRepoItem[]> {
    const fetchRepos = await axios.get(
      'https://github.vscode-news.com/repositories',
    );
    const githubRepos = fetchRepos.data.map((repo: GithubTrendingRepo) => {
      return new GithubRepoItem(repo, vscode.TreeItemCollapsibleState.None);
    });

    return githubRepos;
  }
}
