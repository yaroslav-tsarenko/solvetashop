import nodemailer, { type Transporter } from "nodemailer";
import { COMPANY, COMPANY_ADDRESS } from "@/lib/company";
import { DELIVERY_TIME_EN, SHIPPING_LABEL_EN, isShippingMethod } from "@/lib/shipping";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
      host,
      port,
      // 465 is implicit TLS; 587 upgrades in-band via STARTTLS.
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

function getFrom(): string {
  return (
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    "Solvetashop <info@solvetashop.com>"
  );
}

function getReplyTo(): string | undefined {
  return process.env.SMTP_REPLY_TO || process.env.SMTP_USER || undefined;
}

function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

// Nordic Minimal palette: ink for text and buttons, sage for links.
const INK_COLOR = "#111111";
const BRAND_COLOR = "#6F7F68";
const BG_COLOR = "#F2F2EF";
const TEXT_COLOR = INK_COLOR;
const MUTED_COLOR = "#6B6B66";
const FAINT_COLOR = "#9A9A93";
const LINE_COLOR = "#E4E2DC";
const PANEL_COLOR = "#F7F7F4";

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

async function send({ to, subject, html, replyTo }: SendArgs): Promise<boolean> {
  const t = getTransporter();
  if (!t) {
    console.log(`[Email] Skipped (SMTP not configured) → ${subject} to ${to}`);
    return false;
  }
  try {
    await t.sendMail({
      from: getFrom(),
      to,
      subject,
      html,
      replyTo: replyTo ?? getReplyTo(),
    });
    return true;
  } catch (err) {
    console.error(`[Email] Send failed → ${subject} to ${to}:`, err);
    return false;
  }
}

