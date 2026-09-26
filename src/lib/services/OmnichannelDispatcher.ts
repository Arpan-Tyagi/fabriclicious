import { env } from "@/env";

/**
 * WhatsApp Automated Operational Notifications:
 * - fabriclicious_order_confirmed: "Dear {{1}}, your atelier order #{{2}} for {{3}} of continuous fabric has been confirmed. Our cutters have scheduled your bolt. Track your order status here: {{4}}"
 * - fabriclicious_cut_in_progress: "Your fabric is on the cutting table. Bolt #{{1}} has been inspected under full-spectrum daylight lamps and is being sliced to your requested {{2}} meters along the grainline."
 * - fabriclicious_dispatched: "Your fabric parcel has departed our atelier. Your unbroken cuts have been rolled on hardwood tubes and dispatched via courier. Tracking Number: {{1}}."
 */
export class OmnichannelDispatcher {
  static async sendWhatsAppTemplate(phone: string, template: string, variables: string[]) {
    console.log(`[WhatsApp] Sending ${template} to ${phone} with vars:`, variables);
    const url = `https://graph.facebook.com/v17.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    
    const parameters = variables.map(v => ({ type: "text", text: v }));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: template,
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: parameters
            }
          ]
        }
      }),
    });
    
    return { success: res.ok };
  }

  static async sendEmail(to: string, subject: string, templateId: string, props: any) {
    console.log(`[Resend] Sending email to ${to} with subject "${subject}" using template ${templateId}`);
    
    // Fallback html in case we don't render the react component (or if we do render it dynamically)
    // The prompt says "utilizing environment variables ... actual native fetch calls to the Resend API"
    // I will dynamically import the email template to avoid top-level issues.
    let html = `<p>Order update: ${subject}</p>`;
    if (templateId === "OrderConfirmationEmail") {
      const { OrderConfirmationEmail } = await import("@/emails/OrderConfirmation");
      const { render } = await import("@react-email/render");
      html = await render(OrderConfirmationEmail(props));
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>",
        to,
        subject,
        html
      })
    });
    return { success: res.ok };
  }

  static async sendWhatsAppText(phone: string, text: string) {
    const url = `https://graph.facebook.com/v17.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: text }
      }),
    });
    
    return { success: res.ok };
  }
}
