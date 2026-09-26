import * as React from "react";

interface SwatchFollowUpProps {
  firstName: string;
  swatchNames: string[];
  creditAmount: number;
}

export const SwatchFollowUpEmail = ({
  firstName,
  swatchNames,
  creditAmount,
}: SwatchFollowUpProps) => {
  const ink = "#1C1A18";
  const bg = "#E6E2D8";
  const container = "#DDD8CD";
  const border = "#CBC4B5";
  const accent = "#8A7968";

  return (
    <html lang="en">
      <head>
        <title>Your Swatch Sample Credit is Ready to Redeem.</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: bg, fontFamily: '"Georgia", serif', color: ink }}>
        <table role="presentation" border={0} cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: bg }}>
          <tr>
            <td align="center" style={{ padding: "40px 20px" }}>
              <table role="presentation" border={0} cellPadding="0" cellSpacing="0" width="100%" style={{ maxWidth: "600px", backgroundColor: container, border: `1px solid ${border}`, borderRadius: "24px" }}>
                <tr>
                  <td style={{ padding: "40px" }}>
                    <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "36px", textAlign: "center", color: ink, margin: "0 0 32px 0", fontWeight: "normal" }}>
                      Fabriclicious
                    </h1>
                    <p style={{ fontSize: "18px", color: ink, margin: "0 0 24px 0" }}>
                      Dear {firstName},
                    </p>
                    <p style={{ fontSize: "16px", color: ink, lineHeight: "1.6", margin: "0 0 24px 0" }}>
                      We hope you have enjoyed evaluating your recent swatch sample tray ({swatchNames.join(", ")}).
                    </p>
                    <div style={{ backgroundColor: bg, padding: "24px", borderRadius: "16px", border: `1px solid ${border}`, textAlign: "center", margin: "0 0 32px 0" }}>
                      <p style={{ fontSize: "12px", color: ink, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" }}>
                        Redeemable Yardage Credit Balance
                      </p>
                      <p style={{ fontSize: "28px", fontWeight: "bold", color: accent, margin: 0 }}>
                        ₹{creditAmount.toFixed(2)}
                      </p>
                      <p style={{ fontSize: "13px", color: ink, marginTop: "8px", margin: 0 }}>
                        This credit automatically applies toward your next unbroken continuous yardage order.
                      </p>
                    </div>
                    <table role="presentation" border={0} cellPadding="0" cellSpacing="0" width="100%" style={{ borderTop: `1px solid ${border}` }}>
                      <tr>
                        <td align="center" style={{ paddingTop: "32px" }}>
                          <p style={{ fontSize: "12px", color: ink, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "2px", margin: 0 }}>
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

export default SwatchFollowUpEmail;
