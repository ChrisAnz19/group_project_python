// Built with the help of Claude Sonnet 4 AI, this code is designed to test the FileUpload component
// and its functionality, ensuring it handles file uploads correctly.
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from './FileUpload';

// Helper to create a mock PDF file
function createPdfFile(name = 'resume.pdf', size = 1024 * 1024) {
    const file = new File(['dummy content'], name, { type: 'application/pdf' });
    Object.defineProperty(file, 'size', { value: size });
    return file;
}

describe('FileUpload', () => {
    it('renders upload prompt when no file is uploaded', () => {
        // Render the FileUpload component without any file
        render(<FileUpload onFileUpload={jest.fn()} isLoading={false} />);
        // Check that the upload prompt is displayed
        expect(screen.getByText(/Upload your resume/i)).toBeInTheDocument();
        expect(screen.getByText(/PDF files only/i)).toBeInTheDocument();
    });

    it('calls onFileUpload with PDF file when dropped', async () => {
        // Mock the onFileUpload function
        const mockOnFileUpload = jest.fn();
        render(<FileUpload onFileUpload={mockOnFileUpload} isLoading={false} />);
        // Directly select the file input element
        const inputEl = document.querySelector('input[type="file"]');
        const pdfFile = createPdfFile();
        fireEvent.change(inputEl, { target: { files: [pdfFile] } });
        await waitFor(() => {
            // Ensure onFileUpload was called with the PDF file
            expect(mockOnFileUpload).toHaveBeenCalledWith(pdfFile);
            expect(screen.getByText(pdfFile.name)).toBeInTheDocument();
        });
    });

    it('does not call onFileUpload for non-PDF files', async () => {
        // Mock the onFileUpload function
        const mockOnFileUpload = jest.fn();
        render(<FileUpload onFileUpload={mockOnFileUpload} isLoading={false} />);
        const inputEl = document.querySelector('input[type="file"]');
        const txtFile = new File(['dummy'], 'resume.txt', { type: 'text/plain' });
        fireEvent.change(inputEl, { target: { files: [txtFile] } });
        await waitFor(() => {
            // Ensure onFileUpload was not called and upload prompt is still shown
            expect(mockOnFileUpload).not.toHaveBeenCalled();
            expect(screen.getByText(/Upload your resume/i)).toBeInTheDocument();
        });
    });

    it('removes uploaded file when remove button is clicked', async () => {
        // Upload a PDF file first
        const pdfFile = createPdfFile();
        const mockOnFileUpload = jest.fn();
        // Render the FileUpload component
        render(<FileUpload onFileUpload={mockOnFileUpload} isLoading={false} />);
        const inputEl = document.querySelector('input[type="file"]');
        fireEvent.change(inputEl, { target: { files: [pdfFile] } });
        await waitFor(() => {
            // Ensure the file is uploaded and displayed
            expect(screen.getByText(pdfFile.name)).toBeInTheDocument();
        });
        const removeBtn = screen.getByRole('button');
        fireEvent.click(removeBtn);
        await waitFor(() => {
            // Ensure the file is removed and upload prompt is shown again
            expect(screen.getByText(/Upload your resume/i)).toBeInTheDocument();
        });
    });
});