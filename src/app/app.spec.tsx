import { renderHook, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

import { renderWithProviders } from '../utils/store-provider-test';

import { useFetchUserList } from './components/common/hooks/useFetchUserList';
import App from './app';

const mockComponent = (path = '/') => (
  <MemoryRouter initialEntries={[path]}>
    <App />
  </MemoryRouter>
);

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(mockComponent());
    expect(baseElement).toBeTruthy();
  });

  it('should render Home component for the default route', async () => {
    const { getByRole } = renderWithProviders(mockComponent());
    expect(getByRole('status')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByRole('status'));

    expect(
      getByRole('heading', { name: 'Список користувачів сайту' })
    ).toBeTruthy();
  });

  it('should render UserProfile component', async () => {
    const { result } = renderHook(() => useFetchUserList());
    const { getByRole } = renderWithProviders(mockComponent('/user-profile/1'));
    expect(getByRole('status')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByRole('status'));

    const user = result.current.userList?.[0];

    expect(getByRole('heading', { name: user?.name })).toBeTruthy();
  });

  it('should render Page not found component if route is invalid', async () => {
    const { getByRole } = renderWithProviders(mockComponent('/not-exist'));

    await waitForElementToBeRemoved(() => getByRole('status'));

    expect(getByRole('heading', { name: 'Page not found' })).toBeTruthy();
  });
});
