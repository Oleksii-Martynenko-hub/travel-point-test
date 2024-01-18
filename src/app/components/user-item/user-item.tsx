import { Link } from 'react-router-dom';

import styles from './user-item.module.scss';

export interface UserItemProps {
  id: number;
  name: string;
  email: string;
  website: string;
}

export function UserItem({ id, name, email, website }: UserItemProps) {
  return (
    <li key={id} className={styles['user-item']}>
      <p className={styles['user-name']}>{name}</p>

      <a className={styles['email-link']} href={`mailto:${email}`}>
        {email}
      </a>

      <a
        className={styles['website-link']}
        href={`https://${website}`}
        target="blank"
      >
        {website}
      </a>

      <Link className={styles['user-details-link']} to={`/user-profile/${id}`}>
        Деталі
      </Link>
    </li>
  );
}

export default UserItem;
