import React from 'react';
import { render, screen } from '@testing-library/react';
import TodayWeatherApp from './TodayWeatherApp';

test('renders learn react link', () => {
    render(<TodayWeatherApp />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
