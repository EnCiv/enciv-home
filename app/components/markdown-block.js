//https://github.com/EnCiv/enciv-home/issues/41
//https://github.com/EnCiv/enciv-home/issues/markDownBlock-withImage#45
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

const MarkdownBlock = props => {
  console.log("props", props);
   const balocks = Array.isArray(props.blocks) ? [props.blocks] : props;
  var blockarray = [];
  const {
    className = '',
    subject = '', 
    mode = 'light',
    children = '',
    lineWidth = 'partial',
    blocks,
    iconName = '', 
    imgUrl = '',
    imgSide = 'left',
    ...otherProps
  } = props
  const classes = useStylesFromThemeFunction({ lineWidth, iconName, imgSide })
  console.log("blockslength", blocks ? blocks.length : 0);

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

   if (imgUrl && (imgSide === 'left' || imgSide === 'right')) {
    return (
      <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
        {subject && <h2 className={classes.subject}>{subject}</h2>}
        <div className={classes.wrapperWithImage}>
          
          {imgSide === 'left' && imageComponent}
          {textSection}
          {imgSide === 'right' && imageComponent}
        </div>
      </div>
    );
  }
  
  console.log("blocks", blocks);
  if (blocks && blocks ? blocks.length > 1 : 0) {
  return (
    <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
      {subject && <h2 className={classes.subject}>{subject}</h2>}
    <div className={cx(classes.markdownBlockTopImg, classes[mode], className)} {...otherProps}>
      
      {blocks && blocks.map((block, index) => (
        <div key={index} className={cx(classes.wrapper, block.imgSide === 'top' && classes.topLayout)}>
          {block.imgUrl && block.imgSide === 'top' && (
            <>
              {/* Image Component */}
              <img className={classes.imageStyleTop} src={block.imgUrl} alt="Markdown Block" />
              
              {/* Text Section */}
              <div className={classes.textSectionWithImageTop}>
                <MarkDown className={classes.mdclasses} options={{ overrides: { ActionButton: { component: ActionButton } } }}>
                  {block.children}
                </MarkDown>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}
 
  console.log("blocks1", blocks);
  
  
   return (
    <div className={cx(classes.markdownBlock, classes[mode], className)} {...otherProps}>
      <div className={classes.wrapper}>
        {subject && <h2 className={classes.subject}>{subject}</h2>}
        {textSection}
      </div>
    </div>
  );

 

};

export default MarkdownBlock

const useStylesFromThemeFunction = createUseStyles(theme => ({
  markdownBlock: {
     textAlign: 'center',
     paddingTop: '1rem',
   
    
  },
  markdownBlockTopImg: {
     textAlign: 'center',
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    // paddingTop: '3rem',
    paddingBottom: '3rem',
    display: 'flex',
    flexDirection: props => (props.imgSide === 'top' ? 'row' : 'row'),
    // textAlign: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: (props) => (props.imgSide === 'top' ? 'column' : 'column'),
    },
    
  },
  wrapper: {
     display: 'flex',
     flexDirection: props => (props.imgSide === 'top' ? 'column' : 'column'),
    maxWidth: theme.maxPanelWidth,
    // justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    // whiteSpace: 'pre-line',
  },
  wrapperWithImage: {
    display: 'flex',
    flexDirection: (props) => (props.imgSide === 'top' ? 'row' : 'row'),
    alignItems: 'center',
    justifyContent: 'space-between',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      flexDirection: (props) => (props.imgSide === 'top' ? 'row' : 'column'),
      maxWidth: '80%',
    },
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-line',
  },
  subject: {
    fontSize: '2rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    textAlign: 'left',
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
  },
  // imageWrapper: {
  //   display: 'inline-block',
  //   textAlign: 'center',
  //   marginBottom: '1rem', 
  // },
  imageStyle: {
    aspectRatio: 2/2,
    width: props => (props.imgSide === 'top' ? '25%' : '50%'),  
    height: props => (props.imgSide === 'top' ? '25%' : '80%'),
    objectFit: props => (props.imgSide === 'top' ? 'cover' : 'unset'),
    margin: '1rem',
    borderRadius: '1rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
        width: props => (props.imgSide === 'top' ? '60%' : '80%'),
        height: props => (props.imgSide === 'top' ? '60%' : '80%'),
    },
  },
  imageStyleTop: {
    aspectRatio:2/2,
    width: '14rem',  
    height: '14rem',
    objectFit: 'cover',
    margin: '1rem',
    borderRadius: '1rem',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
        width: '70%',
        height: '70%' ,
    },
  },
  topLayout: {
   display: 'flex',
   flexDirection: 'row', 
   alignItems: 'center',
   [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
     flexDirection: 'row', 
     justifyContent: 'center',
   },
 },
 textSectionWithImageTop: {
    maxWidth: '16rem', 
    width: '100%',
    textAlign: 'center',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      maxWidth: '80%',
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
      lineHeight: '3.5rem',
      fontWeight: 600,
      marginBlockStart: 0,
      marginBlockEnd: 0,
      '&:after':{
        content: '""',
        display: 'block',
        width: props.lineWidth === 'partial' ? '5dvw' : '100%',
        borderBottom: `${theme.colors.encivYellow} 0.25rem solid`,
        paddingBottom: '1.5rem',
      },
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

