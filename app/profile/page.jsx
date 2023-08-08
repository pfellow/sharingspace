'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Profile from '@components/profile';

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [session, setSession] = useState();

  const sessionObj = useSession();

  useEffect(() => {
    setSession(sessionObj.data);
  }, [sessionObj]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session]);
  const searchChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const editHandler = () => {};
  const deleteHandler = async () => {};

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      editHandler={editHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default MyProfile;
