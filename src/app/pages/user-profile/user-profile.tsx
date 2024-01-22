import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../store';
import { selectUserById } from '../../../store/usersSlice/users.slice';

import StyledLink from '../../components/common/styled-link/styled-link';
import UserInfo from '../../components/user-info/user-info';

import styles from './user-profile.module.scss';

const NotExistUser = () => (
  <>
    <StyledLink classes="back-link" to="/">
      Back
    </StyledLink>
    <h1 className="title">User doesn't exist!</h1>
  </>
);

export function UserProfile() {
  const params = useParams<{ userId: string }>();

  const userId = params.userId || '-1';

  const user = useAppSelector(selectUserById(userId));

  if (!user) return <NotExistUser />;

  return (
    <div className={styles['user-profile']}>
      <StyledLink classes="back-link" to="/">
        Back
      </StyledLink>

      <UserInfo userData={user} />
    </div>
  );
}

export default UserProfile;
