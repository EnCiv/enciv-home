import React from 'react'
import VideoBlock from '../app/components/video-block'

export default {
  component: VideoBlock,
  title: 'VideoBlock',
}

const Template = args => <VideoBlock {...args} />

export const Default = Template.bind({})
Default.args = {
  videoUrl: 'https://youtu.be/Tb2u0h_IUGc',
}

export const WithSubjectAndAction = Template.bind({})
WithSubjectAndAction.args = {
  mode: 'dark',
  subject: 'We create online tools that enable constructive cross-partisan democratic processes at scale',
  actionText: 'Our Work',
  action: 'https://www.example.com',
  videoUrl: 'https://youtu.be/Tb2u0h_IUGc',
}

export const WithActionFunctionWhite = Template.bind({})
WithActionFunctionWhite.args = {
  mode: 'light',
  subject: 'We create online tools that enable constructive cross-partisan democratic processes at scale',
  actionText: 'Our Work',
  action: () => alert('Action executed!'),
  videoUrl: 'https://youtu.be/Tb2u0h_IUGc',
}

export const WithActionFunctionDark = Template.bind({})
WithActionFunctionDark.args = {
  subject: 'We create online tools that enable constructive cross-partisan democratic processes at scale',
  actionText: 'Our Work',
  action: () => alert('Action executed!'),
  videoUrl: 'https://youtu.be/Tb2u0h_IUGc',
}

export const Mp4WithActionFunctionDark = Template.bind({})
Mp4WithActionFunctionDark.args = {
  subject: 'We create online tools that enable constructive cross-partisan democratic processes at scale',
  actionText: 'Our Work',
  action: () => alert('Action executed!'),
  videoUrl: 'https://res.cloudinary.com/hf6mryjpf/video/upload/v1571285569/nov2019-viewer-m-3_jjnhhi.mp4',
}

export const PhoneAspectRatioWithActionFunctionDark = Template.bind({})
PhoneAspectRatioWithActionFunctionDark.args = {
  subject: 'We create online tools that enable constructive cross-partisan democratic processes at scale',
  actionText: 'Our Work',
  action: () => alert('Action executed!'),
  videoUrl: 'https://www.youtube.com/shorts/lOn1Gcazpt0?feature=share',
}
