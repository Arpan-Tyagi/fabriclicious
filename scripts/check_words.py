import re
import sys
import glob

files = sys.argv[1:] if len(sys.argv) > 1 else glob.glob("src/data/articles/*.ts")
if not files:
    files = ["src/data/journalArticles.ts"]

pattern = re.compile(r"slug:\s*['\"]([^'\"]+)['\"][\s\S]*?content:\s*`([\s\S]*?)`", re.MULTILINE)

total_count = 0
for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    matches = pattern.findall(text)
    print(f"=== {filepath} ({len(matches)} articles) ===")
    for slug, content in matches:
        words = len(re.findall(r'\b\w+\b', content))
        total_count += 1
        status = "PASSED (1000+)" if words >= 1000 else f"SHORT ({words} words)"
        print(f"[{status}] - {slug}: {words} words")

print(f"\nTotal articles verified: {total_count}")
