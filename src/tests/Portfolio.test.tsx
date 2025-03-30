import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portfolio from '../components/Portfolio';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('Portfolio Component', () => {
  const renderPortfolio = () => {
    render(
      <ThemeProvider theme={theme}>
        <Portfolio />
      </ThemeProvider>
    );
  };

  it('renders the portfolio header', () => {
    renderPortfolio();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    renderPortfolio();
    expect(screen.getByPlaceholderText('Search Loan Number')).toBeInTheDocument();
  });

  it('renders the filter button', () => {
    renderPortfolio();
    expect(screen.getByText('More Filters')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    renderPortfolio();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays loan data after loading', async () => {
    renderPortfolio();
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    expect(screen.getByText('L28U3247')).toBeInTheDocument();
  });

  it('filters loans based on search input', async () => {
    renderPortfolio();
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search Loan Number');
    fireEvent.change(searchInput, { target: { value: 'L28U3247' } });

    expect(screen.getByText('L28U3247')).toBeInTheDocument();
    expect(screen.queryByText('L28U3243')).not.toBeInTheDocument();
  });

  it('allows selecting all loans', async () => {
    renderPortfolio();
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(selectAllCheckbox);

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.slice(1).forEach(checkbox => {
      expect(checkbox).toBeChecked();
    });
  });
}); 