//https://github.com/EnCiv/enciv-home/issues/48
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
    const classes = useStylesFromThemeFunction({ cols, mode })
    return (
        <div className={classes.container}>
            <div className={`${classes.markdownBlockGroup} ${classes[mode]}`}>
                {blocks.map((block, i) => {
                const { key, ...otherProps } = block
                if (!Blocks[key]) return null
                const Component = Blocks[key]
                return <Component key={block + '-' + i}  {...otherProps} mode={props.mode} />
                })}
            </div>
        </div>
    )
}

export default MarkdownBlockGroup

const useStylesFromThemeFunction = createUseStyles( theme => ({
    container: props => ({
        backgroundColor: props.mode === 'light' ? '#F2F2F2' : theme.colors.darkModeGray,
        color: props.mode === 'light' ? theme.colors.darkModeGray : 'white',
    }),    
    markdownBlockGroup: props => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${props.cols}, auto)`,
        maxWidth: theme.maxPanelWidth,
        textAlign: 'center',
        margin: 'auto',
        [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
            display: 'flex',
            flexDirection: 'column',
        }
    }),
}))