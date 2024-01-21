import { render } from '@testing-library/react';

import UserInfo from './user-info';

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

describe('UserInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserInfo userData={mockUser} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render correct user data', async () => {
    const { getByRole, getByText } = render(<UserInfo userData={mockUser} />);

    const address = `${mockUser.address.suite}, ${mockUser.address.street}, ${mockUser.address.city}`;

    expect(getByRole('heading', { name: mockUser.name })).toBeTruthy();
    expect(getByRole('link', { name: mockUser.website })).toBeTruthy();
    expect(getByRole('link', { name: mockUser.email })).toBeTruthy();
    expect(getByRole('link', { name: mockUser.phone })).toBeTruthy();
    expect(getByText(mockUser.username)).toBeTruthy();
    expect(getByText(mockUser.company.name)).toBeTruthy();
    expect(getByText(address)).toBeTruthy();
  });
});
