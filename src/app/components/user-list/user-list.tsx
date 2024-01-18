import { UserType } from '../common/hooks/useFetchUserList';
import UserItem from '../user-item/user-item';

import styles from './user-list.module.scss';

interface Props {
  userList: UserType[] | null;
}

function UserList({ userList }: Props) {
  return (
    <ul className={styles['user-list']}>
      {userList &&
        userList.map(({ id, name, email, website }) => (
          <UserItem
            key={id}
            id={id}
            name={name}
            email={email}
            website={website}
          />
        ))}
    </ul>
  );
}

export default UserList;
