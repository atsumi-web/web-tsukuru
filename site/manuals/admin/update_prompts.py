import re

html_path = 'video_prompts_guide.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Update header title
html = html.replace('動画生成プロンプト集（全28選）', '動画生成プロンプト集（全42選）')
html = html.replace('単一指定のプロンプト（全22個）', '単一指定のプロンプト（全34個）')

# Replace the inner panels section by section using regex
# We will just write a new file content manually by extracting the wrapper and reconstructing the grid2 content.

# Let's extract everything before grid2
parts = html.split('<div class="grid2">')
header = parts[0]
footer_parts = parts[1].split('<a href="#top" id="back-to-top">')
grid2_content = footer_parts[0]
footer = '<a href="#top" id="back-to-top">' + footer_parts[1]

# Now, we manually define the new grid2 content.

# 1. Rules Panel (Keep As Is)
rules = grid2_content.split('<!-- A. スマホ・ICT化 -->')[0]

panel_a = '''<!-- A. スマホ・ICT化 -->
    <div class="panel" style="border-color: rgba(59, 130, 246, 0.3);">
      <div class="panel-header" style="background: rgba(59, 130, 246, 0.1);">
        <div class="panel-title" style="color: var(--accent-blue);">
          <i class="fa-solid fa-mobile-screen"></i> A. スマホ・ICT化（先進性・管理のスマートさ）
        </div>
      </div>
      <div class="panel-body">
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">用途：「求人媒体の限界」「効率化」など、古い体質からの脱却をテーマにする時に最適。</p>
        
        <div class="prompt-title">1. タブレットを見る若手監督（ネイビーブルー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box">Cinematic slow motion, a young Japanese male construction manager in clean navy blue modern workwear and a plain white hard hat without any logos, swiping on an iPad on a bright construction site. Soft cinematic sunlight, realistic, sharp focus, 8k, no text, no signs, no text on clothing. --ar 9:16</div>
        </div>

        <div class="prompt-title">2. スマホで笑顔の報告（シルバーグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box">A Japanese female site supervisor holding a smartphone and smiling confidently, clean silver grey work clothes, plain white hard hat, construction site background blurred, golden hour lighting, photorealistic, no text, no letters, no banners. --ar 9:16</div>
        </div>

        <div class="prompt-title">3. ドローンによる現場俯瞰と監督（カーキ）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box">High angle drone shot tracking a young Japanese construction worker in khaki uniform and plain white hard hat checking a digital tablet, dynamic lighting, professional and clean atmosphere, no text, no logos. --ar 9:16</div>
        </div>

        <div class="prompt-title">4. 綺麗な現場事務所での図面確認（チャコール）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box">Medium shot, a Japanese construction worker in charcoal workwear and a plain white hard hat sitting in a bright, modern pre-fab site office, looking at a laptop with a serious but calm expression, natural daylight, no text, no signs anywhere. --ar 9:16</div>
        </div>

        <div class="prompt-title">5. ノートPCを開く監督（ライトグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box">A young Japanese construction manager in clean light grey workwear and a plain white hard hat, typing on a modern laptop at a well-lit construction site office, highly detailed, professional, no text, no logos. --ar 9:16</div>
        </div>

        <div class="prompt-title">6. デジタル測量機を操作する作業員（ネイビーブルー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box">A Japanese male worker in navy blue workwear and a plain white hard hat carefully operating a modern digital surveying tool on a tripod at a local construction site, cinematic sunlight, realistic, no text, no banners. --ar 9:16</div>
        </div>
      </div>
    </div>
'''

