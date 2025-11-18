/**
 * Tests for SearchScreen
 * Covers search input, grid rendering, and media display
 */

import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SearchScreen } from '../SearchScreen';
import { renderWithProviders } from '../../../__tests__/utils/testUtils';

const mockUseAutoFocus = jest.fn();
const mockMediaGrid = jest.fn(({ searchQuery }: { searchQuery: string }) => {
  return searchQuery ? null : null;
});

jest.mock('../hooks/useAutoFocus', () => ({
  useAutoFocus: (params: { inputRef: React.RefObject<unknown> }) => mockUseAutoFocus(params),
}));

jest.mock('@/components/Organisms/MediaGrid/MediaGrid', () => ({
  MediaGrid: (props: { searchQuery: string }) => mockMediaGrid(props),
}));

describe('SearchScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search header with test id', () => {
    const { getByTestId } = renderWithProviders(<SearchScreen />);

    expect(getByTestId('search-screen-header')).toBeTruthy();
  });

  it('renders the search input with placeholder', () => {
    const { getByPlaceholderText } = renderWithProviders(<SearchScreen />);

    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('updates search query state when text changes', () => {
    const { getByPlaceholderText, getByDisplayValue } = renderWithProviders(<SearchScreen />);

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'test query');

    expect(getByDisplayValue('test query')).toBeTruthy();
  });

  it('passes the deferred search query to MediaGrid', () => {
    const { getByPlaceholderText } = renderWithProviders(<SearchScreen />);

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'media term');

    expect(mockMediaGrid).toHaveBeenLastCalledWith({ searchQuery: 'media term' });
  });

  it('invokes useAutoFocus with search input ref', () => {
    renderWithProviders(<SearchScreen />);

    expect(mockUseAutoFocus).toHaveBeenCalledTimes(1);

    const callArgs = mockUseAutoFocus.mock.calls[0][0];

    expect(callArgs).toHaveProperty('inputRef');
    expect(callArgs.inputRef).toHaveProperty('current');
  });
});

