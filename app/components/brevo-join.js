import React, { useState, useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { Helmet } from 'react-helmet'
import AnimateHeight from 'react-animate-height'
export function BrevoHelmet() {
  return (
    <Helmet>
      <style type="text/css">
        {`
          @font-face {
            font-display: block;
            font-family: Roboto;
            src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff")
          }

          @font-face {
            font-display: fallback;
            font-family: Roboto;
            font-weight: 600;
            src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff")
          }

          @font-face {
            font-display: fallback;
            font-family: Roboto;
            font-weight: 700;
            src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff")
          }

          #sib-container input:-ms-input-placeholder {
            text-align: left;
            font-family: "Helvetica", sans-serif;
            color: #c0ccda;
          }

          #sib-container input::placeholder {
            text-align: left;
            font-family: "Helvetica", sans-serif;
            color: #c0ccda;
          }

          #sib-container textarea::placeholder {
            text-align: left;
            font-family: "Helvetica", sans-serif;
            color: #c0ccda;
          }

          #sib-container a {
            text-decoration: underline;
            color: #2BB2FC;
          }

          #sib-container input{
            color: black;
          }

          #sib-container .sib-close-button {
            position: absolute;
            padding-right: .75rem;
            padding-top: .25rem;
            cursor: pointer;
            top: 0;
            right: 0;
            color: black;
            font-size: 1.5rem;
          }

          #sib-container .sib-close-button:hover {
              font-weight: 900;
          }

        `}
      </style>
      <link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css" />
      <script>{`
  // Helper function to delay opening a URL until a gtag event is sent.
  // Call it in response to an action that should navigate to a URL.
  function gtagSendEvent1(url) {
    var callback = function () {
      if (typeof url === 'string') {
        window.location = url;
      }
    };
    gtag('event', 'conversion_event_submit_lead_form_1', {
      'event_callback': callback,
      'event_timeout': 2000,
      // <event_parameters>
    });
    return false;
  }
`}</script>
    </Helmet>
  )
}

// keep track of all the instances of this form rendering on a page, so that the others can be closed when one is opened
// each new instance takes the index in OtherForms, and puts it's forced close function there. when an instance opens,
// it calls the force close function of all the other instances.

const OtherForms = []

function submitGtag(ref, e) {
  return window.gtag
    ? (gtag('event', 'conversion_event_submit_lead_form_1', {
        // gtag needs time to send the event before the browser skips to the next page
        event_callback: () => {
          formRef.current && formRef.current.requestSubmit()
        },
        event_timeout: 2000, // this is max time to wait for the data to get sent, not time before making the callback
        actionText,
        myFormIndex,
      }),
      false) // don't propogate the to submit the form on this click
    : true // just submit the event
}

export function SignupForm(props) {
  const classes = useStylesFromThemeFunction()
  return (
    <div className={classes.signupform}>
      <BrevoForm {...props} />
    </div>
  )
}
const useStylesFromThemeFunction = createUseStyles(theme => ({
  signupform: {
    float: 'right',
    maxWidth: '20rem',
    paddingLeft: '2rem',
    backgroundColor: '#F2F2F2',
    [`@media (max-width: ${theme.condensedWidthBreakPoint})`]: {
      float: 'none',
      maxWidth: '100%',
      marginLeft: 0,
      paddingLeft: 0,
    },
    '& input': {
      lineHeight: '200%',
    },
    '& #sib-container': {
      paddingLeft: '0.5rem',
      paddingRight: '0',
    },
  },
}))

export default function BrevoJoin(props) {
  const formRef = useRef()
  const { active, forceClose = () => {}, actionText } = props
  /**
   * The Brevo post form code usees the #sib-container id to find the input info. Soo there can only be one form
   * on the page at a time.
   *
   * So, we keep track of all the join forms in OtherForms, and forceClose the other ones, when the user makes this one active
   * The parent, has to provide a forceClose function for this to work - but it's also handy for having the X close button on this form
   *
   *
   */
  const [myFormIndex, neverSetMyFormId] = useState(() => (OtherForms.push(forceClose), OtherForms.length - 1))

  // translate the two states of active into 4 states in isActive so we can animate
  // the mounting, opening, closing, and unmounging of the brevo from
  const [isActive, setIsActive] = useState(active ? 'unmounted' : 'start') // unmounted -> start -> opened -> close -> unmounted
  useEffect(() => {
    // we are going active, so reset all the other forms on this page
    let newIsActive
    if (active) {
      switch (isActive) {
        case 'unmounted':
          OtherForms.forEach((func, i) => {
            if (i !== myFormIndex) func()
          })
          setTimeout(() => setIsActive('start')) // give the other Forms a chance to close
          newIsActive = 'unmounted'
          break
        case 'start':
          newIsActive = 'opened'
          break
        case 'opened':
          newIsActive = 'opened'
          break
        case 'close':
          newIsActive = 'unmounted'
          break
        default:
          throw new Error()
      }
    } else {
      switch (isActive) {
        case 'unmounted':
          newIsActive = 'unmounted'
          break
        case 'start':
          newIsActive = 'unmounted'
          break
        case 'opened':
          newIsActive = 'close' // stay open while the Animation happens
          break
        case 'close':
          newIsActive = 'close'
          setTimeout(() => setIsActive('unmounted'), 501)
          break
        default:
          throw new Error()
      }
    }
    if (newIsActive === isActive) return // don't loop
    setIsActive(newIsActive)
  }, [active, isActive])
  if (isActive === 'unmounted') return null
  return (
    <>
      <div
        className="sib-form"
        style={{
          textAlign: 'center',
          backgroundColor: '#343433',
          padding: 0,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <AnimateHeight id="brevo-join" duration={500} height={isActive === 'opened' ? 'auto' : 0}>
          <BrevoForm forceClose={forceClose} formRef={formRef} />
        </AnimateHeight>
      </div>
    </>
  )
}

function BrevoForm(props) {
  const { forceClose, formRef } = props
  if (typeof window !== 'undefined' && !window.brevoHelmet) {
    window.brevoHelmet = true
    // running on the browser
    window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code'
    window.LOCALE = 'en'
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
      'The information provided is invalid. Please review the field format and try again.'
    window.REQUIRED_ERROR_MESSAGE = 'This field cannot be left blank. '
    window.GENERIC_INVALID_MESSAGE =
      'The information provided is invalid. Please review the field format and try again.'
    window.translation = {
      common: {
        selectedList: '{quantity} list selected',
        selectedLists: '{quantity} lists selected',
      },
    }
    window.AUTOHIDE = Boolean(0)
  }
  return (
    <div id="sib-form-container" className="sib-form-container">
      <div
        id="error-message"
        className="sib-form-message-panel"
        style={{
          fontSize: '1rem',
          textAlign: 'left',
          fontFamily: '"Helvetica", sans-serif',
          color: '#661d1d',
          backgroundColor: '#ffeded',
          borderRadius: '0.1875rem',
          borderColor: '#ff4949',
          maxWidth: '33.75rem',
        }}
      >
        <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
          <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
            <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
          </svg>
          <span className="sib-form-message-panel__inner-text">
            Your subscription could not be saved. Please try again.
          </span>
        </div>
      </div>
      <div />
      <div
        id="success-message"
        className="sib-form-message-panel"
        style={{
          fontSize: '1rem',
          textAlign: 'left',
          fontFamily: '"Helvetica", sans-serif',
          color: '#085229',
          backgroundColor: '#e7faf0',
          borderRadius: '0.1875rem',
          borderColor: '#13ce66',
          maxWidth: '33.75rem',
        }}
      >
        <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
          <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
            <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
          </svg>
          <span className="sib-form-message-panel__inner-text">Your subscription has been successful.</span>
        </div>
      </div>
      <div />
      <div
        id="sib-container"
        className="sib-container--large sib-container--vertical"
        style={{
          textAlign: 'center',
          backgroundColor: 'rgba(242,242,242,1)',
          maxWidth: '33.75rem',
          borderRadius: '0.1875rem',
          borderWidth: 1,
          borderColor: '#C0CCD9',
          borderStyle: 'solid',
          direction: 'ltr',
          boxSizing: 'border-box',
        }}
      >
        {forceClose && (
          <div className="sib-close-button" title={'close message'} onClick={forceClose}>
            {'\u2715'}
          </div>
        )}
        <form
          ref={formRef}
          id="sib-form"
          method="POST"
          action="https://223e2260.sibforms.com/serve/MUIFALdemznNVoCK3BT-NdrxYPWyQM6yQyRWjHssUfiPUK6FsNu60B8xYFDwURXRLjnlz0MptNh9FFIw11ITwLmPlGprEKvAnN6hYWeeFhmbWv3yFOyQfTH0iNbD244LbrYykq0WLZwwwIbT1ngVAZ7pLEUqLv5KY9xu-ohtBen-cogPRIc2IPUhaAPhZlOMwuVdtXLzj5HNSTjA"
          data-type="subscription"
        >
          <div style={{ padding: 0, paddingBottom: '0.5rem' }}>
            <div
              className="sib-form-block"
              style={{
                fontSize: '2rem',
                textAlign: 'left',
                fontWeight: 700,
                fontFamily: '"Futura", sans-serif',
                color: '#000000',
                backgroundColor: 'transparent',
              }}
            >
              <p>Join the Community</p>
            </div>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div
              className="sib-form-block"
              style={{
                fontSize: '1rem',
                textAlign: 'left',
                fontFamily: '"Futura", sans-serif',
                color: '#000000',
                backgroundColor: 'transparent',
              }}
            >
              <div className="sib-text-form-block">
                <p>Join EnCiv, and help make national discourse productive online.</p>
              </div>
            </div>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div className="sib-input sib-form-block">
              <div className="form__entry entry_block">
                <div className="form__label-row ">
                  <label
                    className="entry__label"
                    style={{
                      fontWeight: 700,
                      textAlign: 'left',
                      fontSize: '1rem',
                      fontFamily: '"Futura", sans-serif',
                      color: '#000000',
                    }}
                    htmlFor="FIRSTNAME"
                    data-required="*"
                  >
                    First Name
                  </label>
                  <div className="entry__field">
                    <input
                      className="input "
                      maxLength={200}
                      type="text"
                      id="FIRSTNAME"
                      name="FIRSTNAME"
                      autoComplete="off"
                      data-required="true"
                      required=""
                    />
                  </div>
                </div>
                <label
                  className="entry__error entry__error--primary"
                  style={{
                    fontSize: '1rem',
                    textAlign: 'left',
                    fontFamily: '"Helvetica", sans-serif',
                    color: '#661d1d',
                    backgroundColor: '#ffeded',
                    borderRadius: '0.1875rem',
                    borderColor: '#ff4949',
                  }}
                ></label>
              </div>
            </div>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div className="sib-input sib-form-block">
              <div className="form__entry entry_block">
                <div className="form__label-row ">
                  <label
                    className="entry__label"
                    style={{
                      fontWeight: 700,
                      textAlign: 'left',
                      fontSize: '1rem',
                      fontFamily: '"Futura", sans-serif',
                      color: '#000000',
                    }}
                    htmlFor="LASTNAME"
                    data-required="*"
                  >
                    Last Name
                  </label>
                  <div className="entry__field">
                    <input
                      className="input "
                      maxLength={200}
                      type="text"
                      id="LASTNAME"
                      name="LASTNAME"
                      autoComplete="off"
                      data-required="true"
                      required=""
                    />
                  </div>
                </div>
                <label
                  className="entry__error entry__error--primary"
                  style={{
                    fontSize: '1rem',
                    textAlign: 'left',
                    fontFamily: '"Helvetica", sans-serif',
                    color: '#661d1d',
                    backgroundColor: '#ffeded',
                    borderRadius: '0.1875rem',
                    borderColor: '#ff4949',
                  }}
                ></label>
              </div>
            </div>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div className="sib-input sib-form-block">
              <div className="form__entry entry_block">
                <div className="form__label-row ">
                  <label
                    className="entry__label"
                    style={{
                      fontWeight: 700,
                      textAlign: 'left',
                      fontSize: '1rem',
                      fontFamily: '"Futura", sans-serif',
                      color: '#000000',
                    }}
                    htmlFor="EMAIL"
                    data-required="*"
                  >
                    Email Address
                  </label>
                  <div className="entry__field">
                    <input
                      className="input "
                      type="text"
                      id="EMAIL"
                      name="EMAIL"
                      autoComplete="off"
                      data-required="true"
                      required=""
                    />
                  </div>
                </div>
                <label
                  className="entry__error entry__error--primary"
                  style={{
                    fontSize: '1rem',
                    textAlign: 'left',
                    fontFamily: '"Helvetica", sans-serif',
                    color: '#661d1d',
                    backgroundColor: '#ffeded',
                    borderRadius: '0.1875rem',
                    borderColor: '#ff4949',
                  }}
                ></label>
              </div>
            </div>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div className="sib-optin sib-form-block">
              <div className="form__entry entry_mcq">
                <div className="form__label-row ">
                  <div className="entry__choice" style={{}}>
                    <label>
                      <input type="checkbox" className="input_replaced" defaultValue={1} id="OPT_IN" name="OPT_IN" />
                      <span className="checkbox checkbox_tick_positive" style={{ marginLeft: '' }} />
                      <span
                        style={{
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          fontFamily: '"Helvetica", sans-serif',
                          color: '#3C4858',
                          backgroundColor: 'transparent',
                        }}
                      >
                        <p>
                          I agree to receive your newsletters and accept the{' '}
                          <a href="https://enciv.org/privacy/" target="_blank">
                            data privacy{' '}
                          </a>
                          statement.
                        </p>
                      </span>{' '}
                    </label>
                  </div>
                </div>
                <label
                  className="entry__error entry__error--primary"
                  style={{
                    fontSize: '1rem',
                    textAlign: 'left',
                    fontFamily: '"Helvetica", sans-serif',
                    color: '#661d1d',
                    backgroundColor: '#ffeded',
                    borderRadius: '0.1875rem',
                    borderColor: '#ff4949',
                  }}
                ></label>
                <label
                  className="entry__specification"
                  style={{
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    fontFamily: '"Futura", sans-serif',
                    color: '#8390A4',
                  }}
                >
                  You may unsubscribe at any time using the link in our newsletter.
                </label>
              </div>
            </div>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div className="sib-form-block" style={{ textAlign: 'center' }}>
              <button
                className="sib-form-block__button sib-form-block__button-with-loader"
                style={{
                  fontSize: '1rem',
                  textAlign: 'left',
                  fontWeight: 700,
                  fontFamily: '"Futura", sans-serif',
                  color: '#000000',
                  backgroundColor: '#ffc315',
                  borderRadius: '1.25rem',
                  borderWidth: 0,
                }}
                form="sib-form"
                type="submit"
              >
                <svg
                  className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                  viewBox="0 0 512 512"
                >
                  <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                </svg>
                SUBSCRIBE
              </button>
            </div>
          </div>
          <input type="text" name="email_address_check" defaultValue="" className="input--hidden" />
          <input type="hidden" name="locale" defaultValue="en" />
        </form>
      </div>
    </div>
  )
}
