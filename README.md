# Resume Analyzer Pro

A modern, AI-powered resume analysis application built with React frontend and Flask backend. Get intelligent insights and recommendations to optimize your resume for better job opportunities.

## 🚀 Features

- **AI-Powered Analysis**: Uses OpenAI GPT-4 for intelligent resume analysis
- **PDF Processing**: Advanced PDF text extraction using PyMuPDF
- **Modern UI**: Beautiful React frontend with Tailwind CSS and Framer Motion
- **Drag & Drop**: Easy file upload with drag and drop functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Feedback**: Get instant analysis and recommendations
- **LinkedIn Integration**: Pull LinkedIn profiles (coming soon)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Dropzone** - File upload with drag and drop
- **Lucide React** - Beautiful icons

### Backend
- **Flask** - Python web framework
- **OpenAI GPT-4** - AI-powered analysis
- **PyMuPDF** - PDF text extraction
- **Python-dotenv** - Environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd group_project_python-1
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   SCRAPINGDOG_API_KEY=your_scrapingdog_api_key_here
   ```

5. **Run the Flask backend**
   ```bash
   cd web_app
   python __init__.py
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install Node.js dependencies**
   ```bash
   npm install
   ```

2. **Start the React development server**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 🎯 Usage

1. **Open the application** in your browser at `http://localhost:3000`

2. **Choose your input method**:
   - **Upload PDF**: Drag and drop or click to upload a PDF resume
   - **Paste Text**: Copy and paste your resume text directly

3. **Get analysis**: The AI will analyze your resume and provide recommendations for:
   - Education section
   - Experience section
   - Skills section
   - General formatting and optimization

4. **Review results**: View detailed feedback and actionable recommendations

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# OpenAI API Key for GPT-4 analysis
OPENAI_API_KEY=sk-your-openai-api-key

# ScrapingDog API Key for LinkedIn integration (optional)
SCRAPINGDOG_API_KEY=your-scrapingdog-api-key

# Flask configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### API Endpoints

The Flask backend provides the following endpoints:

- `POST /result` - Analyze resume text
- `POST /result_pdf` - Analyze uploaded PDF file
- `GET /` - Home page
- `GET /about` - About page

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `tailwind.config.js` for theme customization
2. Updating `src/index.css` for custom styles
3. Changing component styles in individual React components

### AI Analysis
To customize the AI analysis, modify the prompt in `app/main.py`:

```python
prompt = "Provide recommendations for the following resume, break the recommendations into sections for Education, Experience, and Skills: " + pdf_text
```

## 🚀 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. Deploy the Flask app to services like:
   - Heroku
   - PythonAnywhere
   - Google Cloud Platform
   - AWS

2. Update the proxy configuration in `package.json` to point to your deployed backend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 API
- The React and Flask communities for excellent documentation
- Tailwind CSS for the beautiful utility-first CSS framework
- Framer Motion for smooth animations

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with a detailed description
3. Contact the development team

---

**Made with ❤️ by the Resume Analyzer Pro Team**