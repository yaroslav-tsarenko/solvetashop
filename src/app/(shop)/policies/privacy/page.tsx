import type { Metadata } from "next";
import { PolicyLayout, ContactBlock, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Privacy Notice" };

const sections: PolicySection[] = [
  {
    id: "what-this-notice-covers",
    title: "What this notice covers",
    body: (
      <>
        <p>1.1 This notice deals with the personal data we handle when you:</p>
        <ul>
          <li>browse or visit the Website;</li>
          <li>open a customer account or use one you already have;</li>
          <li>place an order, keep track of it, or take delivery of it;</li>
          <li>
            buy lighting, lamps, light fittings, light bulbs, home décor and related electrical and lighting
            accessories from us;
          </li>
          <li>ask for, or make use of, trade, business or professional customer access;</li>
          <li>get in touch with our customer support team;</li>
          <li>
            ask us about delivery progress, returns, refunds, warranty help or assistance with a product;
          </li>
          <li>sign up to receive marketing from us;</li>
          <li>come into contact with cookies, analytics, advertising or similar technologies;</li>
          <li>write to us or speak to us by email, telephone, online form or any other channel.</li>
        </ul>
        <p>1.2 It applies equally to Consumers and to Business Customers.</p>
        <p>
          1.3 Please read it alongside our <a href="/policies/terms">Terms of Sale</a>, our{" "}
          <a href="/policies/shipping">Shipping &amp; Delivery Policy</a>, our{" "}
          <a href="/policies/returns">Returns &amp; Refunds Policy</a>, our{" "}
          <a href="/policies/cookies">Cookie Notice</a> and any other policy or notice published on the
          Website.
        </p>
      </>
    ),
  },
  {
    id: "who-is-responsible",
    title: "Who is responsible for your data",
    body: (
      <>
        <p>
          2.1 {COMPANY.legalName} acts as the data controller of your personal data under the data protection
          laws that apply to us. Those laws include the UK General Data Protection Regulation and the Data
          Protection Act 2018 and, where relevant, the EU General Data Protection Regulation.
        </p>
        <p>2.2 Being the controller means that we decide the purposes for which, and the way in which, your personal data is used.</p>
        <p>
          2.3 Any question about privacy can be sent to us using the contact details set out at the start of
          this notice and again in section 19.
        </p>
        <p>
          2.4 The law does not currently require us to appoint a Data Protection Officer, so we have not done
          so. Privacy questions can still be raised with us through the contact details mentioned above.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "The information we hold about you",
    body: (
      <>
        <p>3.1 Exactly what we collect will depend on how you deal with Solvetashop.</p>
        <p>3.2 The kinds of personal data we may collect and use are grouped below.</p>

        <h3>3.3 Who you are and how to reach you</h3>
        <ul>
          <li>your full name;</li>
          <li>your billing address and your delivery address;</li>
          <li>your email address and telephone number;</li>
          <li>the name of your company, if relevant;</li>
          <li>your VAT number, tax number or other business details, if relevant;</li>
          <li>your account username or customer reference.</li>
        </ul>

        <h3>3.4 Your customer account</h3>
        <p>Where you open an account or use account features, this can include:</p>
        <ul>
          <li>the details you use to sign in;</li>
          <li>the preferences you have set and the addresses you have saved;</li>
          <li>your past orders;</li>
          <li>products you have saved or added to a wishlist, if that feature is offered;</li>
          <li>the status of your account;</li>
          <li>how you prefer us to communicate with you.</li>
        </ul>
        <p>
          Where secure password systems are in use, your password is never visible to us in a readable form.
        </p>

        <h3>3.5 Your orders and transactions</h3>
        <p>Each order you place gives us information such as:</p>
        <ul>
          <li>the products you chose, the order number and the order value;</li>
          <li>the currency you selected;</li>
          <li>whether payment has been made;</li>
          <li>the delivery method, dispatch details and tracking information;</li>
          <li>invoice and receipt details;</li>
          <li>records of any refund, return, cancellation or warranty claim;</li>
          <li>the history of any customer service contact about that order.</li>
        </ul>

        <h3>3.6 Payment information</h3>
        <p>
          Card and other payments are handled by secure external payment providers. Your complete card number,
          your full card security code and your complete card credentials are not stored by us.
        </p>
        <p>The provider may pass us a limited amount of payment information, which we may keep, for example:</p>
        <ul>
          <li>confirmation that the payment went through;</li>
          <li>the transaction ID and the payment provider&rsquo;s reference;</li>
          <li>the last four digits of your card, if the provider shares them;</li>
          <li>the card brand, such as Visa or Mastercard;</li>
          <li>the outcome of fraud screening;</li>
          <li>details of any refund or chargeback.</li>
        </ul>

        <h3>3.7 Delivery and customs information</h3>
        <p>So that your order can reach you, we may use:</p>
        <ul>
          <li>the delivery address, the recipient&rsquo;s name, a telephone number and an email address;</li>
          <li>the tracking number, courier records and proof of delivery;</li>
          <li>details needed for customs declarations and commercial invoices;</li>
          <li>any import or export information that an international shipment requires.</li>
        </ul>
        <p>
          On international orders, some order and delivery details may be passed to couriers, customs brokers,
          customs authorities or local delivery partners.
        </p>

        <h3>3.8 Business and trade customers</h3>
        <p>
          When you buy as a Business Customer, ask for trade access or deal with us in a professional
          capacity, we may also hold:
        </p>
        <ul>
          <li>your company name and trading name;</li>
          <li>registration details and VAT or tax details;</li>
          <li>your business address;</li>
          <li>the name of your contact person and their professional role;</li>
          <li>information about your trade or contracting activity;</li>
          <li>your order history;</li>
          <li>records of our business correspondence with you.</li>
        </ul>

        <h3>3.9 Support requests and correspondence</h3>
        <p>Whenever you contact us, we may keep:</p>
        <ul>
          <li>emails exchanged with you and details of telephone calls;</li>
          <li>anything you submit through a contact form;</li>
          <li>the details of your support request or product question;</li>
          <li>the details of any complaint;</li>
          <li>return or refund requests and information about warranty claims;</li>
          <li>
            photographs, videos, documents or other files you send us to show a problem with a product,
            damage in transit, an installation concern or a warranty issue.
          </li>
        </ul>

        <h3>3.10 Technical and usage information</h3>
        <p>As you use the Website, some information is gathered automatically, including:</p>
        <ul>
          <li>your IP address and an approximate location worked out from it;</li>
          <li>the type and version of your browser;</li>
          <li>your device type and operating system;</li>
          <li>the pages you look at and the website that referred you;</li>
          <li>the date and time of each visit;</li>
          <li>session information and clickstream data;</li>
          <li>error logs and security logs;</li>
          <li>performance data.</li>
        </ul>

        <h3>3.11 Cookies and tracking</h3>
        <p>
          Cookies and similar tools can tell us about your browsing, your preferences, what you do with your
          cart and how you interact with analytics and, if you agree to it, with marketing or advertising.
          Our <a href="/policies/cookies">Cookie Notice</a> explains this in more detail.
        </p>

        <h3>3.12 Marketing preferences</h3>
        <p>If you sign up for marketing or engage with our promotional messages, we may hold:</p>
        <ul>
          <li>your email address;</li>
          <li>whether you are subscribed, and your marketing consent;</li>
          <li>a record of any unsubscribe request;</li>
          <li>your communication preferences;</li>
          <li>
            data about how you engage with our emails, for example whether they were opened or clicked,
            where our marketing tools support this.
          </li>
        </ul>

        <h3>3.13 Fraud prevention and compliance</h3>
        <p>
          To safeguard our business, our customers and our payment systems, and to meet our legal duties, we
          may use:
        </p>
        <ul>
          <li>indicators of risk attached to an order;</li>
          <li>the results of payment verification;</li>
          <li>differences between billing and delivery details;</li>
          <li>IP address and location signals;</li>
          <li>checks against sanctions or restricted destinations;</li>
          <li>chargeback history;</li>
          <li>records of suspected fraud;</li>
          <li>notes made during compliance reviews.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sensitive-data-and-children",
    title: "Sensitive information and children",
    body: (
      <>
        <p>
          4.1 It is not our intention to collect special category personal data, for example details of your
          health, race or ethnic origin, political views, religious beliefs, trade union membership, biometric
          data or sexual orientation.
        </p>
        <p>
          4.2 Please do not send us information of that kind unless we have asked for it and it is strictly
          needed for a particular matter.
        </p>
        <p>
          4.3 The Website is not aimed at children, and we do not knowingly collect personal data from
          children.
        </p>
        <p>
          4.4 The Website is meant for people aged 18 or over, because what we sell includes lamps, light
          fittings and other electrical items that call for some technical understanding and must be used
          safely.
        </p>
        <p>
          4.5 If you think a child has given us personal data, please let us know at{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. We will look into it and, where required,
          delete the information.
        </p>
      </>
    ),
  },
  {
    id: "where-data-comes-from",
    title: "Where your information comes from",
    body: (
      <>
        <p>5.1 Much of what we hold comes straight from you, for example when you:</p>
        <ul>
          <li>visit the Website or open an account;</li>
          <li>place an order, give us billing or delivery details, or make a payment;</li>
          <li>get in touch with us or ask for support;</li>
          <li>send in a return, refund or warranty request;</li>
          <li>sign up for marketing;</li>
          <li>fill in a form or otherwise give us information through the Website.</li>
        </ul>
        <p>
          5.2 Some information is captured automatically while you use the Website, for instance by cookies,
          analytics tools, logs, security systems and comparable technologies.
        </p>
        <p>5.3 We may also be given personal data by others, such as:</p>
        <ul>
          <li>payment processors;</li>
          <li>card networks and fraud prevention providers;</li>
          <li>couriers and delivery partners;</li>
          <li>customs brokers and customs authorities;</li>
          <li>the providers of our e-commerce platform;</li>
          <li>analytics providers;</li>
          <li>providers of marketing and communication services;</li>
          <li>providers of IT, hosting, security and infrastructure services;</li>
          <li>our professional advisers;</li>
          <li>public authorities, where the law requires it.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-data",
    title: "What we use your information for",
    body: (
      <>
        <p>6.1 The purposes for which we use personal data are set out below.</p>

        <h3>6.2 Handling and fulfilling your orders</h3>
        <ul>
          <li>receiving and processing your order and confirming payment;</li>
          <li>sending order confirmations, receipts and invoices;</li>
          <li>getting your goods ready for dispatch and arranging their delivery;</li>
          <li>giving you tracking details;</li>
          <li>dealing with customs paperwork where it is needed;</li>
          <li>handling cancellations, returns, refunds and warranty claims.</li>
        </ul>

        <h3>6.3 Helping you as a customer</h3>
        <ul>
          <li>answering your questions;</li>
          <li>helping with queries about products, orders or delivery;</li>
          <li>looking into goods that arrive damaged, faulty, wrong or not at all;</li>
          <li>dealing with complaints;</li>
          <li>processing returns and warranty requests;</li>
          <li>keeping in touch with you about your order or your account.</li>
        </ul>

        <h3>6.4 Running and developing the Website</h3>
        <ul>
          <li>keeping the Website working properly;</li>
          <li>making it easier to navigate and pleasanter to use;</li>
          <li>keeping an eye on performance and putting errors right;</li>
          <li>trying out and refining Website features;</li>
          <li>learning how customers use the Website.</li>
        </ul>

        <h3>6.5 Managing accounts and trade access</h3>
        <ul>
          <li>setting up and running customer accounts;</li>
          <li>checking business or trade details where relevant;</li>
          <li>providing the features that come with an account;</li>
          <li>administering trade pricing or business access where we offer it;</li>
          <li>keeping accounts secure.</li>
        </ul>

        <h3>6.6 Preventing fraud and keeping things secure</h3>
        <ul>
          <li>spotting and stopping fraud;</li>
          <li>watching for suspicious activity;</li>
          <li>protecting our payment systems;</li>
          <li>stopping the Website from being misused;</li>
          <li>securing accounts and systems;</li>
          <li>investigating abuse or access that was not authorised;</li>
          <li>dealing with chargebacks and payment disputes.</li>
        </ul>

        <h3>6.7 Meeting our legal and regulatory duties</h3>
        <ul>
          <li>
            complying with our obligations under tax, accounting, company, consumer protection, customs,
            sanctions and financial crime law, and our other legal obligations;
          </li>
          <li>keeping the records the law requires;</li>
          <li>answering lawful requests from the authorities;</li>
          <li>handling disputes and legal claims.</li>
        </ul>

        <h3>6.8 Sending you marketing</h3>
        <p>
          If the law allows it, we may use your contact details to tell you about products, offers,
          promotions, news or services we think could interest you. You can opt out of marketing whenever you
          like.
        </p>

        <h3>6.9 Cookies and analytics</h3>
        <ul>
          <li>running the parts of the Website that cannot work without them;</li>
          <li>remembering your preferences;</li>
          <li>keeping your cart working;</li>
          <li>measuring visits to the Website and analysing how it performs;</li>
          <li>making the Website better;</li>
          <li>supporting marketing or advertising, where you have given any consent that is required.</li>
        </ul>
      </>
    ),
  },
  {
    id: "lawful-bases",
    title: "Our lawful grounds for using your data",
    body: (
      <>
        <p>7.1 We will only use personal data where the law gives us a valid ground for doing so. The table matches each activity to the ground we rely on.</p>
        <table>
          <thead>
            <tr>
              <th>What we are doing</th>
              <th>Lawful ground</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Handling and fulfilling orders</td>
              <td>Necessary to perform our contract with you</td>
            </tr>
            <tr>
              <td>Taking payment and confirming the transaction</td>
              <td>Necessary to perform our contract with you</td>
            </tr>
            <tr>
              <td>Delivering your goods</td>
              <td>Necessary to perform our contract with you</td>
            </tr>
            <tr>
              <td>Dealing with returns, refunds and warranty claims</td>
              <td>Necessary to perform our contract with you; legal obligation; legitimate interests</td>
            </tr>
            <tr>
              <td>Supporting you as a customer</td>
              <td>Necessary to perform our contract with you; legitimate interests</td>
            </tr>
            <tr>
              <td>Opening and managing accounts</td>
              <td>Necessary to perform our contract with you; legitimate interests</td>
            </tr>
            <tr>
              <td>Checking business or trade account details</td>
              <td>Necessary to perform our contract with you; legitimate interests</td>
            </tr>
            <tr>
              <td>Preventing fraud and keeping the Website secure</td>
              <td>Legitimate interests; legal obligation</td>
            </tr>
            <tr>
              <td>Customs, tax, accounting and legal record-keeping</td>
              <td>Legal obligation</td>
            </tr>
            <tr>
              <td>Dealing with legal claims or disputes</td>
              <td>Legitimate interests; legal obligation</td>
            </tr>
            <tr>
              <td>Website analytics and improving our service</td>
              <td>Legitimate interests; consent where the law requires it</td>
            </tr>
            <tr>
              <td>Cookies and tracking that are not essential</td>
              <td>Consent where the law requires it</td>
            </tr>
            <tr>
              <td>Marketing by email</td>
              <td>Consent, or legitimate interests where the law permits</td>
            </tr>
            <tr>
              <td>Sanctions and compliance checks</td>
              <td>Legal obligation; legitimate interests</td>
            </tr>
          </tbody>
        </table>
        <p>
          7.2 We rely on legitimate interests only where we are satisfied that your rights and freedoms do not
          outweigh them.
        </p>
        <p>
          7.3 The legitimate interests we pursue can include running an online shop, fulfilling orders,
          improving the Website, preventing fraud, protecting our systems, looking after our customer
          relationships, enforcing our <a href="/policies/terms">Terms of Sale</a> and protecting our legal
          and commercial position.
        </p>
        <p>
          7.4 Where consent is the ground we rely on, you can withdraw it whenever you wish. Anything we did
          with your data before you withdrew it remains lawful.
        </p>
      </>
    ),
  },
  {
    id: "marketing",
    title: "Marketing messages",
    body: (
      <>
        <p>
          8.1 We will only send you marketing if you have agreed to receive it or the law otherwise allows us
          to send it.
        </p>
        <p>
          8.2 These messages might cover new products, offers, promotions, stock availability, service news,
          or products similar to ones you have bought or looked at.
        </p>
        <p>
          8.3 To stop receiving marketing at any point, click the unsubscribe link in any of our emails or
          write to us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <p>
          8.4 Opting out of marketing does not stop service messages. We may still contact you with order
          confirmations, delivery news, payment notices, refund updates, warranty correspondence, and
          important notices about your account or our policies.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar tools",
    body: (
      <>
        <p>
          9.1 We use cookies on the Website together with comparable technologies such as pixels, tags, local
          storage and analytics tools.
        </p>
        <p>
          9.2 Certain cookies are essential to make the Website work, for example those that support the
          cart, checkout, security, fraud prevention and access to your account.
        </p>
        <p>
          9.3 Cookies that are not essential may be used for analytics, measuring performance,
          personalisation, advertising or marketing, where the law permits this and where consent is needed.
        </p>
        <p>
          9.4 The first time you visit, a cookie banner or consent tool may appear so that you can control
          non-essential cookies.
        </p>
        <p>9.5 Your browser settings also let you control cookies.</p>
        <p>
          9.6 Our <a href="/policies/cookies">Cookie Notice</a> gives fuller information.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share your information with",
    body: (
      <>
        <p>10.1 Your personal data is never sold by us.</p>
        <p>
          10.2 We do pass personal data to carefully chosen third parties where this is needed to run the
          Website, process orders, deliver goods, meet our legal obligations or protect our business.
        </p>
        <p>10.3 Those third parties may include:</p>
        <ul>
          <li>payment processors and card payment providers;</li>
          <li>banks, card networks and fraud prevention providers;</li>
          <li>the providers of our e-commerce platform;</li>
          <li>providers of hosting, IT, infrastructure and security services;</li>
          <li>couriers, delivery partners, postal operators, customs brokers and logistics providers;</li>
          <li>customs authorities and other public bodies, where required;</li>
          <li>providers of email, communication and customer support services;</li>
          <li>providers of analytics and cookie technology;</li>
          <li>marketing service providers, where relevant;</li>
          <li>our professional advisers, such as accountants, auditors, insurers, lawyers and consultants;</li>
          <li>
            regulators, courts, law enforcement agencies, tax authorities or government bodies, where the law
            requires it;
          </li>
          <li>
            business partners or successors if all or part of our business is restructured, merged, sold,
            financed or transferred.
          </li>
        </ul>
        <p>
          10.4 Our service providers must use personal data only for the purposes we have authorised and must
          keep it secure and confidential by applying appropriate measures.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "Transfers outside the UK",
    body: (
      <>
        <p>
          11.1 Solvetashop sells to customers in many countries and relies on outside service providers, so
          your personal data may be handled outside the United Kingdom, outside the European Economic Area, or
          outside the country where you live.
        </p>
        <p>
          11.2 This can happen when the hosting, e-commerce, payment, analytics, communication, delivery,
          customs or support providers we use are based abroad.
        </p>
        <p>11.3 Where data protection law requires it, such transfers are protected by suitable safeguards, which may include:</p>
        <ul>
          <li>adequacy regulations or adequacy decisions;</li>
          <li>the UK International Data Transfer Agreement;</li>
          <li>the UK Addendum to the EU Standard Contractual Clauses;</li>
          <li>the EU Standard Contractual Clauses;</li>
          <li>contractual and organisational safeguards;</li>
          <li>any other transfer mechanism that applicable law allows.</li>
        </ul>
        <p>
          11.4 We take reasonable steps so that data sent abroad continues to be protected to the standard
          that data protection law requires.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep your information",
    body: (
      <>
        <p>
          12.1 Personal data is kept only for as long as is reasonably needed for the purposes in this notice,
          unless the law requires or allows us to keep it longer.
        </p>
        <p>
          12.2 How long that is will depend on the kind of data, why we hold it, legal requirements, our
          accounting obligations, tax rules, warranty periods, the risk of disputes, fraud prevention needs
          and operational needs.
        </p>
        <p>12.3 The table below gives a general indication.</p>
        <table>
          <thead>
            <tr>
              <th>Type of information</th>
              <th>Usual retention period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order, transaction, invoice, accounting and tax records</td>
              <td>Up to 7 years</td>
            </tr>
            <tr>
              <td>Customer account information</td>
              <td>While the account stays active, and for a reasonable period after that</td>
            </tr>
            <tr>
              <td>Customer support correspondence</td>
              <td>Up to 3 years after the matter has been closed, unless we need to keep it longer</td>
            </tr>
            <tr>
              <td>Records of returns, refunds, complaints and warranty claims</td>
              <td>For the applicable warranty, limitation or dispute period</td>
            </tr>
            <tr>
              <td>Marketing consents and unsubscribe records</td>
              <td>Until consent is withdrawn, and afterwards for as long as needed to respect your opt-out</td>
            </tr>
            <tr>
              <td>Analytics and technical information</td>
              <td>Normally 12&ndash;26 months, depending on the tool concerned</td>
            </tr>
            <tr>
              <td>Fraud, chargeback, sanctions and compliance records</td>
              <td>For as long as reasonably needed to prevent and investigate fraud and to comply with the law</td>
            </tr>
          </tbody>
        </table>
        <p>
          12.4 We may keep information for longer where we need it to bring, pursue or defend legal claims, to
          comply with the law, to look into fraud or abuse, to settle disputes or to enforce our{" "}
          <a href="/policies/terms">Terms of Sale</a>.
        </p>
        <p>
          12.5 Once we no longer need personal data, we will delete or anonymise it, or archive it securely
          where that is appropriate.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Keeping your information safe",
    body: (
      <>
        <p>
          13.1 We use reasonable technical and organisational measures to guard personal data against loss,
          misuse, alteration, destruction, disclosure or access that has not been authorised.
        </p>
        <p>
          13.2 Depending on the circumstances, these may include access controls, secure payment processing,
          encryption, monitoring of our systems, account security features, checks on our providers and
          internal controls.
        </p>
        <p>
          13.3 However, no website, payment system, method of transmission or storage system can ever be
          guaranteed to be entirely secure.
        </p>
        <p>
          13.4 It is your responsibility to keep your account sign-in details private and to tell us straight
          away if you suspect someone has got into your account without your permission.
        </p>
      </>
    ),
  },
  {
    id: "automated-decisions",
    title: "Automated decisions and profiling",
    body: (
      <>
        <p>
          14.1 At present we do not take decisions about you based solely on automated processing that have a
          legal effect on you or affect you in a similarly significant way.
        </p>
        <p>
          14.2 Automated tools may help us with fraud prevention, payment and Website security, risk scoring
          and monitoring transactions.
        </p>
        <p>
          14.3 Their role is to flag activity that may be suspicious. They do not normally make final decisions
          with legal or similarly significant effects without suitable review.
        </p>
        <p>
          14.4 Should we start using automated decision-making with legal or similarly significant effects, we
          will update this notice and give you the information the law requires.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights over your data",
    body: (
      <>
        <p>
          15.1 Depending on where you are and which data protection law applies, you may be entitled to:
        </p>
        <ul>
          <li>be told how your personal data is being used;</li>
          <li>obtain a copy of your personal data;</li>
          <li>have personal data that is wrong or incomplete corrected;</li>
          <li>have your personal data erased in some circumstances;</li>
          <li>have the processing of your data restricted in some circumstances;</li>
          <li>object to processing that relies on legitimate interests;</li>
          <li>object to direct marketing at any time;</li>
          <li>data portability in some circumstances;</li>
          <li>withdraw your consent where we rely on it;</li>
          <li>
            exercise the rights that relate to automated decision-making and profiling, where they apply (see
            section 14);
          </li>
          <li>complain to a supervisory authority.</li>
        </ul>
        <p>
          15.2 These rights are not unlimited. They can be subject to legal conditions and exemptions, to
          checks on your identity and to our own legal obligations.
        </p>
        <p>
          15.3 To use any of these rights, email us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          We may have to confirm your identity before we reply.
        </p>
        <p>15.4 We aim to answer every valid request within the time limit set by the law that applies.</p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Raising a concern",
    body: (
      <>
        <p>
          16.1 If you are unhappy with the way we have handled your personal data, please contact us first at{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and give us the chance to put things right.
        </p>
        <p>
          16.2 Customers in the United Kingdom are entitled to complain to the Information Commissioner&rsquo;s
          Office.
        </p>
        <p>
          16.3 Customers in the European Union or the European Economic Area may be entitled to complain to the
          data protection supervisory authority in their own country.
        </p>
      </>
    ),
  },
  {
    id: "third-party-sites",
    title: "Other websites and services",
    body: (
      <>
        <p>
          17.1 The Website may link to sites and services run by others, such as manufacturers&rsquo; sites,
          payment pages, courier tracking pages and social media pages.
        </p>
        <p>
          17.2 We have no responsibility for the privacy practices, security, content or policies of those
          third-party sites or services.
        </p>
        <p>
          17.3 Please read their own privacy policies before you give them any personal data.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Updates to this notice",
    body: (
      <>
        <p>
          18.1 This notice may be revised from time to time to reflect changes to our business, the way the
          Website works, the providers we use, how we handle data, the law or regulatory guidance.
        </p>
        <p>18.2 Each time we revise it, we will change the &ldquo;Last updated&rdquo; date shown at the top of the page.</p>
        <p>
          18.3 Unless we say otherwise, a revised version takes effect from the day it is published on the
          Website.
        </p>
        <p>18.4 It is a good idea to look at this notice now and then so that you know how we handle personal data.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Getting in touch",
    body: (
      <>
        <p>
          For any question, request or concern about this notice or the way we use personal data, you can
          reach us here:
        </p>
        <ContactBlock />
      </>
    ),
  },
];

export default function PrivacyNoticePage() {
  return (
    <PolicyLayout
      title="Privacy Notice"
      lastUpdated="12 October 2026"
      summary="What personal data Solvetashop collects, why we use it, who we share it with, how long we keep it and the rights you have over it."
      intro={
        <>
          <p>
            {COMPANY.legalName}, which trades as Solvetashop, uses this notice to explain what happens to your
            personal data &ndash; how it is collected, used, stored, shared and protected &ndash; when you
            visit www.solvetashop.com, open an account, order from us, contact us, use our services or deal
            with us in any other way.
          </p>
          <p>The Website is run by:</p>
          <ContactBlock />
          <p>
            Throughout this notice, &ldquo;Solvetashop&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
            &ldquo;our&rdquo; refer to {COMPANY.legalName}. &ldquo;Customer&rdquo;, &ldquo;you&rdquo; and
            &ldquo;your&rdquo; refer to anyone who uses the Website, orders from us, opens an account, contacts
            us or otherwise uses our services.
          </p>
          <p>
            We take the protection of your privacy seriously and handle your personal data lawfully, fairly and
            openly.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
