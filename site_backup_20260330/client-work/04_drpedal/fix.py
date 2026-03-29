import os

html_dir = r"C:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\site\client-work\04_drpedal\hp"
fixed_count = 0

for root, _, files in os.walk(html_dir):
    for fn in files:
        if fn.endswith(".html"):
            filepath = os.path.join(root, fn)
            with open(filepath, "rb") as f:
                raw = f.read()

            if raw.startswith(b"\xff\xfe"):
                print(f"Fixing {fn} (UTF-16 LE detected)")
                content = raw.decode("utf-16")
                with open(filepath, "w", encoding="utf-8", newline="\n") as f:
                    f.write(content)
                fixed_count += 1
            else:
                try:
                    raw.decode("utf-8")
                except UnicodeDecodeError:
                    print(f"Fixing {fn} (Shift_JIS detected)")
                    try:
                        # PowerShell might have saved in typical Windows encoding (cp932)
                        content = raw.decode("cp932")
                        with open(filepath, "w", encoding="utf-8", newline="\n") as f:
                            f.write(content)
                        fixed_count += 1
                    except Exception as e:
                        print(f"Error fixing {fn}: {e}")

print(f"Total fixed: {fixed_count}")