panel_b = '''
    <!-- B. 笑顔・チームワーク -->
    <div class="panel" style="border-color: rgba(249, 115, 22, 0.3);">
      <div class="panel-header" style="background: rgba(249, 115, 22, 0.1);">
        <div class="panel-title" style="color: var(--accent-orange);">
          <i class="fa-solid fa-users"></i> B. 笑顔・チームワーク（人間関係の良さ・定着率）
        </div>
      </div>
      <div class="panel-body">
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">用途：「離職率」「社内の雰囲気」「社長が変われば」などの共感テーマの背景に。</p>
        
        <div class="prompt-title">7. 若手とベテランの笑顔の対話（ネイビー＆カーキ）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-orange);">Two Japanese construction workers, a young man in navy blue and an experienced veteran in khaki workwear, checking a blueprint together and laughing. Both wearing plain white hard hats, beautiful morning light, cinematic, distinct individual faces, no clones, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">8. 朝礼での集合・談笑（混色）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-orange);">Over the shoulder shot, a diverse team of Japanese construction workers in mixed colored uniforms (navy, silver, charcoal) standing together and chatting at a morning meeting, plain white hard hats, positive energy, bright blue sky, realistic, distinct individual faces, no clones, no signs. --ar 9:16</div>
        </div>

        <div class="prompt-title">9. 休憩中の談笑（シルバーグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-orange);">Three young Japanese construction workers in clean silver grey workwear holding canned coffee and chatting during a break, relaxed and happy atmosphere, bright clean construction site in the background, photorealistic, distinct individual faces, no twins, no text, no logos. --ar 9:16</div>
        </div>

        <div class="prompt-title">10. 道具の使い方を優しく教える先輩（カーキ）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-orange);">A veteran Japanese carpenter in khaki workwear gently teaching a young apprentice how to use a surveying tool, warm sunlight streaming through the site, plain white hard hats, heartwarming mentorship, highly detailed, distinct faces, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">11. 複数人の若手でのミーティング（チャコール）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-orange);">A group of young Japanese construction workers in charcoal workwear standing in a circle having a productive meeting, plain white hard hats, smiling, beautiful morning sunshine, team spirit, distinct individual faces, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">12. カメラ目線のチーム集合写真風（ライトグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-orange);">A happy team of four Japanese construction workers in light grey workwear smiling warmly and looking directly at the camera, plain white hard hats, standing together at a clean construction site, bright blue sky, distinct faces, no clones, no text. --ar 9:16</div>
        </div>
      </div>
    </div>
'''

panel_c = '''
    <!-- C. 女性・若手の活躍 -->
    <div class="panel" style="border-color: rgba(139, 92, 246, 0.3);">
      <div class="panel-header" style="background: rgba(139, 92, 246, 0.1);">
        <div class="panel-title" style="color: var(--accent-purple);">
          <i class="fa-solid fa-person-rays"></i> C. 女性・若手の活躍（ダイバーシティ・未経験歓迎）
        </div>
      </div>
      <div class="panel-body">
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">用途：「特定のターゲット」「未経験でも安心」「古い業界を変える」テーマ背景に。</p>
        
        <div class="prompt-title">13. 指示を出す頼もしい若手女性（チャコール）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-purple);">A confident young Japanese female construction supervisor in charcoal work uniform pointing forward with a smile on a bright sunny site, empowering, plain white hard hat without any logos, cinematic lighting, no text, no signs. --ar 9:16</div>
        </div>

        <div class="prompt-title">14. 現場を歩く爽やかな20代男性（ネイビーブルー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-purple);">Slow motion, a 20-something Japanese male worker confidently walking towards the camera on a construction site, clean navy blue work clothes, plain white hard hat, looking determined and fresh, dramatic morning lighting, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">15. オフィスカジュアルと作業着の打ち合わせ（シルバーグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-purple);">A young Japanese woman in stylish office casual clothes talking with a young male site worker in a clean silver grey uniform, modern construction office setting, bright sunny day, highly realistic, distinct faces, no text, no logos. --ar 9:16</div>
        </div>

        <div class="prompt-title">16. 真剣な眼差しからフワッと笑う若手（カーキ）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-purple);">Portrait of a handsome young Japanese construction worker in khaki workwear looking directly at the camera with a gentle and confident smile, plain white hard hat, soft natural lighting, extremely detailed face, 4k, no text, no letters. --ar 9:16</div>
        </div>

        <div class="prompt-title">17. 若手同士のハイタッチ（ライトグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-purple);">Two young Japanese construction workers in light grey workwear happily high fiving each other at a sunny construction site, both wearing plain white hard hats, celebration, energetic, realistic, distinct faces, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">18. 女性監督と職人の和やかな会話（ネイビーブルー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-purple);">A female Japanese site manager and a male worker in navy blue workwear having a friendly conversation looking at a blueprint, plain white hard hats, bright construction site, positive atmosphere, highly detailed, no text. --ar 9:16</div>
        </div>
      </div>
    </div>
'''

