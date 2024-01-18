import { useEffect, useState } from 'react';

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const useFetchUserList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userList, setUserList] = useState<UserType[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUserList(data);
      } catch (err) {
        const error = err as { message: string };

        if (error instanceof Error) {
          setError(error.message);
          return;
        }
        setError('Internal server error 500: something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { userList, loading, error };
};
