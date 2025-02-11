import React from 'react'
import { expect } from '@storybook/jest'
import HeroBlock from '../app/components/hero-block'
import { userEvent, within } from '@storybook/testing-library'

export default {
  component: HeroBlock,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Primary = {
  args: {
    subject: 'Politics is dividing us - EnCiv is uniting us',
    actionText: 'Join the Community',
    imgUrl:
      'https://res.cloudinary.com/hf6mryjpf/image/upload/v1712344746/assets/deliberation-at-the-capital_pxodcm.png',
    alignContent: 'center',
  },
}

export const HighRes = {
  args: {
    subject: 'Politics is dividing us - EnCiv is uniting us',
    actionText: 'Join the Community',
    imgUrlObj: {
      highRes: 'https://res.cloudinary.com/hf6mryjpf/image/upload/v1715626901/assets/header_image_no_text_hw5vnf.png',
      lowRes:
        'https://res.cloudinary.com/hf6mryjpf/image/upload/v1716234364/assets/EnCiv__Landing_Page_Image_Mobile_xrkvci.png',
    },
    alignContent: 'center',
  },
}

export const LowRes = {
  args: {
    subject: 'Politics is dividing us - EnCiv is uniting us',
    actionText: 'Join the Community',
    imgUrlObj: {
      highRes: 'https://res.cloudinary.com/hf6mryjpf/image/upload/v1715626901/assets/header_image_no_text_hw5vnf.png',
      lowRes:
        'https://res.cloudinary.com/hf6mryjpf/image/upload/v1716234364/assets/EnCiv__Landing_Page_Image_Mobile_xrkvci.png',
    },
    alignContent: 'center',
  },
  parameters: {
    defaultViewport: 'iphonex',
  },
}
export const LeftAlign = {
  args: {
    subject: 'Politics is dividing us - EnCiv is uniting us',
    actionText: 'Join the Community',
    imgUrl:
      'https://res.cloudinary.com/hf6mryjpf/image/upload/v1712344746/assets/deliberation-at-the-capital_pxodcm.png',
    alignContent: 'left',
  },
}
