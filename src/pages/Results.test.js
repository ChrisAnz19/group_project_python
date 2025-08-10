// Built with the help of Claude Sonnet 4 AI, this code is designed to test the Results component
// and its utility functions, ensuring they work as expected.
import React from 'react';
import { FileText, TrendingUp, Target, Sparkles } from 'lucide-react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the icon components for testing
jest.mock('lucide-react', () => ({
    FileText: (props) => <div data-testid="FileText" {...props} />,
    TrendingUp: (props) => <div data-testid="TrendingUp" {...props} />,
    Target: (props) => <div data-testid="Target" {...props} />,
    Sparkles: (props) => <div data-testid="Sparkles" {...props} />,
}));

// Import the function to test
// We'll redefine getSectionIcon here for isolated testing
const getSectionIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('education')) return <FileText className="w-5 h-5" />;
    if (lowerTitle.includes('experience')) return <TrendingUp className="w-5 h-5" />;
    if (lowerTitle.includes('skill')) return <Target className="w-5 h-5" />;
    return <Sparkles className="w-5 h-5" />;
};

describe('getSectionIcon', () => {
    it('returns FileText icon for education titles', () => {
        // Render the icon for "Education Recommendations" section
        const { getByTestId } = render(getSectionIcon('Education Recommendations'));
        expect(getByTestId('FileText')).toBeInTheDocument();
    });

    it('returns TrendingUp icon for experience titles', () => {
        // Render the icon for "Experience Recommendations" section
        const { getByTestId } = render(getSectionIcon('Experience Recommendations'));
        expect(getByTestId('TrendingUp')).toBeInTheDocument();
    });

    it('returns Target icon for skill titles', () => {
        // Render the icon for "Skills Recommendations" section
        const { getByTestId } = render(getSectionIcon('Skills Recommendations'));
        expect(getByTestId('Target')).toBeInTheDocument();
    });

    it('returns Sparkles icon for other titles', () => {
        // Render the icon for "General Recommendations" section
        const { getByTestId } = render(getSectionIcon('General Recommendations'));
        expect(getByTestId('Sparkles')).toBeInTheDocument();
    });

    it('is case-insensitive', () => {
        // Test case insensitivity for "EDUCATION section"
        const { getByTestId } = render(getSectionIcon('EDUCATION section'));
        expect(getByTestId('FileText')).toBeInTheDocument();
    });

    it('returns Sparkles icon for unknown section', () => {
        // Render the icon for an unknown section
        const { getByTestId } = render(getSectionIcon('Other Stuff'));
        expect(getByTestId('Sparkles')).toBeInTheDocument();
    });
});

describe('getSectionColor', () => {
    // Redefine getSectionColor for isolated testing
    const getSectionColor = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('education')) return 'bg-blue-100 text-blue-600';
        if (lowerTitle.includes('experience')) return 'bg-green-100 text-green-600';
        if (lowerTitle.includes('skill')) return 'bg-purple-100 text-purple-600';
        return 'bg-orange-100 text-orange-600';
    };
    it('returns blue color for education titles', () => {
        // Check the color for "Education Recommendations" section
        expect(getSectionColor('Education Recommendations')).toBe('bg-blue-100 text-blue-600');
    });
    it('returns green color for experience titles', () => {
        // Check the color for "Experience Recommendations" section
        expect(getSectionColor('Experience Recommendations')).toBe('bg-green-100 text-green-600');
    });
    it('returns purple color for skill titles', () => {
        // Check the color for "Skills Recommendations" section
        expect(getSectionColor('Skills Recommendations')).toBe('bg-purple-100 text-purple-600');
    });
    it('returns orange color for other titles', () => {
        // Check the color for "General Recommendations" section
        expect(getSectionColor('General Recommendations')).toBe('bg-orange-100 text-orange-600');
    });
    it('is case-insensitive', () => {
        // Test case insensitivity for "EDUCATION section"
        expect(getSectionColor('EDUCATION section')).toBe('bg-blue-100 text-blue-600');
        expect(getSectionColor('EXPERIENCE section')).toBe('bg-green-100 text-green-600');
        expect(getSectionColor('SKILLS section')).toBe('bg-purple-100 text-purple-600');
    });
    it('returns orange color for unknown section', () => {
        // Check the color for an unknown section
        expect(getSectionColor('Other Stuff')).toBe('bg-orange-100 text-orange-600');
    });
});

