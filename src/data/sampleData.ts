import { NotificationItem, LeaderboardEntry } from '../types';

export const sampleNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Welcome to the Component Library!',
    message: 'Explore 25 unique components designed for modern web applications.',
    type: 'success',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    title: 'New Feature Available',
    message: 'Check out the new AI-powered components in the developer section.',
    type: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Components have been updated with better performance and accessibility.',
    type: 'info',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    priority: 'low'
  },
  {
    id: '4',
    title: 'Export Ready',
    message: 'Your component library export is ready for download.',
    type: 'success',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    priority: 'medium'
  }
];

export const sampleLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Alex Chen',
    score: 15420,
    rank: 1,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop&crop=faces',
    change: 'up'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    score: 14850,
    rank: 2,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=faces',
    change: 'down'
  },
  {
    id: '3',
    name: 'Marcus Williams',
    score: 13920,
    rank: 3,
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=faces',
    change: 'up'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    score: 12780,
    rank: 4,
    change: 'same'
  },
  {
    id: '5',
    name: 'David Kim',
    score: 11450,
    rank: 5,
    change: 'up'
  }
];

export const sampleStories = [
  {
    id: '1',
    title: 'Getting Started',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?w=400&h=600&fit=crop',
    content: 'Welcome to our comprehensive UI component library. Start building amazing interfaces with our production-ready components.',
    duration: 5000
  },
  {
    id: '2',
    title: 'Playful Components',
    image: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?w=400&h=600&fit=crop',
    content: 'Add delightful interactions with our fun components like confetti checkboxes and celebration buttons.',
    duration: 5000
  },
  {
    id: '3',
    title: 'Developer Tools',
    image: 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?w=400&h=600&fit=crop',
    content: 'Streamline your workflow with smart diff viewers, API response viewers, and code preview components.',
    duration: 5000
  },
  {
    id: '4',
    title: 'AI-Powered Features',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=400&h=600&fit=crop',
    content: 'Leverage AI with components that enhance user input, provide smart suggestions, and automate tasks.',
    duration: 5000
  }
];

export const sampleAPIData = {
  user: {
    id: 12345,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=faces",
    preferences: {
      theme: "dark",
      notifications: true,
      language: "en-US"
    },
    stats: {
      componentsUsed: 15,
      projectsCreated: 8,
      lastLogin: "2024-01-20T10:30:00Z"
    }
  },
  components: [
    {
      id: "confetti-checkbox",
      name: "Confetti Checkbox",
      category: "playful",
      downloads: 1250,
      rating: 4.8,
      tags: ["animation", "interactive", "fun"]
    },
    {
      id: "password-field-pro",
      name: "Password Field Pro",
      category: "practical", 
      downloads: 3420,
      rating: 4.9,
      tags: ["security", "validation", "form"]
    },
    {
      id: "xp-progress-bar",
      name: "XP Progress Bar",
      category: "gamified",
      downloads: 890,
      rating: 4.7,
      tags: ["gamification", "progress", "animation"]
    }
  ],
  metadata: {
    total: 25,
    updated: "2024-01-20T15:45:00Z",
    version: "2.1.0"
  }
};