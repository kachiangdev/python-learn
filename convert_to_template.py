#!/usr/bin/env python3
"""
Script to convert existing HTML files to use the new menu template system.
This will replace the hardcoded sidebar content with a placeholder and add the menu template script.
"""

import os
import re
import time
from pathlib import Path

def convert_html_file(file_path):
    """Convert a single HTML file to use the menu template."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already converted
        if 'menu-template.js' in content:
            print(f"Skipping {file_path} - already converted")
            return False
        
        # Pattern to match the entire sidebar content
        sidebar_pattern = r'<aside class="sidebar">(.*?)</aside>'
        
        # Replacement - empty sidebar that will be populated by JavaScript
        sidebar_replacement = '''<aside class="sidebar">
            <!-- Menu will be injected here by menu-template.js -->
        </aside>'''
        
        # Replace the sidebar content
        new_content = re.sub(sidebar_pattern, sidebar_replacement, content, flags=re.DOTALL)
        
        # Add the menu template script before the closing </body> tag
        # First, check if script.js is already included
        script_pattern = r'<script src="script\.js\?v=\d+"></script>'
        
        def add_menu_script(match):
            return f'<script src="menu-template.js?v={get_current_version()}"></script>\n    {match.group(0)}'
        
        new_content = re.sub(script_pattern, add_menu_script, new_content)
        
        # Write the updated content back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Converted {file_path}")
        return True
        
    except Exception as e:
        print(f"Error converting {file_path}: {e}")
        return False

def get_current_version():
    """Get the current version number from existing files."""
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract version from existing script tag
        version_match = re.search(r'script\.js\?v=(\d+)', content)
        if version_match:
            return version_match.group(1)
        else:
            return str(int(time.time()))
    except:
        return str(int(time.time()))

def main():
    """Main function to convert all HTML files."""
    # Get all HTML files in current directory
    html_files = list(Path('.').glob('*.html'))
    
    if not html_files:
        print("No HTML files found in current directory")
        return
    
    print(f"Converting {len(html_files)} HTML files to use menu template system...")
    print("-" * 60)
    
    converted_count = 0
    for html_file in html_files:
        if convert_html_file(html_file):
            converted_count += 1
    
    print("-" * 60)
    print(f"Converted {converted_count} out of {len(html_files)} files")
    print()
    print("✅ Menu template system setup complete!")
    print()
    print("📋 What was done:")
    print("1. Created menu-template.js with the navigation menu")
    print("2. Replaced hardcoded sidebar content with JavaScript injection")
    print("3. Added menu-template.js script to all HTML files")
    print()
    print("🎯 Benefits:")
    print("• Update menu in one place (menu-template.js)")
    print("• Automatic active state detection")
    print("• Easier maintenance and consistency")
    print()
    print("📝 To modify the menu:")
    print("• Edit menu-template.js")
    print("• Changes will apply to all pages automatically")

if __name__ == "__main__":
    main() 