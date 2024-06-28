//https://github.com/EnCiv/enciv-home/issues/6
import React from 'react'
import { createUseStyles } from 'react-jss'
import ActionButton from './action-button'

const VideoBlock = ({
  className = '',
  mode = 'dark',
  subject = '',
  actionText = '',
  action = '',
  videoUrl = '',
  ...otherProps
}) => {
  const classes = useStyles({ mode })

  const isYouTubeUrl = url => url.includes('youtube.com') || url.includes('youtu.be')

  const getYouTubeEmbedUrl = url => {
    const videoId = url.split('v=')[1] || url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <div className={`${classes.videoBlock} ${className}`} {...otherProps}>
      {subject && <div className={classes.subject}>{subject}</div>}
      <div className={classes.videoContainer}>
        {isYouTubeUrl(videoUrl) ? (
          <iframe
            className={classes.iframe}
            src={getYouTubeEmbedUrl(videoUrl)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          ></iframe>
        ) : (
          <video className={classes.video} controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {actionText && action && (
        <div className={classes.action}>
          <ActionButton action={action}>{actionText}</ActionButton>
        </div>
      )}
    </div>
  )
}

export default VideoBlock

// const useStyles = createUseStyles(theme => ({
//   videoBlock: {
//     textAlign: 'center',
//     padding: '6.25rem 8.875rem',
//     gap: '3.3125rem',
//     backgroundColor: ({ mode }) => (mode === 'dark' ? theme.colors.darkModeGray : 'white'),
//   },
//   subject: {
//     color: ({ mode }) => (mode === 'dark' ? '#FFFFFF' : '#000'),
//     marginBottom: '1rem',
//     padding: '0.625rem',
//     fontFamily: 'Montserrat',
//     fontStyle: 'normal',
//     fontWeight: 700,
//     fontSize: '3rem',
//     lineHeight: '3.6875rem',
//     textAlign: 'center',
//   },
//   videoContainer: {
//     position: 'relative',
//     maxWidth: theme.maxPanelWidth,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     paddingBottom: '56.25%', // 16:9 aspect ratio
//     height: 0,
//     overflow: 'hidden',
//     //backgroundColor: '#000',
//   },
//   iframe: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//   },
//   video: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//   },
//   action: {
//     marginTop: '2rem',
//   },
//   dark: {
//     backgroundColor: theme.colors.darkModeGray,
//     color: 'white',
//   },
//   light: {
//     backgroundColor: 'white',
//     color: theme.colors.darkModeGray,
//   },
// }))
const useStyles = createUseStyles(theme => ({
  videoBlock: {
    textAlign: 'center',
    padding: '6.25rem 8.875rem',
    gap: '3.3125rem',
    backgroundColor: ({ mode }) => (mode === 'dark' ? theme.colors.darkModeGray : 'white'),
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
  },
  subject: {
    color: ({ mode }) => (mode === 'dark' ? '#FFFFFF' : '#000'),
    marginBottom: '1rem',
    padding: '0.625rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '3rem',
    lineHeight: '3.6875rem',
    textAlign: 'center',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  videoContainer: {
    position: 'relative',
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1.5rem',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
    '@media (max-width: 600px)': {
      paddingBottom: '75%', // Adjust aspect ratio for smaller screens
    },
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  action: {
    marginTop: '2rem',
    '@media (max-width: 600px)': {
      marginTop: '1rem',
    },
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: theme.colors.darkModeGray,
  },
}))
