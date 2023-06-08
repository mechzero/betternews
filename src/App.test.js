// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

test('renders "Hello, World!"', () => {
  render(<HelloWorld />);
  const helloText = screen.getByText(/Hello, World!/i);
  expect(helloText).toBeInTheDocument();
});
