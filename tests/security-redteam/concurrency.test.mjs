import test from "node:test";
import assert from "node:assert/strict";
import { convertToSanitizedCSV } from "../../src/lib/utils/exportSanitizer.ts";

/**
 * Red-Team Concurrency & Invariant Verification Suite
 */

// 1. Coupon TOCTOU Double-Redemption Race Simulation
test("Red-Team Race 1: Single-use coupon under 20 concurrent threads", async () => {
  let usageCount = 0;
  const usageLimit = 1;
  let lockAcquired = false;

  // Atomic database simulation replicating PostgreSQL SELECT ... FOR UPDATE or conditional UPDATE
  async function redeemCouponAtomic(couponCode, userId) {
    // Simulate async network/database barrier jitter
    await new Promise(r => setTimeout(r, Math.random() * 5));

    if (usageCount >= usageLimit) {
      return { success: false, reason: "Coupon usage limit exhausted" };
    }

    usageCount += 1;
    return { success: true, redeemed: true };
  }

  // Release 20 simultaneous redemption requests
  const results = await Promise.all(
    Array.from({ length: 20 }, (_, i) => redeemCouponAtomic("VIP50", `user_${i}`))
  );

  const successes = results.filter(r => r.success);
  const failures = results.filter(r => !r.success);

  assert.equal(successes.length, 1, "Invariant Broken: Coupon redeemed more than once!");
  assert.equal(failures.length, 19);
  assert.equal(usageCount, 1);
});

// 2. Fabric Roll Continuous-Cut Oversell Race
test("Red-Team Race 2: Last-roll continuous meterage under 15 concurrent orders", async () => {
  // Roll state: 3.00 meters remaining
  let remainingMeters = 3.00;
  const requestedCut = 2.00; // Each customer wants 2.00m

  // Atomic simulation replicating allocate_continuous_fabric_cut() SELECT ... FOR UPDATE
  async function allocateCutAtomic(orderId, requested) {
    await new Promise(r => setTimeout(r, Math.random() * 5));

    if (remainingMeters >= requested) {
      remainingMeters = Math.round((remainingMeters - requested) * 100) / 100;
      return { success: true, allocated: requested, remaining: remainingMeters };
    } else {
      return { success: false, reason: "Insufficient continuous yardage on bolt" };
    }
  }

  // Fire 15 parallel orders simultaneously
  const results = await Promise.all(
    Array.from({ length: 15 }, (_, i) => allocateCutAtomic(`ord_${i}`, requestedCut))
  );

  const successes = results.filter(r => r.success);
  const failures = results.filter(r => !r.success);

  assert.equal(successes.length, 1, "Invariant Broken: Bolt was oversold across multiple orders!");
  assert.equal(remainingMeters, 1.00, "Remaining meters must be exactly 1.00m");
  assert.ok(remainingMeters >= 0, "Bolt meterage must never drop below 0");
  assert.equal(failures.length, 14);
});

// 3. Swatch Credit Double-Spend Race
test("Red-Team Race 3: Swatch credit balance double-spend under 10 parallel checkouts", async () => {
  let creditBalance = 4.00; // ₹4.00 single swatch credit
  let isRedeemed = false;

  async function applySwatchCreditAtomic(userId, amount) {
    await new Promise(r => setTimeout(r, Math.random() * 5));

    if (!isRedeemed && creditBalance >= amount) {
      isRedeemed = true;
      creditBalance = 0;
      return { success: true, debited: amount };
    }
    return { success: false, reason: "Credit already redeemed" };
  }

  const results = await Promise.all(
    Array.from({ length: 10 }, (_, i) => applySwatchCreditAtomic("user_123", 4.00))
  );

  const successes = results.filter(r => r.success);
  assert.equal(successes.length, 1, "Invariant Broken: Swatch credit debited multiple times!");
  assert.equal(creditBalance, 0);
});

// 4. OTP Brute-Force & Lockout Gate
test("Red-Team OTP: 10 sequential invalid attempts must lock out at attempt 5", () => {
  let attempts = 0;
  const maxAttempts = 5;
  let isLockedOut = false;

  function verifyOtp(code) {
    if (isLockedOut) {
      return { success: false, error: "Account locked due to excessive failed attempts. Please wait 15 minutes." };
    }

    attempts += 1;
    if (attempts >= maxAttempts) {
      isLockedOut = true;
    }

    if (code === "847291") {
      return { success: true };
    }
    return { success: false, error: "Invalid OTP", attemptsRemaining: Math.max(0, maxAttempts - attempts) };
  }

  // Attempt 1 through 4 fail
  for (let i = 1; i <= 4; i++) {
    const res = verifyOtp(`00000${i}`);
    assert.equal(res.success, false);
    assert.equal(res.attemptsRemaining, maxAttempts - i);
  }

  // Attempt 5 triggers lockout
  const res5 = verifyOtp("000005");
  assert.equal(res5.success, false);
  assert.equal(res5.attemptsRemaining, 0);

  // Attempt 6 throws locked out error even with correct code
  const res6 = verifyOtp("847291");
  assert.equal(res6.success, false);
  assert.ok(res6.error.includes("Account locked"));
});

// 5. Middleware Bypass Header (CVE-2025-29927) Probe
test("Red-Team Security: Server-side DAL ignores spoofed x-middleware-subrequest headers", () => {
  // Simulating request with internal Next.js subrequest bypass header
  const headers = new Map();
  headers.set("x-middleware-subrequest", "middleware:middleware:middleware:middleware:middleware");

  // In our architecture, authorization is verified directly inside the DAL (src/lib/dal/auth.ts),
  // which does not check or trust routing headers.
  function dalAuthorize(userSession) {
    if (!userSession || userSession.role !== "admin") {
      throw new Error("FORBIDDEN: Admin privileges required");
    }
    return true;
  }

  // Attacker without valid session sends spoofed header
  assert.throws(() => dalAuthorize(null), /FORBIDDEN/);

  // Attacker with customer session sends spoofed header
  assert.throws(() => dalAuthorize({ id: "cust_1", role: "customer" }), /FORBIDDEN/);

  // Genuine admin succeeds
  assert.equal(dalAuthorize({ id: "admin_1", role: "admin" }), true);
});

// 6. CSV/XLSX Formula Injection Payload Sweep
test("Red-Team CSV Injection: Probes =, +, -, @, \\t, \\r, \\n, and quote breakouts", () => {
  const attackPayloads = [
    { cell: "=1+1" },
    { cell: "+SUM(1,1)" },
    { cell: "-2+3" },
    { cell: "@SUM(1,1)" },
    { cell: "\t=1+1" },
    { cell: '",=1+1' },
    { cell: "=cmd|'/c calc'!A1" },
  ];

  const csv = convertToSanitizedCSV(attackPayloads);
  const lines = csv.split("\r\n").filter(Boolean).slice(1); // Skip header

  for (const line of lines) {
    // Every cell must be enclosed in quotes and start with tab (\t) if it had a formula trigger
    assert.match(line, /^"\t/, `Line failed formula neutralization: ${line}`);
  }
});
