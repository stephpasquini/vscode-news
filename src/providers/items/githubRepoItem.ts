import * as vscode from 'vscode';
import { COMMAND_GITHUB_OPEN } from '../../constants';
import { GithubTrendingRepo } from '../../types';

export default class GithubRepoItem extends vscode.TreeItem {
  constructor(
    public readonly repo: GithubTrendingRepo,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(repo.name, collapsibleState);
    this.description = `${repo.stars} ★`;
    this.tooltip = this.repo.description;
    this.command = {
      command: COMMAND_GITHUB_OPEN,
      title: 'Open README',
      arguments: [this],
    };
  }
}
