import * as vscode from 'vscode';
import * as moment from 'moment';
import axios from 'axios';
import { HNStory } from '../../types';
import { COMMAND_HN_OPEN } from '../../constants';

export default class HNItem extends vscode.TreeItem {
  public subtext;
  constructor(
    public readonly story: HNStory,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(story.title, collapsibleState);

    this.subtext = `${story.score} points by ${story.by} ${this.getTimePosted(
      story.time,
    )} | ${story.kids?.length || '0'} comments`;
    this.tooltip = `${this.label} \r\n${this.subtext}`;
    this.command = {
      command: COMMAND_HN_OPEN,
      title: 'Open item',
      arguments: [this],
    };
  }

  public getHTMLDescription() {
    return `<h3><center>${this.label}</center></h3>
      <h4><center>${this.subtext}</center></h4>
      <p>${this.story.text || ''}</p>`;
  }

  public async getContentHTML(): Promise<string> {
    const url = this.story.url;
    if (url) {
      const fetchContent = await axios.get(url);
      return fetchContent.data;
    } else {
      return this.story.text;
    }
  }

  private getTimePosted(time: number) {
    return moment(new Date(time * 1000)).fromNow();
  }
}
