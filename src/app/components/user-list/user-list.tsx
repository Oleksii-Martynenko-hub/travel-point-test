import { Link } from 'react-router-dom';

import { UserType } from '../common/hooks/useFetchUserList';

import styles from './user-list.module.scss';

interface Props {
  userList: UserType[] | null;
}

function UserList({ userList }: Props) {
  return (
    <ul className={styles['user-list']}>
      {userList &&
        userList.map(({ id, name, email, website }) => (
          <li key={id}>
            <p className={styles['user-name']}>{name}</p> |{' '}
            <a className={styles['email-link']} href={`mailto:${email}`}>
              {email}
            </a>{' '}
            |{' '}
            <a
              className={styles['website-link']}
              href={`https://${website}`}
              target="blank"
            >
              {website}
            </a>{' '}
            | <Link to={`/user-profile/${id}`}>Деталі</Link>
          </li>
        ))}
    </ul>
  );
}

export default UserList;
