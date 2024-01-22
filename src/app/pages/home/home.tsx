import { useAppSelector } from '../../../store';
import { selectAllUsers } from '../../../store/usersSlice/users.slice';

import UserList from '../../components/user-list/user-list';

import styles from './home.module.scss';

export function Home() {
  const userList = useAppSelector(selectAllUsers);

  return (
    <div className={styles.home}>
      <h1 className="title">Список користувачів сайту</h1>

      <UserList userList={userList} />
    </div>
  );
}

export default Home;
