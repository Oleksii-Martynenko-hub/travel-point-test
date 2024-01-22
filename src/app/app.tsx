import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchUsers,
  selectUsersError,
  selectUsersIsPending,
} from '../store/usersSlice/users.slice';

import Loader from './components/common/loader/loader';

import Home from './pages/home/home';
import UserProfile from './pages/user-profile/user-profile';
import PageNotFound from './pages/page-not-found/page-not-found';

import styles from './app.module.scss';

export function App() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectUsersIsPending);
  const error = useAppSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Loader isFullPage />;

  if (error)
    return (
      <div className={styles.app}>
        <h3 style={{ color: '#ca2626' }}>{error}</h3>
      </div>
    );

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
