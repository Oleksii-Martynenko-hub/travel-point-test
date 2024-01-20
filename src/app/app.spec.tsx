import {
  render,
  renderHook,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

import { useFetchUserList } from './components/common/hooks/useFetchUserList';
import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render Home component for the default route', async () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByRole('status')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByRole('status'));

    expect(
      getByRole('heading', { name: 'Список користувачів сайту' })
    ).toBeTruthy();
  });

  it('should render UserProfile component', async () => {
    const { result } = renderHook(() => useFetchUserList());
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/user-profile/1']}>
        <App />
      </MemoryRouter>
    );
    expect(getByRole('status')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByRole('status'));

    const user = result.current.userList?.[0];

    expect(getByRole('heading', { name: user?.name })).toBeTruthy();
  });

  it('should render Page not found component if route is invalid', async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/not-exist']}>
        <App />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByRole('status'));

    expect(getByRole('heading', { name: 'Page not found' })).toBeTruthy();
  });
});
