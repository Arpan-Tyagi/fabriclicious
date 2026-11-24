/**
 * Indian GST 2.0 & CGST Rule 46 Tax Invoicing Engine
 * 
 * Rules effective September 22, 2025 / 56th GST Council recommendations:
 * 1. Unstitched fabrics (Chapters 50-60, sarees, unstitched dress material): Flat 5% GST.
 * 2. Stitched garments (Chapters 61-62): 5% up to ₹2,500 per piece; 18% above ₹2,500.
 * 3. Place of Supply Logic:
 *    - Same state (Place of Supply === Supplier State): CGST + SGST (50/50 split).
 *    - Different state (Place of Supply !== Supplier State): IGST (100%).
 * 4. Rule 46 Sequential FY Invoice Numbering: Consecutive, alphanumeric/-/, <=16 characters.
 */

export interface InvoiceSupplier {
  legalName: string;
  tradeName: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  stateCode: string; // 2-digit Indian State Code, e.g. "27" for Maharashtra
  pincode: string;
}

export interface InvoiceBuyer {
  name: string;
  email: string;
  phone: string;
  gstin?: string; // Optional for B2C, mandatory for B2B
  shippingAddress: string;
  deliveryState: string;
  deliveryStateCode: string; // 2-digit Indian State Code
  pincode: string;
  isB2B: boolean;
}

export interface InvoiceLineItem {
  id: string;
  sku: string;
  title: string;
  colorName?: string;
  dyeLot?: string;
  hsnCode: string; // e.g. "5007" (Silk), "5208" (Cotton)
  isStitched: boolean; // unstitched fabric vs ready garment
  quantityMeters: number;
  uqc: string; // "MTR"
  unitPricePaise: number;
}

export interface ComputedTaxSplit {
  taxableAmountPaise: number;
  gstRate: number; // e.g. 0.05
  isInterState: boolean;
  cgstRate: number;
  cgstAmountPaise: number;
  sgstRate: number;
  sgstAmountPaise: number;
  igstRate: number;
  igstAmountPaise: number;
  totalTaxPaise: number;
  totalAmountPaise: number;
}

export interface Rule46TaxInvoice {
  invoiceTitle: "TAX INVOICE";
  invoiceNumber: string; // <= 16 chars, e.g. "FAB/26-27/000142"
  invoiceDate: string; // YYYY-MM-DD
  financialYear: string; // "2026-2027"
  supplier: InvoiceSupplier;
  buyer: InvoiceBuyer;
  placeOfSupply: string;
  placeOfSupplyCode: string;
  reverseCharge: "N";
  lineItems: Array<InvoiceLineItem & { computation: ComputedTaxSplit }>;
  summary: {
    totalTaxablePaise: number;
    totalCgstPaise: number;
    totalSgstPaise: number;
    totalIgstPaise: number;
    totalTaxPaise: number;
    grandTotalPaise: number;
    grandTotalWords: string;
  };
}

/**
 * Calculates GST 2.0 rate based on product classification and value cliff.
 */
export function determineGstRate(isStitched: boolean, unitPricePaise: number): number {
  if (!isStitched) {
    // Unstitched woven and knitted fabrics (Chapters 50-60): Flat 5%
    return 0.05;
  }
  // Stitched apparel cliff at ₹2,500 (250,000 paise)
  return unitPricePaise <= 250000 ? 0.05 : 0.18;
}

/**
 * Formats sequential Rule 46 FY invoice number (<= 16 characters).
 * Format: FAB/26-27/XXXXXX (15 characters)
 */
export function formatRule46InvoiceNumber(seqNumber: number, fyShort: string = "26-27"): string {
  const padded = String(seqNumber).padStart(6, "0");
  const invoiceNum = `FAB/${fyShort}/${padded}`;
  if (invoiceNum.length > 16) {
    throw new Error(`Rule 46 Violation: Invoice number ${invoiceNum} exceeds 16 characters.`);
  }
  return invoiceNum;
}

/**
 * Computes CGST/SGST vs IGST split based on Place of Supply.
 */
export function computeItemTax(
  item: InvoiceLineItem,
  supplierStateCode: string,
  deliveryStateCode: string
): ComputedTaxSplit {
  const taxableAmountPaise = Math.round(item.quantityMeters * item.unitPricePaise);
  const gstRate = determineGstRate(item.isStitched, item.unitPricePaise);
  const isInterState = supplierStateCode !== deliveryStateCode;

  let cgstRate = 0;
  let cgstAmountPaise = 0;
  let sgstRate = 0;
  let sgstAmountPaise = 0;
  let igstRate = 0;
  let igstAmountPaise = 0;

  if (isInterState) {
    igstRate = gstRate;
    igstAmountPaise = Math.round(taxableAmountPaise * igstRate);
  } else {
    cgstRate = gstRate / 2;
    sgstRate = gstRate / 2;
    cgstAmountPaise = Math.round(taxableAmountPaise * cgstRate);
    sgstAmountPaise = Math.round(taxableAmountPaise * sgstRate);
  }

  const totalTaxPaise = isInterState ? igstAmountPaise : cgstAmountPaise + sgstAmountPaise;
  const totalAmountPaise = taxableAmountPaise + totalTaxPaise;

  return {
    taxableAmountPaise,
    gstRate,
    isInterState,
    cgstRate,
    cgstAmountPaise,
    sgstRate,
    sgstAmountPaise,
    igstRate,
    igstAmountPaise,
    totalTaxPaise,
    totalAmountPaise,
  };
}

/**
 * Generates complete Rule 46 compliant invoice snapshot.
 */
export function generateTaxInvoice(
  invoiceSequence: number,
  supplier: InvoiceSupplier,
  buyer: InvoiceBuyer,
  items: InvoiceLineItem[]
): Rule46TaxInvoice {
  const invoiceNumber = formatRule46InvoiceNumber(invoiceSequence);
  const today = new Date().toISOString().split("T")[0];

  let totalTaxablePaise = 0;
  let totalCgstPaise = 0;
  let totalSgstPaise = 0;
  let totalIgstPaise = 0;
  let totalTaxPaise = 0;
  let grandTotalPaise = 0;

  const processedItems = items.map(item => {
    const comp = computeItemTax(item, supplier.stateCode, buyer.deliveryStateCode);
    totalTaxablePaise += comp.taxableAmountPaise;
    totalCgstPaise += comp.cgstAmountPaise;
    totalSgstPaise += comp.sgstAmountPaise;
    totalIgstPaise += comp.igstAmountPaise;
    totalTaxPaise += comp.totalTaxPaise;
    grandTotalPaise += comp.totalAmountPaise;
    return { ...item, computation: comp };
  });

  return {
    invoiceTitle: "TAX INVOICE",
    invoiceNumber,
    invoiceDate: today,
    financialYear: "2026-2027",
    supplier,
    buyer,
    placeOfSupply: buyer.deliveryState,
    placeOfSupplyCode: buyer.deliveryStateCode,
    reverseCharge: "N",
    lineItems: processedItems,
    summary: {
      totalTaxablePaise,
      totalCgstPaise,
      totalSgstPaise,
      totalIgstPaise,
      totalTaxPaise,
      grandTotalPaise,
      grandTotalWords: `INR ${Math.round(grandTotalPaise / 100).toLocaleString("en-IN")} Only`,
    },
  };
}