panel_d = '''
    <!-- D. 高所・安全第一 -->
    <div class="panel" style="border-color: rgba(16, 185, 129, 0.3);">
      <div class="panel-header" style="background: rgba(16, 185, 129, 0.1);">
        <div class="panel-title" style="color: var(--accent-green);">
          <i class="fa-solid fa-helmet-safety"></i> D. 高所・安全第一（プロフェッショナル・職人の美学）
        </div>
      </div>
      <div class="panel-body">
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">★えりさん指定：高所作業時は必ず安全帯（フルハーネス仕様）を記述。</p>

        <div class="prompt-title">19. 足場での安全確認（ネイビーブルー＋フルハーネス）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-green);">A skilled Japanese construction worker in clean navy blue workwear and a plain white hard hat, wearing a full body safety harness with double lanyards, standing safely on scaffolding at a small local construction site, looking at the clear blue sky, highly realistic, no text, no banners. --ar 9:16</div>
        </div>

        <div class="prompt-title">20. 足場の上でインカムで話す監督（シルバーグレー＋フルハーネス）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-green);">Close up of a site manager in silver grey uniform and a plain white hard hat, wearing a professional full body safety harness, looking seriously at the construction site on high scaffolding, deeply focused, cinematic sunlight, no text, no logos. --ar 9:16</div>
        </div>

        <div class="prompt-title">21. 朝陽の中でのフルハーネスの確認（チャコール）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-green);">Detail shot, a Japanese worker in a charcoal uniform rigorously checking the straps of his full body safety harness in the beautiful morning light, cinematic preparation for safe work, sharp focus, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">22. ローカル現場での足場と図面（カーキ＋フルハーネス）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-green);">A young Japanese worker in khaki workwear and a plain white hard hat, wearing a full body safety harness, safely unrolling a blueprint on a scaffolding platform at a local 3-story building construction site, bright sunny day, wide angle view, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">23. 夕暮れ時のシルエット安全確認（ライトグレー＋フルハーネス）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-green);">A Japanese worker in light grey workwear with a full body safety harness and plain white hard hat, beautiful silhouette against a golden hour sunset on top of a construction site, cinematic lighting, dramatic, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">24. ハーネスのランヤードをかける瞬間（ネイビーブルー＋フルハーネス）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-green);">Extreme close up, a Japanese worker in navy blue workwear attaching the lanyard hook of a full body safety harness to a steel pipe, highly detailed hands, safety first, bright daytime, plain white hard hat, no text. --ar 9:16</div>
        </div>
      </div>
    </div>
'''

