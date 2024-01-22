import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import UserProfile from './user-profile';

const mockUser = {
  id: 1,
  name: 'Test Name',
  email: 'XXXXXXXXXXXXX',
  phone: '000000000000',
  website: 'test.com',
  company: {
    name: 'TestCompany',
    catchPhrase: 'catchPhraseTest',
    bs: 'bsTest',
  },
  address: {
    street: 'TestStreet',
    suite: 'Test',
    city: 'TestCity',
    zipcode: '99999',
    geo: {
      lat: '0',
      lng: '1',
    },
  },
  username: 'XXXX',
};

const mockUser2 = JSON.parse(JSON.stringify(mockUser));
mockUser2.id = 2;
mockUser2.name = 'Test Name 2';

const mockComponent = (userList = [mockUser], userId = 1) => (
  <MemoryRouter initialEntries={[`/user-profile/${userId}`]}>
    <Routes>
      <Route
        path="/user-profile/:userId"
        element={<UserProfile userList={userList} />}
      />
    </Routes>
  </MemoryRouter>
);

describe('UserProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(mockComponent());
    expect(baseElement).toBeTruthy();
  });

  it('should render correct user data', async () => {
    const { unmount, getByRole } = render(mockComponent());

    expect(getByRole('heading', { name: mockUser.name })).toBeTruthy();
    unmount();

    render(mockComponent([mockUser, mockUser2], 2));

    expect(getByRole('heading', { name: mockUser2.name })).toBeTruthy();
  });

  it('should render back link', async () => {
    const { getByRole } = render(mockComponent());

    expect(getByRole('link', { name: 'Back' })).toBeTruthy();
  });

  it('should render user doesn`t exist', async () => {
    const { unmount, getByRole } = render(mockComponent([]));

    expect(getByRole('heading', { name: "User doesn't exist!" })).toBeTruthy();
    expect(getByRole('link', { name: 'Back' })).toBeTruthy();
    unmount();

    render(mockComponent([mockUser, mockUser2], 99));

    expect(getByRole('heading', { name: "User doesn't exist!" })).toBeTruthy();
    expect(getByRole('link', { name: 'Back' })).toBeTruthy();
  });
});
