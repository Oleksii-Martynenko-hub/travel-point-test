import StyledLink from '../common/styled-link/styled-link';

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

      <StyledLink classes="details-link" to={`/user-profile/${id}`}>
        Деталі
      </StyledLink>
    </li>
  );
}

export default UserItem;
