#!/bin/bash

# Deployment script for Python Learning Course
# This script pulls the latest code from GitHub and sets up proper permissions

echo "🚀 Starting deployment..."

# Step 1: Navigate to project directory and pull latest from GitHub
echo "📥 Pulling latest code from GitHub..."
cd /var/www/python-learn

# Add safe directory exception for Git security
echo "🔒 Adding Git safe directory exception..."
sudo git config --global --add safe.directory /var/www/python-learn

if sudo git pull; then
    echo "✅ Code updated successfully"
else
    echo "❌ Failed to pull from GitHub"
    exit 1
fi

# Step 2: Set ownership to nginx user
echo "👤 Setting ownership to nginx:nginx..."
if sudo chown nginx:nginx -R /var/www/python-learn; then
    echo "✅ Ownership set successfully"
else
    echo "❌ Failed to set ownership"
    exit 1
fi

# Step 3: Set file permissions to 644 (read/write for owner, read for group/others)
echo "🔐 Setting file permissions to 644..."
if sudo chmod 644 -R /var/www/python-learn; then
    echo "✅ File permissions set successfully"
else
    echo "❌ Failed to set file permissions"
    exit 1
fi

# Step 4: Set directory permission to 755 (read/write/execute for owner, read/execute for group/others)
echo "📁 Setting directory permissions to 755..."
if sudo chmod 755 /var/www/python-learn; then
    echo "✅ Directory permissions set successfully"
else
    echo "❌ Failed to set directory permissions"
    exit 1
fi

# Step 5: Restart nginx service
echo "🔄 Restarting nginx service..."
if sudo service nginx restart; then
    echo "✅ Nginx restarted successfully"
else
    echo "❌ Failed to restart nginx"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "📍 Your Python Learning Course is now updated and running!" 