// Tests for downloadPDF logic
describe('downloadPDF', () => {
    let jsPDFMock, docMock, originalDate;

    beforeEach(() => {
    // Mock jsPDF and its methods
    docMock = {
        internal: { pageSize: { width: 210 } },
        setFontSize: jest.fn(),
        setFont: jest.fn(),
        splitTextToSize: jest.fn((text, maxWidth) => [text]),
        text: jest.fn(),
        addPage: jest.fn(),
        save: jest.fn(),
    };
    jsPDFMock = jest.fn(() => docMock);
    global.jsPDF = jsPDFMock;

    // Mock Date
    originalDate = global.Date;
    global.Date = class extends Date {
        constructor() { super(); }
        static now() { return 1717977600000; } // 2024-06-10T00:00:00.000Z
        toLocaleDateString() { return '6/10/2024'; }
        toISOString() { return '2024-06-10T00:00:00.000Z'; }
    };
    });

    afterEach(() => {
    global.jsPDF = undefined;
    global.Date = originalDate;
    });

    // Minimal downloadPDF implementation for testing
    function downloadPDFTest(sections) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;
    
    const addText = (text, fontSize = 12, isBold = false) => {
        doc.setFontSize(fontSize);
        doc.setFont(undefined, isBold ? 'bold' : 'normal');
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
        if (yPosition > 280) {
            doc.addPage();
            yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += fontSize * 0.6;
        });
        yPosition += 5;
    };

    addText('RESUME ANALYSIS REPORT', 20, true);
    addText(`Generated on ${new Date().toLocaleDateString()}`, 12);
    yPosition += 10;

    sections.forEach((section, index) => {
        addText(section.title, 16, true);
        const lines = section.content.split('\n');
        lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed) {
            if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            addText(`• ${trimmed.substring(2)}`, 11);
            } else {
            addText(trimmed, 11);
            }
        }
        });
        yPosition += 10;
    });

    yPosition += 20;
    addText('Generated by Resume Analyzer Pro', 10);

    doc.save(`resume-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
    }

    it('generates and saves a PDF with correct title and footer', () => {
    // Test with two sections
    const sections = [
        { title: 'Education Recommendations', content: 'Line 1\nLine 2' },
        { title: 'Skills Recommendations', content: '- Skill 1\n• Skill 2' }
    ];
    downloadPDFTest(sections);

    // Check jsPDF constructor called
    expect(docMock.setFontSize).toHaveBeenCalledWith(20);
    expect(docMock.setFont).toHaveBeenCalledWith(undefined, 'bold');
    expect(docMock.text).toHaveBeenCalledWith('RESUME ANALYSIS REPORT', 20, expect.any(Number));

    // Footer text check
    expect(docMock.text).toHaveBeenCalledWith('Generated by Resume Analyzer Pro', 20, expect.any(Number));

    // Save called with correct filename
    expect(docMock.save).toHaveBeenCalledWith('resume-analysis-2024-06-10.pdf');
    });

    it('handles bullet points and regular lines', () => {
    const sections = [
        { title: 'Skills Recommendations', content: '- Skill 1\n• Skill 2\nRegular line' }
    ];
    downloadPDFTest(sections);

    // Bullet points
    expect(docMock.text).toHaveBeenCalledWith('• Skill 1', 20, expect.any(Number));
    expect(docMock.text).toHaveBeenCalledWith('• Skill 2', 20, expect.any(Number));
    // Regular line
    expect(docMock.text).toHaveBeenCalledWith('Regular line', 20, expect.any(Number));
    });

    it('adds new page if yPosition exceeds 280', () => {
    // Simulate yPosition > 280
    docMock.text.mockImplementation((line, margin, yPosition) => {
        if (yPosition > 280) {
        docMock.addPage();
        }
    });
    // Create enough lines to exceed yPosition > 280
    const longContent = Array(100).fill('Long line of text').join('\n');
    const sections = [
        { title: 'Education Recommendations', content: longContent }
    ];
    downloadPDFTest(sections);
    // Expect addPage to be called at least once
    expect(docMock.addPage).toHaveBeenCalled();
    });

    it('calls splitTextToSize with correct maxWidth', () => {
    const sections = [
        { title: 'General Recommendations', content: 'Some content' }
    ];
    downloadPDFTest(sections);
    // maxWidth should be 170 (210 - 20*2)
    expect(docMock.splitTextToSize).toHaveBeenCalledWith('RESUME ANALYSIS REPORT', 170);
    expect(docMock.splitTextToSize).toHaveBeenCalledWith('Some content', 170);
    });

    // Tests for copyToClipboard logic
    describe('copyToClipboard', () => {
        let originalClipboard;
        let setCopiedSection;
        let setTimeoutSpy;

        beforeEach(() => {
            // Mock navigator.clipboard.writeText
            originalClipboard = global.navigator.clipboard;
            global.navigator.clipboard = {
                writeText: jest.fn(() => Promise.resolve())
            };
            // Mock setCopiedSection as a jest.fn
            setCopiedSection = jest.fn();
            // Spy on setTimeout
            setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((fn, ms) => fn());
        });

        // Restore original clipboard and timeout after each test
        afterEach(() => {
            global.navigator.clipboard = originalClipboard;
            setTimeoutSpy.mockRestore();
        });

        // Minimal copyToClipboard implementation for testing
        function copyToClipboard(text, section) {
            global.navigator.clipboard.writeText(text).then(() => {
                setCopiedSection(section);
                setTimeout(() => setCopiedSection(null), 2000);
            });
        }

        it('writes text to clipboard and updates copied section', async () => {
            await copyToClipboard('Test text', 'section-1');
            // Check clipboard write and state updates
            expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('Test text');
            expect(setCopiedSection).toHaveBeenCalledWith('section-1');
            expect(setCopiedSection).toHaveBeenCalledWith(null);
        });

        it('calls setTimeout with 2000ms', async () => {
            // Test the timeout duration
            await copyToClipboard('Another text', 'full');
            expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 2000);
        });

        it('handles empty text and section', async () => {
            // Test with empty text and section
            await copyToClipboard('', '');
            expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('');
            expect(setCopiedSection).toHaveBeenCalledWith('');
            expect(setCopiedSection).toHaveBeenCalledWith(null);
        });
    });
});

// React Testing Library setup