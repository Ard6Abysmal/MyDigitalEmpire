#!/bin/bash

echo "=== MyDigitalEmpire Project Structure ==="
echo ""

# Backend structure
echo "📁 BACKEND:"
find backend -type f \
  -not -path "*/venv/*" \
  -not -path "*/__pycache__/*" \
  -not -path "*.pyc" \
  -not -path "*.db" \
  | sort

echo ""
echo "📁 FRONTEND:"
find frontend -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/.vite/*" \
  | sort | head -50

echo ""
echo "📄 ROOT FILES:"
ls -la | grep "^-" | awk '{print $9}'
