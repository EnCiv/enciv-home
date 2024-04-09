//https://github.com/EnCiv/enciv-home/issues/8
import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import {Button} from 'civil-pursuit/app/components/button'

const ActionButton=(props)=>{
    const {
      className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
      ...otherProps
    } = props
    const classes = useStylesFromThemeFunction()
    return <Button className={cx(classes.actionButton,className)} {...otherProps}></Button>
}
export default ActionButton

const useStylesFromThemeFunction=createUseStyles(theme => ( {
    actionButton: {
        backgroundColor: theme.colors.encivYellow,
        color: theme.colors.darkModeGray,
        borderRadius: '1.75rem',
        border: 'none',
        fontWeight: 700,
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        '&:hover': {
            cursor: 'pointer'
        },
        '& :focus': {
            outline: theme.focusOutline,
          },
    }
}))