panel_e = '''
    <!-- E. 風景・抽象表現・静物 -->
    <div class="panel" style="border-color: rgba(212, 175, 55, 0.3);">
      <div class="panel-header" style="background: rgba(212, 175, 55, 0.1);">
        <div class="panel-title" style="color: var(--accent-gold);">
          <i class="fa-solid fa-mountain-sun"></i> E. 風景・抽象表現・静物（文字を大きく目立たせる背景用）
        </div>
      </div>
      <div class="panel-body">
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">用途：文字情報をたくさん読ませたい時や、採用コストなどのシビアな話題の時に邪魔にならない背景。</p>

        <div class="prompt-title">25. 流れる雲と中小規模の現場（タイムラプス風）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-gold);">Time-lapse style shot of a small to medium sized local Japanese construction site under a clear blue sky, dynamic clouds passing quickly, high contrast, cinematic atmosphere, clean framing, completely empty sky space for text, no massive skyscrapers, no signs, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">26. 朝陽が差し込む美しい足場の中（静物・人なし）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-gold);">Sun rays filtering through steel scaffolding at a clean construction site during early morning, crystal clear air, cinematic, peaceful industrial aesthetic, 8k, empty areas for text overlay, no floating dust, no text, no signs. --ar 9:16</div>
        </div>

        <div class="prompt-title">27. 図面と白ヘルメットの静物画（人なし）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-gold);">Top-down view, a blank blueprint, a modern digital tablet, and a clean plain white hard hat resting on a wooden table at a construction site office. Soft daylight, neat and organized, minimalist, no text, no letters, no logos on the hat. --ar 9:16</div>
        </div>

        <div class="prompt-title">28. 完成した低層の建物を下から見上げる澄み切った空（達成感）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-gold);">Looking straight up from the ground past a beautiful newly built 3-story local Japanese apartment building facade into a clear deep blue sky, bright sunlight, vast empty sky perfect for adding text, no massive skyscrapers, no text, no banners. --ar 9:16</div>
        </div>

        <div class="prompt-title">29. クレーンの幾何学的な鉄骨美（風景）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-gold);">Cinematic shot of a beautiful geometric steel frame structure and a yellow crane reaching into a clear blue sky, minimal, clean lines, construction aesthetic, empty sky for text, no text, no signs. --ar 9:16</div>
        </div>

        <div class="prompt-title">30. 美しいマジックアワーと建築中の現場（風景）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: var(--accent-gold);">A beautiful magic hour sunset over a small local Japanese construction site silhouette, deep purple and orange sky, peaceful, cinematic, emotional, massive empty space in the sky for text overlay, no text. --ar 9:16</div>
        </div>
      </div>
    </div>
'''

panel_f = '''
    <!-- F. リアルな現場環境・機材 -->
    <div class="panel" style="border-color: rgba(100, 116, 139, 0.3);">
      <div class="panel-header" style="background: rgba(100, 116, 139, 0.1);">
        <div class="panel-title" style="color: #64748b;">
          <i class="fa-solid fa-truck-pickup"></i> F. リアルな現場環境・機材（泥臭さ・現場感）
        </div>
      </div>
      <div class="panel-body">
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">用途：より「自分たちの職場に近い」リアリティ（泥臭さや重機のアピール）を出したい時に最適。</p>

        <div class="prompt-title">31. 軽トラの荷台で確認作業（シルバーグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #64748b;">A young Japanese construction worker in clean silver grey workwear and a plain white hard hat standing next to a white Japanese kei truck (mini truck) parked at a local residential construction site, checking documents on a clipboard, sunny day, realistic, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">32. 小型ショベルカーと待機するオペレーター（ネイビーブルー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #64748b;">A Japanese male heavy equipment operator in navy blue uniform and a plain white hard hat standing proudly next to a yellow compact excavator at a local civil engineering site, beautiful cinematic lighting, sharp focus, no text, no logos. --ar 9:16</div>
        </div>

        <div class="prompt-title">33. 測量機（レベル）を覗き込む若手（カーキ）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #64748b;">Close up of a highly focused young Japanese surveyor in khaki workwear and a plain white hard hat, looking through a yellow optical level (surveying instrument) mounted on a tripod at a bright local construction site, highly realistic, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">34. 資材の受け入れと笑顔の挨拶（チャコール）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #64748b;">A friendly Japanese site manager in charcoal work uniform and a plain white hard hat directing a truck driver with a warm smile, local construction site background, bright clear sky, cinematic, highly detailed distinct face, no text, no letters. --ar 9:16</div>
        </div>

        <div class="prompt-title">35. トラックへの積み込み作業（ライトグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #64748b;">A Japanese worker in light grey workwear safely loading construction materials onto a small white truck at a local site, plain white hard hat, bright daylight, realistic, industrious, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">36. 電動工具の火花が出ないクリーンな作業シーン（ネイビーブルー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #64748b;">A Japanese carpenter in navy blue workwear using a clean power tool on a wooden board, beautifully lit construction site, plain white hard hat, no flying sparks, extremely clean and clear air, no floating dust, realistic, no text. --ar 9:16</div>
        </div>
      </div>
    </div>
'''

