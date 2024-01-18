import { Route, Routes } from 'react-router-dom';

import styles from './app.module.scss';

export function App() {
  return (
    <div
      className={styles.container}
    >
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/user-profile/:userId" element={<div>User</div>} />
      </Routes>
    </div>
  );
}

export default App;
