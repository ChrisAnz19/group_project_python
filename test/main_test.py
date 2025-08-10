# Built with the help of Claude Sonnet 4 AI, this code is designed to test the TrendingJobs component
# and its utility functions, ensuring they work as expected.
import os
import pytest
from unittest import mock
from app.main import extract_pdf_text, get_ai_analysis
from app.main import extract_pdf_text
from app.main import get_ai_analysis

def test_extract_pdf_text_with_nonexistent_file():
    # Should raise an error if file does not exist
    with pytest.raises(Exception):
        extract_pdf_text("nonexistent.pdf")

def test_extract_pdf_text_with_empty_path():
    # Should raise an error if path is empty
    with pytest.raises(Exception):
        extract_pdf_text("")

def test_extract_pdf_text_with_valid_pdf(tmp_path):
    # Create a simple PDF file using PyMuPDF
    import fitz  # pymupdf
    pdf_path = tmp_path / "sample.pdf"
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((72, 72), "Hello, PDF!")
    doc.save(str(pdf_path))
    doc.close()
    text = extract_pdf_text(str(pdf_path))
    assert "Hello, PDF!" in text

def test_extract_pdf_text_with_invalid_pdf(tmp_path):
    # Create a non-PDF file and try to extract text
    fake_pdf = tmp_path / "fake.pdf"
    fake_pdf.write_text("This is not a PDF file.")
    with pytest.raises(Exception):
        extract_pdf_text(str(fake_pdf))

def test_get_ai_analysis_with_env_api_key(monkeypatch):
    # Mock OpenAI client and env var
    monkeypatch.setenv("OPENAI_API_KEY", "sk-testkey")
    with mock.patch("app.main.OpenAI") as mock_openai:
        mock_client = mock.Mock()
        mock_response = mock.Mock()
        mock_response.choices = [mock.Mock(message=mock.Mock(content="AI response"))]
        mock_client.chat.completions.create.return_value = mock_response
        mock_openai.return_value = mock_client
        result = get_ai_analysis("Test prompt")
        assert result == "AI response"

def test_get_ai_analysis_openai_exception(monkeypatch):
    # Simulate OpenAI API raising an exception
    monkeypatch.setenv("OPENAI_API_KEY", "sk-testkey")
    with mock.patch("app.main.OpenAI") as mock_openai:
        mock_client = mock.Mock()
        mock_client.chat.completions.create.side_effect = Exception("API error")
        mock_openai.return_value = mock_client
        result = get_ai_analysis("Test prompt")
        assert "Error with OpenAI API" in result
