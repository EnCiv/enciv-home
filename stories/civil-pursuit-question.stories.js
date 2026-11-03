import React from 'react'
import CivilPursuitQuestion from '../app/components/civil-pursuit-question'

export default {
  component: CivilPursuitQuestion,
  title: 'CivilPursuitQuestion',
  argTypes: {
    subject: {
      control: 'text',
      description: 'The question text to display',
    },
    path: {
      control: 'text',
      description: 'The URL path to navigate to when clicked',
    },
    mode: {
      control: { type: 'select', options: ['dark', 'light'] },
      description: 'Color theme mode',
    },
  },
}

export const Default = {
  args: {
    subject: 'What are the biggest challenges facing our community?',
    path: '/question/1',
    mode: 'light',
  },
}

export const DarkMode = {
  args: {
    subject: 'What are the biggest challenges facing our community?',
    path: '/question/1',
    mode: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const ShortQuestion = {
  args: {
    subject: 'What do you think?',
    path: '/question/2',
  },
}

export const LongQuestion = {
  args: {
    subject:
      'How can we better engage citizens in local government decision-making processes while ensuring transparency and accountability?',
    path: '/question/3',
  },
}

export const ExternalLink = {
  args: {
    subject: 'Learn more about civil discourse',
    path: 'https://enciv.org',
  },
}

export const MultipleQuestions = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
      <CivilPursuitQuestion
        subject="What are the biggest challenges facing our community?"
        path="/question/1"
        mode="light"
      />
      <CivilPursuitQuestion
        subject="How can we improve public transportation?"
        path="/question/2"
        mode="light"
      />
      <CivilPursuitQuestion
        subject="What initiatives would you like to see for youth engagement?"
        path="/question/3"
        mode="light"
      />
      <CivilPursuitQuestion
        subject="How do we balance economic growth with environmental sustainability?"
        path="/question/4"
        mode="light"
      />
      <CivilPursuitQuestion
        subject="What role should technology play in civic participation?"
        path="/question/5"
        mode="light"
      />
    </div>
  ),
}

export const MultipleQuestionsDarkMode = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
      <CivilPursuitQuestion
        subject="What are the biggest challenges facing our community?"
        path="/question/1"
        mode="dark"
      />
      <CivilPursuitQuestion
        subject="How can we improve public transportation?"
        path="/question/2"
        mode="dark"
      />
      <CivilPursuitQuestion
        subject="What initiatives would you like to see for youth engagement?"
        path="/question/3"
        mode="dark"
      />
      <CivilPursuitQuestion
        subject="How do we balance economic growth with environmental sustainability?"
        path="/question/4"
        mode="dark"
      />
      <CivilPursuitQuestion
        subject="What role should technology play in civic participation?"
        path="/question/5"
        mode="dark"
      />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const DifferentWidths = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Mobile Width (400px)</h3>
        <CivilPursuitQuestion
          subject="What are the biggest challenges facing our community?"
          path="/question/1"
        />
      </div>
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Tablet Width (600px)</h3>
        <CivilPursuitQuestion
          subject="What are the biggest challenges facing our community?"
          path="/question/1"
        />
      </div>
      <div style={{ maxWidth: '1000px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Desktop Width (1000px)</h3>
        <CivilPursuitQuestion
          subject="What are the biggest challenges facing our community?"
          path="/question/1"
        />
      </div>
    </div>
  ),
}

export const WithCustomClassName = {
  args: {
    subject: 'Question with custom styling',
    path: '/question/custom',
    className: 'custom-question-class',
  },
  decorators: [
    Story => (
      <div>
        <style>{`
          .custom-question-class {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
}
