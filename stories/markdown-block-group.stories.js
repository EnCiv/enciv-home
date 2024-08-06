import React from 'react'
import MarkdownBlockGroup from '../app/components/markdown-block-group'

export default {
    component: MarkdownBlockGroup,
    parameters: {
        layout: 'fullscreen',
    },
}

const blocks = [
    {
        key: 'MarkdownBlock',
        mode: 'light',
        children: `###No partisanship.\n\n---\n\nWe're non-partisan\n\nWe never endorse a particular party, policy, or, candidate
        `,
        lineWidth: 'full',
    },
    {
        key: 'MarkdownBlock',
        mode: 'light',
        children: `###No partisanship.\n\n---\n\nWe're non-partisan\n\nWe never endorse a particular party, policy, or, candidate
        `,
        lineWidth: 'full',
    },
    {
        key: 'MarkdownBlock',
        mode: 'light',
        children: `###No partisanship.\n\n---\n\nWe're non-partisan\n\nWe never endorse a particular party, policy, or, candidate
        `,
        lineWidth: 'full',
    },
    {
        key: 'MarkdownBlock',
        mode: 'light',
        children: `###No partisanship.\n\n---\n\nWe're non-partisan\n\nWe never endorse a particular party, policy, or, candidate
        `,
        lineWidth: 'full',
    },
]

export const FourColumn = {
    args: {
        blocks: blocks        
    },
}