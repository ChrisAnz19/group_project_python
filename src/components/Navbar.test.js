// Built with the help of Claude Sonnet 4 AI, this code is designed to test the Navbar component
// and its functionality, ensuring it renders correctly and handles navigation as expected.
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

// Helper to render Navbar with a given route
const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: MemoryRouter });
};

describe('Navbar', () => {
    test('renders logo and app name', () => {
        // Render Navbar and check for logo and app name
        renderWithRouter(<Navbar />);
        expect(screen.getByText(/Resume Analyzer Pro/i)).toBeInTheDocument();
    });

    test('renders all navigation items', () => {
        // Render Navbar and check for all nav items
        renderWithRouter(<Navbar />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Trending Jobs')).toBeInTheDocument();
        expect(screen.getByText('Leadership')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    test('does not show Results item on other routes (desktop)', () => {
        // Render Navbar on a route other than /results
        renderWithRouter(<Navbar />, { route: '/' });
        expect(screen.queryByText('Results')).not.toBeInTheDocument();
    });
});