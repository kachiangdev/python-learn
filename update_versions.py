#!/usr/bin/env python3
"""
Script to automatically update version parameters in HTML files
to prevent browser caching of CSS and JS files.
"""

import os
import re
import time
from pathlib import Path

def update_version_in_file(file_path, new_version):
    """Update version parameters in a single HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update CSS version
        content = re.sub(
            r'href="styles\.css\?v=\d+"',
            f'href="styles.css?v={new_version}"',
            content
        )
        
        # Update JS version
        content = re.sub(
            r'src="script\.js\?v=\d+"',
            f'src="script.js?v={new_version}"',
            content
        )
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated {file_path}")
        return True
        
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    """Main function to update all HTML files."""
    # Generate new version (timestamp)
    new_version = str(int(time.time()))
    
    # Get all HTML files in current directory
    html_files = list(Path('.').glob('*.html'))
    
    if not html_files:
        print("No HTML files found in current directory")
        return
    
    print(f"Updating version to: {new_version}")
    print("-" * 50)
    
    updated_count = 0
    for html_file in html_files:
        if update_version_in_file(html_file, new_version):
            updated_count += 1
    
    print("-" * 50)
    print(f"Updated {updated_count} out of {len(html_files)} files")
    print(f"New version: {new_version}")

if __name__ == "__main__":
    main() 