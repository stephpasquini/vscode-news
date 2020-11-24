export interface GithubTrendingRepo {
  author: string;
  name: string;
  languageColor: string;
  url: string;
  description: string;
  language: string;
  stars: string;
  currentPeriodStars: string;
  forks: string;
  avatar: string;
  builtBy: any[];
}

export interface HNStory {
  title: string;
  by: string;
  score: number;
  time: number;
  text: string;
  url?: string;
  kids: number[];
}
