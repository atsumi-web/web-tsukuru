import re

html_path = 'video_prompts_guide.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Update header title
html = html.replace('動画生成プロンプト集（全42選）', '動画生成プロンプト集（全48選）')
html = html.replace('単一指定のプロンプト（全34個）', '単一指定のプロンプト（全34個）')  # We will NOT color-change event prompts as they are casual/plain clothes, except maybe one

panel_h = '''
      <!-- H. 会社行事・イベント・オフの顔 -->
      <div class="panel" style="border-color: rgba(234, 179, 8, 0.3);">
        <div class="panel-header" style="background: rgba(234, 179, 8, 0.1);">
          <div class="panel-title" style="color: #eab308;">
            <i class="fa-solid fa-beer-mug-empty"></i> H. 会社行事・イベント・オフの顔（仲の良さ・アットホーム）
          </div>
        </div>
        <div class="panel-body">
          <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">用途：「休日や仕事終わりの過ごし方」「福利厚生」「アットホームな社風」のアピールに。※基本は私服指定です。</p>

          <div class="prompt-title">43. 仕事終わりの和やかなBBQ（私服）</div>
          <div class="copy-container">
            <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
            <div class="prompt-box" style="border-left-color: #eab308;">A cheerful group of Japanese construction co-workers in casual weekend clothes having a fun outdoor BBQ party, laughing and eating together, warm summer evening light, relaxed atmosphere, distinct individual faces, no clones, no text. --ar 9:16</div>
          </div>

          <div class="prompt-title">44. 社員旅行での宴会・乾杯（浴衣・和室）</div>
          <div class="copy-container">
            <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
            <div class="prompt-box" style="border-left-color: #eab308;">A happy team of Japanese construction workers sitting together in a traditional Japanese tatami room at a hot spring ryokan, wearing casual yukata, raising glasses in a cheerful toast, company trip, warm lighting, distinct faces, no text. --ar 9:16</div>
          </div>

          <div class="prompt-title">45. 週末のフットサルで汗を流す若手（スポーツウェア）</div>
          <div class="copy-container">
            <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
            <div class="prompt-box" style="border-left-color: #eab308;">A group of athletic young Japanese male construction workers in casual sportswear playing futsal (indoor soccer) on a weekend, smiling and high-fiving, energetic, healthy lifestyle, bright lighting, no text. --ar 9:16</div>
          </div>

          <div class="prompt-title">46. 事務所でのピザパーティー（作業着・混色）</div>
          <div class="copy-container">
            <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
            <div class="prompt-box" style="border-left-color: #eab308;">Young Japanese construction workers in mixed workwear (navy, silver, khaki) sitting in a bright modern site office eating pizza and laughing together, off-duty relaxed moment, plain white hard hats resting on the desk, distinct faces, no text. --ar 9:16</div>
          </div>

          <div class="prompt-title">47. 仕事終わりの居酒屋での一杯（私服）</div>
          <div class="copy-container">
            <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
            <div class="prompt-box" style="border-left-color: #eab308;">Two young Japanese construction workers in casual comfortable clothes sitting at a cozy wooden izakaya counter, drinking draft beer and laughing happily after a hard day of work, warm ambient lighting, distinct faces, no text. --ar 9:16</div>
          </div>

          <div class="prompt-title">48. 忘年会・新年会での笑顔の集合写真風（フォーマルカジュアル）</div>
          <div class="copy-container">
            <button class="copy-btn" onclick="copyPrompt(this)"><i class="fa-regular fa-copy"></i> コピー</button>
            <div class="prompt-box" style="border-left-color: #eab308;">A large diverse group of Japanese construction company employees in smart casual winter clothes smiling warmly at the camera at a modern restaurant year-end party, holding drinks, strong team bond, celebratory mood, distinct human faces, no clones, no text. --ar 9:16</div>
          </div>
        </div>
      </div>
'''

# Find the insertion point before the closing </div> of <div class="grid2">
insert_pos = html.rfind('</div>\\n    <a href="#top" id="back-to-top">')
html = html[:insert_pos] + panel_h + html[insert_pos:]

# Update targetPrompts for JS to process color shifts (None of the event ones should be color-shifted dynamically, but we will leave targetPrompts untouched as they don't apply)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML script updated successfully.")
