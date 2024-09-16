//https://github.com/EnCiv/enciv-home/issues/41
import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import ActionButton from './action-button'
import MarkDown from 'markdown-to-jsx'
import * as icons from '../svgr';

function Iconify(props) {
  const { iconName, ...otherProps } = props;
  const Icon = icons[iconName];
  return <Icon {...otherProps} />;
}

const TextBlock = props => {
  const {
    className = '', // may or may not be passed. Should be applied to the outer most tag, after local classNames
    mode = 'light', // dark, white, see top-nav-bar for differences
    children = '',
    lineWidth = 'full',
    iconName = '', 
    imgUrl = '',
    imgSide = 'left',
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName, imgSide })

  const iconComponent = iconName && icons[iconName] && (
    <Iconify className={classes.headerIcon} iconName={iconName} width="25%" height="auto" />
  );

  const imageComponent = imgUrl && (
    
    <img className={classes.imageStyle} src={imgUrl} alt="Markdown Block" />
    
  );


  const textSection = (
    <MarkDown className={classes.mdclasses} options={{ overrides: { ActionButton: { component: ActionButton } } }}>
      {children}
    </MarkDown>
  );
   if (imgUrl && imgSide === 'top') {
    return (
      <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
        <div className={cx(classes.wrapper,  classes.topLayout)}>
          {imageComponent}
          <div className={classes.textSectionWithImageTop}>
          {textSection}
        </div> 
        </div>
      </div>
    );
  }

  if (imgUrl && (imgSide === 'left' || imgSide === 'right')) {
    return (
      <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
        <div className={classes.wrapperWithImage}>
          {imgSide === 'left' && imageComponent}
          {textSection}
          {imgSide === 'right' && imageComponent}
        </div>
      </div>
    );
  }

  return (
    <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
      <div className={classes.wrapper}>
        {textSection}
      </div>
    </div>
  );
};

export default TextBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  markdownBlock: {
    
    textAlign: 'center',
    paddingTop: '1rem',
    paddingBottom: '4rem',
  },
  wrapper: {
     display: 'flex',
     flexDirection: props => (props.imgSide === 'top' ? 'column' : 'row'),
    

    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
  },
  wrapperWithImage: {
    display: 'flex',
    flexDirection: (props) => (props.imgSide === 'top' ? 'row' : 'row'),
    alignItems: 'center',
    justifyContent: 'space-between',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: (props) => (props.imgSide === 'top' ? 'row' : 'column'),
    },
  },
  
  imageWrapper: {
    display: 'inline-block',
    textAlign: 'center',
    marginBottom: '1rem', 
  },
  imageStyle: {

    width: props => (props.imgSide === 'top' ? '9.375rem' : '50%'),  
    height: props => (props.imgSide === 'top' ? '9.375rem' : '50%'),
    objectFit: props => (props.imgSide === 'top' ? 'cover' : 'unset'),
    margin: '1rem',
    borderRadius: '1rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
        width: props => (props.imgSide === 'top' ? '6.25rem' : '80%'),
        height: props => (props.imgSide === 'top' ? '6.25rem' : '80%'),
    },
  },
  topLayout: {
   display: 'flex',
   flexDirection: 'row', 
   justifyContent: 'flex-start', 
   alignItems: 'center',
   gap: '1rem',
  
   [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
     flexDirection: 'row', 
     justifyContent: 'center',
   },
 },
 textSectionWithImageTop: {
    maxWidth: props => (props.imgSide === 'top' ? '15.625rem' : '80%'), 
    width: '25%',
    textAlign: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      maxWidth: props => (props.imgSide === 'top' ? '6.25rem' : '80%'),
    },
  },

  mdclasses: props => ({
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    leadingTrim: 'both',
    textEdge: 'cap',
    textAlign: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
    flex:1,
    '& h2': {
      textAlign: 'left',
      fontSize: '3rem',
      lineHeight: '3.5rem',
      marginBlockEnd: '2rem',
      '&:after':{
        content: '""',
        display: 'block',
        width: props.lineWidth === 'partial' ? '5dvw' : '100%',
        borderBottom: `${theme.colors.encivYellow} 0.25rem solid`,
        paddingBottom: '1.5rem',
      },
    },
    '& h3': {
      textAlign: 'left',
      fontSize: '2rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h4': {
      textAlign: 'left',
      fontSize: '1.75rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h5': {
      textAlign: 'left',
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBlockEnd: 0,
    },
    '& h6': {
      textAlign: 'left',
      fontSize: '1.25rem',
      marginBlockEnd: 0,
    },
    '& p': {
      fontFamily: 'Inter',
      fontSize: '1rem',
      textAlign: 'left',
    },
    '& a': {
      color: '#B1890F',
    },
    '& a:visited': {
      color: '#413207',
    },
    '& hr': {
      display: 'block',
      borderTop: `${theme.colors.encivYellow} 0.125rem solid`,
      left: props.lineWidth === 'partial' ? 0 : 'auto',
      margin: props.lineWidth === 'partial' ? 'auto 0 auto 0' : 'auto',
      width: props.lineWidth === 'partial' ? '5dvw' : '100%',
    },
  }),
  img: {
    maxWidth: '50%',
    maxHeight: '50%',
    borderRadius: '1rem',
  },
  imgTop: {
    flex:1,
    maxWidth: '25%',
    marginBottom: '2rem',
    width: '20%',
    maxHeight: '25%',
  },
  imgLeft: {
    marginRight: '2rem',
  },
  imgRight: {
    marginLeft: '2rem',
  },
  mobileImage: {
    
    '@media (max-width: 768px)': {
      display: 'block',
      marginTop: '1rem',
    },
  },
  headerIcon: {
    marginTop: '2rem',
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: '#F2F2F2',
    color: theme.colors.darkModeGray,
  },
}));

