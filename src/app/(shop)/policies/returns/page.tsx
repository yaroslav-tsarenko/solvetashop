import type { Metadata } from "next";
import { PolicyLayout, ContactBlock, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Returns & Refunds Policy" };

const sections: PolicySection[] = [
  {
    id: "what-this-covers",
    title: "What this policy covers",
    body: (
      <>
        <p>1.1 The rules below govern physical items bought from Solvetashop.</p>
        <p>
          1.2 Our range is made up of lighting, lamps, light fittings, light bulbs, home décor and related
          electrical and lighting accessories.
        </p>
        <p>
          1.3 Some of these items are electrical and can affect safety once fitted. For that reason, whether
          an item can come back to us turns on what kind of item it is, the state it is in, whether its
          packaging is intact, whether it has been fitted or put to use, and whether you bought as a Consumer
          or as a Business Customer.
        </p>
        <p>
          1.4 Consumers and Business Customers are both covered, although certain rights described here are
          available to Consumers only.
        </p>
      </>
    ),
  },
  {
    id: "consumers-and-business-buyers",
    title: "Consumers and business buyers",
    body: (
      <>
        <p>
          2.1 You are a &ldquo;Consumer&rdquo; if you are an individual buying wholly or mainly for your own
          personal purposes, rather than for a trade, business, craft or profession.
        </p>
        <p>
          2.2 You are a &ldquo;Business Customer&rdquo; if you buy for trade, commercial, installation,
          resale, professional or business purposes &mdash; for example as a company, sole trader,
          contractor, electrician, installer, reseller, organisation, public body or other professional
          purchaser.
        </p>
        <p>2.3 The cancellation rights given by consumer law are available to Consumers alone.</p>
        <p>
          2.4 Unless we have agreed something different in writing, a Business Customer has no general
          entitlement to send back goods that are not faulty simply because of a change of mind, an ordering
          error, surplus stock, a change to the project, a specification that turns out to be unsuitable, or
          any other mistake on the customer&rsquo;s side.
        </p>
      </>
    ),
  },
  {
    id: "before-dispatch",
    title: "Stopping an order before it ships",
    body: (
      <>
        <p>3.1 Until your order leaves us, you can ask us to cancel it.</p>
        <p>
          3.2 Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> quoting your order number, and
          do so as early as you can.
        </p>
        <p>
          3.3 We will try in good faith to stop the order, but we cannot promise to do so once it has been
          processed, packed, passed to the carrier, specially ordered, prepared, cut, customised or
          dispatched.
        </p>
        <p>
          3.4 Where we confirm the cancellation before dispatch, you will get back what you paid for the
          cancelled items together with any delivery charge you paid on that order.
        </p>
        <p>
          3.5 An order that has already left us can no longer be cancelled ahead of delivery, but you may
          still be able to return it as a Consumer under the rest of this policy.
        </p>
      </>
    ),
  },
  {
    id: "fourteen-day-right",
    title: "Your 14-day right to cancel after delivery",
    body: (
      <>
        <p>
          4.1 As a Consumer, you may be legally entitled to cancel an eligible online purchase within 14 days
          of receiving it, and you do not have to explain why.
        </p>
        <p>
          4.2 That period runs out 14 days after the day the goods reach you or someone you have nominated to
          receive them.
        </p>
        <p>
          4.3 Where an order arrives in more than one parcel, the 14 days will normally be counted from the
          day the last parcel reaches you.
        </p>
        <p>
          4.4 To cancel, send us a clear statement by email to{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> before the period has run out.
        </p>
        <p>4.5 Please put the following in your email:</p>
        <ul>
          <li>your full name;</li>
          <li>the order number;</li>
          <li>the address the goods were delivered to;</li>
          <li>the product name or SKU;</li>
          <li>a statement that you want to cancel or send back the item concerned.</li>
        </ul>
        <p>
          4.6 Once you have told us you are cancelling, send the goods back without undue delay, and in any
          event within 14 days of the day you told us.
        </p>
        <p>
          4.7 The cost of sending the goods back falls on you, unless they are faulty, damaged or not what you
          ordered, or we have agreed in writing to something else.
        </p>
      </>
    ),
  },
  {
    id: "condition-of-returns",
    title: "The state returned items must be in",
    body: (
      <>
        <p>5.1 Please look after anything you intend to send back.</p>
        <p>5.2 Except where an item is faulty, damaged or incorrect, it must come back to us:</p>
        <ul>
          <li>without having been used;</li>
          <li>without having been fitted or installed;</li>
          <li>without having been wired up or connected;</li>
          <li>without having been tested, commissioned or built into any electrical circuit or system;</li>
          <li>with every part, accessory, manual, label, seal and piece of protective material;</li>
          <li>in its original packaging wherever possible;</li>
          <li>fit to be sold again.</li>
        </ul>
        <p>
          5.3 You are free to examine the goods in the way you could in a shop. Beyond what you need to do to
          establish their nature, characteristics and how they work, you must not fit, wire, connect, use,
          alter, damage or otherwise handle them.
        </p>
        <p>
          5.4 If the goods have lost value because they were handled more than was necessary &mdash; for
          instance through fitting, use, missing packaging or accessories, damage, contamination or a lower
          resale value &mdash; we may deduct that loss from your refund.
        </p>
      </>
    ),
  },
  {
    id: "restricted-items",
    title: "Items we cannot take back",
    body: (
      <>
        <p>
          6.1 Some goods cannot be returned just because you have changed your mind. This does not apply where
          they are faulty, damaged or incorrect, or where the law gives you a right to return them.
        </p>
        <p>6.2 Goods that may be excluded or limited in this way include:</p>
        <ul>
          <li>items made to order;</li>
          <li>items we ordered in specially for you;</li>
          <li>items cut to length or size, such as cable or similar materials;</li>
          <li>items that have been customised, modified, assembled or otherwise altered;</li>
          <li>
            lamps, light fittings or other electrical items that have been fitted, wired, connected, tested,
            commissioned or used;
          </li>
          <li>items damaged after they were delivered;</li>
          <li>
            items returned without some of their parts, accessories, manuals, packaging, labels, seals or
            protective materials;
          </li>
          <li>
            items affected by poor storage, damp, heat, knocks, contamination, dust, chemicals, corrosion,
            misuse or unauthorised handling;
          </li>
          <li>items that can no longer be resold;</li>
          <li>
            clearance, final-sale, discontinued or special-order lines, where the restriction is made clear
            to you and is lawful.
          </li>
        </ul>
        <p>
          6.3 None of this section restricts your legal rights in respect of goods that are faulty, not as
          described, unsafe or otherwise fail to comply with the law.
        </p>
      </>
    ),
  },
  {
    id: "electrical-safety",
    title: "Lamps, light fittings and electrical safety",
    body: (
      <>
        <p>
          7.1 Lamps, light fittings and other electrical items can become dangerous if the wrong product is
          chosen, or if it is fitted, wired, connected, altered, overloaded or used incorrectly.
        </p>
        <p>
          7.2 It is up to you, before you buy, to make sure the item suits what you have in mind &mdash;
          including its voltage, current, load, wattage, IP rating, dimensions, cable type, compatibility,
          the environment it will be fitted in, and any local regulations.
        </p>
        <p>
          7.3 Where a product has to be installed, wired, connected, tested, commissioned or integrated into
          an electrical system, the work should be carried out only by a qualified electrician or other
          competent person whenever that is required or sensible.
        </p>
        <p>
          7.4 An item that has been fitted, wired, connected, altered, commissioned or used may not qualify
          for return unless it is faulty or incorrect, or your mandatory legal rights otherwise cover it.
        </p>
        <p>
          7.5 If an item comes back in a state that means it cannot safely be resold or properly inspected,
          we may decline the refund or pay a reduced amount.
        </p>
      </>
    ),
  },
  {
    id: "faulty-damaged-incorrect",
    title: "Faulty, damaged or wrong items",
    body: (
      <>
        <p>
          8.1 Should anything arrive faulty, damaged, incomplete or different from what you ordered, let us
          know promptly at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <p>8.2 Your message should contain:</p>
        <ul>
          <li>the order number;</li>
          <li>a clear explanation of what is wrong;</li>
          <li>photographs or video of the item;</li>
          <li>photographs of the packaging and the shipping label;</li>
          <li>any relevant product labels, serial numbers or manufacturer markings.</li>
        </ul>
        <p>
          8.3 If damage from transit is visible, please tell us within 48 hours of delivery if you can. Doing
          so lets us take the matter up with the courier quickly; it does not take away any mandatory legal
          rights you have.
        </p>
        <p>
          8.4 Hold on to the item, its packaging, labels, manuals, accessories and the delivery materials
          until we have finished looking into the problem.
        </p>
        <p>
          8.5 Before we agree to a refund, replacement, repair or any other remedy, we may ask for the goods to
          be sent back or inspected.
        </p>
        <p>
          8.6 Once we have confirmed that the goods are faulty, were damaged before delivery, are incorrect or
          otherwise do not conform to the contract, we may offer a repair, a replacement, a full or partial
          refund, or another remedy permitted by law.
        </p>
        <p>
          8.7 In those confirmed cases we will either pay reasonable return postage or send you instructions
          for the return.
        </p>
        <p>
          8.8 We are not liable for faults or damage resulting from incorrect installation, choosing an
          unsuitable product, misuse, overloading, unauthorised alteration, external damage, poor storage, an
          unsuitable environment, work carried out by third parties, power surges, wear and tear, not
          following the manufacturer&rsquo;s instructions, or using the item for something it was not
          designed for.
        </p>
      </>
    ),
  },
  {
    id: "how-to-return",
    title: "How to send something back",
    body: (
      <>
        <p>
          9.1 Always get in touch with us before you post anything back. To begin a return, email{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <p>9.2 Tell us:</p>
        <ul>
          <li>the order number;</li>
          <li>the product name or SKU;</li>
          <li>why you are returning it;</li>
          <li>photographs or video if the item is damaged, faulty, incorrect or incomplete;</li>
          <li>whether the item has been opened, fitted, connected, tested or used.</li>
        </ul>
        <p>9.3 Where we accept the return, or need to inspect the item, we will send you return instructions.</p>
        <p>
          9.4 Where and how the item should be sent can differ according to the product, the supplier, the
          courier, the destination or the kind of problem involved.
        </p>
        <p>9.5 Pack everything securely so that it is protected on the way back to us.</p>
        <p>
          9.6 If an item is damaged in transit because it was poorly packed, we may lower or decline the
          refund where the law allows.
        </p>
        <p>
          9.7 Items sent back without contacting us first, without the information we need, without following
          our instructions, or to the wrong address may be held up, refused or sent back to you.
        </p>
        <p>
          9.8 We cannot accept responsibility for items posted to the wrong address, or sent without enough
          tracking, identification or order details.
        </p>
        <p>
          9.9 If we are unable to match a returned item to an order or a customer, we may not be able to
          process the return.
        </p>
      </>
    ),
  },
  {
    id: "return-postage",
    title: "Who pays for return postage",
    body: (
      <>
        <p>
          10.1 When you return something because you have changed your mind, you pay the postage, unless we
          agree otherwise in writing.
        </p>
        <p>
          10.2 When goods are faulty, damaged or incorrect, Solvetashop will pay reasonable return postage
          once the problem is confirmed or where we have given you return instructions.
        </p>
        <p>
          10.3 We may not be able to reimburse postage if, without first agreeing it with us, you choose a
          premium, express, oversized, international or otherwise unapproved return service.
        </p>
        <p>
          10.4 We suggest a tracked and insured service. The goods remain your responsibility until they reach
          us or the return location we have nominated.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "When and how refunds are paid",
    body: (
      <>
        <p>
          11.1 After the goods are back with us and have been inspected, we will let you know whether your
          refund has been approved.
        </p>
        <p>11.2 Approved refunds go back to the payment method you originally used, wherever that is possible.</p>
        <p>
          11.3 Where a Consumer has cancelled, any refund owed will be paid within the period the law
          requires.
        </p>
        <p>
          11.4 Where the law permits, we may hold back the refund until either the goods reach us or you show
          us evidence of having sent them, whichever happens sooner.
        </p>
        <p>
          11.5 Once we have issued a refund, your bank, card issuer or payment provider may need further time
          before the money is available to you.
        </p>
        <p>
          11.6 As a rule we cannot pay a refund to a different card, account, person or payment method.
        </p>
      </>
    ),
  },
  {
    id: "delivery-charges-and-duties",
    title: "Delivery charges, duties and refunds",
    body: (
      <>
        <p>
          12.1 If a Consumer validly cancels an eligible order under their statutory right to cancel, we will
          refund the price of the goods and, where the law requires it, the standard basic charge paid for
          the original delivery.
        </p>
        <p>
          12.2 If you picked a delivery option that costs more than the cheapest standard option we offered,
          we do not have to refund the extra cost.
        </p>
        <p>
          12.3 Unless we agree otherwise or the law says we must, delivery charges may not be refunded for
          returns by Business Customers, returns we accept at our discretion, failed or refused
          deliveries, deliveries to an incorrect address, parcels that are not collected, or returns of goods
          that are not faulty.
        </p>
        <p>
          12.4 Solvetashop does not charge, and cannot refund, customs duties, import VAT, brokerage fees,
          courier handling fees, local taxes, customs clearance fees or any other local charges.
        </p>
      </>
    ),
  },
  {
    id: "international-returns",
    title: "Returns from outside the UK",
    body: (
      <>
        <p>
          13.1 If you are returning goods from abroad, it is up to you to make sure they are correctly packed,
          labelled, declared and sent in line with the courier&rsquo;s and customs&rsquo; requirements.
        </p>
        <p>13.2 Any customs declaration needed for the return is your responsibility.</p>
        <p>
          13.3 We may be unable to refund you if the return is held up, refused, seized, abandoned or sent back
          because of wrong customs paperwork, unpaid charges, prohibited goods, or a failure to follow our
          return instructions.
        </p>
        <p>
          13.4 On an international return made because you changed your mind, you bear the return postage,
          customs charges, taxes, brokerage fees and associated costs, unless the goods are faulty, damaged or
          incorrect, or we agree otherwise in writing.
        </p>
        <p>
          13.5 Where the law allows, we may deduct from your refund any customs or courier charges that
          Solvetashop has to pay as a result of an international return.
        </p>
      </>
    ),
  },
  {
    id: "address-and-undelivered-parcels",
    title: "Address errors, refused and uncollected parcels",
    body: (
      <>
        <h3>Your address details</h3>
        <p>
          14.1 When you check out, you must give us full and correct billing and delivery details.
        </p>
        <p>
          14.2 Solvetashop is not responsible for delays, failed deliveries, lost parcels, return charges or
          extra costs that result from address details you gave us being wrong, incomplete, out of date or
          badly formatted.
        </p>
        <p>
          14.3 If an order comes back to us because the address was wrong, incomplete or inaccessible, or the
          parcel was refused or not collected, we may take the original shipping cost, return shipping cost,
          courier charges, customs charges, storage fees and other reasonable costs out of any refund, unless
          the law prevents this.
        </p>
        <p>
          14.4 Should you ask us to send the order out again after a delivery failed through a customer
          error, further shipping charges may be payable.
        </p>
        <h3>Refused or uncollected parcels</h3>
        <p>
          14.5 If you refuse a delivery, do not accept it, do not pay customs or import charges, or do not
          collect the parcel from the courier within the time allowed, the courier may return it to us, hold
          it, treat it as abandoned or dispose of it.
        </p>
        <p>
          14.6 Where such a parcel comes back to us, we may deduct from your refund the original shipping
          cost, return shipping cost, courier charges, customs charges, storage fees, handling charges and
          any other reasonable costs, unless the law prevents this.
        </p>
        <p>
          14.7 Refusing a parcel does not by itself cancel any customs charges, courier fees or local charges
          that may already have been raised.
        </p>
        <p>
          14.8 If you are a Consumer refusing delivery in order to exercise your legal right to cancel, we
          will deal with your refund under this policy and the law.
        </p>
      </>
    ),
  },
  {
    id: "business-customer-returns",
    title: "Returns by business customers",
    body: (
      <>
        <p>
          15.1 A Business Customer has no general right to cancel an order or return goods that are not
          faulty because of a change of mind, a change to their project, an ordering error, surplus stock, an
          unsuitable specification, or because the goods are no longer needed.
        </p>
        <p>15.2 Whether we accept a return of non-faulty goods from a Business Customer is for Solvetashop to decide.</p>
        <p>15.3 If we do agree, we may attach conditions, such as:</p>
        <ul>
          <li>our approval in writing beforehand;</li>
          <li>the goods coming back within a set period;</li>
          <li>the goods being unused, not installed, complete and fit for resale;</li>
          <li>the original packaging and accessories being included;</li>
          <li>the customer paying for return postage;</li>
          <li>a deduction for any loss in value;</li>
          <li>a restocking or handling fee, where it is reasonable and either agreed or permitted.</li>
        </ul>
        <p>
          15.4 Business Customers must check goods promptly on arrival and tell us as soon as reasonably
          possible about any visible damage, shortfall, wrong items or delivery problem.
        </p>
        <p>
          15.5 Where we approve a refund for a Business Customer, we may provide it as a refund, a
          replacement, a credit to the account, or another remedy agreed by Solvetashop.
        </p>
      </>
    ),
  },
  {
    id: "exchanges",
    title: "Exchanges and replacements",
    body: (
      <>
        <p>
          16.1 Replacements or exchanges may be offered for faulty, damaged or incorrect goods, or where we
          choose to agree to an exchange.
        </p>
        <p>16.2 Any exchange depends on the item being in stock.</p>
        <p>
          16.3 If no replacement is available, we may offer a refund, a partial refund, a comparable
          alternative or another suitable remedy.
        </p>
        <p>
          16.4 If you are exchanging an item because you changed your mind, you may have to pay for the return
          postage and any further delivery costs.
        </p>
      </>
    ),
  },
  {
    id: "warranty-claims",
    title: "Warranty claims",
    body: (
      <>
        <p>
          17.1 This policy deals with returns, refunds and cancellations. A warranty claim may in addition be
          governed by our <a href="/policies/warranty">Warranty Policy</a>, any terms specific to the product,
          the manufacturer&rsquo;s warranty conditions, and any paid Additional Warranty bought at checkout.
        </p>
        <p>17.2 An Additional Warranty sits alongside your statutory rights; it does not replace or cut them down.</p>
        <p>
          17.3 To assess a warranty claim we may need proof of purchase, photographs, video, diagnostic
          details, an inspection or the return of the product.
        </p>
        <p>
          17.4 Unless expressly stated otherwise, warranty cover does not usually extend to incorrect
          installation, misuse, overloading, unauthorised alteration, power surges, external damage, an
          unsuitable environment, wear and tear, consumable parts, labour, electricians&rsquo; fees, the cost
          of removal or refitting, or project delays.
        </p>
        <p>
          17.5 If a warranty claim is accepted, the remedy may be a repair, a replacement, an equivalent
          replacement, a partial or full refund, or some other reasonable remedy, depending on the
          circumstances and the law.
        </p>
      </>
    ),
  },
  {
    id: "payment-disputes",
    title: "Payment disputes and chargebacks",
    body: (
      <>
        <p>
          18.1 If something has gone wrong with an order, delivery, return, refund or warranty claim, please
          speak to us first so that we can look into it and try to put it right.
        </p>
        <p>
          18.2 Should you raise a chargeback or payment dispute, we may have to pass information about the
          order, delivery, our correspondence, the return, tracking, refunds and fraud prevention to our
          payment provider, the bank, the card network or a dispute resolution provider.
        </p>
        <p>
          18.3 We may challenge a chargeback or payment dispute where we believe the order was correctly
          fulfilled or the claim is inaccurate, fraudulent, abusive or unsupported.
        </p>
      </>
    ),
  },
  {
    id: "statutory-rights",
    title: "Your statutory rights",
    body: (
      <>
        <p>19.1 Your mandatory legal rights are not limited by anything in this policy.</p>
        <p>
          19.2 Where goods are faulty, not as described, not fit for purpose, unsafe or otherwise not in line
          with the contract, Consumers may have rights under statute.
        </p>
        <p>19.3 Consumers in the EU may hold legal guarantee rights under the consumer law that applies to them.</p>
        <p>19.4 Consumers in the UK may hold rights under the applicable UK consumer legislation.</p>
        <p>
          19.5 Those rights stand apart from any manufacturer&rsquo;s warranty, commercial warranty, Additional
          Warranty or voluntary return arrangement.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    title: "Updates to this policy",
    body: (
      <>
        <p>
          20.1 From time to time we may revise this Returns &amp; Refunds Policy to reflect changes to our
          products, how we operate, courier arrangements, legal or payment provider requirements, warranty
          handling or customer support processes.
        </p>
        <p>
          20.2 Your order is governed by the version of this policy that was live when you placed it, except
          where the law requires a change or a correction has to be applied.
        </p>
        <p>20.3 Each revision will be reflected in the &ldquo;Last updated&rdquo; date shown at the top of this page.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Getting in touch",
    body: (
      <>
        <p>
          Questions about cancelling an order, returning an item, refunds, goods that arrived damaged, faulty
          or wrong, or warranty claims can be sent to us using the details below.
        </p>
        <ContactBlock />
      </>
    ),
  },
];

export default function ReturnsPolicyPage() {
  return (
    <PolicyLayout
      title="Returns & Refunds Policy"
      lastUpdated="12 October 2026"
      summary="How to cancel an order, send items back and get your money back, and what happens when something arrives faulty, damaged or wrong."
      intro={
        <>
          <p>
            This document sets out how we deal with cancelled orders, returns by consumers, refunds, items that
            arrive damaged, faulty or incorrect, and goods whose return is restricted, for anything bought on
            www.solvetashop.com (the &ldquo;Website&rdquo;). The Website is run by:
          </p>
          <ContactBlock />
          <p>
            Here, &ldquo;Solvetashop&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to{" "}
            {COMPANY.legalName}, and &ldquo;Customer&rdquo;, &ldquo;you&rdquo; and &ldquo;your&rdquo; refer to
            any person or business ordering through the Website.
          </p>
          <p>
            Please read it alongside our <a href="/policies/terms">Terms of Sale</a>, our{" "}
            <a href="/policies/shipping">Shipping &amp; Delivery Policy</a>, our{" "}
            <a href="/policies/privacy">Privacy Notice</a>, our <a href="/policies/cookies">Cookie Notice</a>,
            our <a href="/policies/warranty">Warranty Policy</a>, and any warranty or Additional Warranty terms
            that apply to a particular product.
          </p>
          <p>
            None of what follows reduces any rights you have under consumer protection law that cannot be
            excluded.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
