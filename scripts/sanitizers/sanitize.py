import re
import os

filepath = 'site/client-work/09_kibou_no_hoshi/index.html'
outpath = 'site/client-work/09_kibou_no_hoshi/demo.html'

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# Sanitize Name
html = html.replace('希望の星', 'ビルドクリーン')

# Sanitize Addresses/Phone using general matching
# Search for standard Japanese addresses/phone numbers in the HTML content
html = re.sub(r'東京都[\w]+区[\w\-]+', '東京都港区青南1-2-3', html)
html = re.sub(r'03-\d{4}-\d{4}', '03-0000-0000', html)

# Let's target the exact text from the grep we saw earlier:
html = html.replace('渋谷区恵比寿2-28-10', '港区青南1-2-3 (サンプルの住所です)')
html = html.replace('恵比寿', '青山')

# Find representative name "代表取締役" to replace "大林" or whatever their name is
html = re.sub(r'代表取締役[\s\u3000]*[^\s<]+', '代表取締役 山田 太郎', html)

with open(outpath, 'w', encoding='utf-8') as f:
    f.write(html)
print("Sanitized successfully to demo.html")
