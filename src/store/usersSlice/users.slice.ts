import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const USERS_FEATURE_KEY = 'users';

export interface UsersEntity {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UsersState extends EntityState<UsersEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const usersAdapter = createEntityAdapter<UsersEntity>();

export const fetchUsers = createAsyncThunk<UsersEntity[]>(
  'users/fetchStatus',
  async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      return res.json();
    } catch (err) {
      const error = err as { message: string };

      if (error instanceof Error) {
        return error.message;
      }
      return 'Something went wrong! Try to reload or come later.';
    }
  }
);

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const usersSlice = createSlice({
  name: USERS_FEATURE_KEY,
  initialState: initialUsersState,
  reducers: {
    add: usersAdapter.addOne,
    remove: usersAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<UsersEntity[]>) => {
          usersAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchUsers.rejected, (state: UsersState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const usersReducer = usersSlice.reducer;

export const usersActions = usersSlice.actions;

const { selectAll } = usersAdapter.getSelectors();

export const getUsersState = (rootState: {
  [USERS_FEATURE_KEY]: UsersState;
}): UsersState => rootState[USERS_FEATURE_KEY];

export const selectAllUsers = createSelector(getUsersState, selectAll);

export const selectUserById = (userId: string | number) =>
  createSelector(getUsersState, ({ entities }) => entities[userId]);

export const selectUsersError = createSelector(
  getUsersState,
  ({ error }) => error
);

export const selectUsersIsPending = createSelector(
  getUsersState,
  ({ loadingStatus }) => loadingStatus === 'loading'
);
