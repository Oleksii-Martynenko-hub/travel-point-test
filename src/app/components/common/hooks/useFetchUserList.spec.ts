import { renderHook, waitFor } from '@testing-library/react';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';

import { useFetchUserList } from './useFetchUserList';

describe('App', () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });
  it('should fetch users successfully', async () => {
    const { result } = renderHook(() => useFetchUserList());

    expect(result.current.userList).toBeNull();
    expect(result.current.loading).equal(true);

    await waitFor(() => expect(result.current.loading).toEqual(false));

    expect(result.current.userList).toBeTruthy();
    expect(result.current.userList?.length).toEqual(10);
    expect(result.current.userList?.[0]).toHaveProperty(['id']);
    expect(result.current.userList?.[0]).toHaveProperty(['name']);
    expect(result.current.userList?.[0]).toHaveProperty(['email']);
    expect(result.current.error).toEqual(null);
  });
});
