export interface Component {
  id: string;
  name: string;
  category: string;
  description: string;
  props?: Record<string, any>;
}

export interface TooltipPosition {
  x: number;
  y: number;
  visible: boolean;
  content: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  snoozed?: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface HistoryItem {
  id: string;
  action: string;
  timestamp: Date;
  data: any;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
  avatar?: string;
  change: 'up' | 'down' | 'same';
}