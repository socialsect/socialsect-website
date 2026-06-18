#!/bin/bash

# Simple PageSpeed API Test
# Usage: ./test-pagespeed-simple.sh

echo "════════════════════════════════════════════════════════════"
echo "🔍 PageSpeed API Quick Test"
echo "════════════════════════════════════════════════════════════"
echo ""

# Read .env file
if [ ! -f ".env" ]; then
    echo "❌ .env file not found"
    exit 1
fi

# Extract API key
API_KEY=$(grep "GOOGLE_PAGESPEED_API_KEY" .env | cut -d '=' -f2)

if [ -z "$API_KEY" ]; then
    echo "❌ GOOGLE_PAGESPEED_API_KEY not found in .env"
    exit 1
fi

echo "✅ API key found (first 10 chars): ${API_KEY:0:10}..."
echo ""
echo "Testing API call to google.com (this will take 30-60 seconds)..."
echo ""

# Make API call
RESPONSE=$(curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.google.com&key=${API_KEY}&category=performance&category=accessibility&category=best-practices&category=seo")

# Check if response contains "lighthouseResult" (success indicator)
if echo "$RESPONSE" | grep -q "lighthouseResult"; then
    echo "✅ API call successful!"
    echo ""
    echo "Response summary:"
    echo "$RESPONSE" | grep -o '"score":[0-9.]*' | head -4
    echo ""
    echo "════════════════════════════════════════════════════════════"
    echo "✅ PageSpeed API is working correctly!"
    echo "════════════════════════════════════════════════════════════"
    exit 0
else
    # Check for error
    if echo "$RESPONSE" | grep -q "error"; then
        echo "❌ API Error:"
        echo "$RESPONSE" | grep -o '"message":"[^"]*"'
    else
        echo "❌ Unexpected response"
        echo "$RESPONSE" | head -c 500
    fi
    exit 1
fi
