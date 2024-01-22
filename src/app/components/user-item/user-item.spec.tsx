import { render } from '@testing-library/react';

import UserItem from './user-item';
import { BrowserRouter } from 'react-router-dom';

const mockUser = {
  id: 1,
  name: 'Test Name',
  email: 'XXXXXXXXXXXXX',
  website: 'test.com',
};

describe('UserItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <UserItem {...mockUser} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render correct user data', async () => {
    const { getByRole, getByText } = render(
      <BrowserRouter>
        <UserItem {...mockUser} />
      </BrowserRouter>
    );

    expect(getByText(mockUser.name)).toBeTruthy();
    expect(getByRole('link', { name: mockUser.website })).toBeTruthy();
    expect(getByRole('link', { name: mockUser.email })).toBeTruthy();
    expect(getByRole('link', { name: 'Деталі' })).toBeTruthy();
  });
});
