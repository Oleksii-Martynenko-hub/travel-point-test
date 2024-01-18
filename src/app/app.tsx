import { Route, Routes } from 'react-router-dom';

import { useFetchUserList } from './components/common/hooks/useFetchUserList';

import Home from './pages/home/home';

import styles from './app.module.scss';

export function App() {
  const { userList, loading, error } = useFetchUserList();

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        <h3 style={{ color: 'red' }}>{error}</h3>
      </div>
    );

  return (
    <div
      className={styles.container}
    >
      <Routes>
        <Route path="/" element={<Home userList={userList} />} />
        <Route path="/user-profile/:userId" element={<div>User</div>} />
      </Routes>
    </div>
  );
}

export default App;
