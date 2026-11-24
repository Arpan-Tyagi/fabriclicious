import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

test('Performance Audit: PagePreloader must not have artificial 1000ms blocking delay', () => {
  const preloaderPath = path.join(projectRoot, 'src', 'components', 'PagePreloader.tsx');
  const content = fs.readFileSync(preloaderPath, 'utf8');

  // Must not have artificial 1000ms delay blocking initial render
  assert.doesNotMatch(
    content,
    /setTimeout\(\s*\(\)\s*=>\s*setLoading\(false\)\s*,\s*1000\)/,
    'PagePreloader should not enforce a 1000ms artificial blocking delay on page load'
  );
});

test('Performance Audit: Storefront catalog and category routes must enable ISR/caching', () => {
  const fabricsPath = path.join(projectRoot, 'src', 'app', '(storefront)', 'fabrics', 'page.tsx');
  const fabricsContent = fs.readFileSync(fabricsPath, 'utf8');

  assert.doesNotMatch(
    fabricsContent,
    /export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"]/,
    '/fabrics should not force dynamic execution on every request'
  );
  assert.match(
    fabricsContent,
    /export\s+const\s+revalidate\s*=\s*\d+/,
    '/fabrics must specify an ISR revalidate interval'
  );

  const categoryPath = path.join(projectRoot, 'src', 'app', '(storefront)', 'category', '[slug]', 'page.tsx');
  const categoryContent = fs.readFileSync(categoryPath, 'utf8');

  assert.doesNotMatch(
    categoryContent,
    /export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"]/,
    '/category/[slug] should not force dynamic execution on every request'
  );
  assert.match(
    categoryContent,
    /export\s+async\s+function\s+generateStaticParams/,
    '/category/[slug] must export generateStaticParams for pre-rendering known categories'
  );
});

test('Performance Audit: Storefront journal routes must enable ISR and static parameters', () => {
  const journalPath = path.join(projectRoot, 'src', 'app', '(storefront)', 'journal', 'page.tsx');
  const journalContent = fs.readFileSync(journalPath, 'utf8');

  assert.doesNotMatch(
    journalContent,
    /export\s+const\s+revalidate\s*=\s*0/,
    '/journal should not disable caching with revalidate = 0'
  );
  assert.match(
    journalContent,
    /export\s+const\s+revalidate\s*=\s*[1-9]\d*/,
    '/journal must specify a positive ISR revalidate interval'
  );

  const articlePath = path.join(projectRoot, 'src', 'app', '(storefront)', 'journal', '[slug]', 'page.tsx');
  const articleContent = fs.readFileSync(articlePath, 'utf8');

  assert.match(
    articleContent,
    /export\s+async\s+function\s+generateStaticParams/,
    '/journal/[slug] must export generateStaticParams for pre-rendering articles'
  );
});

test('Performance Audit: Middleware must implement fast path for public requests without auth cookies', () => {
  const middlewarePath = path.join(projectRoot, 'src', 'middleware.ts');
  const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');

  // Must check for auth cookies before making network call to Supabase
  assert.match(
    middlewareContent,
    /hasAuthCookies/,
    'Middleware must check hasAuthCookies to skip external auth network calls for anonymous public traffic'
  );
});

test('Performance Audit: next.config.ts must configure package import optimization and static caching', () => {
  const configPath = path.join(projectRoot, 'next.config.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');

  assert.match(
    configContent,
    /compress:\s*true/,
    'next.config.ts must enable gzip/brotli compression'
  );
  assert.match(
    configContent,
    /optimizePackageImports/,
    'next.config.ts must configure optimizePackageImports for heavy libraries'
  );
  assert.match(
    configContent,
    /Cache-Control/,
    'next.config.ts must configure Cache-Control headers for static assets'
  );
});
