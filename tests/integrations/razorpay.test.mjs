import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

const TEST_SECRET = "test_razorpay_secret_123456789";

function verifyRazorpayWebhook(rawBody, signature, secret) {
  if (!signature) return { valid: false, error: "Missing signature" };

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  const sigBuf = Buffer.from(signature, "utf-8");
  const expBuf = Buffer.from(expectedSignature, "utf-8");

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { valid: false, error: "Invalid signature" };
  }

  return { valid: true };
}

test("Razorpay Webhook: Valid signature passes", () => {
  const payload = JSON.stringify({
    event: "payment.captured",
    payload: { payment: { entity: { id: "pay_12345", amount: 500000, notes: { orderId: "ord_1" } } } }
  });

  const validSig = crypto.createHmac("sha256", TEST_SECRET).update(payload).digest("hex");
  const res = verifyRazorpayWebhook(payload, validSig, TEST_SECRET);
  assert.equal(res.valid, true);
});

test("Razorpay Webhook: Tampered body or forged signature fails with Invalid signature", () => {
  const payload = JSON.stringify({ event: "payment.captured", amount: 500000 });
  const tamperedPayload = JSON.stringify({ event: "payment.captured", amount: 100 }); // Price tampering to 1 rupee
  const signature = crypto.createHmac("sha256", TEST_SECRET).update(payload).digest("hex");

  // Tampered payload with original signature
  const res = verifyRazorpayWebhook(tamperedPayload, signature, TEST_SECRET);
  assert.equal(res.valid, false);
  assert.equal(res.error, "Invalid signature");

  // Forged signature
  const resForged = verifyRazorpayWebhook(payload, "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", TEST_SECRET);
  assert.equal(resForged.valid, false);
  assert.equal(resForged.error, "Invalid signature");
});

test("Razorpay Webhook Deduplication: Replaying same event ID prevents duplicate processing", () => {
  const processedEvents = new Set();
  const eventId = "evt_razorpay_99887766";

  function processEvent(id) {
    if (processedEvents.has(id)) {
      return { status: "already_processed" };
    }
    processedEvents.add(id);
    return { status: "processed", orderCreated: true };
  }

  // First delivery
  const first = processEvent(eventId);
  assert.equal(first.status, "processed");
  assert.equal(first.orderCreated, true);

  // Second delivery (replay / retry)
  const second = processEvent(eventId);
  assert.equal(second.status, "already_processed");
  assert.equal(second.orderCreated, undefined);
  assert.equal(processedEvents.size, 1);
});
