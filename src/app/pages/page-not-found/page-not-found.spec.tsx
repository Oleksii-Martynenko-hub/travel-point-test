import { render } from '@testing-library/react';

import PageNotFound from './page-not-found';
import { BrowserRouter } from 'react-router-dom';

describe('PageNotFound', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render title', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(getByRole('heading', { name: 'Page not found' })).toBeTruthy();
  });

  it('should render back link', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(getByRole('link', { name: 'Back to home page' })).toBeTruthy();
  });
});
