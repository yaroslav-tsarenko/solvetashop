import type { Metadata } from "next";
import { PolicyLayout, ContactBlock, type PolicySection } from "@/components/layout/PolicyLayout/PolicyLayout";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Warranty Policy" };

const sections: PolicySection[] = [
  {
    id: "about-this-policy",
    title: "Who and what this policy applies to",
    body: (
      <>
        <p>1.1 This document deals only with physical goods bought from Solvetashop.</p>
        <p>
          1.2 Our range is made up of lighting, lamps, light fittings, light bulbs, home décor and related
          electrical and lighting accessories.
        </p>
        <p>
          1.3 Lamps, light fittings and other electrical items can affect safety. For that reason, whether a
          warranty applies may turn on whether the item was the right choice for the job, was fitted
          properly, was used sensibly and in line with the manufacturer&rsquo;s guidance, and was kept in
          suitable operating conditions.
        </p>
        <p>
          1.4 Both Consumers and Business Customers are covered by this document, although certain legal
          rights are available to Consumers only. Section 14 sets out the points that apply specifically to
          Business Customers.
        </p>
        <p>
          1.5 This document is about faults and warranty claims. Changing your mind, cancelling an order and
          the wider returns process are dealt with separately &mdash; see section 15.
        </p>
      </>
    ),
  },
  {
    id: "legal-rights",
    title: "Your legal rights come first",
    body: (
      <>
        <p>
          2.1 Consumer law gives you rights of its own, which we call your statutory rights. They can come
          into play where an item is defective, does not match its description, is not fit for its purpose,
          is unsafe, or otherwise does not conform to the contract.
        </p>
        <p>
          2.2 Those rights stand apart from any guarantee offered by a manufacturer, any other commercial
          warranty, any paid Additional Warranty and any goodwill warranty help we give. Extra cover of that
          kind can add to your protection but never takes the place of what the law already gives you.
        </p>
        <p>
          2.3 No part of this document removes, restricts or reduces a mandatory statutory right that applies
          to you, or any right that the law does not allow to be excluded.
        </p>
        <h3>Customers in the United Kingdom</h3>
        <p>
          2.4 UK Consumers may be protected by applicable UK consumer law where goods are defective, differ
          from their description, are unfit for their purpose or otherwise fall short of the standard
          required.
        </p>
        <p>
          2.5 Depending on the facts, the timing, the state of the item and the law that applies, the
          available remedies may include a repair, a replacement, a refund or a reduction in price.
        </p>
        <h3>Customers in the European Union</h3>
        <p>
          2.6 EU Consumers may benefit from a legal guarantee of at least 2 years under applicable EU consumer
          law.
        </p>
        <p>
          2.7 That guarantee may be relied on where goods do not conform to the contract, are defective, do
          not match their description, are unfit for their purpose or otherwise fail the conformity
          standards that apply.
        </p>
        <p>
          2.8 The legal guarantee arises by law. It is independent of any paid Additional Warranty,
          manufacturer guarantee or other commercial warranty.
        </p>
        <p>
          2.9 How the legal guarantee works in practice &mdash; including whether it is available, the steps
          to follow, who has to prove what, the remedies and the time limits &mdash; may depend on the law of
          the country where you live and on the facts of your claim.
        </p>
      </>
    ),
  },
  {
    id: "manufacturer-guarantees",
    title: "Guarantees given by manufacturers",
    body: (
      <>
        <p>
          3.1 Certain items are sold with a guarantee from the manufacturer. Its terms are decided by the
          manufacturer, not by Solvetashop, and they can differ according to the product, brand, country,
          type of item, fitting requirements and conditions of use.
        </p>
        <p>3.2 To claim under a manufacturer&rsquo;s guarantee you may be asked for:</p>
        <ul>
          <li>proof that you bought the item;</li>
          <li>the item&rsquo;s serial number;</li>
          <li>evidence of how it was installed;</li>
          <li>paperwork showing it was installed by a professional;</li>
          <li>confirmation that it was used correctly;</li>
          <li>confirmation that the manufacturer&rsquo;s instructions were followed;</li>
          <li>registration of the item with the manufacturer;</li>
          <li>the item itself, sent back or made available for inspection.</li>
        </ul>
        <p>
          3.3 Where it is reasonable to do so, we may help you pursue a manufacturer&rsquo;s guarantee claim.
          We cannot, however, control the manufacturer&rsquo;s decisions, how long it takes to deal with a
          claim, the outcome of its inspection, whether a replacement is available, or how it carries out
          repairs.
        </p>
        <p>
          3.4 If a manufacturer&rsquo;s terms differ from this document, a claim under that
          manufacturer&rsquo;s guarantee may be governed by the manufacturer&rsquo;s own terms.
        </p>
      </>
    ),
  },
  {
    id: "additional-warranty",
    title: "Additional Warranty you can buy",
    body: (
      <>
        <p>
          4.1 For some products we may offer a paid Additional Warranty. It is entirely optional and, where
          offered, can be chosen at checkout.
        </p>
        <p>
          4.2 Additional Warranty is a commercial warranty that sits on top of your statutory rights. It leaves
          those rights, and any legal guarantee you may have, fully intact &mdash; it does not replace, reduce
          or limit them.
        </p>
        <p>
          4.3 Unless the product page or checkout shows something different, the price of Additional
          Warranty is worked out as follows:
        </p>
        <table>
          <thead>
            <tr>
              <th>Length of cover</th>
              <th>How the price is set</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Additional Warranty, 1 extra year</td>
              <td>10% of the product price; never less than &euro;6.99 / &pound;6.99 / $6.99</td>
            </tr>
            <tr>
              <td>Additional Warranty, 2 extra years</td>
              <td>16% of the product price; never less than &euro;9.99 / &pound;9.99 / $9.99</td>
            </tr>
            <tr>
              <td>Additional Warranty, 3 extra years</td>
              <td>22% of the product price; never less than &euro;12.99 / &pound;12.99 / $12.99</td>
            </tr>
          </tbody>
        </table>
        <p>
          4.4 The percentage is applied to the product price alone, leaving out delivery charges and any
          import VAT, customs duties, local taxes, brokerage fees or other charges raised in the destination
          country.
        </p>
        <p>
          4.5 Whether Additional Warranty is offered can depend on the product, its category, where it is
          being sent, the type of order and how checkout is set up.
        </p>
      </>
    ),
  },
  {
    id: "additional-warranty-period",
    title: "When Additional Warranty begins and how long it runs",
    body: (
      <>
        <p>
          5.1 Unless checkout or product-specific warranty terms say otherwise, Additional Warranty only
          starts once the standard warranty, manufacturer&rsquo;s guarantee, statutory warranty period or
          legal guarantee period that applies to the product has come to an end.
        </p>
        <p>
          5.2 If more than one warranty or legal guarantee applies, Additional Warranty is meant to extend
          your protection beyond the end of the original period. It does not cut that period short or stand
          in for it.
        </p>
        <p>5.3 Cover lasts only for the length you chose at checkout, which will be one of:</p>
        <ul>
          <li>+1 year;</li>
          <li>+2 years;</li>
          <li>+3 years.</li>
        </ul>
        <p>5.4 Additional Warranty is tied to the specific product and the order in which it was bought.</p>
      </>
    ),
  },
  {
    id: "additional-warranty-cover",
    title: "What Additional Warranty protects against",
    body: (
      <>
        <p>
          6.1 Subject to this document and any terms specific to the product, Additional Warranty protects
          against qualifying defects in manufacture or materials that appear while the item is in normal use.
        </p>
        <p>6.2 Cover is only available if the item was:</p>
        <ul>
          <li>the right choice for the purpose it was bought for;</li>
          <li>properly installed, where it needed installing;</li>
          <li>used as the manufacturer&rsquo;s instructions direct;</li>
          <li>run within its rated specifications;</li>
          <li>kept in suitable storage conditions;</li>
          <li>maintained, where maintenance was needed;</li>
          <li>free from misuse, overloading, alteration or damage.</li>
        </ul>
        <p>6.3 If we accept a valid Additional Warranty claim, we may offer one or more of these outcomes:</p>
        <ul>
          <li>a repair;</li>
          <li>a replacement;</li>
          <li>an equivalent replacement;</li>
          <li>a partial refund;</li>
          <li>a refund;</li>
          <li>store credit, if you agree to it;</li>
          <li>some other reasonable remedy.</li>
        </ul>
        <p>
          6.4 Which outcome is offered will depend on the kind of product, the nature of the fault, whether
          spare parts can be obtained, the view of the manufacturer or supplier, what an inspection shows,
          how old the item is and the law that applies.
        </p>
      </>
    ),
  },
  {
    id: "exclusions",
    title: "Things no warranty covers",
    body: (
      <>
        <p>
          7.1 Unless we have expressly said otherwise, neither statutory warranty support, nor a
          manufacturer&rsquo;s guarantee, nor a paid Additional Warranty extends to problems that result from
          the customer&rsquo;s own circumstances, outside events, misuse or faulty installation.
        </p>
        <p>7.2 In the ordinary course, the following fall outside warranty cover:</p>
        <ul>
          <li>choosing a product that was wrong for the job;</li>
          <li>
            a product that does not suit your installation, system, wiring, voltage, surroundings or project
            needs;
          </li>
          <li>faulty installation, wiring, connection, testing, commissioning or integration;</li>
          <li>
            fitting by someone unqualified or unauthorised in cases where professional installation is
            needed or advisable;
          </li>
          <li>
            not following the manufacturer&rsquo;s instructions, installation guides, safety warnings or
            technical specifications;
          </li>
          <li>misuse, neglect, abuse, careless handling or using the item unsafely;</li>
          <li>
            overloading, the wrong voltage or current, too great a load, an unsuitable power supply, or
            running the item beyond its rated specifications;
          </li>
          <li>
            repair, modification, opening, dismantling, alteration or tampering that we or the manufacturer
            have not authorised;
          </li>
          <li>
            accidental or impact damage, damage from fire, water, moisture or chemicals, corrosion,
            contamination, or dust or dirt getting inside;
          </li>
          <li>
            damage from power surges, lightning, an unstable supply, electrical faults or wider problems
            with the installation;
          </li>
          <li>ordinary wear and tear;</li>
          <li>cosmetic marks or damage that leave the item working as it should;</li>
          <li>
            consumable or replaceable parts &mdash; for example bulbs, lamps, batteries, fuses, filters, seals,
            connectors and accessories &mdash; or anything else expected to wear out, unless we have expressly said they are covered;
          </li>
          <li>
            damage from unsuitable storage, transport, temperatures, humidity or surroundings;
          </li>
          <li>use of the item for anything other than what the manufacturer intended;</li>
          <li>
            use in industrial, commercial, rental or heavy-load settings that the item was not designed for;
          </li>
          <li>
            software, firmware, set-up, calibration or compatibility problems, unless we have expressly said
            they are covered;
          </li>
          <li>
            the cost of labour, electricians, contractors, testing, inspection, removal, refitting or
            certification, and any project delays, downtime, lost profit or indirect losses.
          </li>
        </ul>
        <p>
          7.3 Defects or damage that arise after delivery from events beyond Solvetashop&rsquo;s control are
          not covered.
        </p>
      </>
    ),
  },
  {
    id: "safe-selection-and-installation",
    title: "Choosing, fitting and using electrical items safely",
    body: (
      <>
        <p>
          8.1 Lamps, light fittings and other electrical items can be hazardous if the wrong one is chosen,
          or if they are badly installed, connected or wired, altered, overloaded or misused.
        </p>
        <p>
          8.2 Before you buy, it is your responsibility to make sure the item suits the use you have in mind.
          That means checking every relevant detail, including:
        </p>
        <ul>
          <li>voltage;</li>
          <li>current;</li>
          <li>wattage;</li>
          <li>load rating;</li>
          <li>IP rating;</li>
          <li>dimensions;</li>
          <li>cable type;</li>
          <li>connector type;</li>
          <li>the environment it will be installed in;</li>
          <li>compatibility;</li>
          <li>local electrical rules;</li>
          <li>the product code and technical documentation.</li>
        </ul>
        <p>
          8.3 Where it is required or appropriate, any item that has to be installed, wired, connected,
          tested, commissioned or integrated into an electrical system should be fitted only by a qualified
          electrician or another competent professional.
        </p>
        <p>
          8.4 You must keep, and act on, all instructions, manuals, labels, safety warnings and technical
          documents that come with the item or that the manufacturer makes available. Not doing so may affect
          whether a warranty applies.
        </p>
        <p>
          8.5 If you are not sure how to install, connect, test or use an item safely, get advice from a
          qualified electrician or other competent professional.
        </p>
        <p>
          8.6 A warranty claim may be turned down, or the cover limited, where the defect stems from fitting
          that was incorrect, unsafe or non-compliant, from unsuitable use, or from not following
          instructions.
        </p>
      </>
    ),
  },
  {
    id: "making-a-claim",
    title: "Raising a warranty claim",
    body: (
      <>
        <p>
          9.1 To start a claim, email us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
        <p>9.2 Please include:</p>
        <ul>
          <li>your full name;</li>
          <li>your order number;</li>
          <li>the product name or SKU;</li>
          <li>the date you bought it;</li>
          <li>a description of the problem;</li>
          <li>when you first noticed it;</li>
          <li>photographs or video of the item and the fault;</li>
          <li>photographs of labels, serial numbers, model numbers or manufacturer markings;</li>
          <li>details of the installation, where relevant;</li>
          <li>evidence of professional installation, where we reasonably need it;</li>
          <li>anything you have already tried in order to fix the problem.</li>
        </ul>
        <p>9.3 We may ask you for further details so that we can assess your claim.</p>
        <p>
          9.4 Stop using the item if carrying on could be unsafe, could make the fault worse or could cause
          damage.
        </p>
        <p>
          9.5 Do not try any unauthorised repair, alteration, dismantling or testing where it could
          compromise safety or affect whether the warranty applies.
        </p>
      </>
    ),
  },
  {
    id: "inspection",
    title: "How we check a fault",
    body: (
      <>
        <p>
          10.1 A claim may need to be inspected by Solvetashop, the manufacturer, a supplier, a service
          provider or another authorised party, and we may ask you to send the item back for inspection
          before we agree a remedy.
        </p>
        <p>10.2 An inspection may look at:</p>
        <ul>
          <li>the condition of the item;</li>
          <li>evidence of how it was installed;</li>
          <li>signs of misuse or damage from outside causes;</li>
          <li>signs of overloading or the wrong voltage;</li>
          <li>exposure to the environment;</li>
          <li>alteration or tampering;</li>
          <li>what the manufacturer has found;</li>
          <li>whether the item&rsquo;s condition is consistent with the fault you describe;</li>
          <li>
            whether the defect falls under the law, a manufacturer&rsquo;s guarantee or Additional Warranty.
          </li>
        </ul>
        <p>
          10.3 Where the inspection shows the problem is covered, we will provide a suitable remedy in line
          with this document and the law that applies.
        </p>
        <p>
          10.4 Where the inspection shows the problem is not covered, we may decline the claim. If so, we may,
          where applicable, send the item back to you at your own cost, or offer a paid repair or replacement
          if one is available.
        </p>
      </>
    ),
  },
  {
    id: "return-shipping",
    title: "Sending an item back for assessment",
    body: (
      <>
        <p>
          11.1 Please get in touch with us before sending anything back for a warranty assessment. If a
          return is needed, we will tell you how to make it.
        </p>
        <p>
          11.2 Where a valid claim concerns goods that are faulty, damaged or do not conform to the contract,
          Solvetashop may pay for the return postage if the law requires it or if we agree to do so.
        </p>
        <p>
          11.3 If a claim is declined because the fault is not covered, you may have to pay for return
          postage, inspection, handling or other reasonable costs, where the law allows this and the costs
          have been made clear to you.
        </p>
        <p>
          11.4 Claims involving another country may involve customs declarations, import and export
          paperwork, taxes, duties, brokerage fees and courier charges. These may fall to you to pay, except where
          your claim is confirmed as valid and the applicable law places them elsewhere.
        </p>
      </>
    ),
  },
  {
    id: "remedies",
    title: "Repairs, replacements and refunds",
    body: (
      <>
        <h3>Repaired and replacement items</h3>
        <p>
          12.1 Where the law allows and it is appropriate, a replacement may be new, equivalent,
          refurbished, reconditioned, repaired or functionally equivalent.
        </p>
        <p>
          12.2 If the original item has been discontinued or cannot be obtained, we may propose an equivalent
          alternative or one that is reasonably comparable.
        </p>
        <p>
          12.3 A repair or replacement does not of itself start the original warranty period afresh, unless
          the law requires this or we have said so in writing. Any repaired, replacement or equivalent item
          will usually be covered only for the time left to run on the original warranty or Additional
          Warranty, except where the law that applies requires something different.
        </p>
        <h3>Refunds on a warranty claim</h3>
        <p>
          12.4 A refund may be offered under a warranty where a repair or replacement is unavailable,
          impractical or disproportionate, or where the law requires one.
        </p>
        <p>
          12.5 The amount refunded may reflect how old the item is, how much it has been used, its condition,
          what an inspection showed, the law that applies and the kind of fault involved.
        </p>
        <p>12.6 Wherever possible, we will normally refund to the payment method you originally used.</p>
        <p>
          12.7 Unless the law requires it, a warranty refund does not normally include installation or
          labour costs, delivery charges, import VAT, customs duties, local taxes, courier handling charges,
          brokerage fees or other costs charged by third parties.
        </p>
      </>
    ),
  },
  {
    id: "cancelling-additional-warranty",
    title: "Cancelling or refunding Additional Warranty",
    body: (
      <>
        <p>
          13.1 Where a product is validly cancelled or sent back before its Additional Warranty has begun, and
          we approve the refund for that product, the charge for the Additional Warranty may also be refunded
          where the law requires it or Solvetashop agrees.
        </p>
        <p>
          13.2 Once Additional Warranty has begun, or once a claim has been made under it, it may not be
          refundable unless the law requires it.
        </p>
        <p>
          13.3 Because Additional Warranty is tied to a particular product and order, it cannot normally be
          moved to a different product, order, person or customer.
        </p>
      </>
    ),
  },
  {
    id: "business-customers",
    title: "Points for Business Customers",
    body: (
      <>
        <p>
          14.1 Before buying, Business Customers must check that items are suitable and confirm their
          specifications, compatibility, installation needs and any regulatory requirements.
        </p>
        <p>
          14.2 We expect Business Customers buying electrical goods to have the relevant technical knowledge
          or to have taken professional advice.
        </p>
        <p>
          14.3 Except where mandatory law says otherwise, Business Customers may have more limited warranty
          remedies than Consumers.
        </p>
        <p>
          14.4 So far as the law permits, Solvetashop accepts no liability to Business Customers, in
          connection with a warranty matter, for the cost of labour, electricians, contractors, testing,
          removal, refitting or certification, or for project delays, downtime, lost profit, lost contracts,
          lost revenue, lost business opportunities or any indirect or consequential loss.
        </p>
        <p>
          14.5 Business Customers should not book installation, labour, project deadlines or site work until
          the goods have arrived and have been checked and confirmed as correct and suitable.
        </p>
      </>
    ),
  },
  {
    id: "warranty-and-returns",
    title: "How warranty claims relate to returns",
    body: (
      <>
        <p>
          15.1 This document deals with warranty and defect claims only. A warranty claim is different from
          returning something because you have changed your mind.
        </p>
        <p>
          15.2 Change-of-mind returns, consumer cancellation rights, when refunds are paid, items that cannot
          be returned, goods damaged in transit, wrong items and the steps for sending things back are all
          covered by our <a href="/policies/returns">Returns &amp; Refunds Policy</a>.
        </p>
        <p>
          15.3 Where an item is faulty, damaged, wrong or not as described, we may handle the matter under
          the consumer law that applies, our Returns &amp; Refunds Policy, a manufacturer&rsquo;s guarantee,
          this Warranty Policy, or a mix of these, depending on the circumstances.
        </p>
        <p>
          15.4 This document should also be read alongside our <a href="/policies/terms">Terms of Sale</a>,{" "}
          <a href="/policies/shipping">Shipping &amp; Delivery Policy</a>,{" "}
          <a href="/policies/payment">Payment Terms</a>, <a href="/policies/privacy">Privacy Notice</a> and
          any warranty information given for a specific product.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Updates to this policy",
    body: (
      <>
        <p>
          16.1 We may revise this Warranty Policy from time to time, for example because of changes to the
          warranty options we offer, the price of Additional Warranty, our product categories, the law, the
          terms set by manufacturers, the procedures our suppliers follow or the way we run our business.
        </p>
        <p>
          16.2 Your order is governed by the version in force when you placed it. The exceptions are changes
          the law requires and corrections that must be applied.
        </p>
        <p>
          16.3 Whenever we revise this document, we will change the &ldquo;Last updated&rdquo; date shown at
          the top of the page.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Questions and contact details",
    body: (
      <>
        <p>
          For questions about your statutory rights, a manufacturer&rsquo;s guarantee, Additional Warranty,
          a claim, a defective product or anything this document excludes, you can reach us using the
          details below.
        </p>
        <ContactBlock />
      </>
    ),
  },
];

export default function WarrantyPolicyPage() {
  return (
    <PolicyLayout
      title="Warranty Policy"
      lastUpdated="12 October 2026"
      summary="How your legal rights, manufacturers' guarantees and our optional paid Additional Warranty work for items bought from Solvetashop, and how to raise a claim if something goes wrong."
      intro={
        <>
          <p>
            This Warranty Policy sets out how your statutory rights, legal guarantees, manufacturers&rsquo;
            guarantees and our optional paid Additional Warranty apply to goods bought on
            www.solvetashop.com (the &ldquo;Website&rdquo;). The Website is run by:
          </p>
          <ContactBlock />
          <p>
            Throughout this document, &ldquo;Solvetashop&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
            &ldquo;our&rdquo; refer to {COMPANY.legalName}, and &ldquo;Customer&rdquo;, &ldquo;you&rdquo; and
            &ldquo;your&rdquo; refer to any individual or business buying goods through the Website.
            &ldquo;Consumer&rdquo; and &ldquo;Business Customer&rdquo; have the meanings given in our{" "}
            <a href="/policies/terms">Terms of Sale</a>.
          </p>
          <p>
            Nothing here limits any mandatory right you have under consumer protection law that applies to
            you.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
