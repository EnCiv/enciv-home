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

export const ColumnsTest = {
    args: {
        blocks: blocks,
        cols: 4,
        mode: 'light',
        title: '',        
    },
}