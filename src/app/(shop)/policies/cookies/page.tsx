import type { Metadata } from "next";
import { PolicyLayout, ContactBlock, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Cookie Notice" };

const sections: PolicySection[] = [
  {
    id: "about-this-notice",
    title: "What this notice covers",
    body: (
      <>
        <p>1.1 In this notice we set out:</p>
        <ul>
          <li>what cookies and comparable technologies are;</li>
          <li>the kinds of cookies we place;</li>
          <li>the reasons we place them;</li>
          <li>the situations in which we need your consent first;</li>
          <li>how you can control your cookie choices or take your consent back.</li>
        </ul>
        <p>
          1.2 The notice covers every cookie and comparable technology used on the Website, including those
          that support the shopping basket, checkout, signing in to an account, keeping payments secure,
          remembering your currency, analytics, performance measurement and, where relevant, marketing.
        </p>
        <p>
          1.3 Besides cookies, we may rely on pixels, tags, scripts, software development kits, local storage,
          session storage and other tools that work in a similar way. To keep things simple, we call all of
          them &ldquo;cookies&rdquo; throughout this notice.
        </p>
      </>
    ),
  },
  {
    id: "how-cookies-work",
    title: "How cookies and similar tools work",
    body: (
      <>
        <p>2.1 A cookie is a small text file that a website saves on your device while you are browsing it.</p>
        <p>
          2.2 Cookies let a site recognise your browser or device and recall things about your visit &mdash;
          for instance what is in your basket, the currency you picked, whether you are signed in, your
          preferred language or the cookie settings you chose.
        </p>
        <p>2.3 Depending on who places them, cookies are either:</p>
        <ul>
          <li>first-party cookies, placed by Solvetashop itself; or</li>
          <li>
            third-party cookies, placed by outside companies we rely on &mdash; for example providers of
            analytics, payments, security, advertising or embedded services.
          </li>
        </ul>
        <p>2.4 Depending on how long they last, cookies are either:</p>
        <ul>
          <li>session cookies, which disappear when your browser is shut; or</li>
          <li>
            persistent cookies, which stay on your device for a set length of time unless you remove them
            sooner.
          </li>
        </ul>
        <p>2.5 We may also use other tools that do a similar job, namely:</p>
        <ul>
          <li>local storage, which keeps information inside your browser;</li>
          <li>session storage, which keeps information only for the length of a browsing session;</li>
          <li>pixels and tags, which help us measure activity or, where used, support marketing;</li>
          <li>scripts, which help run Website features, analytics, security checks or integrations.</li>
        </ul>
        <p>
          2.6 Because these tools can serve the same purposes as cookies, this notice applies to them
          whenever they save information on, or read information from, your device.
        </p>
      </>
    ),
  },
  {
    id: "essential-cookies",
    title: "Essential cookies",
    body: (
      <>
        <p>
          3.1 We group the cookies we use into the categories described in sections 3 to 6. The first group
          is essential (strictly necessary) cookies, without which the Website cannot run as it should.
        </p>
        <p>3.2 Essential cookies make the following basic functions possible:</p>
        <ul>
          <li>moving between pages;</li>
          <li>the shopping basket;</li>
          <li>checkout;</li>
          <li>keeping payments secure;</li>
          <li>signing in to your account;</li>
          <li>preventing fraud;</li>
          <li>processing orders;</li>
          <li>showing prices in your chosen currency;</li>
          <li>remembering your cookie settings;</li>
          <li>keeping the Website secure;</li>
          <li>balancing traffic and keeping the Website technically stable.</li>
        </ul>
        <p>
          3.3 We do not need your consent for essential cookies, because without them we could not provide
          the service you have asked for.
        </p>
        <p>
          3.4 You can switch essential cookies off in your browser, but if you do, some parts of the Website
          may stop working properly &mdash; for example, you may not be able to put items in your basket,
          finish checking out, sign in or use other core features of the shop.
        </p>
        <h3>Typical essential cookies</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>What it does</th>
              <th>How long it lasts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basket cookie or local storage</td>
              <td>Keeps track of the products you have put in your basket</td>
              <td>Session or limited persistent period</td>
            </tr>
            <tr>
              <td>Checkout session cookie</td>
              <td>Lets checkout run securely and allows your order to be completed</td>
              <td>Session</td>
            </tr>
            <tr>
              <td>Account session cookie</td>
              <td>Keeps you signed in while you use the Website</td>
              <td>Session or limited persistent period</td>
            </tr>
            <tr>
              <td>Currency preference cookie</td>
              <td>Recalls the display currency you picked, for example EUR, GBP or USD</td>
              <td>Limited persistent period</td>
            </tr>
            <tr>
              <td>Cookie consent preference</td>
              <td>Saves your cookie choices so they are honoured the next time you visit</td>
              <td>Limited persistent period</td>
            </tr>
            <tr>
              <td>Security cookie</td>
              <td>Helps guard the Website against fraud, misuse, bots and unauthorised access</td>
              <td>Session or limited persistent period</td>
            </tr>
          </tbody>
        </table>
        <p>3.5 The first-party essential items the Website currently sets are named below.</p>
        <table>
          <thead>
            <tr>
              <th>Name and type</th>
              <th>What it does</th>
              <th>How long it lasts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>session_token (cookie)</td>
              <td>Keeps you signed in to your account once you have logged in</td>
              <td>7 days, or until you sign out</td>
            </tr>
            <tr>
              <td>e-commerce-cart (local storage)</td>
              <td>Keeps track of the products you have put in your basket</td>
              <td>Until your basket is emptied or you clear your browser storage</td>
            </tr>
            <tr>
              <td>currency (local storage)</td>
              <td>Recalls the display currency you picked</td>
              <td>Until you change it or clear your browser storage</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "preference-cookies",
    title: "Preference (functional) cookies",
    body: (
      <>
        <p>4.1 Functional cookies add extra features to the Website and let us tailor it to you.</p>
        <p>4.2 They may recall choices such as:</p>
        <ul>
          <li>the currency you prefer;</li>
          <li>your language or region;</li>
          <li>products you looked at recently;</li>
          <li>your account preferences;</li>
          <li>display settings you have saved;</li>
          <li>your support chat preferences, where that feature is offered.</li>
        </ul>
        <p>
          4.3 Some functional cookies make shopping noticeably smoother, but not every one of them is
          essential.
        </p>
        <p>
          4.4 Where the law requires it, we will only place functional cookies that are not essential once
          you have agreed to them.
        </p>
        <h3>Typical functional cookies</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>What it does</th>
              <th>How long it lasts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Recently viewed products</td>
              <td>Lets us show you the products you looked at a short while ago</td>
              <td>Limited persistent period</td>
            </tr>
            <tr>
              <td>Preference storage</td>
              <td>Recalls optional display or browsing choices</td>
              <td>Limited persistent period</td>
            </tr>
            <tr>
              <td>Support tool cookie</td>
              <td>Helps keep a support chat or help session going, where one is offered</td>
              <td>Session or limited persistent period</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "analytics-cookies",
    title: "Analytics and performance cookies",
    body: (
      <>
        <p>5.1 Analytics and performance cookies show us how people use the Website.</p>
        <p>5.2 They can help us see:</p>
        <ul>
          <li>the pages people visit;</li>
          <li>the routes visitors take through the Website;</li>
          <li>the products and categories people look at;</li>
          <li>how customers use the checkout;</li>
          <li>how quickly and smoothly the Website runs;</li>
          <li>errors, broken pages and other technical faults;</li>
          <li>whether changes we make to the Website actually help.</li>
        </ul>
        <p>
          5.3 We use what we learn from analytics to improve how the Website works, how easy it is to use,
          how products are presented, how navigation works and how the shop performs overall.
        </p>
        <p>
          5.4 You do not need analytics cookies to buy anything. Where the law requires it, we will only use
          them with your consent.
        </p>
        <p>
          5.5 Analytics data may be aggregated or pseudonymised. Even so, depending on the tool involved, it
          may still include personal data such as your IP address, device identifiers or other online
          identifiers.
        </p>
        <h3>Typical analytics and performance cookies</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>What it does</th>
              <th>How long it lasts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Website analytics cookie</td>
              <td>Counts visits and page views and follows the paths people take through the site</td>
              <td>Usually 12&ndash;26 months</td>
            </tr>
            <tr>
              <td>Performance monitoring cookie</td>
              <td>Helps us spot technical faults and problems with how the Website performs</td>
              <td>Session or limited persistent period</td>
            </tr>
            <tr>
              <td>Conversion measurement cookie</td>
              <td>Shows us whether changes to the Website, or our campaigns, result in purchases</td>
              <td>Limited persistent period</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "advertising-cookies",
    title: "Advertising and targeting cookies",
    body: (
      <>
        <p>
          6.1 We may use advertising and targeting cookies to show you relevant adverts, measure how well
          adverts perform, stop the same advert appearing too often, group visitors into audiences and see
          how people respond to marketing campaigns.
        </p>
        <p>6.2 They may be placed either by Solvetashop or by advertising and marketing partners.</p>
        <p>
          6.3 These cookies can follow what you do across different websites and may be used to build up a
          picture of your interests.
        </p>
        <p>
          6.4 We only use advertising or targeting cookies if they have been switched on for the Website and,
          where the law requires it, you have agreed to them.
        </p>
        <p>
          6.5 Turning these cookies down will not stop adverts appearing, but the adverts you see may be less
          relevant to you or less tailored.
        </p>
        <h3>Typical advertising and targeting cookies</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>What it does</th>
              <th>How long it lasts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Advertising pixel</td>
              <td>Measures how adverts perform and how people engage with them</td>
              <td>Limited persistent period</td>
            </tr>
            <tr>
              <td>Retargeting cookie</td>
              <td>Helps show you relevant adverts once you have left the Website</td>
              <td>Limited persistent period</td>
            </tr>
            <tr>
              <td>Campaign tracking cookie</td>
              <td>Helps us judge how well campaigns and promotions work</td>
              <td>Limited persistent period</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "checkout-and-security",
    title: "Checkout, payments and security",
    body: (
      <>
        <p>
          7.1 When you check out, payment processors, fraud-prevention services, card payment schemes and
          security tools may use cookies and similar technologies.
        </p>
        <p>7.2 These may be needed in order to:</p>
        <ul>
          <li>handle payments made by Visa and Mastercard;</li>
          <li>guard against fraudulent transactions;</li>
          <li>confirm that a checkout session is genuine;</li>
          <li>stop unauthorised activity;</li>
          <li>support secure authentication of payments;</li>
          <li>spot suspicious behaviour;</li>
          <li>meet payment security requirements.</li>
        </ul>
        <p>
          7.3 Some of these payment and security cookies are essential for checkout and for preventing
          fraud. Others are managed by the third-party provider concerned.
        </p>
        <p>
          7.4 Solvetashop never keeps your full card number or your full card security code.
        </p>
      </>
    ),
  },
  {
    id: "third-party-cookies",
    title: "Cookies placed by other companies",
    body: (
      <>
        <p>8.1 Some cookies on the Website may be placed by outside providers that help us run it.</p>
        <p>8.2 These providers may include:</p>
        <ul>
          <li>payment processors;</li>
          <li>fraud-prevention services;</li>
          <li>analytics services;</li>
          <li>advertising and marketing services;</li>
          <li>hosting, performance and security services;</li>
          <li>customer support or messaging tools;</li>
          <li>providers of embedded content;</li>
          <li>social media platforms, where relevant.</li>
        </ul>
        <p>
          8.3 Each of these cookies is controlled by the provider that placed it, and its use is governed by
          that provider&rsquo;s own privacy and cookie policies.
        </p>
        <p>
          8.4 Once a third-party cookie has been placed, we cannot control everything it does. We do,
          however, aim to choose reputable providers and, where we can, set cookies up in a way that
          respects your privacy.
        </p>
        <p>
          8.5 Third-party cookies that are not essential should only be used once the appropriate consent
          has been given.
        </p>
      </>
    ),
  },
  {
    id: "consent",
    title: "Asking for your consent",
    body: (
      <>
        <p>
          9.1 The first time you visit the Website, a cookie banner or consent tool may appear.
        </p>
        <p>9.2 Through that banner you may be able to:</p>
        <ul>
          <li>accept every cookie;</li>
          <li>turn down cookies that are not essential;</li>
          <li>pick and choose your cookie settings;</li>
          <li>read more about the kinds of cookies we use.</li>
        </ul>
        <p>
          9.3 We may use essential cookies without asking, because the Website cannot work without them and
          they are needed to deliver the services you request.
        </p>
        <p>
          9.4 Cookies that are not essential &mdash; such as analytics, marketing and targeting cookies and
          some functional cookies &mdash; are only used where the law allows it and once any consent the
          law requires has been given.
        </p>
        <p>
          9.5 Saying nothing, doing nothing, a box that was ticked in advance, or simply carrying on browsing
          is never treated by us as consent to cookies that are not essential.
        </p>
        <p>
          9.6 So that we can remember your decision next time, it may be saved in your browser in a cookie,
          in local storage or by a similar means.
        </p>
        <p>
          9.7 You can change your mind or withdraw your consent whenever you like, as explained in sections
          10 and 11.
        </p>
      </>
    ),
  },
  {
    id: "browser-controls",
    title: "Controlling cookies in your browser",
    body: (
      <>
        <p>10.1 Most browsers have settings that let you control cookies.</p>
        <p>10.2 Depending on the browser you use, you may be able to:</p>
        <ul>
          <li>see which cookies are stored on your device;</li>
          <li>remove cookies;</li>
          <li>block every cookie;</li>
          <li>block third-party cookies only;</li>
          <li>choose cookie settings for particular websites;</li>
          <li>be warned before a cookie is saved.</li>
        </ul>
        <p>10.3 Removing or blocking cookies may affect how well the Website works.</p>
        <p>
          10.4 If you block essential cookies, core parts of the shop &mdash; the basket, checkout, signing
          in, payment processing and security features &mdash; may not be available to you.
        </p>
        <p>
          10.5 Each browser handles cookies a little differently, so please check your browser&rsquo;s help
          pages for step-by-step guidance.
        </p>
      </>
    ),
  },
  {
    id: "changing-your-mind",
    title: "Changing your mind",
    body: (
      <>
        <p>
          11.1 You are free at any time to withdraw or alter the consent you gave for cookies that are not
          essential.
        </p>
        <p>11.2 To do so, you can:</p>
        <ul>
          <li>open the cookie preferences or settings tool on the Website, if one is offered;</li>
          <li>clear the cookies and local storage held by your browser;</li>
          <li>adjust your browser settings;</li>
          <li>use your browser to block third-party cookies.</li>
        </ul>
        <p>
          11.3 Withdrawing consent does not make any cookie use that relied on your consent, before you
          withdrew it, unlawful.
        </p>
        <p>
          11.4 Some cookies already on your device may stay there after you withdraw consent, until you
          remove them or they expire.
        </p>
        <p>
          11.5 Once you have withdrawn consent, we will stop placing cookies that are not essential, so far
          as this is technically possible.
        </p>
      </>
    ),
  },
  {
    id: "personal-data",
    title: "Cookies and your personal data",
    body: (
      <>
        <p>
          12.1 Certain cookies may gather information that counts as personal data, or that can be linked
          to personal data &mdash; for example your IP address, device identifiers, account session details,
          how you browse, or other online identifiers.
        </p>
        <p>
          12.2 Whenever cookies involve personal data, we handle that data as set out in our{" "}
          <a href="/policies/privacy">Privacy Notice</a>.
        </p>
        <p>
          12.3 Which legal basis we rely on for personal data gathered through cookies depends on the type
          of cookie and why it is used. It may be consent, legitimate interests, the need to perform a
          contract, or a legal obligation.
        </p>
        <p>
          12.4 Our <a href="/policies/privacy">Privacy Notice</a> gives fuller details of how we handle
          personal data.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    title: "Changes to this notice",
    body: (
      <>
        <p>13.1 We may revise this Cookie Notice now and then so that it keeps pace with changes to:</p>
        <ul>
          <li>the cookies we place;</li>
          <li>how the Website works;</li>
          <li>our checkout, payment, security or analytics tools;</li>
          <li>the marketing technologies we use;</li>
          <li>the outside providers we work with;</li>
          <li>legal or regulatory requirements;</li>
          <li>the way we run our business.</li>
        </ul>
        <p>
          13.2 Each time we revise this Cookie Notice, we will change the &ldquo;Last updated&rdquo; date
          shown at the top of the page.
        </p>
        <p>
          13.3 Unless we say otherwise, a revised version applies from the day we publish it on the
          Website.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>
          Questions about this Cookie Notice, or about how we use cookies and similar technologies, are
          welcome. You can reach us using the details below.
        </p>
        <ContactBlock />
      </>
    ),
  },
];

export default function CookieNoticePage() {
  return (
    <PolicyLayout
      title="Cookie Notice"
      lastUpdated="12 October 2026"
      summary="How Solvetashop uses cookies, local storage and similar tools on its website, and how you can control them."
      intro={
        <>
          <p>
            This Cookie Notice describes how {COMPANY.legalName}, trading as Solvetashop, makes use of cookies
            and comparable technologies on www.solvetashop.com (the &ldquo;Website&rdquo;). The Website is run by:
          </p>
          <ContactBlock />
          <p>
            Throughout this notice, &ldquo;Solvetashop&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
            &ldquo;our&rdquo; refer to {COMPANY.legalName}. &ldquo;You&rdquo; and &ldquo;your&rdquo; refer to
            anyone who visits or uses the Website, whether as a customer, account holder, business customer
            or otherwise.
          </p>
          <p>
            Please read this notice alongside our <a href="/policies/privacy">Privacy Notice</a>, which
            sets out how personal data is gathered, used, kept and safeguarded.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
