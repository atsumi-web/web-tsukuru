const fs = require("fs");
const path = "site/manuals/saiyou_shikumi_map.html";
let c = fs.readFileSync(path, "utf8");
const old =
  "\u6d41\u5165\u3092\u5897\u3084\u3059\u624b\u6bb5\u3092\u8ffd\u52a0\u3002</p>";
const note =
  '<br><span style="font-size:0.78rem;color:#94a3b8;">\u203b\u3053\u306e\u6bb5\u968e\u306b\u3064\u3044\u3066\u306f\u6e21\u7f8e\u81ea\u8eab\u3082\u73fe\u5728\u52c9\u5f37\u30fb\u691c\u8a3c\u4e2d\u3067\u3059\u3002\u5b9f\u65bd\u30bf\u30a4\u30df\u30f3\u30b0\u30fb\u52b9\u679c\u306f\u4e00\u7dd2\u306b\u5224\u65ad\u3057\u307e\u3059\u3002</span></p>';
if (c.includes(old)) {
  c = c.replace(
    old,
    "\u6d41\u5165\u3092\u5897\u3084\u3059\u624b\u6bb5\u3092\u8ffd\u52a0\u3002" +
      note,
  );
  fs.writeFileSync(path, c, "utf8");
  console.log("OK: replaced");
} else {
  console.log("NG: not found");
  const idx = c.indexOf("Instagram");
  if (idx >= 0) console.log(JSON.stringify(c.slice(idx, idx + 100)));
}
