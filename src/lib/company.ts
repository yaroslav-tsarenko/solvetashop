/**
 * The selling entity behind Solvetashop.
 *
 * Single source of truth: the footer, the policy pages, the checkout's merchant
 * block, the contact page and the transactional emails all read from here, so a
 * change to the registration only has to be made once.
 */
export const COMPANY = {
  legalName: "SOLVETA LTD",
  tradingName: "Solvetashop",
  companyNumber: "17349586",
  street: "Dept 6953, 196 High Road",
  city: "Wood Green, London",
  postalCode: "N22 8HH",
  country: "United Kingdom",
  phone: "+44 7446 940486",
  phoneHref: "tel:+447446940486",
  phone2: "+44 7481 359087",
  phone2Href: "tel:+447481359087",
  email: "info@solvetashop.com",
} as const;

export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.city}, ${COMPANY.country}, ${COMPANY.postalCode}`;
