import { fetchUsers, usersAdapter, usersReducer } from './users.slice';

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

describe('users reducer', () => {
  it('should handle initial state', () => {
    const expected = usersAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(usersReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchUsers', () => {
    let state = usersReducer(undefined, fetchUsers.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = usersReducer(state, fetchUsers.fulfilled([mockUser], ''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { [mockUser.id]: mockUser },
        ids: [mockUser.id],
      })
    );

    state = usersReducer(
      state,
      fetchUsers.rejected(new Error('Something went wrong!'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Something went wrong!',
        entities: { [mockUser.id]: mockUser },
        ids: [mockUser.id],
      })
    );
  });
});
