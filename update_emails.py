import os
import re

target_dir = r'c:\Users\arpan\OneDrive\Desktop\code\fabriclicious\src\emails'

for f in os.listdir(target_dir):
    if f.endswith('.tsx'):
        path = os.path.join(target_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        new_content = content
        new_content = re.sub(r'const ink = \".*?\";.*', 'const ink = \"#1C1A18\";', new_content)
        new_content = re.sub(r'const bg = \".*?\";.*', 'const bg = \"#E6E2D8\";', new_content)
        new_content = re.sub(r'const container = \".*?\";.*', 'const container = \"#DDD8CD\";', new_content)
        new_content = re.sub(r'const border = \".*?\";.*', 'const border = \"#CBC4B5\";', new_content)
        new_content = re.sub(r'const accent = \".*?\";.*', 'const accent = \"#8A7968\";', new_content)
            
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Updated {path}')
