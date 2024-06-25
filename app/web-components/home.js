import React from 'react'
import HeroBlock from '../components/hero-block'
import TextBlock from '../components/text-block'
import Faq from '../components/frequently-asked-questions'
import BrevoCommunity from '../components/brevo-community'
import { BrevoHelmet } from '../components/brevo-join'
import MarkdownBlock from '../components/markdown-block'
import { Helmet } from 'react-helmet'

// this is here trying to make google ads work
// if it works there's more we have to do to trigger the submit, rather than the window.location
//
const GoogleAdsHelmet = () => (
  <Helmet>
    <script type="text/javascript">
      {`
  // Helper function to delay opening a URL until a gtag event is sent.
  // Call it in response to an action that should navigate to a URL.
  function gtagSendEvent(url) {
    var callback = function () {
      if (typeof url === 'string') {
        window.location = url;
      }
    };
    gtag('event', 'conversion_event_submit_lead_form', {
      'event_callback': callback,
      'event_timeout': 2000,
      // <event_parameters>
    });
    return false;
  }
  if(window.gtag) gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied'
});
    `}
    </script>
  </Helmet>
)

const Blocks = {
  HeroBlock: HeroBlock,
  TextBlock: TextBlock,
  MarkdownBlock: MarkdownBlock,
  Faq: Faq,
}
export default function Home(props) {
  const { subject, description, location, blocks } = props
  return (
    <div>
      <GoogleAdsHelmet />
      <BrevoHelmet />
      <BrevoCommunity location={location} />
      {blocks.map(block => {
        const { key, ...otherProps } = block
        if (!Blocks[key]) return null
        const Component = Blocks[key]
        return <Component {...otherProps} />
      })}
    </div>
  )
}
