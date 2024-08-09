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

    // contains blocks component generation to prevent code reuse within component.
    const blocksGridDiv = <div className={classes.BlockGridLayout}>
                        {blocks.map((block, i) => {
                        const { key, ...otherProps } = block
                        if (!Blocks[key]) return null
                        const Component = Blocks[key]
                        return <Component key={block + '-' + i}  {...otherProps} mode={props.mode} />
                        })}
                    </div>
    
    if (title === ''){
        return (
            <div className={classes.container}>
                <div className={`${classes.markdownBlockGroup} ${classes[mode]}`}>
                    {blocksGridDiv}
                </div>
            </div>
        )
    } else {
        return (
            <div className={classes.container}>
                <div className={`${classes.markdownBlockGroup} ${classes[mode]}`}>
                    <h3>{props.title}</h3>
                    {blocksGridDiv}
                </div>
            </div>
        )
    } 
}

export default MarkdownBlockGroup

const useStylesFromThemeFunction = createUseStyles( theme => ({
    container: props => ({
        backgroundColor: props.mode === 'light' ? '#F2F2F2' : theme.colors.darkModeGray,
        color: props.mode === 'light' ? theme.colors.darkModeGray : 'white',
    }),    
    
    BlockGridLayout: props => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${props.cols}, auto)`,
        textAlign: 'center',
        margin: 'auto',
        [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
    markdownBlockGroup: props => ({
        maxWidth: theme.maxPanelWidth,
        margin: 'auto', 
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        fontFamily: 'Montserrat',
        '& > h3': {
            marginBottom: '0',
            fontSize: '2rem',
            fontWeight: 600,
            marginBlockEnd: 0,
            marginLeft: '2rem',
        },
    }),
}))