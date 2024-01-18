import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/home';

import styles from './app.module.scss';

export function App() {
  return (
    <div
      className={styles.container}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userList={[
                { id: 1, name: 'Олексій' },
                { id: 2, name: 'Віктор' },
              ]}
            />
          }
        />
        <Route path="/user-profile/:userId" element={<div>User</div>} />
      </Routes>
    </div>
  );
}

export default App;