function emailWrapper(content: string, options: { preheader?: string } = {}): string {
  const preheader = options.preheader
    ? `<div style="display:none;font-size:1px;color:#fff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${options.preheader}</div>`
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Solvetashop</title>
</head>
<body style="margin:0;padding:0;background:${BG_COLOR};font-family:Manrope,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:${TEXT_COLOR};">
  ${preheader}
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="text-align:center;margin-bottom:24px;">
      <a href="${getSiteUrl()}" style="text-decoration:none;">
        <span style="font-size:22px;font-weight:300;color:${INK_COLOR};letter-spacing:-0.02em;">solveta&middot;shop</span>
      </a>
    </div>
    <div style="background:#fff;border-radius:6px;padding:36px 32px;border:1px solid ${LINE_COLOR};">
      ${content}
    </div>
    <div style="text-align:center;margin-top:24px;font-size:12px;color:${FAINT_COLOR};line-height:1.6;">
      <p style="margin:0 0 4px;">&copy; ${new Date().getFullYear()} ${COMPANY.tradingName}</p>
      <p style="margin:0;">${COMPANY.legalName} &middot; ${COMPANY.country} &middot; Company no. ${COMPANY.companyNumber} &middot; <a href="${getSiteUrl()}" style="color:${MUTED_COLOR};text-decoration:none;">solvetashop.com</a></p>
      <p style="margin:8px 0 0;">
        <a href="${getSiteUrl()}/policies/privacy" style="color:${FAINT_COLOR};text-decoration:underline;margin:0 6px;">Privacy</a>
        <a href="${getSiteUrl()}/policies/terms" style="color:${FAINT_COLOR};text-decoration:underline;margin:0 6px;">Terms of sale</a>
        <a href="${getSiteUrl()}/contact" style="color:${FAINT_COLOR};text-decoration:underline;margin:0 6px;">Get in touch</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function button(href: string, label: string): string {
  return `
    <div style="text-align:center;margin:24px 0;">
      <a href="${href}" style="display:inline-block;padding:13px 30px;background:${INK_COLOR};color:#fff;text-decoration:none;border-radius:999px;font-weight:500;font-size:14px;">
        ${label}
      </a>
    </div>`;
}

function escape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================
// Welcome email
// ============================================================

export async function sendWelcomeEmail(email: string, name?: string | null): Promise<boolean> {
  const greeting = name ? `Hello ${escape(name)}` : "Hello";
  const siteUrl = getSiteUrl();

  return send({
    to: email,
    subject: "Your Solvetashop account is ready",
    html: emailWrapper(
      `
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;letter-spacing:-0.01em;color:${TEXT_COLOR};">${greeting} &mdash; thank you for joining.</h1>
      <p style="color:${MUTED_COLOR};line-height:1.7;margin:0 0 20px;">
        Your Solvetashop account is set up. It keeps your orders, delivery details and saved pieces in one place,
        so finding the right lamp, shade or bulb &mdash; or a small piece of d&eacute;cor to finish a room &mdash; is a little easier next time.
      </p>
      <div style="border-top:1px solid ${LINE_COLOR};border-bottom:1px solid ${LINE_COLOR};padding:16px 0;margin:0 0 24px;">
        <p style="margin:0 0 8px;font-size:11px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.08em;font-weight:500;">From your account you can</p>
        <ul style="margin:0;padding:0 0 0 18px;color:${MUTED_COLOR};line-height:1.9;">
          <li>keep a wishlist of pieces you like</li>
          <li>follow each order from checkout to delivery</li>
          <li>reorder quickly with saved addresses</li>
        </ul>
      </div>
      ${button(`${siteUrl}/catalog`, "Browse the shop")}
      <p style="color:${FAINT_COLOR};font-size:13px;line-height:1.6;margin:24px 0 0;text-align:center;">
        Questions about a piece or an order? Simply reply to this email.
      </p>
    `,
      { preheader: `${greeting} &mdash; your Solvetashop account is ready.` },
    ),
  });
}

// ============================================================
// Order emails (confirmation, invoice, status updates)
// ============================================================

interface OrderItem {
  productName: string;
  productSku: string;
  quantity: number;
  price: number | { toNumber?: () => number };
  total: number | { toNumber?: () => number };
}

interface ShippingAddress {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string | null;
  city?: string;
  province?: string | null;
  postalCode?: string;
  country?: string;
}

interface OrderEmailData {
  orderId: string;
  orderNumber?: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number | { toNumber?: () => number };
  taxAmount: number | { toNumber?: () => number };
  shippingCost: number | { toNumber?: () => number };
  discountAmount?: number | { toNumber?: () => number };
  total: number | { toNumber?: () => number };
  shippingMethod: string;
  shippingAddress?: ShippingAddress;
  trackingNumber?: string | null;
  createdAt?: Date | string;
}

function toNum(v: number | { toNumber?: () => number } | undefined | null): number {
  if (v == null) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "object" && typeof v.toNumber === "function") return v.toNumber();
  return Number(v);
}

function formatEur(amount: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
}

