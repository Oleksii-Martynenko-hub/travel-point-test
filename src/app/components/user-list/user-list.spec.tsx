import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import UserList from './user-list';

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

describe('UserList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <UserList userList={[mockUser]} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render correct users data', async () => {
    const { getByRole, getByText, getAllByRole } = render(
      <BrowserRouter>
        <UserList userList={[mockUser, mockUser2]} />
      </BrowserRouter>
    );

    expect(getByRole('list')).toBeTruthy();
    expect(getAllByRole('listitem').length).toBe(2);

    expect(getByText(mockUser.name)).toBeTruthy();
    expect(getByText(mockUser2.name)).toBeTruthy();

    expect(getAllByRole('link', { name: 'Деталі' }).length).toBe(2);
  });

  it('should render info that user list is empty', async () => {
    const { rerender, getByRole, getByText, getAllByRole } = render(
      <BrowserRouter>
        <UserList userList={[]} />
      </BrowserRouter>
    );

    expect(getByRole('list')).toBeTruthy();
    expect(getAllByRole('listitem').length).toBe(1);

    expect(getByText('Список користувачів пустий, поки що.')).toBeTruthy();

    rerender(
      <BrowserRouter>
        <UserList userList={null} />
      </BrowserRouter>
    );

    expect(getByRole('list')).toBeTruthy();
    expect(getAllByRole('listitem').length).toBe(1);

    expect(getByText('Список користувачів пустий, поки що.')).toBeTruthy();
  });
});
