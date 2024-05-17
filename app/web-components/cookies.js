import React from 'react'
import ArticleBlock from '../components/article-block'

// 2024May17 this text copied out of the original wordpress html page and pasted here, with removal of some of the formating but the text, and last updated data remain the same.
// TBD covert this to a markdown file that gets loaded by the terms component

const article = {
  title: 'Cookie Policy',
  content: `
<p>Last updated 10/10/2019</p>
<p>EnCiv, Inc. (&#8220;<b>EnCiv</b>&#8220;, &#8220;<b>we</b>&#8220;, or &#8220;<b>us</b>&#8220;) uses cookies and similar tracking technologies on EnCiv.com (and related sites), EnCiv-branded applications for connected devices (&#8220;<b>apps</b>&#8220;) if any, and the EnCiv embeddable video player. By using our websites, apps, or video player, you consent to the placement and use of cookies and similar technologies on your device. This Cookie Policy forms part of the EnCiv <a href="http://enciv.org/privacy">Privacy Policy</a>.</p>
<h2><b>Cookie Basics</b></h2>
<p>A cookie is a small text file that is stored in your web browser that allows EnCiv or a third party to recognize you using a unique identifier.</p>
<p><b>Who sets them</b>: First-party cookies are set by EnCiv. Third-party cookies are set by companies other than EnCiv, such as analytics providers and advertisers.</p>
<p><b>What they do</b>: &#8220;Essential&#8221; cookies enable services we offer. &#8220;Non-essential&#8221; cookies help us understand how our services are being used (i.e., analytics) and deliver advertisements. Some cookies may track you across multiple websites you visit (including ones not operated by us) to help deliver advertisements that may be relevant to you.</p>
<p><b>How long they last</b>: Cookies may be either &#8220;session&#8221; or &#8220;persistent.&#8221; A session cookie expires (i.e., is deleted) when you close your browser. A persistent cookie remains until it expires or you delete the cookies via your browser settings. Expiration dates are set in the cookies themselves and may vary in length, depending on the purpose of the cookie.</p>
<h2><b>Cookies Found on EnCiv Service</b></h2>
<p>We use all types of cookies in our web-based services.</p>
<p><b>EnCiv websites</b>: When you visit a EnCiv website, EnCiv and third parties will set cookies in your browser. EnCiv sets essential cookies to enable certain features and remember your preferences. For example, cookies keep you logged in and maintain your language and volume settings. Third parties set cookies for both essential and non-essential purposes including analytics (e.g., Google Analytics) and advertising (e.g., Google DoubleClick for Publishers).</p>
<p><b>EnCiv video player</b>: EnCiv’s embeddable video player uses first-party cookies that we consider essential to the video player experience. We also use third-party analytics cookies, but we do not advertising cookies when our video player appears on a third-party website. Please note that a third-party website may place cookies of its own. We have no control over third-party websites or the cookies they set.</p>
<h2><b>Changing Your Cookie Preferences</b></h2>
<p>You may limit the cookies set in your browser by taking the steps described below. Note that declining cookies may impact your ability to use our services.</p>
<p><b>Browser settings</b>: You may change your browser’s settings to delete cookies that have already been set and to reject new cookies. To learn more, visit the help pages of your browser:</p>
<ul>
<li ><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer">Firefox</a></li>
<li ><a href="https://support.google.com/chrome/answer/95647">Chrome</a></li>
<li ><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac">Safari</a></li>
<li ><a href="https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy">Microsoft Edge</a></li>
<li ><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies">Internet Explorer</a></li>
</ul>
<p>You may also visit our sites in your browser’s &#8220;private&#8221; or &#8220;incognito&#8221; mode, in which case cookies will be set, but deleted when you close your browser.</p>
<p><b>Opt-out (EU users)</b>: Users from the EU may opt out of non-essential cookies by selecting the option below or changing their cookie preferences in their account settings (registered users only). Upon opting out, we will, to the extent possible, delete any non-essential first-party cookies in your browser and remember your cookie preference for your next visit. Please review your browser settings to remove third-party cookies.</p>
<p><b>Third party advertising opt-outs</b>: Certain third parties provide ways to opt out of advertising cookies across multiple sites. You can learn more by visiting the sites of the Network Advertising Initiative (<a href="https://optout.networkadvertising.org">https://optout.networkadvertising.org</a>) or the Digital Advertising Alliance (<a href="https://www.aboutads.info">https://www.aboutads.info</a>). In addition, there are third party plug-ins and apps that help manage cookies.</p>
<p><b>Google cookies</b>: Google provides ways to manage or opt out certain of its advertising cookies (<a href="https://adssettings.google.com">https://adssettings.google.com</a>) and analytics cookies (<a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>). You may read Google’s Privacy Policy at<a href="https://policies.google.com/privacy"> https://policies.google.com/privacy</a>.</p>
<h2><b>Similar Technologies</b></h2>
<p>We use technologies that resemble cookies to help track user activities and preferences. For example, we may use web beacons (tiny graphics with a unique identifier embedded on web pages or emails) to track your activities and communicate with cookies. You cannot opt out of web beacons used on webpages, but you can limit their use by opting out of the cookies they interact with. You can opt out of web beacons used in emails by setting your email client to render emails in text mode only.</p>
`,
}

export default function Cookies() {
  return <ArticleBlock article={article} mode="light" />
}
