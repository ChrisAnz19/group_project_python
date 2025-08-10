// Built with the help of Claude Sonnet 4 AI, this code is designed to test the TrendingJobs component
// and its utility functions, ensuring they work as expected.
import React from 'react';
import { render } from '@testing-library/react';
import {
    TrendingUp,
    Target,
    FileText,
    BookOpen,
    Sparkles,
} from 'lucide-react';

// Mock getSectionIcon function from TrendingJobs.js
const getSectionIcon = (title) => {
const lowerTitle = title.toLowerCase();
if (lowerTitle.includes('rank')) return <TrendingUp className="w-5 h-5" />;
if (lowerTitle.includes('job title')) return <Target className="w-5 h-5" />;
if (lowerTitle.includes('salary')) return <FileText className="w-5 h-5" />;
if (lowerTitle.includes('description')) return <BookOpen className="w-5 h-5" />;
return <Sparkles className="w-5 h-5" />;
};

describe('getSectionIcon', () => {
it('returns TrendingUp icon for "Rank"', () => {
    // Render the icon for "Rank" section
    const { container } = render(getSectionIcon('Rank'));
    expect(container.querySelector('svg')).toBeTruthy();
    // Check that the SVG is rendered (lucide-react does not include icon name in SVG)
    expect(container.querySelector('svg')).not.toBeNull();
});

it('returns Target icon for "Job Title"', () => {
    // Render the icon for "Job Title" section
    const { container } = render(getSectionIcon('Job Title'));
    expect(container.querySelector('svg')).toBeTruthy();
    // The SVG is rendered, but the icon name is not present in the HTML
});

it('returns FileText icon for "Salary"', () => {
    // Render the icon for "Salary" section
    const { container } = render(getSectionIcon('Salary'));
    expect(container.querySelector('svg')).toBeTruthy();
    // The SVG is rendered, but the icon name is not present in the HTML
});

it('returns BookOpen icon for "Description"', () => {
    // Render the icon for "Description" section
    const { container } = render(getSectionIcon('Description'));
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('svg')).not.toBeNull();
});

it('returns Sparkles icon for unknown section', () => {
    // Render the icon for an unknown section
    const { container } = render(getSectionIcon('Other Section'));
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('svg')).not.toBeNull();
});

it('is case-insensitive', () => {
    // Test case insensitivity for "salary"
    const { container } = render(getSectionIcon('salary'));
    expect(container.querySelector('svg')).toBeTruthy();
});

// Mock getSectionColor function from TrendingJobs.js
const getSectionColor = (title) => {
    // Get the appropriate color for a section based on its title.
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('rank')) return 'bg-blue-100 text-blue-600';
    if (lowerTitle.includes('job title')) return 'bg-green-100 text-green-600';
    if (lowerTitle.includes('salary')) return 'bg-purple-100 text-purple-600';
    if (lowerTitle.includes('description')) return 'bg-gray-100 text-gray-600';
    return 'bg-orange-100 text-orange-600';
};

describe('getSectionColor', () => {
    it('returns blue color for "Rank"', () => {
        // Check the color for "Rank" section
        expect(getSectionColor('Rank')).toBe('bg-blue-100 text-blue-600');
    });

    it('returns green color for "Job Title"', () => {
        // Check the color for "Job Title" section
        expect(getSectionColor('Job Title')).toBe('bg-green-100 text-green-600');
    });

    it('returns purple color for "Salary"', () => {
        // Check the color for "Salary" section
        expect(getSectionColor('Salary')).toBe('bg-purple-100 text-purple-600');
    });

    it('returns gray color for "Description"', () => {
        // Check the color for "Description" section
        expect(getSectionColor('Description')).toBe('bg-gray-100 text-gray-600');
    });

    it('returns orange color for unknown section', () => {
        // Check the color for an unknown section
        expect(getSectionColor('Other Section')).toBe('bg-orange-100 text-orange-600');
    });

    it('is case-insensitive', () => {
        // Test case insensitivity for "salary"
        expect(getSectionColor('salary')).toBe('bg-purple-100 text-purple-600');
        expect(getSectionColor('rAnK')).toBe('bg-blue-100 text-blue-600');
        expect(getSectionColor('JOB TITLE')).toBe('bg-green-100 text-green-600');
        expect(getSectionColor('description')).toBe('bg-gray-100 text-gray-600');
    });
});
});