import * as React from "react";

interface OrderConfirmationProps {
  customer_name: string;
  order_number: string;
}

export const OrderConfirmationEmail = ({
  customer_name,
  order_number,
}: OrderConfirmationProps) => {
  const ink = "#1C1A18";
  const bg = "#E6E2D8";
  const container = "#DDD8CD";
  const border = "#CBC4B5";
  const accent = "#8A7968";
  
  return (
    <html lang="en">
      <head>
        <title>Atelier Order Confirmation #{order_number} — Fabriclicious</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: bg, fontFamily: '"Georgia", serif', color: ink }}>
        <table role="presentation" border={0} cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: bg }}>
          <tr>
            <td align="center" style={{ padding: "40px 20px" }}>
              <table role="presentation" border={0} cellPadding="0" cellSpacing="0" width="100%" style={{ maxWidth: "600px", backgroundColor: container, border: `1px solid ${border}`, borderRadius: "24px" }}>
                <tr>
                  <td style={{ padding: "40px" }}>
                    <p style={{ fontSize: "12px", color: ink, fontFamily: 'monospace', textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 32px 0", textAlign: "center" }}>
                      FABRICLICIOUS // HIGH-END FABRIC ATELIER
                    </p>
                    <p style={{ fontSize: "18px", color: ink, margin: "0 0 24px 0" }}>
                      Dear {customer_name}, your tailoring requisition has been received.
                    </p>
                    <p style={{ fontSize: "16px", color: ink, lineHeight: "1.6", margin: "0 0 32px 0" }}>
                      Your fabric is being prepared on our atelier cutting tables. Every meter is measured under relaxed tension, checked for dye lot consistency, and hand-rolled onto rigid, crease-resistant tubes to protect selvage integrity during transit.
                    </p>
                    <table border={0} cellPadding="12" cellSpacing="0" width="100%" style={{ marginBottom: "32px", borderCollapse: "collapse", border: `1px solid ${border}` }}>
                      <thead>
                        <tr>
                          <th align="left" style={{ borderBottom: `1px solid ${border}`, fontSize: "12px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px", color: accent }}>Item</th>
                          <th align="right" style={{ borderBottom: `1px solid ${border}`, fontSize: "12px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px", color: accent }}>Qty</th>
                          <th align="right" style={{ borderBottom: `1px solid ${border}`, fontSize: "12px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px", color: accent }}>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ borderBottom: `1px solid ${border}`, fontSize: "14px", fontFamily: "sans-serif" }}>Normandy Dry-Retted Flax</td>
                          <td align="right" style={{ borderBottom: `1px solid ${border}`, fontSize: "14px", fontFamily: "monospace" }}>3.5m</td>
                          <td align="right" style={{ borderBottom: `1px solid ${border}`, fontSize: "14px", fontFamily: "monospace" }}>$115.50</td>
                        </tr>
                        <tr>
                          <td colSpan={2} align="right" style={{ paddingTop: "16px", fontSize: "12px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px", color: accent }}>Subtotal</td>
                          <td align="right" style={{ paddingTop: "16px", fontSize: "14px", fontFamily: "monospace", fontWeight: "bold" }}>$115.50</td>
                        </tr>
                      </tbody>
                    </table>
                    <table role="presentation" border={0} cellPadding="0" cellSpacing="0" width="100%" style={{ borderTop: `1px solid ${border}` }}>
                      <tr>
                        <td align="center" style={{ paddingTop: "32px" }}>
                          <p style={{ fontSize: "12px", color: ink, fontFamily: 'monospace', textTransform: "uppercase", letterSpacing: "2px", margin: 0 }}>
                            The Atelier Team • Mithila Enterprises
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default OrderConfirmationEmail;
