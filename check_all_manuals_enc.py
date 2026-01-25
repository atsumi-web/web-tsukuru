
import os

def check_file_encoding(file_path):
    with open(file_path, 'rb') as f:
        content = f.read()
    
    encodings = ['utf-8', 'shift-jis', 'cp932', 'euc-jp']
    results = {}
    for enc in encodings:
        try:
            content.decode(enc)
            results[enc] = True
        except:
            results[enc] = False
    return results

manuals_dir = 'manuals'
for filename in os.listdir(manuals_dir):
    if filename.endswith('.html'):
        path = os.path.join(manuals_dir, filename)
        enc_results = check_file_encoding(path)
        valid_encs = [enc for enc, valid in enc_results.items() if valid]
        print(f"{filename}: {valid_encs}")