panel_g = '''
    <!-- G. 女性の活躍（多様な働き方） -->
    <div class="panel" style="border-color: rgba(236, 72, 153, 0.3);">
      <div class="panel-header" style="background: rgba(236, 72, 153, 0.1);">
        <div class="panel-title" style="color: #ec4899;">
          <i class="fa-solid fa-person-dress"></i> G. 女性の活躍・多様性（スマートさ・親しみやすさ）
        </div>
      </div>
      <div class="panel-body">
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">用途：女性ターゲットや、「業界の古いイメージを払拭したい」時に。現場のクリーンさも強調されます。</p>

        <div class="prompt-title">37. タブレットで指示を出す女性現場監督（ネイビーブルー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #ec4899;">A confident young Japanese female construction manager in clean navy blue workwear and a plain white hard hat, holding a digital tablet and smiling kindly, bright local construction site, photorealistic, distinct female face, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">38. 現場でヘルメットを小脇に抱え微笑む女性（シルバーグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #ec4899;">Portrait of a beautiful Japanese female construction worker in clean silver grey work clothes, holding a plain white hard hat under her arm, smiling softly at the camera, soft cinematic sunlight, beautifully blurred construction site background, 8k, no text, no logos. --ar 9:16</div>
        </div>

        <div class="prompt-title">39. 重機の運転席に座るカッコいい女性（カーキ）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #ec4899;">A cool Japanese female heavy equipment operator in khaki workwear and a plain white hard hat sitting confidently in the cabin of an excavator, giving a slight smile, cinematic lighting, highly realistic, empowering, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">40. 女性作業員同士の和やかなコーヒー休憩（チャコール）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #ec4899;">Two Japanese female construction workers in charcoal work uniforms and plain white hard hats sitting together during a break, holding canned coffee and laughing cheerfully, clean local construction site, bright daylight, distinct female faces, no clones, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">41. 現場事務所での図面作成（ライトグレー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #ec4899;">A Japanese female construction worker in light grey workwear drawing blueprints at a large desk in a modern brightly lit site office, wearing a plain white hard hat, concentrated expression, highly detailed, no text. --ar 9:16</div>
        </div>

        <div class="prompt-title">42. ヘルメット姿の女性の力強い横顔（ネイビーブルー）</div>
        <div class="copy-container">
          <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
          <div class="prompt-box" style="border-left-color: #ec4899;">Close up profile shot of a strong Japanese female construction worker in navy blue workwear wearing a plain white hard hat, looking intently at a construction site in the golden morning light, empowering, cinematic, detailed skin texture, no text. --ar 9:16</div>
        </div>
      </div>
    </div>
'''

new_grid2 = f'<div class="grid2">\\n{rules}\\n{panel_a}\\n{panel_b}\\n{panel_c}\\n{panel_d}\\n{panel_e}\\n{panel_f}\\n{panel_g}\\n</div>\\n'

# Update the JS array
footer = re.sub(
    r'const targetPrompts = \[.*?\];',
    'const targetPrompts = [1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,31,32,33,34,35,36,37,38,39,40,41,42];',
    footer
)

final_html = header + new_grid2 + footer

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(final_html)

print("HTML script updated successfully.")
