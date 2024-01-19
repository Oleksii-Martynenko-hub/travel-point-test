import { Route, Routes } from 'react-router-dom';

import { useFetchUserList } from './components/common/hooks/useFetchUserList';
import Loader from './components/common/loader/loader';

import Home from './pages/home/home';
import UserProfile from './pages/user-profile/user-profile';

import styles from './app.module.scss';

export function App() {
  const { userList, loading, error } = useFetchUserList();

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
        <Route path="/" element={<Home userList={userList} />} />
        <Route
          path="/user-profile/:userId"
          element={<UserProfile userList={userList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
