import re
import glob

files = sorted(glob.glob("src/data/articles/*.ts"))
valid_categories = {
    "linen", "cotton", "viscose", "flannel", "corduroy",
    "twill", "suede", "velvet", "wool", "fleece", "tweed"
}

print(f"Auditing {len(files)} article files...")

all_articles = []
for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Split by article block
    pattern = re.compile(r"slug:\s*['\"]([^'\"]+)['\"][\s\S]*?content:\s*`([\s\S]*?)`", re.MULTILINE)
    matches = pattern.findall(content)

    for slug, article_text in matches:
        words = len(re.findall(r'\b\w+\b', article_text))
        
        # Check elements
        h2_count = len(re.findall(r'^##\s', article_text, re.MULTILINE))
        h3_count = len(re.findall(r'^###\s', article_text, re.MULTILINE))
        h4_count = len(re.findall(r'^####\s', article_text, re.MULTILINE))
        hr_count = len(re.findall(r'^---', article_text, re.MULTILINE))
        table_count = len(re.findall(r'^\|', article_text, re.MULTILINE))
        ordered_list_count = len(re.findall(r'^\d+\.\s', article_text, re.MULTILINE))
        unordered_list_count = len(re.findall(r'^-\s', article_text, re.MULTILINE))
        
        # Check category links
        category_links = re.findall(r'\[([^\]]+)\]\((/category/[^\)]+)\)', article_text)
        broken_category_links = []
        for label, url in category_links:
            cat_slug = url.replace("/category/", "").strip("/")
            if cat_slug not in valid_categories:
                broken_category_links.append((label, url))

        all_articles.append({
            "filepath": filepath,
            "slug": slug,
            "words": words,
            "h2": h2_count,
            "h3": h3_count,
            "h4": h4_count,
            "hr": hr_count,
            "tables": table_count,
            "ordered_lists": ordered_list_count,
            "unordered_lists": unordered_list_count,
            "broken_links": broken_category_links
        })

print(f"\nAudit complete. Total articles scanned: {len(all_articles)}\n")
print(f"{'Slug':<42} | {'Words':<5} | {'H2':<2} | {'H3':<2} | {'H4':<2} | {'HR':<2} | {'Tbl':<3} | {'OL':<2} | {'UL':<2} | {'Broken Links'}")
print("-" * 105)

for a in all_articles:
    bl_str = ", ".join([u for l, u in a["broken_links"]]) if a["broken_links"] else "None"
    print(f"{a['slug']:<42} | {a['words']:<5} | {a['h2']:<2} | {a['h3']:<2} | {a['h4']:<2} | {a['hr']:<2} | {a['tables']:<3} | {a['ordered_lists']:<2} | {a['unordered_lists']:<2} | {bl_str}")
