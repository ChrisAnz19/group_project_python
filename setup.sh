#!/bin/bash

echo "🚀 Setting up Resume Analyzer Pro..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js dependencies
echo "📥 Installing Node.js dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# OpenAI API Key for GPT-4 analysis
OPENAI_API_KEY=your_openai_api_key_here

# ScrapingDog API Key for LinkedIn integration (optional)
SCRAPINGDOG_API_KEY=your_scrapingdog_api_key_here

# Flask configuration
FLASK_ENV=development
FLASK_DEBUG=True
EOF
    echo "⚠️  Please update the .env file with your actual API keys!"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update the .env file with your OpenAI API key"
echo "2. Start the Flask backend:"
echo "   cd web_app && python __init__.py"
echo "3. In a new terminal, start the React frontend:"
echo "   npm start"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "" 