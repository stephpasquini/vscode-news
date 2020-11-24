import * as vscode from 'vscode';
import axios from 'axios';
import HNItem from './items/hnItem';
import { HNStory } from '../types';

export default class HNProvider implements vscode.TreeDataProvider<HNItem> {
  public type: string = 'top';
  private _onDidChangeTreeData: vscode.EventEmitter<
    HNItem | undefined | null | void
  > = new vscode.EventEmitter<HNItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    HNItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  getTreeItem(element: HNItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: HNItem): vscode.ProviderResult<HNItem[]> {
    return Promise.resolve(this.getHNItems());
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  private async getHNItems(): Promise<HNItem[]> {
    const fetchItems = await axios.get(
      `https://hacker-news.firebaseio.com/v0/${this.type}stories.json?print=pretty`,
    );
    const hnItems = fetchItems.data.map(async (item: number) => {
      const fetchItem = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`,
      );
      const story: HNStory = fetchItem.data;
      return new HNItem(story, vscode.TreeItemCollapsibleState.None);
    });
    return hnItems;
  }
}
