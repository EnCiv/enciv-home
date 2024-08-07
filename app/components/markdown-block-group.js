import React from 'react'
import MarkdownBlock from './markdown-block'
import { createUseStyles } from 'react-jss'

const Blocks = {
    MarkdownBlock: MarkdownBlock
}

const MarkdownBlockGroup = props => {
    const {
        title = '',
        blocks = [],
        cols = 4,
        mode = 'light',
    } = props
    const classes = useStylesFromThemeFunction({})
    return (
        <h1>MarkdownBlockGroup</h1>
    )
}

export default MarkdownBlockGroup

const useStylesFromThemeFunction = createUseStyles( theme => ({
    markdownBlockGroup: {
        textAlign: 'center',
    },
}))