function formatDate(d: Date | string | undefined): string {
  const date = d ? new Date(d) : new Date();
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function shortId(order: { orderNumber?: string; orderId: string }): string {
  const raw = order.orderNumber || order.orderId;
  return raw.slice(-8).toUpperCase();
}

// Older orders may carry a retired method key; treat anything unknown as standard.
function shippingNameFor(method: string): string {
  return SHIPPING_LABEL_EN[isShippingMethod(method) ? method : "standard"];
}

function shippingLabelFor(method: string): string {
  const key = isShippingMethod(method) ? method : "standard";
  return `${SHIPPING_LABEL_EN[key]} (${DELIVERY_TIME_EN[key]})`;
}

function formatAddress(addr?: ShippingAddress): string {
  if (!addr) return "—";
  const lines: string[] = [];
  const name = [addr.firstName, addr.lastName].filter(Boolean).join(" ");
  if (name) lines.push(escape(name));
  if (addr.address1) lines.push(escape(addr.address1));
  if (addr.address2) lines.push(escape(addr.address2));
  const cityLine = [addr.city, addr.postalCode].filter(Boolean).join(", ");
  if (cityLine) lines.push(escape(cityLine));
  if (addr.country) lines.push(escape(addr.country));
  return lines.join("<br />");
}

function itemRowsTable(items: OrderItem[], options: { showUnitPrice?: boolean } = {}): string {
  return items
    .map((item) => {
      const qty = item.quantity;
      const unit = formatEur(toNum(item.price));
      const total = formatEur(toNum(item.total));
      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid ${LINE_COLOR};vertical-align:top;">
            <div style="font-weight:500;font-size:14px;color:${TEXT_COLOR};">${escape(item.productName)}</div>
            <div style="font-size:12px;color:${FAINT_COLOR};margin-top:2px;">SKU: ${escape(item.productSku)}</div>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid ${LINE_COLOR};text-align:center;color:${MUTED_COLOR};font-size:14px;vertical-align:top;">
            ${qty}${options.showUnitPrice ? ` &times; ${unit}` : ""}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid ${LINE_COLOR};text-align:right;font-weight:500;font-size:14px;color:${TEXT_COLOR};vertical-align:top;">
            ${total}
          </td>
        </tr>`;
    })
    .join("");
}

function totalsBlock(data: OrderEmailData): string {
  const discount = toNum(data.discountAmount);
  const shipping = toNum(data.shippingCost);
  return `
    <div style="background:${PANEL_COLOR};border-radius:4px;padding:16px;margin:16px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:${MUTED_COLOR};font-size:14px;padding:4px 0;">Subtotal</td>
          <td style="text-align:right;font-weight:500;font-size:14px;padding:4px 0;">${formatEur(toNum(data.subtotal))}</td>
        </tr>
        <tr>
          <td style="color:${MUTED_COLOR};font-size:14px;padding:4px 0;">Shipping (${shippingNameFor(data.shippingMethod)})</td>
          <td style="text-align:right;font-weight:500;font-size:14px;padding:4px 0;${shipping === 0 ? "color:#4F6B4A;" : ""}">${shipping === 0 ? "Free" : formatEur(shipping)}</td>
        </tr>
        <tr>
          <td style="color:${MUTED_COLOR};font-size:14px;padding:4px 0;">Tax (21%)</td>
          <td style="text-align:right;font-weight:500;font-size:14px;padding:4px 0;">${formatEur(toNum(data.taxAmount))}</td>
        </tr>
        ${
          discount > 0
            ? `<tr>
                <td style="color:#4F6B4A;font-size:14px;padding:4px 0;">Discount</td>
                <td style="text-align:right;font-weight:500;font-size:14px;padding:4px 0;color:#4F6B4A;">&minus;${formatEur(discount)}</td>
              </tr>`
            : ""
        }
        <tr>
          <td style="padding-top:12px;border-top:1px solid ${LINE_COLOR};font-weight:400;font-size:16px;color:${TEXT_COLOR};">Total</td>
          <td style="padding-top:12px;border-top:1px solid ${LINE_COLOR};text-align:right;font-weight:400;font-size:16px;color:${TEXT_COLOR};">${formatEur(toNum(data.total))}</td>
        </tr>
      </table>
    </div>`;
}

function itemsTable(items: OrderItem[], options: { showUnitPrice?: boolean } = {}): string {
  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <thead>
        <tr style="border-bottom:1px solid ${LINE_COLOR};">
          <th style="text-align:left;padding:8px 0;font-size:12px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.05em;">Product</th>
          <th style="text-align:center;padding:8px 0;font-size:12px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.05em;">${options.showUnitPrice ? "Qty &times; Price" : "Qty"}</th>
          <th style="text-align:right;padding:8px 0;font-size:12px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.05em;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemRowsTable(items, options)}
      </tbody>
    </table>`;
}

// Order confirmation — quick "we got your order" email
export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<boolean> {
  const siteUrl = getSiteUrl();
  const id = shortId(data);

  return send({
    to: data.customerEmail,
    subject: `We have your order — #${id}`,
    html: emailWrapper(
      `
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="margin:0 0 6px;font-size:24px;font-weight:300;letter-spacing:-0.01em;color:${TEXT_COLOR};">Thank you &mdash; your order is in.</h1>
        <p style="margin:0;color:${FAINT_COLOR};font-size:14px;">Order #${id}</p>
      </div>

      <p style="color:${MUTED_COLOR};line-height:1.6;margin:0 0 16px;">
        Hello ${escape(data.customerName)}, we have your order and are getting it ready to send.
      </p>

      ${itemsTable(data.items)}
      ${totalsBlock(data)}

      ${button(`${siteUrl}/account/orders/${data.orderId}`, "See your order")}

      <p style="color:${FAINT_COLOR};font-size:13px;margin:24px 0 0;text-align:center;">
        We&rsquo;ll email you again once your parcel has been handed to the carrier.
      </p>
    `,
      { preheader: `Order #${id} received &mdash; thank you.` },
    ),
  });
}

// Invoice email — formal, with full company + customer details
export async function sendOrderInvoiceEmail(data: OrderEmailData): Promise<boolean> {
  const id = shortId(data);
  const date = formatDate(data.createdAt);

  return send({
    to: data.customerEmail,
    subject: `Invoice — Order #${id}`,
    html: emailWrapper(
      `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;border-bottom:1px solid ${LINE_COLOR};padding-bottom:16px;">
        <div>
          <h1 style="margin:0;font-size:26px;font-weight:300;letter-spacing:-0.01em;color:${TEXT_COLOR};">Invoice</h1>
          <p style="margin:4px 0 0;color:${FAINT_COLOR};font-size:13px;">#${id} &middot; ${date}</p>
        </div>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr>
          <td style="width:50%;vertical-align:top;padding-right:12px;">
            <p style="margin:0 0 4px;font-size:11px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">Billing</p>
            <p style="margin:0;font-size:13px;color:${TEXT_COLOR};line-height:1.55;">
              ${escape(data.customerName)}<br />
              ${escape(data.customerEmail)}
            </p>
          </td>
          <td style="width:50%;vertical-align:top;padding-left:12px;">
            <p style="margin:0 0 4px;font-size:11px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">Delivery address</p>
            <p style="margin:0;font-size:13px;color:${TEXT_COLOR};line-height:1.55;">
              ${formatAddress(data.shippingAddress)}
            </p>
          </td>
        </tr>
      </table>

      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr>
          <td style="width:50%;vertical-align:top;padding-right:12px;">
            <p style="margin:0 0 4px;font-size:11px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">From</p>
            <p style="margin:0;font-size:13px;color:${TEXT_COLOR};line-height:1.55;">
              <strong>${COMPANY.legalName}</strong><br />
              Company number: ${COMPANY.companyNumber}<br />
              ${COMPANY_ADDRESS}
            </p>
          </td>
          <td style="width:50%;vertical-align:top;padding-left:12px;">
            <p style="margin:0 0 4px;font-size:11px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">Delivery</p>
            <p style="margin:0;font-size:13px;color:${TEXT_COLOR};line-height:1.55;">
              ${shippingLabelFor(data.shippingMethod)}
            </p>
          </td>
        </tr>
      </table>

      ${itemsTable(data.items, { showUnitPrice: true })}
      ${totalsBlock(data)}

      <p style="color:${FAINT_COLOR};font-size:12px;margin:24px 0 0;line-height:1.6;text-align:center;">
        VAT is included in the prices shown where applicable. Please keep this invoice as your proof of purchase.<br />
        Questions? Reply to this email or write to <a href="mailto:${COMPANY.email}" style="color:${BRAND_COLOR};">${COMPANY.email}</a>.
      </p>
    `,
      { preheader: `Invoice for order #${id} — ${formatEur(toNum(data.total))}` },
    ),
  });
}

// Order shipped — sent when admin marks order SHIPPED
export async function sendOrderShippedEmail(data: OrderEmailData): Promise<boolean> {
  const siteUrl = getSiteUrl();
  const id = shortId(data);
  const tracking = data.trackingNumber;

  return send({
    to: data.customerEmail,
    subject: `Order #${id} has been sent`,
    html: emailWrapper(
      `
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="margin:0 0 6px;font-size:24px;font-weight:300;letter-spacing:-0.01em;color:${TEXT_COLOR};">Your parcel is on its way.</h1>
        <p style="margin:0;color:${FAINT_COLOR};font-size:14px;">Order #${id}</p>
      </div>

      <p style="color:${MUTED_COLOR};line-height:1.6;margin:0 0 16px;">
        Hello ${escape(data.customerName)}, your order has been dispatched and is travelling to you now.
      </p>

      ${
        tracking
          ? `<div style="background:${PANEL_COLOR};border-radius:4px;padding:16px;margin:0 0 16px;">
              <p style="margin:0 0 4px;font-size:11px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">Tracking reference</p>
              <p style="margin:0;font-size:18px;font-weight:500;color:${TEXT_COLOR};font-family:'Courier New',monospace;">${escape(tracking)}</p>
            </div>`
          : ""
      }

      <div style="background:${PANEL_COLOR};border-radius:4px;padding:16px;margin:0 0 16px;">
        <p style="margin:0 0 4px;font-size:11px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">Going to</p>
        <p style="margin:0;font-size:13px;color:${TEXT_COLOR};line-height:1.55;">
          ${formatAddress(data.shippingAddress)}
        </p>
      </div>

      <p style="color:${MUTED_COLOR};font-size:13px;line-height:1.6;margin:16px 0 0;">
        Estimated delivery: <strong>${shippingLabelFor(data.shippingMethod)}</strong>.
        We&rsquo;ll write again when it has been delivered.
      </p>

      ${button(`${siteUrl}/account/orders/${data.orderId}`, "Follow your order")}
    `,
      { preheader: `Order #${id} shipped${tracking ? ` — ${tracking}` : ""}` },
    ),
  });
}

// Generic status update — DELIVERED / CANCELLED / REFUNDED
export async function sendOrderStatusEmail(
  data: OrderEmailData,
  status: "DELIVERED" | "CANCELLED" | "REFUNDED",
): Promise<boolean> {
  const siteUrl = getSiteUrl();
  const id = shortId(data);

  const variants = {
    DELIVERED: {
      subject: `Order #${id} delivered`,
      title: "Your order has arrived",
      message: "your order has been delivered. We hope everything is just as you pictured it &mdash; if anything isn&rsquo;t right, reply to this email and we&rsquo;ll help.",
      cta: "Review your order",
      ctaHref: `${siteUrl}/account/orders/${data.orderId}`,
    },
    CANCELLED: {
      subject: `Order #${id} cancelled`,
      title: "Your order has been cancelled",
      message: "this order has been cancelled. If a payment was taken, it will be refunded to your original payment method within 5–10 business days.",
      cta: "Back to the shop",
      ctaHref: `${siteUrl}/catalog`,
    },
    REFUNDED: {
      subject: `Order #${id} refunded`,
      title: "Your refund is on its way",
      message: `we have issued a refund of <strong>${formatEur(toNum(data.total))}</strong> to your original payment method. It may take 5–10 business days to show on your statement.`,
      cta: "View order",
      ctaHref: `${siteUrl}/account/orders/${data.orderId}`,
    },
  } as const;

  const v = variants[status];

  return send({
    to: data.customerEmail,
    subject: v.subject,
    html: emailWrapper(
      `
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="margin:0 0 6px;font-size:24px;font-weight:300;letter-spacing:-0.01em;color:${TEXT_COLOR};">${v.title}</h1>
        <p style="margin:0;color:${FAINT_COLOR};font-size:14px;">Order #${id}</p>
      </div>

      <p style="color:${MUTED_COLOR};line-height:1.6;margin:0 0 16px;">
        Hello ${escape(data.customerName)}, ${v.message}
      </p>

      ${button(v.ctaHref, v.cta)}
    `,
      { preheader: v.title },
    ),
  });
}

// ============================================================
// Password reset
// ============================================================

export async function sendPasswordResetEmail(email: string, resetUrl: string, name?: string | null): Promise<boolean> {
  const greeting = name ? `Hello ${escape(name)}` : "Hello";
  return send({
    to: email,
    subject: "Choose a new Solvetashop password",
    html: emailWrapper(
      `
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;letter-spacing:-0.01em;color:${TEXT_COLOR};">A new password, when you&rsquo;re ready.</h1>
      <p style="color:${MUTED_COLOR};line-height:1.7;margin:0 0 16px;">
        ${greeting}, someone asked to change the password for the Solvetashop account linked to this address.
        Use the button below to set a new one. For your security the link stops working after <strong style="font-weight:500;color:${TEXT_COLOR};">1 hour</strong>.
      </p>
      ${button(resetUrl, "Set a new password")}
      <p style="color:${MUTED_COLOR};font-size:13px;line-height:1.6;margin:16px 0 0;">
        Button not working? Paste this address into your browser instead:
        <br />
        <a href="${resetUrl}" style="color:${BRAND_COLOR};word-break:break-all;">${resetUrl}</a>
      </p>
      <p style="color:${FAINT_COLOR};font-size:13px;margin:24px 0 0;text-align:center;">
        Didn&rsquo;t ask for this? No action is needed &mdash; your current password stays as it is.
      </p>
    `,
      { preheader: "Set a new Solvetashop password — the link is valid for 1 hour." },
    ),
  });
}

// ============================================================
// Contact form
// ============================================================

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Internal notification to support inbox
export async function sendContactFormEmail(submission: ContactSubmission): Promise<boolean> {
  const supportInbox = getReplyTo() || process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!supportInbox) {
    console.log("[Email] Contact form notification skipped (no inbox configured)");
    return false;
  }

  return send({
    to: supportInbox,
    subject: `Contact: ${submission.subject}`,
    replyTo: submission.email,
    html: emailWrapper(`
      <h1 style="margin:0 0 16px;font-size:20px;font-weight:400;color:${TEXT_COLOR};">New message from the contact page</h1>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:14px;">
        <tr>
          <td style="padding:8px 0;color:${FAINT_COLOR};width:80px;">From</td>
          <td style="padding:8px 0;color:${TEXT_COLOR};font-weight:500;">${escape(submission.name)} &lt;${escape(submission.email)}&gt;</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:${FAINT_COLOR};">Subject</td>
          <td style="padding:8px 0;color:${TEXT_COLOR};font-weight:500;">${escape(submission.subject)}</td>
        </tr>
      </table>
      <div style="background:${PANEL_COLOR};border-radius:4px;padding:16px;color:${TEXT_COLOR};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escape(submission.message)}</div>
      <p style="color:${FAINT_COLOR};font-size:12px;margin:16px 0 0;">
        Replying to this email will reach ${escape(submission.email)} directly.
      </p>
    `),
  });
}

// Auto-reply to the customer who submitted the form
export async function sendContactAutoReplyEmail(submission: ContactSubmission): Promise<boolean> {
  return send({
    to: submission.email,
    subject: "Your message reached us — Solvetashop",
    html: emailWrapper(
      `
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;letter-spacing:-0.01em;color:${TEXT_COLOR};">Thank you for writing.</h1>
      <p style="color:${MUTED_COLOR};line-height:1.7;margin:0 0 16px;">
        Hello ${escape(submission.name)}, your message is with us. We&rsquo;ll read it carefully and reply to this address as soon as we can.
      </p>
      <div style="background:${PANEL_COLOR};border-radius:4px;padding:16px;margin:0 0 16px;">
        <p style="margin:0 0 4px;font-size:11px;color:${FAINT_COLOR};text-transform:uppercase;letter-spacing:0.06em;font-weight:500;">What you sent</p>
        <p style="margin:0 0 8px;font-size:14px;color:${TEXT_COLOR};font-weight:500;">${escape(submission.subject)}</p>
        <p style="margin:0;font-size:14px;color:${MUTED_COLOR};line-height:1.6;white-space:pre-wrap;">${escape(submission.message)}</p>
      </div>
      <p style="color:${FAINT_COLOR};font-size:13px;margin:16px 0 0;">
        Many common questions about delivery, returns and payment are answered on our <a href="${getSiteUrl()}/faq" style="color:${BRAND_COLOR};">questions page</a>.
      </p>
    `,
      { preheader: "Thank you — your message reached Solvetashop." },
    ),
  });
}
