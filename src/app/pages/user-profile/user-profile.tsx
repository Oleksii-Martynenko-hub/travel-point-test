import { Link, redirect, useParams } from 'react-router-dom';

import { UserType } from 'src/app/components/common/hooks/useFetchUserList';

import styles from './user-profile.module.scss';

export interface UserProfileProps {
  userList: UserType[] | null;
}

export function UserProfile({ userList }: UserProfileProps) {
  const params = useParams();

  const { userId } = params;

  if (!userId) return <h3>User doesn't exist!</h3>;

  if (!userList) {
    redirect('/');
    return;
  }

  const user = userList.find((user) => user.id === parseInt(userId));

  if (!user) return <h3>User doesn't exist!</h3>;

  return (
    <div className={styles['container']}>
      <Link to="/">Back</Link>
      <h1>
        Welcome to {user.username}'s Profile!
        <p>{JSON.stringify(user)}</p>
      </h1>
    </div>
  );
}

export default UserProfile;
