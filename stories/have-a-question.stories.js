// https://github.com/EnCiv/undebate-ssp/issues/115
//https://github.com/EnCiv/enciv-home/issues/20

import React, { useState, useEffect } from 'react'

import HaveAQuestion from '../app/components/have-a-question'

export default {
  title: 'Have a Question',
  component: HaveAQuestion,
  argTypes: {},
}

const Template = (args, context) => {
  useEffect(() => {
    if (typeof window.socket === 'undefined') {
      window.socket = {
        emit: (handle, email, fname, lname, subject, message, cb) => {
          setTimeout(() => {
            if (email === 'fail@fail.com') cb({ error: 'Sorry, there was an error.' })
            else cb('success')
          }, 1000)
        },
      }
    }
  })
  return (
    <div>
      <HaveAQuestion {...args} />
    </div>
  )
}

export const HaveAQuestionTest = Template.bind({})

export const LightMode = {
  args: {
    mode: 'light',
  },
}
