import type { Metadata } from "next";
import { PolicyLayout, ContactBlock, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Payment Terms" };

const sections: PolicySection[] = [
  {
    id: "what-these-terms-cover",
    title: "What these terms cover",
    body: (
      <>
        <p>
          1.1 These Payment Terms govern every amount you pay through the Website, whether for physical
          goods, delivery, optional extended warranty cover, or any other paid service or charge that appears
          at checkout.
        </p>
        <p>
          1.2 Solvetashop sells lighting, lamps, light fittings, light bulbs, home d&eacute;cor and related
          electrical and lighting accessories.
        </p>
        <p>
          1.3 When you place an order and enter your payment details, you accept these Payment Terms.
        </p>
      </>
    ),
  },
  {
    id: "ways-to-pay",
    title: "Ways to pay",
    body: (
      <>
        <p>2.1 We take secure payment by card, using either of these schemes:</p>
        <ul>
          <li>Visa</li>
          <li>Mastercard</li>
        </ul>
        <p>
          2.2 No other way of paying is available unless it is expressly offered at checkout or we have
          agreed to it in writing.
        </p>
        <p>
          2.3 Unless the Website clearly says otherwise, or we have separately agreed it in writing, we do
          not currently accept cash on delivery, cheques or cryptocurrency, and we do not offer payment on
          account, open credit terms or payment by instalments.
        </p>
        <p>2.4 You must pay in full at checkout before we start processing your order.</p>
      </>
    ),
  },
  {
    id: "currencies",
    title: "Currencies",
    body: (
      <>
        <p>3.1 Prices on the Website may be shown, and payment may be taken, in any of these currencies:</p>
        <ul>
          <li>GBP</li>
          <li>EUR</li>
          <li>USD</li>
        </ul>
        <p>
          3.2 Which currency you can use may depend on where you are, the store settings you have chosen,
          what our payment provider supports, how checkout is configured, or how the Website works at the
          time.
        </p>
        <p>
          3.3 Before you confirm your order, checkout will show you the exact amount you will pay and the
          currency it will be charged in.
        </p>
        <p>
          3.4 If your card or bank account is in a currency other than the one used at checkout, your bank
          or card issuer may convert the amount at its own rate and may add a conversion fee or foreign
          transaction fee.
        </p>
        <p>
          3.5 Exchange rates, bank conversion fees, card issuer charges and foreign transaction fees are
          outside Solvetashop&rsquo;s control.
        </p>
      </>
    ),
  },
  {
    id: "prices-vat-and-order-total",
    title: "Prices, VAT and your order total",
    body: (
      <>
        <p>
          4.1 Unless we clearly say otherwise, the product prices you see on the Website already include VAT
          where VAT applies.
        </p>
        <p>4.2 The total you are asked to pay at checkout may be made up of:</p>
        <ul>
          <li>the price of the products;</li>
          <li>VAT, where it applies;</li>
          <li>any delivery charge;</li>
          <li>any paid Additional Warranty you have chosen;</li>
          <li>any valid discount or promotional code (deducted);</li>
          <li>any other charge shown to you clearly before you pay.</li>
        </ul>
        <p>4.3 We may change our prices at any time up until you place an order.</p>
        <p>
          4.4 Once we have accepted your order, a later price change will not affect it, unless the price
          you were offered resulted from an obvious error in pricing, currency, tax, a discount or our
          systems.
        </p>
        <p>
          4.5 If we discover a pricing or payment error after you have ordered, we may get in touch to ask
          whether you would like to go ahead at the corrected price or cancel the order concerned. Section 7
          explains how we deal with errors more generally.
        </p>
      </>
    ),
  },
  {
    id: "delivery-charges",
    title: "Delivery charges",
    body: (
      <>
        <p>5.1 Any delivery charge that applies is shown at checkout before you pay.</p>
        <p>5.2 Our delivery charges are:</p>
        <ul>
          <li>
            Standard delivery: &pound;4.95, or free of charge when the order subtotal, after discounts, is
            &pound;75 or more;
          </li>
          <li>Express delivery: &pound;9.95 for every order, whatever its value.</li>
        </ul>
        <p>
          5.3 We work out whether an order reaches the &pound;75 free standard delivery threshold after
          deducting discounts and before adding tax, the delivery charge, customs duties, import VAT, local
          taxes, brokerage fees or other charges raised in the destination country.
        </p>
        <p>
          5.4 These amounts are set in pounds sterling (GBP). If you pay in euros (EUR) or US dollars (USD),
          checkout shows the equivalent amounts, converted at the current exchange rate, and the threshold is
          always assessed on the GBP amount. Further detail is in our{" "}
          <a href="/policies/shipping">Shipping &amp; Delivery Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "paying-for-additional-warranty",
    title: "Paying for Additional Warranty cover",
    body: (
      <>
        <p>6.1 Where we offer it, you can add paid Additional Warranty cover to a product at checkout.</p>
        <p>6.2 Unless we say otherwise, Additional Warranty cover is priced as follows:</p>
        <table>
          <thead>
            <tr>
              <th>Extra cover</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>+1 Year Additional Warranty</td>
              <td>10% of the product price, subject to a minimum of &pound;6.99 / &euro;6.99 / $6.99</td>
            </tr>
            <tr>
              <td>+2 Year Additional Warranty</td>
              <td>16% of the product price, subject to a minimum of &pound;9.99 / &euro;9.99 / $9.99</td>
            </tr>
            <tr>
              <td>+3 Year Additional Warranty</td>
              <td>22% of the product price, subject to a minimum of &pound;12.99 / &euro;12.99 / $12.99</td>
            </tr>
          </tbody>
        </table>
        <p>6.3 You pay for Additional Warranty cover at checkout, at the same time as the product itself.</p>
        <p>
          6.4 Additional Warranty cover is governed by our{" "}
          <a href="/policies/warranty">Warranty Policy</a> and by any warranty terms specific to the product.
        </p>
        <p>
          6.5 If you validly cancel or return a product before its Additional Warranty cover has started,
          and you are owed a refund by law or Solvetashop has agreed to give one, we may also refund what you
          paid for that Additional Warranty cover.
        </p>
      </>
    ),
  },
  {
    id: "offers-codes-and-mistakes",
    title: "Offers, codes and pricing mistakes",
    body: (
      <>
        <p>
          7.1 Promotional codes, discounts, offers and special prices may come with their own conditions,
          such as an expiry date, eligibility criteria, a minimum spend, excluded products or limits on
          where they can be used.
        </p>
        <p>
          7.2 A promotional code has to be entered before you complete payment. We do not have to apply a
          code to an order after it has been placed.
        </p>
        <p>7.3 A discount has no cash value and cannot be swapped for money.</p>
        <p>
          7.4 We may decline, cancel or withdraw a discount if it has been used fraudulently, wrongly or
          abusively, against its conditions, or because of a technical fault.
        </p>
        <p>
          7.5 If a technical or administrative mistake means that a product price, delivery charge,
          warranty price, currency amount, discount or order total is plainly wrong, we may either cancel
          the order or contact you to ask whether you want to continue at the correct price.
        </p>
      </>
    ),
  },
  {
    id: "how-payments-are-processed",
    title: "How payments are processed",
    body: (
      <>
        <p>8.1 Your payment is handled by secure payment providers that are independent of us.</p>
        <p>
          8.2 Once you submit your payment details, the payment provider may check, authorise,
          authenticate, approve, decline or hold the transaction for review.
        </p>
        <p>
          8.3 We cannot promise that a payment will go through. Whether it is approved depends on your bank
          or card issuer, the payment provider, fraud checks, authentication requirements, the funds
          available to you, transaction limits and other matters we do not control.
        </p>
        <p>
          8.4 We will not prepare your order for dispatch until the payment has been successfully authorised
          or received.
        </p>
        <p>
          8.5 An order confirmation or payment confirmation is not always the same as our acceptance of your
          order. When and how we accept an order is set out in our{" "}
          <a href="/policies/terms">Terms of Sale</a>.
        </p>
      </>
    ),
  },
  {
    id: "authentication-and-verification",
    title: "Bank authentication and extra checks",
    body: (
      <>
        <p>
          9.1 Your bank, card issuer or the payment provider may ask you to confirm some card payments with
          an additional step, for example 3D Secure, a one-time passcode, approval in your banking app, or
          another form of verification.
        </p>
        <p>
          9.2 If that step is not completed successfully, the payment may be declined or your order may not
          go ahead.
        </p>
        <p>
          9.3 Where we need to, we may also ask you for more information so that we can check billing,
          delivery or business details, confirm that an order is genuine, assess fraud risk, or meet
          compliance requirements.
        </p>
        <p>
          9.4 If you do not give us the information we ask for, your order may be delayed or cancelled.
        </p>
      </>
    ),
  },
  {
    id: "unsuccessful-payments",
    title: "When a payment does not go through",
    body: (
      <>
        <p>
          10.1 We may not process your order if the payment is declined, fails, expires, is reversed or
          stays pending.
        </p>
        <p>
          10.2 We are not responsible when a payment fails because of your bank, card issuer or payment
          provider, a lack of funds, wrong card details, failed authentication, transaction limits, network
          problems or fraud controls.
        </p>
        <p>
          10.3 If your payment fails, you may need to try again, pay with a different accepted card, speak
          to your bank, or ask us for help.
        </p>
        <p>
          10.4 We may cancel any order that is unpaid, incomplete, suspicious, or where payment has failed
          or is still pending.
        </p>
      </>
    ),
  },
  {
    id: "keeping-card-details-safe",
    title: "Keeping your card details safe",
    body: (
      <>
        <p>11.1 We treat the security of your payments as a priority.</p>
        <p>
          11.2 Card payments go through secure third-party payment providers. Our own systems never hold
          your full card number, your full security code or your complete card credentials.
        </p>
        <p>11.3 The payment provider may pass us a limited amount of payment information, for example:</p>
        <ul>
          <li>whether the payment succeeded;</li>
          <li>the transaction reference;</li>
          <li>the payment provider&rsquo;s ID for the payment;</li>
          <li>the card brand;</li>
          <li>the last four digits of the card, if supplied;</li>
          <li>the progress of any refund;</li>
          <li>details of any chargeback or dispute;</li>
          <li>the result of fraud screening.</li>
        </ul>
        <p>
          11.4 Payment providers may protect transactions with secure authentication, encryption, fraud
          prevention measures and other payment security controls.
        </p>
        <p>
          11.5 You must not try to pay with any card, account or payment method that you do not have
          permission to use.
        </p>
      </>
    ),
  },
  {
    id: "fraud-screening",
    title: "Fraud screening and order reviews",
    body: (
      <>
        <p>
          12.1 We, our payment providers and the card networks may screen transactions for fraud, misuse,
          unauthorised activity, sanctions risk and payment security issues, so that everyone involved,
          including our customers, is protected.
        </p>
        <p>
          12.2 If an order looks suspicious or high-risk, we may hold it, cancel it, refuse it, or ask you
          for further verification.
        </p>
        <p>12.3 Things that may lead us to treat an order as higher risk include:</p>
        <ul>
          <li>billing and delivery details that do not match;</li>
          <li>an unusual order value or number of items;</li>
          <li>several unsuccessful payment attempts;</li>
          <li>a card that may be being used without permission;</li>
          <li>a high-risk destination or a parcel forwarding address;</li>
          <li>a destination that is restricted or subject to sanctions;</li>
          <li>unusual IP address, location or device information;</li>
          <li>a history of chargebacks or fraud;</li>
          <li>customer information that does not add up.</li>
        </ul>
        <p>
          12.4 We do not have to fulfil an order if we reasonably believe it may be fraudulent,
          unauthorised, unlawful, abusive or non-compliant.
        </p>
      </>
    ),
  },
  {
    id: "sanctions-and-compliance",
    title: "Sanctions and legal restrictions",
    body: (
      <>
        <p>
          13.1 We may refuse, cancel, suspend or block a payment or order where this is required or
          appropriate because of sanctions, export controls, financial crime controls, the rules of our
          payment processor or the card networks, courier or customs restrictions, or any other legal
          obligation.
        </p>
        <p>
          13.2 By ordering, you confirm that you are not subject to sanctions, that you are not in a
          restricted territory, and that you are not using the Website to buy goods in breach of any
          applicable law, sanctions regime or export control.
        </p>
        <p>
          13.3 We are not responsible for any delay, blocked or withheld payment, cancelled order or payment
          failure that results from sanctions, compliance checks, payment processor requirements, card
          network rules or legal restrictions.
        </p>
      </>
    ),
  },
  {
    id: "billing-and-invoices",
    title: "Billing information and invoices",
    body: (
      <>
        <p>14.1 It is your responsibility to give us correct billing information at checkout.</p>
        <p>
          14.2 If you are buying for a business, please give us the correct business name, billing address,
          VAT or tax details and anything else needed for the invoice.
        </p>
        <p>
          14.3 Where relevant, we may send you an order confirmation, payment confirmation, receipt, VAT
          invoice or commercial invoice.
        </p>
        <p>
          14.4 Once an order has been processed we may not be able to change the invoice details,
          particularly if the invoice has already been produced, passed to our accounts, or used for customs
          paperwork.
        </p>
        <p>
          14.5 Business Customers must check that their billing details are right before completing
          payment.
        </p>
      </>
    ),
  },
  {
    id: "business-customers",
    title: "Paying as a business",
    body: (
      <>
        <p>
          15.1 In these Payment Terms, &ldquo;Business Customer&rdquo; has the meaning given in our{" "}
          <a href="/policies/terms">Terms of Sale</a>. Business Customers must pay the full amount at
          checkout unless we have expressly agreed something different in writing.
        </p>
        <p>
          15.2 Unless separately approved in writing, we do not give Business Customers credit terms, open
          account purchasing or deferred payment.
        </p>
        <p>
          15.3 Before paying, a Business Customer must make sure that any purchase order, internal sign-off,
          VAT or tax information, billing details and delivery details are correct.
        </p>
        <p>
          15.4 We treat an order placed by a Business Customer as a business purchase unless we decide
          otherwise.
        </p>
      </>
    ),
  },
  {
    id: "orders-sent-abroad",
    title: "Orders sent abroad: duties and import charges",
    body: (
      <>
        <p>16.1 All orders are sent from the United Kingdom.</p>
        <p>
          16.2 If your order is going to an address outside the United Kingdom, it may have to clear customs
          and may attract import duties, import VAT, local taxes, brokerage fees, courier handling fees,
          customs clearance fees or other local charges.
        </p>
        <p>
          16.3 Unless checkout expressly says otherwise, none of these customs or import charges are part of
          the product price, the delivery charge or the amount Solvetashop takes from you.
        </p>
        <p>
          16.4 You must pay any customs duties, import VAT, taxes, brokerage fees, handling charges and local
          charges levied in the country of delivery.
        </p>
        <p>
          16.5 We have no control over customs authorities, customs delays, how import tax is assessed,
          courier clearance fees or local charges.
        </p>
        <p>
          16.6 If customs or import charges are not paid, the parcel may be delayed, sent back, treated as
          abandoned, destroyed or seized, and further costs may arise.
        </p>
      </>
    ),
  },
  {
    id: "how-refunds-are-paid",
    title: "How refunds are paid",
    body: (
      <>
        <p>
          17.1 When you are entitled to a refund, and how much, is set out in our{" "}
          <a href="/policies/returns">Returns &amp; Refunds Policy</a>.
        </p>
        <p>
          17.2 Approved refunds are normally paid back to the payment method you used for the order.
        </p>
        <p>
          17.3 We are not normally able to send a refund to another card, account, person or payment method.
        </p>
        <p>
          17.4 After we have issued a refund, your bank, card issuer or payment provider may need extra time
          before the money shows as available to you.
        </p>
        <p>
          17.5 Solvetashop does not control, and will not refund, differences caused by currency conversion,
          card issuer fees, foreign transaction fees or bank charges.
        </p>
        <p>
          17.6 Customs duties, import VAT, local taxes, brokerage fees, courier handling fees, customs
          clearance fees and other local charges are not collected by Solvetashop, so Solvetashop cannot
          refund them.
        </p>
      </>
    ),
  },
  {
    id: "disputes-and-chargebacks",
    title: "Disputes and chargebacks",
    body: (
      <>
        <p>
          18.1 If something goes wrong with an order, a payment, a delivery, a return, a refund or a warranty
          claim, please get in touch with us first at{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> so that we can look into it and try to put
          it right.
        </p>
        <p>
          18.2 If you raise a chargeback or a card or payment dispute, we may have to share information with
          our payment provider, the bank, the card network, a fraud prevention provider or a dispute
          resolution provider.
        </p>
        <p>
          18.3 The information we share may include the order details, payment records, tracking data, proof
          of delivery, messages between us, refund records, the status of any return, fraud screening
          results and any other relevant evidence.
        </p>
        <p>
          18.4 We may contest a chargeback or payment dispute if we believe the order was properly processed,
          fulfilled, delivered or refunded, or was otherwise dealt with in line with our policies.
        </p>
        <p>
          18.5 Where chargebacks are fraudulent, abusive or repeated, we may cancel future orders, restrict
          access to your account, or take further steps where the law allows.
        </p>
      </>
    ),
  },
  {
    id: "updates-to-these-terms",
    title: "Updates to these terms",
    body: (
      <>
        <p>
          19.1 We may revise these Payment Terms from time to time, for example to reflect changes to our
          payment methods, currencies, checkout process, payment providers, fraud controls, legal
          requirements, tax rules or the way we run the business.
        </p>
        <p>
          19.2 Your order is governed by the version of these Payment Terms that was in force when you
          placed it, unless the law requires a change to apply or the change is a correction that has to be
          applied.
        </p>
        <p>19.3 Whenever we revise these Payment Terms, we will change the &ldquo;Last updated&rdquo; date shown at the top.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Getting in touch",
    body: (
      <>
        <p>
          For questions about paying for an order, billing, invoices, refunds, unsuccessful payments or
          payment disputes, you can reach us using the details below.
        </p>
        <ContactBlock />
      </>
    ),
  },
];

export default function PaymentTermsPage() {
  return (
    <PolicyLayout
      title="Payment Terms"
      lastUpdated="12 October 2026"
      summary="How we take payment for orders on www.solvetashop.com, which cards and currencies we accept, how payments are checked and secured, and how refunds and disputes are handled."
      intro={
        <>
          <p>
            These Payment Terms describe how we accept, process, check and refund payments for orders placed
            on www.solvetashop.com (the &ldquo;Website&rdquo;). The Website is run by:
          </p>
          <ContactBlock />
          <p>
            Throughout these Payment Terms, &ldquo;Solvetashop&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
            &ldquo;our&rdquo; refer to {COMPANY.legalName}, and &ldquo;Customer&rdquo;, &ldquo;you&rdquo;
            and &ldquo;your&rdquo; refer to any individual or business that places an order through the
            Website.
          </p>
          <p>
            Please read these Payment Terms alongside our <a href="/policies/terms">Terms of Sale</a>,{" "}
            <a href="/policies/shipping">Shipping &amp; Delivery Policy</a>,{" "}
            <a href="/policies/returns">Returns &amp; Refunds Policy</a>,{" "}
            <a href="/policies/privacy">Privacy Notice</a>, <a href="/policies/cookies">Cookie Notice</a> and{" "}
            <a href="/policies/warranty">Warranty Policy</a>.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
