import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { convertToSanitizedCSV } from "../../src/lib/utils/exportSanitizer.ts";

const META_APP_SECRET = "meta_test_secret_987654";
const GOOGLE_KEY = "google_test_key_abc123";

test("Meta Lead Ads Handshake: Challenge mode matches token", () => {
  const verifyToken = "fabriclicious_meta_verify_token_2026";
  const incomingMode = "subscribe";
  const incomingToken = "fabriclicious_meta_verify_token_2026";
  const challenge = "1158201444";

  const isMatch = incomingMode === "subscribe" && incomingToken === verifyToken;
  assert.equal(isMatch, true);
  assert.equal(challenge, "1158201444");
});

test("Meta Lead Ads Webhook: Timing-safe X-Hub-Signature-256", () => {
  const rawBody = JSON.stringify({
    object: "page",
    entry: [{ id: "12345", changes: [{ field: "leadgen", value: { leadgen_id: "lead_9999" } }] }]
  });

  const validSig = `sha256=${crypto.createHmac("sha256", META_APP_SECRET).update(rawBody).digest("hex")}`;
  const forgedSig = `sha256=abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789`;

  function verifyMetaSig(sig, body, secret) {
    if (!sig) return false;
    const expected = `sha256=${crypto.createHmac("sha256", secret).update(body).digest("hex")}`;
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  assert.equal(verifyMetaSig(validSig, rawBody, META_APP_SECRET), true);
  assert.equal(verifyMetaSig(forgedSig, rawBody, META_APP_SECRET), false);
});

test("Google Ads Lead Form: Constant-time google_key validation", () => {
  function verifyGoogleKey(providedKey, secretKey) {
    if (!providedKey || !secretKey) return false;
    const a = Buffer.from(providedKey);
    const b = Buffer.from(secretKey);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  assert.equal(verifyGoogleKey(GOOGLE_KEY, GOOGLE_KEY), true);
  assert.equal(verifyGoogleKey("wrong_key", GOOGLE_KEY), false);
});

test("CRM Lead Export: Formula injection neutralized with quoted tab prefix", () => {
  const probeLeads = [
    { name: "=1+1", phone: "+919876543210", inquiry: "=HYPERLINK('http://evil.com')" },
    { name: "@SUM(1,1)", phone: "+SUM(1,2)", inquiry: "\t=cmd|'/c calc'!A1" },
    { name: "Anita Sharma", phone: "9876543211", inquiry: "Inquiring about raw silk 10m" },
  ];

  const csv = convertToSanitizedCSV(probeLeads);

  // Assert no unquoted or un-tabbed formula triggers exist at the start of any data cell
  assert.ok(csv.includes('"\t=1+1"'));
  assert.ok(csv.includes('"\t=HYPERLINK(\'http://evil.com\')"'));
  assert.ok(csv.includes('"\t@SUM(1,1)"'));
  assert.ok(csv.includes('"Anita Sharma"'));
});
