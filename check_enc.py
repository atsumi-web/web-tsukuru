
import os

def check_encoding(file_path):
    with open(file_path, 'rb') as f:
        content = f.read()
    
    encodings = ['utf-8', 'shift-jis', 'cp932', 'euc-jp']
    for enc in encodings:
        try:
            decoded = content.decode(enc)
            print(f"--- {enc} ---")
            print(decoded[:200])
        except Exception as e:
            print(f"--- {enc} failed ---")

if __name__ == "__main__":
    check_encoding(r'c:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\manuals\admin.html')
