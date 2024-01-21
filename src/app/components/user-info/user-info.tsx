import { UserType } from '../../components/common/hooks/useFetchUserList';

import styles from './user-info.module.scss';

export interface UserInfoProps {
  userData: UserType;
}
export function UserInfo({ userData }: UserInfoProps) {
  const { name, email, website, address, phone, company, username } = userData;

  return (
    <div className={styles['user-info']}>
      <h2 className={`title ${styles['user-name']}`}>{name}</h2>

      <div className={styles['user-details-wrapper']}>
        <p className={styles.property}>website:</p>
        <a
          className={styles['website-link']}
          href={`https://${website}`}
          target="blank"
        >
          {website}
        </a>

        <p className={styles.property}>username:</p>
        <p className="user-nickname">{username}</p>

        <p className={styles.property}>email:</p>
        <a className={styles['email-link']} href={`mailto:${email}`}>
          {email}
        </a>

        <p className={styles.property}>company:</p>
        <p className="user-company">{company.name}</p>

        <p className={styles.property}>phone:</p>
        <a
          className={styles['phone-link']}
          href={`phone:${phone.split(' ')[0]}`}
        >
          {phone.split(' ')[0]}
        </a>

        <p className={styles.property}>address:</p>
        <p className="user-address">
          {address.suite}, {address.street}, {address.city}
        </p>
      </div>
    </div>
  );
}

export default UserInfo;
