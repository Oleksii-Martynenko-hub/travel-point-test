import { Link } from 'react-router-dom';
import styles from './home.module.scss';

export interface HomeProps {
  userList: { id: number; name: string }[];
}

export function Home({ userList }: HomeProps) {
  return (
    <div className={styles['container']}>
      <h1>Список користувачів сайту</h1>

      <ul className={styles['user-list']}>
        {userList.map(({ id, name }) => (
          <li key={id}>
            {name} - <Link to={`/user-profile/${id}`}>Деталі</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
