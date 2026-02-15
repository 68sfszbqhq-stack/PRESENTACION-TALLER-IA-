export enum SlideType {
  TITLE = 'TITLE',
  SPLIT_IMAGE_LEFT = 'SPLIT_IMAGE_LEFT',
  SPLIT_IMAGE_RIGHT = 'SPLIT_IMAGE_RIGHT',
  BULLET_POINTS = 'BULLET_POINTS',
  BIG_QUOTE = 'BIG_QUOTE',
  GRID_CARDS = 'GRID_CARDS',
  STATISTIC = 'STATISTIC',
  CALL_TO_ACTION = 'CALL_TO_ACTION'
}

export interface Tool {
  name: string;
  explanation: string;
  benefits: string[];
  url: string;
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string;
  bullets?: string[];
  image?: string;
  highlightText?: string; // For stats or quotes
  footer?: string;
  cards?: {
    title: string;
    description: string;
    icon: string;
    tools?: Tool[];
  }[];
}