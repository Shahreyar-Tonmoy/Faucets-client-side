import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get('https://job-task-server-side-gules.vercel.app/auth/profile/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const { data: userData } = useQuery({
    queryKey: 'user',
    queryFn: fetchUser,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  console.log(user)



  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.user.useremail}!</h2>
          {/* Render other user details as needed */}
        </div>
      ) : (
        <p>No User</p>
      )}
    </div>
  );
}