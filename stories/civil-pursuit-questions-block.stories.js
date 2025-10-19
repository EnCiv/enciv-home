import React from 'react'
import CivilPursuitQuestionsBlock from '../app/components/civil-pursuit-questions-block'

export default {
  component: CivilPursuitQuestionsBlock,
  title: 'CivilPursuitQuestionsBlock',
  argTypes: {
    mode: {
      control: { type: 'select', options: ['dark', 'light'] },
      description: 'Color theme mode',
    },
    subject: {
      control: 'text',
      description: 'Header text for the block',
    },
  },
  decorators: [
    Story => {
      // Mock socket for Storybook
      if (typeof window !== 'undefined') {
        window.socket = {
          emit: (event, callback) => {
            if (event === 'get-civil-pursuit-questions') {
              // Mock response data
              setTimeout(() => {
                callback([
                  {
                    _id: '1',
                    subject: 'What are the biggest challenges facing our community?',
                    path: '/question/1',
                  },
                  {
                    _id: '2',
                    subject: 'How can we improve public transportation?',
                    path: '/question/2',
                  },
                  {
                    _id: '3',
                    subject: 'What initiatives would you like to see for youth engagement?',
                    path: '/question/3',
                  },
                  {
                    _id: '4',
                    subject: 'How do we balance economic growth with environmental sustainability?',
                    path: '/question/4',
                  },
                  {
                    _id: '5',
                    subject: 'What role should technology play in civic participation?',
                    path: '/question/5',
                  },
                ])
              }, 100)
            }
          },
        }
      }
      return <Story />
    },
  ],
}

export const LightMode = {
  args: {
    mode: 'light',
    subject: 'Deliberation Topics',
  },
}

export const DarkMode = {
  args: {
    mode: 'dark',
    subject: 'Deliberation Topics',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const WithLongQuestions = {
  args: {
    mode: 'light',
    subject: 'Deliberation Topics',
  },
  decorators: [
    Story => {
      // Override mock with longer questions
      if (typeof window !== 'undefined') {
        window.socket = {
          emit: (event, callback) => {
            if (event === 'get-civil-pursuit-questions') {
              setTimeout(() => {
                callback([
                  {
                    _id: '1',
                    subject:
                      'How can we better engage citizens in local government decision-making processes while ensuring transparency and accountability across all levels of municipal operations?',
                    path: '/question/1',
                  },
                  {
                    _id: '2',
                    subject:
                      'What comprehensive strategies should our community implement to address climate change adaptation and mitigation in both the short and long term?',
                    path: '/question/2',
                  },
                  {
                    _id: '3',
                    subject: 'What do you think about community gardens?',
                    path: '/question/3',
                  },
                ])
              }, 100)
            }
          },
        }
      }
      return <Story />
    },
  ],
}

export const EmptyState = {
  args: {
    mode: 'light',
    subject: 'Deliberation Topics',
  },
  decorators: [
    Story => {
      // Override mock with empty array
      if (typeof window !== 'undefined') {
        window.socket = {
          emit: (event, callback) => {
            if (event === 'get-civil-pursuit-questions') {
              setTimeout(() => {
                callback([])
              }, 100)
            }
          },
        }
      }
      return <Story />
    },
  ],
}

export const LoadingState = {
  args: {
    mode: 'light',
    subject: 'Deliberation Topics',
  },
  decorators: [
    Story => {
      // Override mock to never callback (simulate loading)
      if (typeof window !== 'undefined') {
        window.socket = {
          emit: (event, callback) => {
            // Never call callback to show loading state
          },
        }
      }
      return <Story />
    },
  ],
}

export const NoSocket = {
  args: {
    mode: 'light',
    subject: 'Deliberation Topics',
  },
  decorators: [
    Story => {
      // Remove socket to test no-socket scenario
      if (typeof window !== 'undefined') {
        window.socket = undefined
      }
      return <Story />
    },
  ],
}
