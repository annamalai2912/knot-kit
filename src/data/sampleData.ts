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

export const sampleHistoryData = [
  {
    id: '1',
    action: 'Create',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    data: { type: 'component', name: 'Button' }
  },
  {
    id: '2',
    action: 'Edit',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    data: { type: 'style', property: 'color' }
  },
  {
    id: '3',
    action: 'Move',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    data: { type: 'element', from: 'header', to: 'sidebar' }
  },
  {
    id: '4',
    action: 'Delete',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    data: { type: 'component', name: 'OldButton' }
  },
  {
    id: '5',
    action: 'Copy',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    data: { type: 'component', name: 'Card' }
  }
];

export const sampleAchievements = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Created your first component',
    icon: 'star',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    rarity: 'common' as const
  },
  {
    id: '2',
    name: 'Speed Demon',
    description: 'Completed 10 tasks in one day',
    icon: 'zap',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    rarity: 'rare' as const
  },
  {
    id: '3',
    name: 'Master Builder',
    description: 'Built 50 components',
    icon: 'trophy',
    unlocked: false,
    rarity: 'epic' as const
  },
  {
    id: '4',
    name: 'Legend',
    description: 'Reached 1000 points',
    icon: 'crown',
    unlocked: false,
    rarity: 'legendary' as const
  }
];

export const sampleStreakData = {
  current: 7,
  longest: 15,
  total: 42,
  lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
  weekData: [true, true, false, true, true, true, true]
};

export const sampleCarouselItems = [
  {
    id: '1',
    title: 'Modern Web Development',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=400&h=300&fit=crop',
    description: 'Build stunning web applications with modern frameworks and tools.'
  },
  {
    id: '2',
    title: 'UI/UX Design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop',
    description: 'Create beautiful and intuitive user interfaces that users love.'
  },
  {
    id: '3',
    title: 'Mobile Development',
    image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?w=400&h=300&fit=crop',
    description: 'Develop cross-platform mobile applications with React Native.'
  },
  {
    id: '4',
    title: 'Cloud Computing',
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?w=400&h=300&fit=crop',
    description: 'Deploy and scale applications using cloud infrastructure.'
  }
];

export const sampleRoadmapItems = [
  {
    id: '1',
    title: 'Project Planning',
    description: 'Define project scope and requirements',
    status: 'completed' as const,
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 15),
    assignees: ['John', 'Sarah'],
    dependencies: [],
    progress: 100
  },
  {
    id: '2',
    title: 'UI Design',
    description: 'Create wireframes and mockups',
    status: 'in-progress' as const,
    startDate: new Date(2024, 0, 10),
    endDate: new Date(2024, 1, 5),
    assignees: ['Alice', 'Bob'],
    dependencies: ['1'],
    progress: 65
  },
  {
    id: '3',
    title: 'Backend Development',
    description: 'Build API and database structure',
    status: 'planned' as const,
    startDate: new Date(2024, 1, 1),
    endDate: new Date(2024, 2, 15),
    assignees: ['Charlie', 'David'],
    dependencies: ['1'],
    progress: 0
  },
  {
    id: '4',
    title: 'Testing & QA',
    description: 'Comprehensive testing and quality assurance',
    status: 'planned' as const,
    startDate: new Date(2024, 2, 10),
    endDate: new Date(2024, 3, 1),
    assignees: ['Eve'],
    dependencies: ['2', '3'],
    progress: 0
  }
];

export const sampleFormSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic details about yourself',
    required: true,
    completed: true
  },
  {
    id: 'contact',
    title: 'Contact Details',
    description: 'How we can reach you',
    required: true,
    completed: true
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
    required: false,
    completed: false,
    substeps: [
      {
        id: 'notifications',
        title: 'Notification Settings',
        description: 'Choose how you want to be notified',
        required: false,
        completed: false
      },
      {
        id: 'privacy',
        title: 'Privacy Settings',
        description: 'Control your data and privacy',
        required: false,
        completed: false
      }
    ]
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your information before submitting',
    required: true,
    completed: false
  }
]