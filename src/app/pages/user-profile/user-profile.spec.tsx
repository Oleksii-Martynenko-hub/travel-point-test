import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { renderWithProviders } from '../../../utils/store-provider-test';

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

const initialUsers = {
  ids: [mockUser.id, mockUser2.id],
  entities: { [mockUser.id]: mockUser, [mockUser2.id]: mockUser2 },
  loadingStatus: 'loaded' as const,
};

const MockComponent = ({ userId = 1 }) => {
  return (
    <MemoryRouter initialEntries={[`/user-profile/${userId}`]}>
      <Routes>
        <Route path="/user-profile/:userId" element={<UserProfile />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('UserProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<MockComponent />);
    expect(baseElement).toBeTruthy();
  });

  it('should render correct user data', async () => {
    const { unmount, getByRole } = renderWithProviders(<MockComponent />, {
      preloadedState: {
        users: initialUsers,
      },
    });

    expect(getByRole('heading', { name: mockUser.name })).toBeTruthy();
    unmount();

    renderWithProviders(<MockComponent userId={2} />, {
      preloadedState: {
        users: initialUsers,
      },
    });

    expect(getByRole('heading', { name: mockUser2.name })).toBeTruthy();
  });

  it('should render back link', async () => {
    const { getByRole } = renderWithProviders(<MockComponent />);

    expect(getByRole('link', { name: 'Back' })).toBeTruthy();
  });

  it('should render user doesn`t exist', async () => {
    const { unmount, getByRole } = renderWithProviders(<MockComponent />);

    expect(getByRole('heading', { name: "User doesn't exist!" })).toBeTruthy();
    expect(getByRole('link', { name: 'Back' })).toBeTruthy();
    unmount();

    renderWithProviders(<MockComponent userId={99} />, {
      preloadedState: {
        users: initialUsers,
      },
    });

    expect(getByRole('heading', { name: "User doesn't exist!" })).toBeTruthy();
    expect(getByRole('link', { name: 'Back' })).toBeTruthy();
  });
});
