import { UserType } from 'src/app/components/common/hooks/useFetchUserList';
import UserList from '../../components/user-list/user-list';

import styles from './home.module.scss';

export interface HomeProps {
  userList: UserType[] | null;
}

export function Home({ userList }: HomeProps) {
  return (
    <div className={styles.home}>
      <h1>Список користувачів сайту</h1>

      <UserList userList={userList} />
    </div>
  );
}

export default Home;
