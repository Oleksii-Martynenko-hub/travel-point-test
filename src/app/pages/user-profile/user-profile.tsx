import { redirect, useParams } from 'react-router-dom';

import { UserType } from '../../components/common/hooks/useFetchUserList';
import StyledLink from '../../components/common/styled-link/styled-link';

import styles from './user-profile.module.scss';

export interface UserProfileProps {
  userList: UserType[] | null;
}

const NotExistUser = () => (
  <>
    <StyledLink classes="back-link" to="/">
      Back
    </StyledLink>
    <h2 className="title">User doesn't exist!</h2>
  </>
);

export function UserProfile({ userList }: UserProfileProps) {
  const params = useParams();

  const { userId } = params;

  if (!userId) return <NotExistUser />;

  if (!userList) {
    redirect('/');
    return;
  }

  const user = userList.find((user) => user.id === parseInt(userId));

  if (!user) return <NotExistUser />;

  const { name, email, website, address, phone, company, username } = user;

  return (
    <div className={styles['user-profile']}>
      <div className={styles['back-link-wrapper']}>
        <StyledLink classes="back-link" to="/">
          Back
        </StyledLink>
      </div>

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

export default UserProfile;
