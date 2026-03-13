import glob
import re

files = glob.glob('planning/reels/google_flow_prompts_*.md')

suffix = " Clean air, no flying dust, no wood chips, completely calm atmosphere."

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all code blocks starting with ```text and ending with ```
    def replace_block(match):
        block_content = match.group(1)
        
        # Don't append if it already has it
        if suffix.strip() in block_content:
            return match.group(0)
            
        # Exception 1: Active work prompt 1 (dust particles in the air)
        if "dust particles in the air" in block_content:
            return match.group(0)
            
        # Exception 2: Active work prompt 7 (dust kicking up)
        if "dust kicking up" in block_content:
            return match.group(0)

        # Append suffix before the closing backticks
        # Remove trailing newline if exists at the end of block_content
        stripped_content = block_content.rstrip()
        
        # Add period if it doesn't end with one
        if not stripped_content.endswith('.'):
             stripped_content += '.'
             
        new_content = stripped_content + suffix + "\n"
        return f"```text\n{new_content}```"

    new_content = re.sub(r'```text\n(.*?)\n```', replace_block, content, flags=re.DOTALL)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
