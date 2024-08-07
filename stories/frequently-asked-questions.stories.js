//https://github.com/EnCiv/enciv-home/issues/20
import React from 'react'

import FrequentlyAskedQuestions from '../app/components/frequently-asked-questions'

export default {
  title: 'Frequently Asked Questions',
  component: FrequentlyAskedQuestions,
  argTypes: {},
}

const faqs = [
  { question: 'This is the first question?', answer: 'This is the answer to the first question.' },
  { question: 'This is the second question?', answer: 'This is the answer to the second question.' },
  {
    question: 'This is the third question?',
    answer:
      'This is the answer to the third question. The answer to this question is very long. There was a lot to talk about. It takes up a lot of space on the page. I wonder how this will look. It will probably look pretty good by the time it is finished but lets give it a nice start. What do you say?',
  },
  {
    question: 'This is the fourth question?',
    answer: `This is the answer to the fourth question. The answer to this question is very long. There was a lot to talk about. It takes up a lot of space on the page. I wonder how this will look. It will probably look pretty good by the time it is finished but lets give it a nice start. What do you say?
        \nThis is the answer to the fourth question. The answer to this question is very long. There was a lot to talk about. It takes up a lot of space on the page. I wonder how this will look. It will probably look pretty good by the time it is finished but lets give it a nice start. What do you say?
        \nThis is the answer to the fourth question. The answer to this question is very long. There was a lot to talk about. It takes up a lot of space on the page. I wonder how this will look. It will probably look pretty good by the time it is finished but lets give it a nice start. What do you say?
        \nThis is the answer to the fourth question. The answer to this question is very long. There was a lot to talk about. It takes up a lot of space on the page. I wonder how this will look. It will probably look pretty good by the time it is finished but lets give it a nice start. What do you say?`,
  },
]

export const FrequentlyAskedQuestionsTest = {
  args: { faqs },
  decorators: [
    Story => {
      // simulate socket api
      if (!window.socket) {
        window.socket = {
          emit: (handle, email, fname, lname, subject, message, cb) => {
            if (handle !== 'send-contact-us') console.error('emit expected send-contact-us, got:', handle)
            if (email === 'success@email.com') setTimeout(() => cb({ error: '' }), 1000)
            else setTimeout(() => cb({ error: 'somethings wrong' }), 1000)
          },
        }
        return <Story />
      }
    },
  ],
}

const Template = args => <FrequentlyAskedQuestions {...args} />

// export const FrequentlyAskedQuestionsTest = Template.bind({})
// FrequentlyAskedQuestionsTest.args = { faqs }

export const Empty = Template.bind({})
Empty.args = {}

export const ZeroLength = Template.bind({})
ZeroLength.args = { faqs: [] }

export const LightMode = {
  args: { faqs, mode: 'light' },
}
