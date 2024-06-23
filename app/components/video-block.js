import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import ActionButton from './action-button'



const VideoBlock = ({
                      className,
                      mode='dark',
                      subject,
                      actionText,
                      action,
                      videoUrl
}) => {
  const classes = useStyles({ mode })

  const isYouTubeUrl = (url) => url.includes('youtube.com') || url.includes('youtu.be')

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1] || url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  return (
    <div className={`${classes.videoBlock} ${className}`}>
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
          <ActionButton action={action}>
            {actionText}
          </ActionButton>
        </div>
      )}
    </div>
  )
}

VideoBlock.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.oneOf(['dark', 'light']),
  subject: PropTypes.string,
  actionText: PropTypes.string,
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  videoUrl: PropTypes.string.isRequired,
}

VideoBlock.defaultProps = {
  className: '',
  mode: '',
  subject: '',
  actionText: '',
  action: '',
}

export default VideoBlock


const useStyles = createUseStyles(theme => ({
  videoBlock: {
    textAlign: 'center',
    padding: '1.25rem',
    backgroundColor: ({ mode }) => (mode === 'dark' ? '#000' : '#fff' ),
  },
  subject: {
    fontSize: '1.5rem',
    color: ({ mode }) => (mode === 'dark' ? '#fff' : '#000' ),
    backgroundColor: 'transparent',
    marginBottom: '1rem',
    padding: '0.625rem',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
    backgroundColor: '#000',
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
    marginTop: '1.25rem',
    display: 'flex',
    justifyContent: 'center',
  },
  dark: {
    backgroundColor: theme.colors.darkModeGray,
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: theme.colors.darkModeGray,
  },
}));
