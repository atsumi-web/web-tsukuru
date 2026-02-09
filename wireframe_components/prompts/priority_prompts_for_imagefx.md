# ImageFX用 優先プロンプトリスト

> **目的:** えりさんがImageFXで優先的に生成すべきプロンプト  
> **推奨枚数:** 最初は5-8枚から

---

## 🎯 優先度：高（必ず作成）

### 1. 若手作業員（チーム作業）- #01

**用途:** ヒーローセクション、最重要  
**プロンプト:**

```
(Best Quality, Recruitment Photo), Construction site. Three young Japanese workers in their 20s collaborating on a task. Wearing white safety helmets and navy blue workwear. Bright, energetic expressions showing teamwork. Blue sky background. Natural lighting. Professional and trustworthy atmosphere. --ar 16:9
```

---

### 2. 現場社員インタビュー（リアル）- #12

**用途:** 社員紹介、採用ページ  
**プロンプト:**

```
(Best Quality, Employee Portrait), Construction site. Portrait of smiling young Japanese male worker in his 20s. White safety helmet and navy blue workwear. Blurred construction site background. Natural, approachable expression. Authentic, relatable atmosphere. --ar 3:4
```

---

### 3. 新築住宅（実績）- #06

**用途:** 実績紹介セクション  
**プロンプト:**

```
(Best Quality, Completed Project), Modern newly built Japanese house. Clean, contemporary exterior design. Blue sky background. Well-maintained garden visible. Professional photography. Atmosphere of quality craftsmanship and attention to detail. --ar 16:9
```

---

### 4. 設計打ち合わせ（プロ意識）- #09

**用途:** オフィス環境、会社紹介  
**プロンプト:**

```
(Best Quality, Business Meeting), Office interior. Three Japanese professionals discussing blueprints on a table. Serious, focused expressions. Clean, bright modern office. Natural window light. Atmosphere of professionalism and detailed planning. --ar 16:9
```

---

### 5. 現場全景（規模感）- #05

**用途:** 企業規模アピール  
**プロンプト:**

```
(Best Quality, Wide Landscape), Large-scale construction site overview. Multiple tower cranes, scaffolding, workers visible. New building structure rising against blue sky. Modern construction equipment. Professional, organized site. Atmosphere of large-scale projects and company capability. --ar 16:9
```

---

## ⭐ 優先度：中（余裕があれば）

### 6. 女性作業員（ダイバーシティ）- #03

**用途:** 女性採用アピール  
**プロンプト:**

```
(Best Quality, Diversity Photo), Construction site. Confident young Japanese woman in her 20s checking blueprints. White safety helmet, navy blue professional workwear. Bright, determined expression. Modern, well-organized site background. Natural sunlight. Atmosphere of diversity and inclusion. --ar 16:9
```

---

### 7. 社員BBQ（社風）- #15

**用途:** 福利厚生、アットホームな社風  
**プロンプト:**

```
(Best Quality, Company Event), Outdoor BBQ event. Japanese employees and their families enjoying barbecue together. Smiling, casual clothing. Warm, friendly atmosphere. Natural sunlight. Feeling of close-knit company culture and work-life balance. --ar 16:9
```

---

### 8. ベテラン職人（技術指導）- #02

**用途:** 教育制度、技術継承  
**プロンプト:**

```
(Best Quality, Mentoring Scene), Construction site interior. Experienced 50s Japanese craftsman teaching technique to 30s worker. Close-up on skilled hands demonstrating work. Serious, focused expressions. Navy blue or light gray professional workwear. Warm lighting highlighting the mentorship moment. Atmosphere of tradition and skill transfer. --ar 16:9
```

---

## 📋 生成後の対応

### ステップ1：画像を保存

```
wireframe_components/prompts/images/
├── prompt_01_young_workers.jpg
├── prompt_12_employee_portrait.jpg
├── prompt_06_completed_house.jpg
└── ...
```

### ステップ2：HTMLギャラリーに追加

私が画像パスを設定して、ギャラリーに表示されるようにします。

---

## 💡 ImageFX 使用のコツ

1. **アスペクト比の調整**
   - `--ar 16:9` → 横長（ヒーロー、実績紹介）
   - `--ar 3:4` → 縦長（社員ポートレート）

2. **プロンプトの微調整**
   - 色味を調整したい場合：`warm tones` や `cool tones` を追加
   - より明るく：`bright sunlight` を強調
   - より自然に：`natural, candid` を追加

3. **複数生成**
   - 各プロンプトで2-3枚生成して、ベストを選ぶ

---

**最初はこの5-8枚から始めて、使い勝手を確認しながら残りを追加していきましょう！**
