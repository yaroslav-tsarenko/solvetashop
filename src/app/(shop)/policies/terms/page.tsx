import type { Metadata } from "next";
import { PolicyLayout, ContactBlock, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Terms of Sale" };

const emailLink = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;

const sections: PolicySection[] = [
  {
    id: "about-these-terms",
    title: "What these terms cover",
    body: (
      <>
        <p>
          1.1 Every visit to the Website and every purchase of goods you make through Solvetashop is
          subject to these Terms.
        </p>
        <p>
          1.2 Solvetashop offers physical goods: lighting, lamps, light fittings, light bulbs, home
          décor and related electrical and lighting accessories, for use in homes, in commercial premises,
          and by trade and professional buyers.
        </p>
        <p>
          1.3 These Terms should be read alongside the other documents published on the Website, in
          particular our <a href="/policies/shipping">Shipping &amp; Delivery Policy</a>, our{" "}
          <a href="/policies/returns">Returns &amp; Refunds Policy</a>, our{" "}
          <a href="/policies/privacy">Privacy Notice</a>, our <a href="/policies/cookies">Cookie Notice</a>,
          our <a href="/policies/payment">Payment Terms</a>, our{" "}
          <a href="/policies/warranty">Warranty Policy</a>, and any warranty or Additional Warranty terms
          that relate to a particular product.
        </p>
        <p>
          1.4 Where a product page or the checkout page clearly sets out a term specific to that product
          and it conflicts with these Terms, the specific term wins, but only for that product or that
          order.
        </p>
        <p>
          1.5 These Terms do not take away any legal right you have that the law does not allow to be
          excluded or restricted.
        </p>
      </>
    ),
  },
  {
    id: "who-can-buy",
    title: "Who may order from us",
    body: (
      <>
        <p>
          2.1 To order on the Website you must be 18 or over and legally able to enter into a contract.
        </p>
        <p>
          2.2 When you order for a company, partnership, business, organisation, trade customer or any
          other legal entity, you are telling us that you have authority to commit that entity to these
          Terms.
        </p>
        <p>
          2.3 It is your job to make sure that everything you give us is correct, complete and current.
          That includes your name, billing details, delivery address and contact details, any VAT or tax
          information, and anything else we need in order to handle your order.
        </p>
        <p>
          2.4 Neither the Website nor anything bought from Solvetashop may be used for a purpose that is
          unlawful, unsafe, fraudulent or not authorised.
        </p>
      </>
    ),
  },
  {
    id: "consumers-and-businesses",
    title: "Consumers and business buyers",
    body: (
      <>
        <p>3.1 We sell both to private consumers and to businesses.</p>
        <p>
          3.2 You are a &ldquo;Consumer&rdquo; if you are an individual buying wholly or mainly for
          purposes that fall outside your trade, business, craft or profession.
        </p>
        <p>
          3.3 You are a &ldquo;Business Customer&rdquo; if you are a person, company, sole trader,
          installer, contractor, reseller, organisation, public body or professional who buys goods for
          business, commercial, trade, resale, installation or professional purposes.
        </p>
        <p>
          3.4 Some rights in these Terms, such as the statutory right of a Consumer to cancel, belong only
          to Consumers. They do not extend to Business Customers unless the law says they must.
        </p>
        <p>
          3.5 We expect a Business Customer buying lamps, light fittings or other electrical items to have
          suitable technical knowledge or to have taken professional advice first. Before ordering, a
          Business Customer must check every specification, rating, compatibility point, suitability
          question, compliance requirement and installation condition.
        </p>
      </>
    ),
  },
  {
    id: "accounts-and-trade-access",
    title: "Your account and trade access",
    body: (
      <>
        <p>
          4.1 The Website may let you open an account, or apply for access as a trade, professional or
          business customer.
        </p>
        <p>
          4.2 We decide at our discretion whether to approve, decline, suspend or withdraw any account,
          trade account, pricing access or professional access.
        </p>
        <p>
          4.3 We may ask you for further information so we can check your identity, business status,
          professional activity, VAT or tax details, delivery address or other relevant matters.
        </p>
        <p>
          4.4 Keep your login details safe. If you think someone has got into your account without
          permission, tell us straight away.
        </p>
        <p>
          4.5 Except where the law requires otherwise, we are not liable for any loss that results from
          your not keeping your account details secure.
        </p>
      </>
    ),
  },
  {
    id: "product-information",
    title: "Product details and stock",
    body: (
      <>
        <p>
          5.1 We try to keep the descriptions, pictures, prices, technical data, stock levels and other
          details on the Website correct and current.
        </p>
        <p>
          5.2 Pictures are there to illustrate the product. What you receive may look slightly different
          because of manufacturer updates, new packaging, lighting, your screen settings, colour
          variation, differences between batches or technical improvements.
        </p>
        <p>
          5.3 Specifications may come from manufacturers, suppliers, distributors or product databases. We
          take reasonable care with them, but we cannot promise that every item of product data is
          error-free, complete or fully up to date.
        </p>
        <p>
          5.4 It is up to you to confirm, before you order, that a product suits what you intend to do
          with it. Among other things, you should check:
        </p>
        <ul>
          <li>its voltage and electrical rating;</li>
          <li>its current, load, wattage and power needs;</li>
          <li>its size and the space available to install it;</li>
          <li>the cable type and size it needs and how it connects;</li>
          <li>its IP rating and whether it suits the environment;</li>
          <li>whether it is for indoor or outdoor use;</li>
          <li>whether it works with the systems, fittings, devices and installations you already have;</li>
          <li>the regulatory, safety and installation rules in your country or region.</li>
        </ul>
        <p>
          5.5 If you are not sure a product is right for your purpose, ask us before you order, or get
          advice from a qualified electrician or another competent professional.
        </p>
        <p>
          5.6 We cannot guarantee that a product is available until we have accepted and processed your
          order. We may cancel or hold up an order if the item goes out of stock, is discontinued, has been
          listed wrongly or cannot be supplied for reasons we cannot reasonably control.
        </p>
      </>
    ),
  },
  {
    id: "safe-use-and-installation",
    title: "Using and installing products safely",
    body: (
      <>
        <p>
          6.1 Lamps, light fittings and other electrical items can be hazardous if they are chosen,
          installed, connected, altered, overloaded or used incorrectly.
        </p>
        <p>
          6.2 Every product must be used only for what it is designed to do, and in line with the
          manufacturer&rsquo;s instructions, safety warnings and installation guides, its voltage rating,
          load limits and technical specification, and all applicable laws, building regulations,
          electrical standards and local requirements.
        </p>
        <p>
          6.3 Where it is required or sensible, any product that has to be wired, connected, installed,
          tested, commissioned or built into an electrical system should be fitted only by a qualified
          electrician or another competent professional.
        </p>
        <p>
          6.4 The Website does not offer electrical engineering, installation, compliance, inspection,
          certification or safety approval services.
        </p>
        <p>
          6.5 Any guidance, description, compatibility note or support reply we give is general information.
          It is not a replacement for professional advice, an electrical inspection or a compliance
          assessment.
        </p>
        <p>
          6.6 We are not liable for damage, loss, injury, malfunction, non-compliance, an unsuccessful
          installation or a safety incident that results from incorrect installation, choosing the wrong
          product, misuse, overloading, unauthorised modification, work done by someone else, ignoring the
          instructions, or using a product for something it was not intended for.
        </p>
      </>
    ),
  },
  {
    id: "orders-and-contract",
    title: "How an order becomes a contract",
    body: (
      <>
        <p>
          7.1 When you submit an order, you are offering to buy the chosen goods on these Terms.
        </p>
        <p>
          7.2 You may then get an order or payment confirmation. Receiving one does not, on its own, mean
          we have accepted your order.
        </p>
        <p>
          7.3 A binding contract between you and us comes into existence at the earliest of these moments:
          when we accept your order, when we start processing it for fulfilment, or when we dispatch the
          goods.
        </p>
        <p>7.4 Until we accept an order, we may decline it, cancel it or limit it if:</p>
        <ul>
          <li>the item is out of stock or unavailable;</li>
          <li>there is a mistake in the product, its price, its delivery charge or its description;</li>
          <li>payment is not authorised or is later reversed;</li>
          <li>we suspect fraud, abuse, misuse or other suspicious activity;</li>
          <li>we cannot deliver to the address you have chosen;</li>
          <li>customs, sanctions, export, payment processor, carrier or other legal restrictions stand in the way;</li>
          <li>the order looks as though it is intended for unauthorised resale or an unlawful purpose;</li>
          <li>we cannot verify the customer, billing or delivery details we need.</li>
        </ul>
        <p>
          7.5 If we cancel after taking payment, we will refund what you paid for the cancelled goods. The
          exceptions are where the law requires us to hold the money, or where the transaction is under
          fraud, chargeback, sanctions or compliance review.
        </p>
      </>
    ),
  },
  {
    id: "prices-and-currencies",
    title: "Prices, VAT and currency",
    body: (
      <>
        <p>8.1 Prices on the Website may be shown in EUR, GBP and USD.</p>
        <p>
          8.2 Unless we clearly say otherwise, the prices shown include VAT where VAT applies.
        </p>
        <p>8.3 Before you pay, the checkout will show you the total amount you will be charged.</p>
        <p>
          8.4 We can change prices at any time and without notice. A change will not affect an order we
          have already accepted, unless the original price was a clear pricing error.
        </p>
        <p>
          8.5 We may correct obvious mistakes in pricing, currency, tax, discounts or products. If a
          mistake affects your order, we may get in touch to ask whether you want to continue at the
          corrected price or cancel.
        </p>
        <p>
          8.6 Solvetashop has no control over currency conversion, bank charges, foreign transaction fees,
          fees charged by your card issuer or exchange-rate differences, and these are for you to bear.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Paying for your order",
    body: (
      <>
        <p>9.1 You pay for your order at checkout.</p>
        <p>9.2 We take secure card payments, Visa and Mastercard included.</p>
        <p>
          9.3 Third-party payment providers handle your payment securely. We never store your full card
          number or your full card security details.
        </p>
        <p>
          9.4 We start processing your order only once payment has been authorised or received.
        </p>
        <p>
          9.5 We may suspend, cancel or hold up your order if a payment is refused, reversed, disputed,
          charged back or flagged as suspicious.
        </p>
        <p>
          9.6 You must not pay fraudulently, use a payment method you are not authorised to use, or try to
          get around any payment, security, verification or fraud-prevention check.
        </p>
        <p>
          9.7 Where relevant and where you have given us enough billing information, we may issue a
          Business Customer with a VAT invoice or a commercial invoice.
        </p>
        <p>
          More detail is set out in our <a href="/policies/payment">Payment Terms</a>.
        </p>
      </>
    ),
  },
  {
    id: "offers-and-free-delivery",
    title: "Offers, discount codes and free delivery",
    body: (
      <>
        <p>
          10.1 We may sometimes run discounts, promotional codes, special prices, free delivery thresholds
          or trade pricing.
        </p>
        <p>
          10.2 Standard delivery costs &pound;4.95 and is free when the order subtotal, after discounts, is
          &pound;75 or more. Express delivery costs &pound;9.95 for every order and is never free.
        </p>
        <p>
          10.3 Whether an order reaches the &pound;75 threshold depends on the order subtotal once discounts
          are applied, leaving out tax, the delivery charge, customs duties, import taxes and other local
          charges.
        </p>
        <p>
          10.4 Delivery charges and the threshold are set in pounds sterling (GBP). If you pay in euros (EUR)
          or US dollars (USD), you see the equivalent amounts converted at checkout at the current exchange
          rate; the threshold is always assessed on the GBP amount.
        </p>
        <p>
          10.5 If we suspect misuse, an error, fraud or technical abuse, we may withdraw, change, refuse or
          cancel a promotional code or discount at any time.
        </p>
        <p>
          10.6 A promotion has no cash value and, unless it clearly says so, cannot be used together with
          another offer.
        </p>
      </>
    ),
  },
  {
    id: "dispatch-and-delivery",
    title: "Dispatch and delivery",
    body: (
      <>
        <p>11.1 We send all orders from the United Kingdom.</p>
        <p>
          11.2 We deliver to the destinations listed on the Website or offered at checkout.
        </p>
        <p>
          11.3 We offer two delivery methods, Standard delivery and Express delivery, which you choose at
          checkout. Their charges are set out in clause 10.2 and their typical delivery times in our{" "}
          <a href="/policies/shipping">Shipping &amp; Delivery Policy</a>.
        </p>
        <p>
          11.4 Delivery times are estimates, and they are counted from the day of dispatch rather than the
          day you order.
        </p>
        <p>11.5 As a general guide, you can expect delivery within these times:</p>
        <table>
          <thead>
            <tr>
              <th>Where we are delivering</th>
              <th>Usual time after dispatch</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>United Kingdom</td><td>1&ndash;3 business days</td></tr>
            <tr><td>Europe</td><td>3&ndash;7 business days</td></tr>
            <tr><td>North America</td><td>5&ndash;10 business days</td></tr>
            <tr><td>Asia &amp; Oceania</td><td>7&ndash;14 business days</td></tr>
            <tr><td>Africa &amp; South America</td><td>8&ndash;15 business days</td></tr>
          </tbody>
        </table>
        <p>
          11.6 Deliveries to Europe and elsewhere abroad may be carried by DHL, our partner carriers, local
          couriers or other logistics companies.
        </p>
        <p>
          11.7 Things we cannot control can slow a delivery down, for example customs processing, handling
          by local couriers, remote or rural addresses, incomplete delivery details, public holidays, the
          weather, transport disruption, strikes, security checks, import controls or carrier delays.
        </p>
        <p>
          11.8 Please give us a full and correct delivery address. If a delivery fails, is late or goes to
          the wrong place because the details you gave were wrong or incomplete, we are not responsible.
        </p>
        <p>11.9 After an order has been dispatched, we may not be able to change the delivery address.</p>
        <p>
          11.10 If a parcel comes back to us because the address you gave was wrong, you did not collect
          it, you refused it, or you did not complete customs or courier formalities, we may take delivery
          costs, return costs, customs charges, carrier fees and other reasonable costs out of any refund,
          unless the law forbids this.
        </p>
        <p>
          Our <a href="/policies/shipping">Shipping &amp; Delivery Policy</a> explains delivery in more
          detail.
        </p>
      </>
    ),
  },
  {
    id: "customs-and-import-charges",
    title: "Orders sent abroad: customs and import charges",
    body: (
      <>
        <p>
          12.1 Orders delivered outside the United Kingdom may have to clear customs and may attract import
          duties, import VAT, taxes, handling fees, brokerage fees, carrier fees or other local charges.
        </p>
        <p>
          12.2 Unless the checkout expressly says otherwise, you must pay every customs duty, import VAT,
          tax, brokerage fee and local charge due in the country of delivery.
        </p>
        <p>
          12.3 How long customs takes, what customs decides, any import restrictions, how local taxes are
          assessed and what authorities, couriers or customs brokers charge are all outside our control.
        </p>
        <p>
          12.4 It is up to you to make sure the goods may lawfully be imported into, and used in, your
          country or region.
        </p>
        <p>
          12.5 Except where the law says otherwise, we are not responsible for any loss, delay or cost if
          customs or local authorities delay, return, seize, reject or destroy an order because of import
          restrictions, unpaid charges, wrong information you gave, or a failure to meet local
          requirements.
        </p>
      </>
    ),
  },
  {
    id: "ownership-and-risk",
    title: "When the goods become yours",
    body: (
      <>
        <p>
          13.1 You become the owner of the goods only once we have been paid in full for them and for any
          delivery charges that apply.
        </p>
        <p>
          13.2 On a Consumer order, the goods are at your risk from the moment they are delivered to you or
          to someone you have named to receive them.
        </p>
        <p>
          13.3 On a Business Customer order, the goods are at your risk from whichever applies to the
          delivery method agreed or used: delivery to the delivery address, handover to the first carrier,
          or the goods being made available for collection.
        </p>
        <p>
          13.4 You should inspect the goods when they arrive and keep them stored safely and suitably.
        </p>
      </>
    ),
  },
  {
    id: "cancelling-as-a-consumer",
    title: "Changing your mind: the consumer right to cancel",
    body: (
      <>
        <p>
          14.1 As a Consumer you may be legally entitled to cancel an eligible online purchase within 14
          days of receiving it, without having to give a reason.
        </p>
        <p>
          14.2 The cancellation period ends 14 days after the day the goods reach you or someone you have
          named to receive them.
        </p>
        <p>
          14.3 If the order arrives in more than one parcel, the period will normally end 14 days after the
          day the final parcel reaches you.
        </p>
        <p>
          14.4 To cancel, send us a clear statement by email to {emailLink} before the cancellation period
          runs out.
        </p>
        <p>
          14.5 Once you have told us you are cancelling, send the goods back without undue delay and in any
          case within 14 days of the day you told us.
        </p>
        <p>
          14.6 Goods sent back must be unused, not installed and complete, in their original packaging where
          possible, and returned with every accessory, manual, label, piece of protective material and other
          item that came with them.
        </p>
        <p>
          14.7 You pay the cost of sending the goods back, unless they are faulty, damaged or not what you
          ordered, or we have agreed in writing to do otherwise.
        </p>
        <p>
          14.8 If the goods have lost value because they were handled more than was needed to establish
          what they are, their characteristics and how they work, we may reduce your refund to reflect that.
        </p>
        <p>
          14.9 Where the law requires it, we will refund the basic standard delivery charge you paid for the
          original delivery. Unless the law requires otherwise, we may not refund extra delivery costs,
          upgraded services, customs charges, import duties, international charges, brokerage fees or
          special delivery costs.
        </p>
        <p>14.10 Wherever we can, we will refund you using the payment method you originally used.</p>
        <p>
          Our <a href="/policies/returns">Returns &amp; Refunds Policy</a> describes the returns process
          step by step.
        </p>
      </>
    ),
  },
  {
    id: "restricted-returns",
    title: "Items with limited return rights",
    body: (
      <>
        <p>
          15.1 Some goods cannot be sent back simply because you have changed your mind. This does not
          apply where they are faulty, damaged or not what you ordered, or where the law gives you a right
          to return them.
        </p>
        <p>15.2 Goods that may be non-returnable, or returnable only on limited terms, include:</p>
        <ul>
          <li>goods produced to order;</li>
          <li>goods we ordered in specially for you;</li>
          <li>goods cut to length or size, such as cable or similar materials;</li>
          <li>goods that have been customised, modified, assembled or altered;</li>
          <li>electrical goods that have been installed, wired, connected, tested, commissioned or used;</li>
          <li>goods damaged after they were delivered;</li>
          <li>goods returned without parts, accessories, packaging, manuals, labels, seals or protective materials;</li>
          <li>goods no longer in a condition in which they can be resold;</li>
          <li>goods affected by poor storage, moisture, heat, impact, contamination, misuse or unauthorised handling;</li>
          <li>clearance, final sale or discontinued lines, where the return restriction is clearly stated and lawful.</li>
        </ul>
        <p>
          15.3 Nothing in this section restricts your legal rights if goods are faulty, do not match their
          description, are unsafe or in some other way do not comply with the law.
        </p>
      </>
    ),
  },
  {
    id: "faulty-or-incorrect-goods",
    title: "Goods that arrive damaged, faulty or wrong",
    body: (
      <>
        <p>
          16.1 If what you receive is damaged, faulty, incomplete or not what you ordered, please email us
          at {emailLink} as soon as you can.
        </p>
        <p>
          16.2 Include your order number, an explanation of the problem and, where you reasonably can,
          clear photographs or video of the goods, packaging, labels, damage or defect.
        </p>
        <p>
          16.3 Hold on to the product, its packaging, labels and delivery materials until we have looked
          into the problem, because we may need them for a claim against the carrier, an inspection by the
          supplier or a warranty assessment.
        </p>
        <p>
          16.4 Where damage from delivery is visible, please let us know within 48 hours of delivery if you
          can. This helps us look into courier problems quickly; it does not take away any legal right you
          cannot lose.
        </p>
        <p>
          16.5 If we confirm that goods are faulty, were damaged before delivery, are incorrect or otherwise
          do not conform to the contract, we may offer a repair, a replacement, a full or partial refund, or
          another remedy, in line with the applicable law.
        </p>
        <p>
          16.6 Before we approve a refund, replacement or warranty remedy, we may ask you to send the goods
          back for inspection.
        </p>
        <p>
          16.7 Once goods are confirmed as faulty, damaged or incorrect, we will either pay reasonable return
          postage or tell you how to send them back.
        </p>
        <p>
          16.8 We are not responsible for a fault or damage that results from misuse, incorrect
          installation, overloading, external damage, unauthorised modification, an unsuitable environment, poor
          storage, work done by someone else, ignoring the instructions, power surges, wear and tear, or
          using the product for something it was not intended for.
        </p>
      </>
    ),
  },
  {
    id: "statutory-rights",
    title: "Your rights under consumer law",
    body: (
      <>
        <p>
          17.1 Consumer protection law may give Consumers rights when goods are faulty, differ from their
          description, are unfit for their purpose, are unsafe or otherwise do not conform to the contract.
        </p>
        <p>
          17.2 Consumers in the EU may benefit from a legal guarantee of at least 2 years from the date the
          goods are received. It covers defects or lack of conformity that were present at delivery and come
          to light during that legal guarantee period.
        </p>
        <p>
          17.3 Consumers in the UK have statutory rights under the applicable UK consumer legislation, which
          can include remedies where goods are faulty, do not match their description or are unfit for their purpose.
        </p>
        <p>
          17.4 These statutory rights stand on their own. No manufacturer warranty, commercial warranty,
          Additional Warranty or returns policy offered by Solvetashop limits them.
        </p>
        <p>
          17.5 Business Customers do not have the statutory cancellation rights that Consumers have, and
          their rights may be narrower than a Consumer&rsquo;s, except where mandatory law says otherwise.
        </p>
      </>
    ),
  },
  {
    id: "additional-warranty",
    title: "Additional Warranty cover",
    body: (
      <>
        <p>18.1 On selected products we may offer paid Additional Warranty options.</p>
        <p>
          18.2 Additional Warranty is not compulsory. Where it is offered, you can add it at checkout.
        </p>
        <p>
          18.3 Unless the product page or checkout states a different price, Additional Warranty costs:
        </p>
        <table>
          <thead>
            <tr>
              <th>Extra cover</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>+1 Year Additional Warranty</td><td>10% of the product price, minimum &euro;6.99 / &pound;6.99 / $6.99</td></tr>
            <tr><td>+2 Year Additional Warranty</td><td>16% of the product price, minimum &euro;9.99 / &pound;9.99 / $9.99</td></tr>
            <tr><td>+3 Year Additional Warranty</td><td>22% of the product price, minimum &euro;12.99 / &pound;12.99 / $12.99</td></tr>
          </tbody>
        </table>
        <p>
          18.4 The percentage is applied to the product price alone, leaving out delivery charges, customs
          duties, import taxes, brokerage fees and other local charges.
        </p>
        <p>
          18.5 This cover is a commercial warranty that sits on top of your statutory rights. It
          does not replace, reduce or restrict any legal right you cannot lose.
        </p>
        <p>
          18.6 Unless we say otherwise, Additional Warranty cover starts when the product&rsquo;s original
          warranty, legal guarantee, manufacturer warranty or standard warranty period, whichever applies,
          comes to an end.
        </p>
        <p>
          18.7 It covers eligible manufacturing and material defects that appear while the product is being
          used normally, in line with the manufacturer&rsquo;s instructions and the relevant technical
          requirements.
        </p>
        <p>18.8 Additional Warranty does not extend to:</p>
        <ul>
          <li>wiring, connection, installation, testing or commissioning that was done incorrectly;</li>
          <li>fitting by an unqualified or unauthorised person in cases where a professional installer is required or appropriate;</li>
          <li>misuse, neglect, abuse, overloading or running the product outside its rated specification;</li>
          <li>unauthorised repairs, modifications, opening, dismantling or alterations;</li>
          <li>accidental, impact, water, moisture, fire or other external damage;</li>
          <li>damage from power surges, an unstable power supply, the wrong voltage, lightning, or electrical faults elsewhere in the installation;</li>
          <li>ordinary wear and tear;</li>
          <li>cosmetic damage that leaves the product working;</li>
          <li>bulbs, batteries, fuses, seals, connectors, accessories and other consumable parts or parts expected to wear out (unless we expressly cover them);</li>
          <li>defects resulting from unsuitable transport, storage, surroundings, temperatures, humidity, dust, chemicals, contamination or corrosion;</li>
          <li>products used for something other than the purpose the manufacturer states;</li>
          <li>lost profits, labour or electrician costs, removal or reinstallation costs, downtime or indirect losses.</li>
        </ul>
        <p>
          18.9 To claim under Additional Warranty, email {emailLink} with your order number, proof of
          purchase and a description of the defect, plus supporting photos, video or diagnostic information
          if we reasonably ask for them.
        </p>
        <p>
          18.10 Before we approve any warranty remedy, we may ask for the product to be sent back for
          inspection.
        </p>
        <p>
          18.11 If we accept a valid Additional Warranty claim, we may, depending on the product and the
          circumstances, repair it, replace it, replace it with an equivalent, give a partial refund or
          provide another reasonable remedy.
        </p>
        <p>
          18.12 Additional Warranty is tied to the product and the order it was bought with. It cannot be
          passed to someone else without our express written agreement.
        </p>
        <p>
          18.13 If you lawfully cancel or return a product before its Additional Warranty has started, we
          will also refund the Additional Warranty you bought for it, where the law requires this.
        </p>
        <p>
          Full details are in our <a href="/policies/warranty">Warranty Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "business-customers",
    title: "Extra terms for Business Customers",
    body: (
      <>
        <p>
          19.1 Before ordering, a Business Customer must check every product specification and confirm
          suitability, compatibility, compliance and installation requirements and any local regulatory
          duties.
        </p>
        <p>
          19.2 Unless we agree otherwise in writing, a Business Customer has no general right to cancel or
          return goods that are not faulty, including because of a change of mind, an ordering mistake,
          surplus stock, an unsuitable specification or changes to the customer&rsquo;s project.
        </p>
        <p>
          19.3 Whether we accept a return from a Business Customer is for us to decide. Any accepted return
          may be subject to inspection, a restocking fee, return carriage costs and a deduction for any loss
          in resale value.
        </p>
        <p>
          19.4 Business Customers must check goods promptly when they arrive and tell us about visible
          damage, shortfalls, wrong items or delivery problems as soon as is reasonably possible.
        </p>
        <p>
          19.5 So far as the law allows, the most we will be liable for to a Business Customer on any order
          is the price paid for the goods the claim relates to.
        </p>
        <p>
          19.6 We are not liable to Business Customers for lost profit, revenue, contracts, business
          opportunities, goodwill or data, for labour, installation, removal or reinstallation costs, for
          downtime or project delays, or for any indirect or consequential loss.
        </p>
      </>
    ),
  },
  {
    id: "local-compliance",
    title: "Local rules and product compliance",
    body: (
      <>
        <p>
          20.1 A product we sell may have been designed for a particular market, standard, voltage system,
          type of fitting or installation environment.
        </p>
        <p>
          20.2 You must check whether it is suitable, and lawful, to install, resell, import or use a product
          in your country, region, property, project or electrical system.
        </p>
        <p>
          20.3 Beyond what the product page expressly states, we do not promise that a product will satisfy
          every local building code, electrical code, certification rule, insurance condition, workplace
          rule or project specification.
        </p>
        <p>
          20.4 Business Customers, installers, contractors, resellers and professional buyers must obtain
          every permit, approval, inspection, certification and professional sign-off needed for their use,
          installation, resale or project.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Who owns the website content",
    body: (
      <>
        <p>
          21.1 The text, logos, branding, layout, photographs, product descriptions, icons, graphics, videos,
          design elements and all other material on the Website belong to Solvetashop, {COMPANY.legalName},
          or to our suppliers, manufacturers, licensors or other rights holders.
        </p>
        <p>
          21.2 The Website is made available to you for personal, business or purchasing purposes only,
          and only on these Terms.
        </p>
        <p>
          21.3 Without our written permission given in advance, no Website content may be copied,
          reproduced, scraped, extracted, modified, published, distributed, sold or otherwise exploited
          commercially.
        </p>
        <p>
          21.4 Buying a product does not give you any intellectual property rights in the product, its
          brand, design, software, documentation or related materials. The only right you get is to use what
          you bought lawfully and as intended.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use of the website",
    body: (
      <>
        <p>22.1 The Website must not be misused.</p>
        <p>22.2 In particular, you must not:</p>
        <ul>
          <li>try to get unauthorised access to the Website or to its servers, systems, accounts or data;</li>
          <li>interfere with how the Website works, its security or its availability;</li>
          <li>run bots, scrapers, crawlers, automated tools or other data-extraction methods without our permission;</li>
          <li>upload viruses, malicious code or any other harmful material;</li>
          <li>place orders that are fraudulent, false, abusive or speculative;</li>
          <li>pretend to be someone else, whether an individual or a business;</li>
          <li>put the Website to any unlawful, harmful, misleading or prohibited use;</li>
          <li>try to get around geographic, payment, security, fraud-prevention or sanctions controls.</li>
        </ul>
        <p>
          22.3 If we suspect misuse, fraud, a security risk, a breach of these Terms or unlawful activity, we
          may restrict, suspend or end your access to the Website.
        </p>
      </>
    ),
  },
  {
    id: "sanctions-and-export",
    title: "Sanctions, export controls and restricted destinations",
    body: (
      <>
        <p>
          23.1 Where sanctions, export controls, payment processor rules, financial crime controls, courier
          or customs restrictions, or other legal obligations require it or make it appropriate, we may
          refuse, cancel, suspend or block an order.
        </p>
        <p>
          23.2 We may check orders, customers, billing and delivery details, payment information and
          destinations against applicable sanctions, restricted-party, fraud-prevention and compliance
          requirements.
        </p>
        <p>
          23.3 We will not take an order if accepting it would breach applicable law, sanctions, export
          controls, carrier rules, payment processor requirements or our internal compliance controls.
        </p>
        <p>
          23.4 By ordering, you confirm that you are not a sanctioned person, are not in a restricted
          territory, and are not buying goods to export, resell, transfer or use in breach of any applicable
          sanctions, export controls or laws.
        </p>
        <p>
          23.5 We are not liable for any loss, delay, cancellation or blocked transaction that results from
          sanctions, export controls, customs restrictions, payment processor rules or legal compliance
          requirements.
        </p>
      </>
    ),
  },
  {
    id: "personal-data-and-cookies",
    title: "Personal data and cookies",
    body: (
      <>
        <p>
          24.1 We handle personal data as described in our <a href="/policies/privacy">Privacy Notice</a>.
        </p>
        <p>
          24.2 Our use of cookies and similar technologies on the Website is explained in our{" "}
          <a href="/policies/cookies">Cookie Notice</a>.
        </p>
        <p>
          24.3 When you use the Website, you acknowledge that we may process your personal data to fulfil
          orders, take payments, arrange delivery, provide customer support, prevent fraud, meet our legal
          obligations, manage accounts, carry out analytics and improve our service.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limits on our liability",
    body: (
      <>
        <p>
          25.1 These Terms do not exclude or limit any liability that it would be unlawful to exclude or
          limit, including liability for death or personal injury resulting from negligence, for fraud or
          fraudulent misrepresentation, or any other liability that applicable law does not allow us to
          exclude.
        </p>
        <p>25.2 These Terms do not restrict the mandatory statutory rights you have as a Consumer.</p>
        <p>25.3 Subject to clauses 25.1 and 25.2, we are not liable for:</p>
        <ul>
          <li>losses that are indirect, incidental, special, consequential or punitive;</li>
          <li>lost profit, revenue, business, opportunities, contracts, goodwill or anticipated savings;</li>
          <li>lost data or interruption to systems;</li>
          <li>costs of labour, installation, removal, reinstallation, testing, inspection, certification or contractors;</li>
          <li>project delays, operational downtime or interruption to business;</li>
          <li>losses arising from choosing the wrong product, installing it incorrectly, misuse, overloading, unauthorised modification or not following instructions;</li>
          <li>losses arising from events we cannot reasonably control.</li>
        </ul>
        <p>
          25.4 Products have to be chosen, installed and used properly. We are not responsible for what
          follows from incorrect or unsafe installation, or from use that goes against the
          manufacturer&rsquo;s instructions or applicable regulations.
        </p>
        <p>
          25.5 If you are a Business Customer, then to the fullest extent the law allows, the most we
          will have to pay in relation to any order is capped at the amount paid for the goods the claim
          relates to.
        </p>
      </>
    ),
  },
  {
    id: "events-beyond-our-control",
    title: "Events beyond our control",
    body: (
      <>
        <p>
          26.1 If something outside our reasonable control stops or delays us from doing what we have
          agreed to do, we are not responsible for that failure or delay.
        </p>
        <p>
          26.2 Examples include disruption to supply chains, delays by manufacturers, transport disruption,
          courier failures, customs delays, strikes and other labour disputes, severe weather, fire, flood,
          other natural disasters, civil unrest, terrorism, war, epidemics and pandemics, government action,
          changes in regulation, sanctions, power cuts, internet outages, technical failures and any other
          circumstance beyond our reasonable control.
        </p>
        <p>
          26.3 If your order is affected, we will take reasonable steps to keep the disruption to a minimum
          and, where appropriate, may contact you with an update.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to the website and to these terms",
    body: (
      <>
        <p>
          27.1 From time to time we may make changes to the Website, our range, our prices, our delivery
          options, our policies and these Terms.
        </p>
        <p>
          27.2 Your order is governed by the version of these Terms that was in force when you placed it,
          except where the law demands a change or a correction has to be applied.
        </p>
        <p>
          27.3 If you carry on using the Website after we publish revised Terms, you accept the revised
          Terms for your future use of the Website and for future orders.
        </p>
      </>
    ),
  },
  {
    id: "other-legal-points",
    title: "Other legal points",
    body: (
      <>
        <h3>If part of these Terms is invalid</h3>
        <p>
          28.1 If any part of these Terms turns out to be invalid, unlawful or unenforceable, we will treat
          that part as deleted, or as changed only as far as is needed to make it valid.
        </p>
        <p>28.2 Everything else in these Terms will remain fully in force.</p>
        <h3>Transferring the agreement</h3>
        <p>
          28.3 We may transfer, assign or subcontract what we are entitled and obliged to do under these
          Terms, or deal with it in another way, as long as your rights as a Consumer are not materially
          reduced as a result.
        </p>
        <p>
          28.4 You need our written consent, given in advance, before passing on any of your rights or
          obligations under these Terms, unless the law requires otherwise.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Which law applies and where disputes are heard",
    body: (
      <>
        <p>29.1 The laws of England and Wales govern these Terms.</p>
        <p>
          29.2 As a Consumer, you may also have the benefit of any mandatory consumer protection rights
          given by the law of the country where you live.
        </p>
        <p>
          29.3 A Consumer who lives in the United Kingdom may bring a dispute before the courts of England
          and Wales or before any other UK court with jurisdiction under applicable law.
        </p>
        <p>
          29.4 A Consumer who lives in the European Union, or anywhere else that mandatory local consumer
          rights apply, may rely on those rights; nothing in these Terms prevents this.
        </p>
        <p>
          29.5 Where the buyer is a Business Customer, only the courts of England and Wales may decide a
          dispute that arises from, or relates to, these Terms, the Website or any order.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Getting in touch",
    body: (
      <>
        <p>
          Questions about these Terms, an order, delivery, a return, a warranty or anything else are
          welcome. You can reach us using the details below.
        </p>
        <ContactBlock />
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms of Sale"
      lastUpdated="12 October 2026"
      summary="The rules that apply when you use www.solvetashop.com and buy from us: how orders, prices, payment, delivery, cancellations, warranties and liability work."
      intro={
        <>
          <p>
            These Terms of Sale (the &ldquo;Terms&rdquo;) apply to your use of www.solvetashop.com (the
            &ldquo;Website&rdquo;) and of any related page, service, order, purchase, communication or
            transaction run under the Solvetashop name. The Website is run by:
          </p>
          <ContactBlock />
          <p>
            Throughout these Terms, &ldquo;Solvetashop&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
            &ldquo;our&rdquo; refer to {COMPANY.legalName}. &ldquo;Customer&rdquo;, &ldquo;you&rdquo; and
            &ldquo;your&rdquo; refer to anyone, whether an individual or a business, who visits the Website,
            places an order, buys goods or otherwise uses our services.
          </p>
          <p>
            Please take the time to read these Terms before you order. You agree to be bound by them when
            you use the Website, open an account, submit an order or buy goods from Solvetashop.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
