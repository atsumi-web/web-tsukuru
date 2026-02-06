# Type-C Image Optimization Logic

# 1. Logo Optimization (Critical: 526KB -> Target <20KB)
# Displayed at ~56px height. Resize to 112px height for Retina.
magick "templates/type-c/yamato_symbol_logo_1770173769718.webp" -resize x200 -quality 90 "templates/type-c/yamato_symbol_logo_1770173769718.webp"

# 2. Large Photo Optimization (Critical: ~1MB -> Target <150KB)
# CEO Image (Displayed 280x280) -> Resize to 600px width
magick "templates/type-c/trust_ceo_1770165762077.webp" -resize 600x -quality 75 "templates/type-c/trust_ceo_1770165762077.webp"

# Desk Image (Displayed 544x544) -> Resize to 1024px width
magick "templates/type-c/trust_schedule_desk_1770175312710.webp" -resize 1024x -quality 75 "templates/type-c/trust_schedule_desk_1770175312710.webp"

# Drone Op (Displayed 368x368) -> Resize to 800px width
magick "templates/type-c/trust_gallery_drone_op_1770174286479.webp" -resize 800x -quality 75 "templates/type-c/trust_gallery_drone_op_1770174286479.webp"

# Veteran (Displayed 635x635) -> Resize to 1200px width (Hero-ish usage?)
magick "templates/type-c/trust_final_veteran_clean_1770167746457.webp" -resize 1200x -quality 75 "templates/type-c/trust_final_veteran_clean_1770167746457.webp"

echo "Type-C Specific Optimization Completed"
