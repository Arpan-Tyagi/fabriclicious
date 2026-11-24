import test from "node:test";
import assert from "node:assert/strict";
import {
  determineGstRate,
  formatRule46InvoiceNumber,
  computeItemTax,
  generateTaxInvoice,
} from "../../src/lib/services/gstInvoice.ts";

test("GST 2.0 Rate Determination: Unstitched fabrics are flat 5%", () => {
  // Unstitched fabric under ₹2,500
  assert.equal(determineGstRate(false, 150000), 0.05);
  // High-value luxury silk over ₹2,500 (e.g. ₹8,000/m) must STILL be flat 5% under GST 2.0
  assert.equal(determineGstRate(false, 800000), 0.05);
});

test("GST 2.0 Rate Determination: Stitched apparel has ₹2,500 cliff", () => {
  // Stitched apparel at ₹2,500 (250,000 paise) -> 5%
  assert.equal(determineGstRate(true, 250000), 0.05);
  // Stitched apparel at ₹2,501 (250,100 paise) -> 18% on entire value
  assert.equal(determineGstRate(true, 250100), 0.18);
});

test("CGST Rule 46 Sequential Numbering: Never exceeds 16 chars", () => {
  const inv1 = formatRule46InvoiceNumber(1);
  assert.equal(inv1, "FAB/26-27/000001");
  assert.ok(inv1.length <= 16);

  const invMax = formatRule46InvoiceNumber(999999);
  assert.equal(invMax, "FAB/26-27/999999");
  assert.ok(invMax.length <= 16);
});

test("Place of Supply: Intra-state split vs Inter-state IGST", () => {
  const fabricItem = {
    id: "item-1",
    sku: "SLK-042",
    title: "Raw Mulberry Silk",
    hsnCode: "5007",
    isStitched: false,
    quantityMeters: 2.5,
    uqc: "MTR",
    unitPricePaise: 400000, // ₹4,000/m -> Taxable: ₹10,000 (1,000,000 paise)
  };

  // 1. Intra-state: Maharashtra ("27") to Maharashtra ("27")
  const intraTax = computeItemTax(fabricItem, "27", "27");
  assert.equal(intraTax.isInterState, false);
  assert.equal(intraTax.taxableAmountPaise, 1000000); // ₹10,000
  assert.equal(intraTax.cgstRate, 0.025); // 2.5% CGST
  assert.equal(intraTax.sgstRate, 0.025); // 2.5% SGST
  assert.equal(intraTax.cgstAmountPaise, 25000); // ₹250
  assert.equal(intraTax.sgstAmountPaise, 25000); // ₹250
  assert.equal(intraTax.igstAmountPaise, 0);
  assert.equal(intraTax.totalAmountPaise, 1050000); // ₹10,500 total

  // 2. Inter-state: Maharashtra ("27") to Karnataka ("29")
  const interTax = computeItemTax(fabricItem, "27", "29");
  assert.equal(interTax.isInterState, true);
  assert.equal(interTax.taxableAmountPaise, 1000000);
  assert.equal(interTax.igstRate, 0.05); // 5% IGST
  assert.equal(interTax.igstAmountPaise, 50000); // ₹500
  assert.equal(interTax.cgstAmountPaise, 0);
  assert.equal(interTax.sgstAmountPaise, 0);
  assert.equal(interTax.totalAmountPaise, 1050000);
});

test("Rule 46 Tax Invoice Snapshot: Full document generation", () => {
  const supplier = {
    legalName: "Fabriclicious Luxury Textiles Private Limited",
    tradeName: "Fabriclicious",
    gstin: "27AABCF1234F1Z5",
    address: "Atelier 4, Textile Mill Compound, Lower Parel",
    city: "Mumbai",
    state: "Maharashtra",
    stateCode: "27",
    pincode: "400013",
  };

  const buyer = {
    name: "Couture Design House",
    email: "buyer@couture.com",
    phone: "+919876543210",
    gstin: "29AABCC5678G1Z2",
    shippingAddress: "12 Richmond Road",
    deliveryState: "Karnataka",
    deliveryStateCode: "29",
    pincode: "560025",
    isB2B: true,
  };

  const items = [
    {
      id: "line-1",
      sku: "SLK-042",
      title: "Mulberry Silk Twill",
      hsnCode: "5007",
      isStitched: false,
      quantityMeters: 5.0,
      uqc: "MTR",
      unitPricePaise: 500000, // ₹5,000/m
    },
  ];

  const invoice = generateTaxInvoice(142, supplier, buyer, items);

  assert.equal(invoice.invoiceTitle, "TAX INVOICE");
  assert.equal(invoice.invoiceNumber, "FAB/26-27/000142");
  assert.equal(invoice.reverseCharge, "N");
  assert.equal(invoice.placeOfSupplyCode, "29");
  assert.equal(invoice.summary.totalTaxablePaise, 2500000); // ₹25,000
  assert.equal(invoice.summary.totalIgstPaise, 125000); // ₹1,250
  assert.equal(invoice.summary.grandTotalPaise, 2625000); // ₹26,250
});
