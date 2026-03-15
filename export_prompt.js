const fs = require('fs');
const content = fs.readFileSync('site/manuals/admin/reel_script_guide.html', 'utf-8');

let textContent = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
textContent = textContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
textContent = textContent.replace(/<[^>]+>/g, '');
textContent = textContent.replace(/^\s*[\r\n]/gm, '');
textContent = textContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const promptText = `以下のテキストは、私が自社のスタッフやAIエージェント（コピーライター役）に向けて作成した「Instagramリール台本生成の完全マニュアル（指示書・ルールブック）」です。

建設業の採用LP専門のWeb制作会社として、クライアントに向けてリール動画を大量生産するためのルールがまとまっています。

現在このマニュアルは完成しているつもりですが、プロのマーケター・コピーライターの視点から見て、「ここが足りない」「このルールは抜け穴がある」「AIに指示する際、この書き方だと期待外れな出力になる危険性がある」「こういうチェック項目も足したほうがいい」といった**【マニュアル自体の改善点や死角】**があれば、厳しく指摘し、具体的な修正案・追加案を提示してください。

----
【マニュアル本文】
` + textContent;

fs.writeFileSync('planning/reels/manual_review_prompt.md', promptText);
console.log('Done');
