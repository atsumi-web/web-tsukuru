import os
import re

base_dir = r"C:\Users\eri76\OneDrive\Desktop\VSC\web-tsukuru\site\client-work\05_soshou\hp"

desc_map = {
    "about.html": "株式会社蒼翔（SOSHOU）の会社概要と代表メッセージ。「キツい・汚い・危険」な建設業の常識を覆す、次世代型のプロフェッショナル集団のビジョンについて。",
    "recruit.html": "株式会社蒼翔（SOSHOU）の採用情報。未経験でも安心の月給制、完全週休二日、最新フルハーネス等完全支給。若手からベテランまで誇りを持って働ける環境です。",
    "contact.html": "株式会社蒼翔（SOSHOU）へのお問い合わせフォーム。足場工事・鉄骨工事のご相談や、採用に関するご質問など、LINEまたはメールフォームよりお気軽にお問い合わせください。",
    "interview-rookie.html": "未経験から飛び込んだ19歳の若手職人の生の声。先輩の丁寧な指導と、完全週休二日・残業なしでプライベートも充実する株式会社蒼翔（SOSHOU）のリアルな現場。",
    "interview-leader.html": "異業種から転職し、26歳で職長・現場監督へ。iPadによる3D図面の活用や最新安全装備など、家族を守りながら最速でキャリアアップできる株式会社蒼翔（SOSHOU）の環境。",
    "interview-veteran.html": "他社を経験した34歳ベテラン職人の声。株式会社蒼翔（SOSHOU）の圧倒的な安全基準と福利厚生、「絶対に落とさせない・ケガさせない」という本物のプロ環境への誇りを語ります。",
    "scaffold.html": "株式会社蒼翔（SOSHOU）の大規模仮設足場工事。高層ビルや大型商業施設において、他業態が極限のパフォーマンスを発揮できる「安全で精緻な足場」を組み上げます。",
    "steel.html": "株式会社蒼翔（SOSHOU）の鉄骨鳶（建方工事）。巨大な鉄骨をミリ単位の精度でジョイントする、圧倒的な連携で工期短縮と安全に貢献する無双の技術。"
}

for root, _, files in os.walk(base_dir):
    for file in files:
        if not file.endswith(".html"):
            continue
            
        filepath = os.path.join(root, file)
        filename = file
        
        # Determine depth for root-path
        # Example: base_dir is hp. If file is in hp, depth is 0. If in hp/recruit, depth is 1.
        rel_path = os.path.relpath(filepath, base_dir)
        depth = 0 if rel_path == filename else rel_path.count(os.sep)
        root_path = "../" * depth if depth > 0 else "./"
        
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # 1. Update css link to include ?v=1.1
        content = re.sub(r'(href=".*?style\.css)(")', r'\1?v=1.1\2', content)
        content = content.replace("?v=1.1?v=1.1", "?v=1.1") # Safety
        
        # 2. Update shared-nav script tag
        content = re.sub(r'<script src=".*?shared-nav\.js"(.*?)></script>', f'<script src="{root_path}js/shared-nav.js" data-root-path="{root_path}"></script>', content)

        # 3. Add meta description if not there
        if filename in desc_map and "<meta name=\"description\"" not in content:
            desc = desc_map[filename]
            content = re.sub(r'(<title>.*?</title>)', f'\\1\n    <meta name="description" content="{desc}">', content, flags=re.IGNORECASE)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
            
print("Update complete")
