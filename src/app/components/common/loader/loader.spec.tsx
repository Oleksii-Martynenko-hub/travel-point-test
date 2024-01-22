import { render } from '@testing-library/react';

import Loader from './loader';

describe('PageNotFound', () => {
  it('should render successfully without full page wrapper', () => {
    const { baseElement } = render(<Loader />);

    expect(baseElement).toBeTruthy();
  });

  it('should have full page wrapper', async () => {
    const { getByLabelText } = render(<Loader isFullPage />);

    expect(getByLabelText('full-page-wrapper')).toBeTruthy();
  });

  it('should have correct size and border', async () => {
    const size = '100px';
    const borderWidth = '10px';

    const { getByRole } = render(
      <Loader size={size} borderWidth={borderWidth} />
    );

    const styles = getByRole('status').style as unknown as {
      _values: { [key: string]: string };
    };

    expect(styles['_values']['--size']).toEqual(size);
    expect(styles['_values']['--border-width']).toEqual(borderWidth);
  });
});
