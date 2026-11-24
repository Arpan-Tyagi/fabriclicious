import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeSpreadsheetCell, convertToSanitizedCSV } from "../../src/lib/utils/exportSanitizer.ts";

test("Formula Injection Defense: Neutralizes dangerous leading characters", () => {
  // Test malicious formula injection triggers
  const dangerousPayloads = [
    "=1+1",
    "=HYPERLINK('http://attacker.com', 'Click Me')",
    "+SUM(1,2)",
    "-1+1",
    "@SUM(1,2)",
    "\t=1+1",
    "\r=1+1",
    "\n=1+1",
    "＝SUM(A1:A10)", // Full-width equals
  ];

  for (const payload of dangerousPayloads) {
    const sanitized = sanitizeSpreadsheetCell(payload);
    // Must start with quote and tab character: "\t...
    assert.match(
      sanitized,
      /^"\t/,
      `Payload "${payload}" was not neutralized with leading tab prefix! Output: ${sanitized}`
    );
  }
});

test("Formula Injection Defense: Preserves safe numbers and clean text", () => {
  assert.equal(sanitizeSpreadsheetCell(42), "42");
  assert.equal(sanitizeSpreadsheetCell(1250.5), "1250.5");
  assert.equal(sanitizeSpreadsheetCell(true), "TRUE");
  assert.equal(sanitizeSpreadsheetCell(false), "FALSE");
  assert.equal(sanitizeSpreadsheetCell(null), '""');
  assert.equal(sanitizeSpreadsheetCell(undefined), '""');

  const cleanText = "Mulberry Silk Twill";
  assert.equal(sanitizeSpreadsheetCell(cleanText), '"Mulberry Silk Twill"');
});

test("CSV Export Generator: Produces safe tabular rows", () => {
  const rows = [
    { name: "John Doe", email: "john@example.com", note: "=cmd|'/c calc'!A1" },
    { name: "Jane Smith", email: "jane@example.com", note: "+1234567890" },
    { name: "Safe User", email: "safe@example.com", note: "Normal message" },
  ];

  const csv = convertToSanitizedCSV(rows);
  assert.ok(csv.includes('"name","email","note"'));
  assert.ok(csv.includes('"\t=cmd|\'/c calc\'!A1"'));
  assert.ok(csv.includes('"\t+1234567890"'));
  assert.ok(csv.includes('"Normal message"'));
});
