/**
 * Formula Injection (CSV / Spreadsheet Injection) Sanitizer
 * 
 * Complies with OWASP ASVS and Excel security recommendations:
 * Neutralizes dangerous formula triggers (=, +, -, @, tab, CR, LF, and full-width equivalents)
 * using the Excel-resistant quoted tab-prefix approach ("\t=...").
 */

const FORMULA_TRIGGERS = ['=', '+', '-', '@', '\t', '\r', '\n', '＝', '＋', '－', '＠'];
const FORMULA_REGEX = /(?:^|["',])\s*[=+\-@\t\r\n＝＋－＠]/;

/**
 * Sanitizes a single cell value for CSV export.
 * If the value is a string starting with a formula trigger or attempting quote-breakout formula injection,
 * prepends a tab character (\t) and escapes quotes properly for CSV.
 */
export function sanitizeSpreadsheetCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }

  // Preserve numbers, booleans, and dates without string corruption
  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : '""';
  }

  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE';
  }

  const str = String(value);

  // If empty string, return empty quotes
  if (str.length === 0) {
    return '""';
  }

  // Check if cell starts with a trigger or contains a quote/delimiter breakout attempt
  const isDangerous = FORMULA_REGEX.test(str);

  // Prepend tab if dangerous, then escape existing double quotes
  const safeStr = isDangerous ? `\t${str}` : str;
  const escaped = safeStr.replace(/"/g, '""');

  return `"${escaped}"`;
}

/**
 * Converts an array of objects into a sanitized CSV string.
 * All cell values are safely encoded against formula injection attacks.
 */
export function convertToSanitizedCSV<T extends Record<string, unknown>>(
  rows: T[],
  headers?: { key: keyof T; label: string }[]
): string {
  if (rows.length === 0) {
    if (!headers || headers.length === 0) return '';
    return headers.map(h => `"${h.label.replace(/"/g, '""')}"`).join(',') + '\r\n';
  }

  const cols = headers || Object.keys(rows[0]).map(k => ({ key: k as keyof T, label: k }));
  const headerLine = cols.map(c => `"${c.label.replace(/"/g, '""')}"`).join(',');

  const dataLines = rows.map(row => {
    return cols.map(col => sanitizeSpreadsheetCell(row[col.key])).join(',');
  });

  return [headerLine, ...dataLines].join('\r\n') + '\r\n';
}
