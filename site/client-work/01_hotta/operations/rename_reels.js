// rename_reels.js
// Canvaからバッチごとにダウンロードした動画ファイルに、バッチ名のプレフィックスを付ける
//
// 【使い方】
// 1. Canvaから各バッチをダウンロードし、以下のようなフォルダ構成にする:
//
//    downloads/
//      01AB/
//        reel_01.mp4
//        reel_02.mp4
//        ...
//      02CD/
//        reel_01.mp4
//        ...
//
// 2. 以下のコマンドを実行:
//    node rename_reels.js <downloadsフォルダのパス> [output先フォルダ]
//
//    例: node rename_reels.js "C:/Users/eri76/Downloads/reels" "C:/Users/eri76/Downloads/reels_renamed"
//
// 3. 出力例:
//    01AB_reel_01.mp4
//    01AB_reel_02.mp4
//    02CD_reel_01.mp4
//    ...

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('使い方: node rename_reels.js <downloadsフォルダ> [output先フォルダ]');
  process.exit(1);
}

const srcDir    = args[0];
const outputDir = args[1] || path.join(srcDir, '_renamed');

// output先がなければ作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`[作成] 出力フォルダ: ${outputDir}`);
}

// バッチフォルダ一覧を取得（例: 01AB, 02CD など）
const batches = fs.readdirSync(srcDir).filter(name => {
  const full = path.join(srcDir, name);
  return fs.statSync(full).isDirectory() && name !== '_renamed';
});

if (batches.length === 0) {
  console.error('[エラー] バッチフォルダが見つかりません。');
  process.exit(1);
}

let totalRenamed = 0;

for (const batch of batches.sort()) {
  const batchDir = path.join(srcDir, batch);
  const files = fs.readdirSync(batchDir).filter(f => {
    return /\.(mp4|mov|avi|mkv|webm)$/i.test(f);
  });

  for (const file of files.sort()) {
    const ext      = path.extname(file);
    const baseName = path.basename(file, ext);
    const newName  = `${batch}_${baseName}${ext}`;
    const srcPath  = path.join(batchDir, file);
    const dstPath  = path.join(outputDir, newName);

    fs.copyFileSync(srcPath, dstPath);
    console.log(`[OK] ${file}  →  ${newName}`);
    totalRenamed++;
  }
}

console.log(`\n完了: ${totalRenamed}本のファイルをリネームしました → ${outputDir}`);
