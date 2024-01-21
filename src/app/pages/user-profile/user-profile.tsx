import { redirect, useParams } from 'react-router-dom';

import { UserType } from '../../components/common/hooks/useFetchUserList';
import StyledLink from '../../components/common/styled-link/styled-link';

import styles from './user-profile.module.scss';
import UserInfo from '../../components/user-info/user-info';

export interface UserProfileProps {
  userList: UserType[] | null;
}

const NotExistUser = () => (
  <>
    <StyledLink classes="back-link" to="/">
      Back
    </StyledLink>
    <h1 className="title">User doesn't exist!</h1>
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
