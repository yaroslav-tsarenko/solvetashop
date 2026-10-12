import type { Metadata } from "next";
import { PolicyLayout, ContactBlock, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { COMPANY } from "@/lib/company";
import { DELIVERY_ZONES } from "@/lib/shipping";

export const metadata: Metadata = { title: "Shipping & Delivery Policy" };

const sections: PolicySection[] = [
  {
    id: "what-this-covers",
    title: "What this policy covers",
    body: (
      <>
        <p>1.1 This document governs how we deliver the physical goods you buy from Solvetashop.</p>
        <p>
          1.2 Our range is made up of lighting, lamps, light fittings, light bulbs, home d&eacute;cor and
          related electrical and lighting accessories.
        </p>
        <p>
          1.3 The delivery options, charges, timescales and destinations available to you can differ
          according to:
        </p>
        <ul>
          <li>the country you are ordering to;</li>
          <li>the type, size and weight of the products;</li>
          <li>the value of your order;</li>
          <li>which couriers are available;</li>
          <li>customs requirements; and</li>
          <li>other operational considerations.</li>
        </ul>
        <p>
          1.4 Any delivery estimate we give is a guide, not a promised date. A date is only guaranteed if
          Solvetashop expressly confirms it to you in writing.
        </p>
      </>
    ),
  },
  {
    id: "getting-your-order-ready",
    title: "Getting your order ready",
    body: (
      <>
        <p>
          2.1 In most cases we process an order within 1&ndash;2 business days of your payment being
          successfully confirmed.
        </p>
        <p>
          2.2 &ldquo;Processing&rdquo; covers everything that happens before the parcel leaves us: checking
          the order, confirming payment, preparing the goods, carrying out our fulfilment checks and handing
          the parcel over to the carrier.
        </p>
        <p>2.3 Processing can take longer than usual:</p>
        <ul>
          <li>in peak seasons, during promotions, over public holidays and at other busy times;</li>
          <li>where a supplier is running late or we need to check stock;</li>
          <li>while a payment or fraud-prevention review is carried out; or</li>
          <li>where we need to verify the order further.</li>
        </ul>
        <p>
          2.4 If something you ordered turns out to be unavailable, delayed, discontinued, wrongly listed or
          otherwise impossible to supply, we may get in touch to suggest an alternative, hold the order back,
          send the rest of the order without it, or cancel that item and refund you for it.
        </p>
        <h3>Orders sent in more than one parcel</h3>
        <p>
          2.5 An order with several products may travel together or in separate parcels. We decide this
          according to stock availability, product type, packaging needs, warehouse handling, size, weight,
          carrier restrictions and what is most efficient or necessary for the shipment.
        </p>
        <p>
          2.6 When an order is split, each parcel may have its own tracking number and may arrive on a
          different day.
        </p>
        <p>
          2.7 Splitting an order does not normally mean you pay more for delivery, unless we made this clear
          to you before you completed your purchase.
        </p>
      </>
    ),
  },
  {
    id: "dispatch-tracking-carriers",
    title: "Dispatch, tracking and carriers",
    body: (
      <>
        <p>3.1 All Solvetashop orders are sent out from the United Kingdom.</p>
        <p>
          3.2 The delivery timescales in this document run from the day your order is dispatched, not the
          day you place it.
        </p>
        <p>
          3.3 When your order leaves us, we may email you a dispatch confirmation and, where the service
          offers it, tracking details.
        </p>
        <p>
          3.4 Whether tracking is available depends on the courier, the destination, the delivery method and
          the particular service used.
        </p>
        <p>3.5 Deliveries are made through courier and postal partners we trust.</p>
        <p>
          3.6 Within the UK, your order may be carried by Royal Mail, DHL or another appropriate domestic
          carrier, depending on the size of the parcel, where it is going, what it contains and our
          operational needs.
        </p>
        <p>
          3.7 Orders going abroad are usually carried by DHL&rsquo;s international services, by partner or
          local couriers, or by another logistics provider suited to the destination.
        </p>
        <p>
          3.8 The carrier may be chosen automatically, based on the delivery address, the characteristics of
          the parcel, which services are available and which option is most efficient.
        </p>
        <p>
          3.9 Where we need to, we may switch to a different carrier or delivery method so that your order
          reaches you safely and efficiently.
        </p>
      </>
    ),
  },
  {
    id: "delivery-timescales",
    title: "Delivery timescales",
    body: (
      <>
        <p>
          4.1 We offer two delivery methods: Standard delivery and Express delivery. After dispatch, you can
          usually expect your parcel within the following periods:
        </p>
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Standard delivery (from dispatch)</th>
              <th>Express delivery (from dispatch)</th>
            </tr>
          </thead>
          <tbody>
            {DELIVERY_ZONES.map((z) => (
              <tr key={z.zone}>
                <td>{z.zone}</td>
                <td>{z.standard} business days</td>
                <td>{z.express} business days</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          4.2 Express delivery shortens the journey after dispatch; it does not shorten the processing time
          described in section 2. At checkout these times are summarised as: Standard &mdash; UK 1&ndash;3
          business days, Europe 3&ndash;7, elsewhere 5&ndash;15; Express &mdash; UK 1&ndash;2 business days,
          Europe 2&ndash;4, elsewhere 3&ndash;8, in each case after dispatch.
        </p>
        <p>
          4.3 These periods are estimates. The actual time can be affected by courier capacity, customs
          processing, the country of destination, how local couriers handle the parcel, remote or rural
          locations, public holidays, the weather, transport disruption, security checks, import controls
          and other matters we cannot control.
        </p>
        <p>
          4.4 Expect delivery to take longer to remote islands, rural addresses, military addresses,
          industrial sites, construction sites, freight-forwarding addresses and anywhere couriers find hard
          to reach.
        </p>
        <p>
          4.5 Solvetashop is not liable for delay that results from customs authorities, local postal
          operators, courier networks, incorrect delivery details, unsuccessful delivery attempts, import
          charges left unpaid, or events beyond our reasonable control.
        </p>
      </>
    ),
  },
  {
    id: "delivery-charges",
    title: "Delivery charges and free delivery",
    body: (
      <>
        <p>
          5.1 You will see the delivery charge for your order at checkout, before you confirm the purchase.
        </p>
        <p>5.2 Our delivery charges are:</p>
        <ul>
          <li>
            Standard delivery: &pound;4.95, or free of charge when your order subtotal, after any discounts,
            is &pound;75 or more;
          </li>
          <li>Express delivery: &pound;9.95 for every order, whatever its value.</li>
        </ul>
        <p>
          5.3 We measure the order subtotal against the &pound;75 threshold after any discounts have been
          applied, but without counting tax, the delivery charge itself, customs duties, import VAT,
          brokerage fees or any other local charges.
        </p>
        <p>
          5.4 Our prices and delivery charges are set in pounds sterling (GBP). If you shop in euros (EUR) or
          US dollars (USD), you will see the equivalent of these amounts &mdash; including the &pound;75
          threshold &mdash; converted at checkout at the current exchange rate; whether your order qualifies
          for free standard delivery is always decided on the GBP amount.
        </p>
        <p>
          5.5 Our delivery charges may be revised over time to reflect carrier prices, fuel surcharges,
          restrictions on particular destinations, logistics costs, customs requirements or changes in how
          we operate.
        </p>
        <p>
          5.6 If a technical fault causes the wrong delivery charge to be shown, we may contact you before
          dispatch either to correct the charge or to give you the option of cancelling the order.
        </p>
      </>
    ),
  },
  {
    id: "delivery-address",
    title: "Your delivery address",
    body: (
      <>
        <p>
          6.1 It is your responsibility to give us, at checkout, a delivery address that is complete,
          correct and one a courier can actually deliver to.
        </p>
        <p>6.2 Please include everything the courier may need, namely:</p>
        <ul>
          <li>the recipient&rsquo;s name and, if relevant, the company name;</li>
          <li>the street, building number and any flat, apartment or unit number;</li>
          <li>the postcode, town or city and country;</li>
          <li>a contact phone number; and</li>
          <li>any instructions needed to gain access for delivery.</li>
        </ul>
        <p>
          6.3 We are not liable for delay, unsuccessful delivery, lost parcels, return charges or extra costs
          that arise because the address details you supplied were wrong, incomplete, out of date or
          incorrectly formatted.
        </p>
        <p>6.4 After dispatch, it may no longer be possible for us to change the delivery address.</p>
        <p>
          6.5 Where a parcel comes back to us because the address was wrong, incomplete or inaccessible, or
          because the parcel was refused or never collected, we may take the original delivery charge, the
          cost of the return journey, courier and customs charges and any other reasonable costs out of any
          refund we owe you, except where the law does not allow this.
        </p>
      </>
    ),
  },
  {
    id: "shipping-abroad",
    title: "Shipping outside the United Kingdom",
    body: (
      <>
        <p>
          7.1 We may accept orders for delivery abroad to the destinations we support, as shown on the
          Website or at checkout.
        </p>
        <p>
          7.2 Whether we can deliver abroad may depend on the destination country, which courier services
          operate there, product restrictions, customs requirements, sanctions, export controls, payment
          processing rules and operational limits.
        </p>
        <p>
          7.3 We cannot promise to deliver to every country, region, island or territory, or to remote or
          restricted destinations.
        </p>
        <p>
          7.4 If, after you have ordered, it turns out we cannot deliver to your destination, we may cancel
          the order and return the money paid for the delivery we could not make, unless the transaction is
          under legal, fraud, sanctions or compliance review.
        </p>
        <p>
          7.5 Parcels sent abroad may need customs declarations, commercial invoices, product classification
          details and other export or import information.
        </p>
      </>
    ),
  },
  {
    id: "customs-and-import-taxes",
    title: "Customs duties and import taxes",
    body: (
      <>
        <p>
          8.1 When an order is delivered outside the United Kingdom, it may have to clear customs and may
          attract import duties, import VAT, taxes, brokerage, handling or disbursement fees, customs
          clearance fees or other local charges.
        </p>
        <p>
          8.2 You pay these charges yourself, unless checkout expressly tells you otherwise. They are not
          built into the product price or the delivery charge unless checkout expressly says so.
        </p>
        <p>
          8.3 We have no control over customs authorities, how import tax is assessed, the rates of duty
          applied, customs inspections, couriers&rsquo; customs procedures or charges imposed by local
          government.
        </p>
        <p>
          8.4 You may be contacted directly by the courier or the customs authority and asked to pay duties,
          taxes or clearance charges before the parcel can be handed over.
        </p>
        <p>
          8.5 If customs charges, import taxes, courier fees or other required local charges go unpaid, the
          delivery may be held up, or the goods may be sent back, abandoned, seized or destroyed.
        </p>
        <p>
          8.6 If a parcel comes back to us because you did not pay customs charges, did not complete the
          customs formalities, refused the delivery or did not cooperate with the courier or customs
          authority, we may take delivery and return costs, customs charges, courier fees and other
          reasonable costs out of any refund, except where the law does not allow this.
        </p>
        <p>
          8.7 It is up to you to check that the goods you order may lawfully be imported into, and used in,
          the country they are being sent to.
        </p>
      </>
    ),
  },
  {
    id: "electrical-items",
    title: "Lamps, light fittings and other electrical items",
    body: (
      <>
        <p>
          9.1 Lamps, light fittings, light bulbs and other electrical items may have to meet rules in the
          destination country on import, safety, certification, voltage, plugs, labelling or installation.
        </p>
        <p>
          9.2 You are responsible for making sure that whatever you order is suitable to be imported,
          installed, used, resold or used professionally where you are.
        </p>
        <p>
          9.3 Before you order, please check every relevant specification, including the voltage, current,
          wattage, IP rating, dimensions, cable type, connector type, product code, the environment in which
          the item will be installed, and any compliance requirements.
        </p>
        <p>
          9.4 We are not liable for delay, refusal by customs, unsuccessful installation, non-compliance or
          rejection that results from local rules at the destination or from a product being chosen
          incorrectly.
        </p>
        <p>
          9.5 Where a light fitting or other electrical item needs to be installed, wired, connected, tested,
          commissioned or integrated into an electrical system, it should be installed only by a qualified
          electrician or other competent professional wherever that is required or appropriate.
        </p>
      </>
    ),
  },
  {
    id: "missed-and-refused-deliveries",
    title: "Missed, refused and uncollected deliveries",
    body: (
      <>
        <p>
          10.1 Depending on the destination and the courier&rsquo;s own rules, the courier may try to
          deliver to the address you gave us or may divert the parcel to a collection point, parcel shop,
          depot, locker or local delivery partner.
        </p>
        <p>
          10.2 You are expected to keep an eye on tracking updates and to respond to courier notifications
          where this is needed.
        </p>
        <p>
          10.3 If a delivery is missed, refused or does not succeed, follow the courier&rsquo;s instructions
          to arrange another delivery or to collect the parcel within the time the courier allows.
        </p>
        <p>10.4 We are not liable for an unsuccessful delivery where you:</p>
        <ul>
          <li>do not respond to the courier&rsquo;s notices;</li>
          <li>do not collect the parcel;</li>
          <li>refuse the parcel;</li>
          <li>give an address that cannot be accessed; or</li>
          <li>do not pay customs or local charges.</li>
        </ul>
        <p>
          10.5 Where the law permits, extra fees for redelivery, storage, return or handling may be taken out
          of any refund or charged to you separately.
        </p>
        <h3>Refusing a delivery</h3>
        <p>
          10.6 If you turn a delivery away without good reason, do not accept it, or do not collect it from
          the courier, the parcel may be sent back to us.
        </p>
        <p>
          10.7 In that case we may take the original delivery charge, the cost of the return journey,
          courier fees, customs charges, storage fees, handling charges and any other reasonable costs out of
          your refund, except where the law does not allow this.
        </p>
        <p>
          10.8 If you are a Consumer and you refuse the delivery as a way of using your legal right to
          cancel, your refund will be dealt with under our{" "}
          <a href="/policies/returns">Returns &amp; Refunds Policy</a> and the applicable law.
        </p>
        <p>
          10.9 Turning a parcel away does not by itself cancel any customs charges, courier charges or local
          fees that may already have been assessed.
        </p>
      </>
    ),
  },
  {
    id: "damaged-or-incorrect-deliveries",
    title: "Damaged, incomplete or incorrect deliveries",
    body: (
      <>
        <p>11.1 Wherever you can, check the parcel when it is delivered.</p>
        <p>
          11.2 If the outside of the parcel looks damaged, opened, wet, crushed, tampered with or incomplete,
          photograph it before you open it and hold on to all of the packaging.
        </p>
        <p>
          11.3 If any goods arrive damaged, missing, incomplete or wrong, let us know as soon as you can by
          emailing <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <p>
          11.4 In your message, give your order number, explain what is wrong and attach clear photos or
          videos showing the product, the packaging, the shipping label and any visible damage.
        </p>
        <p>
          11.5 Where damage from delivery is visible, please tell us within 48 hours of delivery if you can.
          This lets us take the matter up with the courier promptly; it does not take away any mandatory
          legal rights you may have.
        </p>
        <p>
          11.6 Keep the goods, packaging, labels, accessories, manuals and delivery materials until we have
          looked into the problem.
        </p>
        <p>
          11.7 Before we agree to a replacement, refund or other remedy, we may ask for the damaged or
          incorrect goods to be sent back or inspected.
        </p>
      </>
    ),
  },
  {
    id: "late-or-missing-parcels",
    title: "Late or missing parcels",
    body: (
      <>
        <p>
          12.1 If your parcel has not arrived by the end of the estimated delivery period, start by looking
          at the tracking information and any messages from the courier.
        </p>
        <p>
          12.2 If the tracking shows an unusual delay, an unsuccessful delivery, a customs hold, or no
          movement for a long time, email us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <p>
          12.3 Before a parcel can be treated as lost, we may have to open an investigation with the courier.
        </p>
        <p>
          12.4 These investigations can take a while, particularly for parcels sent abroad, parcels held up
          in customs, parcels to remote destinations and parcels passed between several delivery partners.
        </p>
        <p>
          12.5 We will do what is reasonable to help, but we are not liable for delay caused by customs
          processing, courier investigations, local delivery partners, incorrect address details, unpaid
          import charges or events beyond our control.
        </p>
        <p>
          12.6 Where the courier confirms the parcel is lost and the loss was not the customer&rsquo;s fault,
          we may offer a replacement, a refund or another suitable remedy.
        </p>
      </>
    ),
  },
  {
    id: "third-party-addresses",
    title: "Forwarders, collection points and other third-party addresses",
    body: (
      <>
        <p>
          13.1 You may ask us to send your order to a freight forwarder, parcel-forwarding service, hotel,
          workplace, construction site, collection point or other third-party address. If you do, delivery
          is complete once the carrier hands the parcel over at that address or to the authorised recipient.
        </p>
        <p>
          13.2 From that point on, Solvetashop is not liable for loss, damage, delay, customs problems,
          difficulties with onward shipping or failed delivery once the parcel is with the third party,
          forwarding service, collection point or authorised recipient you chose.
        </p>
        <p>
          13.3 It is your responsibility to make sure that the third party has authority to accept the
          parcel and is able to handle it safely.
        </p>
      </>
    ),
  },
  {
    id: "trade-and-business-orders",
    title: "Trade and business orders",
    body: (
      <>
        <p>
          14.1 If you are a Business Customer, trade customer, contractor, installer or other professional
          buyer, it is for you to make sure that delivery dates, product availability, import requirements
          and installation schedules fit your project.
        </p>
        <p>14.2 A delivery estimate is not a guaranteed project deadline and should not be relied on as one.</p>
        <p>
          14.3 Except where the law does not allow liability to be excluded, Solvetashop is not liable for
          labour, electrician, contractor or installation costs, project delays, missed appointments,
          downtime, loss of profit, loss of contract or other indirect losses arising from a delivery delay,
          customs delay, courier problem or product being unavailable.
        </p>
        <p>
          14.4 Business Customers should not book installation, labour or site work, or commit to project
          deadlines, until the goods have arrived, been inspected and been confirmed as correct and
          suitable.
        </p>
      </>
    ),
  },
  {
    id: "sanctions-and-restricted-destinations",
    title: "Sanctions, restricted destinations and compliance",
    body: (
      <>
        <p>
          15.1 We may refuse, cancel, suspend or block an order if delivering it would, or might, breach
          sanctions, export controls, customs restrictions, payment processor rules, courier restrictions,
          legal requirements or our internal compliance controls.
        </p>
        <p>
          15.2 We may check orders, billing details, delivery addresses, customers, countries, regions and
          payment information against the relevant sanctions, restricted-party, fraud-prevention and
          compliance requirements.
        </p>
        <p>
          15.3 We do not deliver anywhere that delivery is prohibited by applicable law, sanctions, carrier
          or payment processor restrictions, or our compliance requirements.
        </p>
        <p>
          15.4 Trying to get around our destination restrictions through a freight forwarder, a third-party
          or false address, altered billing details or misleading order information may lead to the order
          being cancelled and your access to the Website being restricted.
        </p>
        <p>
          15.5 We are not liable for loss, delay, cancellation, blocked delivery, seizure by customs or extra
          costs that result from sanctions, export controls, customs restrictions, courier restrictions or
          legal compliance requirements.
        </p>
      </>
    ),
  },
  {
    id: "events-beyond-our-control",
    title: "Events beyond our reasonable control",
    body: (
      <>
        <p>
          16.1 We are not liable where delivery fails or is delayed because of something beyond our
          reasonable control.
        </p>
        <p>
          16.2 Examples include severe weather, natural disasters, transport disruption, carrier failure,
          customs delay, strikes and other labour disputes, public holidays, government action, changes in
          regulation, sanctions, war, civil unrest, epidemics and pandemics, power cuts, technical failures,
          security checks, supply chain disruption and other force majeure events.
        </p>
        <p>
          16.3 If your order is affected by such an event, we will take reasonable steps to keep the
          disruption to a minimum and will keep you updated where appropriate.
        </p>
      </>
    ),
  },
  {
    id: "updates-to-this-policy",
    title: "Updates to this policy",
    body: (
      <>
        <p>
          17.1 We may revise this Shipping &amp; Delivery Policy from time to time to reflect changes to our
          delivery methods, courier partners, delivery regions, delivery charges, customs processes, ways of
          working or legal requirements.
        </p>
        <p>
          17.2 Your order is governed by the version of this policy that was in force when you placed it,
          unless the law requires a change or a correction has to be applied.
        </p>
      </>
    ),
  },
  {
    id: "contact-us",
    title: "Questions about your delivery",
    body: (
      <>
        <p>
          If you would like to ask about shipping, where your order has got to, customs, a damaged parcel, a
          missed delivery or anything else to do with delivery, you can reach us here:
        </p>
        <ContactBlock />
      </>
    ),
  },
];

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      title="Shipping & Delivery Policy"
      lastUpdated="12 October 2026"
      summary="How we prepare, send and deliver orders placed on Solvetashop, what delivery costs, and what happens if a parcel is late, lost, damaged or held at customs."
      intro={
        <>
          <p>
            This Shipping &amp; Delivery Policy sets out how we prepare, send and deliver orders placed on
            www.solvetashop.com, and what happens if something goes wrong along the way. The website is run
            by:
          </p>
          <ContactBlock />
          <p>
            Throughout this document, &ldquo;Solvetashop&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
            &ldquo;our&rdquo; refer to {COMPANY.legalName}, and &ldquo;Customer&rdquo;, &ldquo;you&rdquo; and
            &ldquo;your&rdquo; refer to the individual or business ordering through the Website.
            &ldquo;Consumer&rdquo; and &ldquo;Business Customer&rdquo; have the meanings given in our{" "}
            <a href="/policies/terms">Terms of Sale</a>.
          </p>
          <p>
            Please read this policy alongside our <a href="/policies/terms">Terms of Sale</a>, our{" "}
            <a href="/policies/returns">Returns &amp; Refunds Policy</a>, our{" "}
            <a href="/policies/privacy">Privacy Notice</a> and any further information shown to you at
            checkout.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
