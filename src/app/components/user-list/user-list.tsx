import { UserType } from '../common/hooks/useFetchUserList';
import UserItem from '../user-item/user-item';

import styles from './user-list.module.scss';

interface Props {
  userList: UserType[] | null;
}

function UserList({ userList }: Props) {
  return (
    <ul className={styles['user-list']}>
      {userList?.length ? (
        userList.map(({ id, name, email, website }) => (
          <UserItem
            key={id}
            id={id}
            name={name}
            email={email}
            website={website}
          />
        ))
      ) : (
        <li className="empty-item">
          <p className="there-is-no-users">
            Список користувачів пустий, поки що.
          </p>
        </li>
      )}
    </ul>
  );
}

export default UserList;
