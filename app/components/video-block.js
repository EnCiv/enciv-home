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

const useStyles = createUseStyles(theme => ({
  videoBlock: {
    textAlign: 'center',
    paddingTop: '3rem',
    paddingBottom: '4rem',
    backgroundColor: ({ mode }) => (mode === 'dark' ? theme.colors.darkModeGray : 'white'),
  },
  subject: {
    color: ({ mode }) => (mode === 'dark' ? '#FFFFFF' : '#000'),
    padding: '0.625rem',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '3rem',
    lineHeight: '3.6875rem',
    textAlign: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: 0,
  },
  videoContainer: {
    position: 'relative',
    maxWidth: theme.maxPanelWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2.5rem',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
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
    marginTop: '4rem',
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
