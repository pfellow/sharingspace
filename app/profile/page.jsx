'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import Profile from '@components/profile';

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [session, setSession] = useState();
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get('userId') || session?.user.id;

  const sessionObj = useSession();

  useEffect(() => {
    setSession(sessionObj.data);
  }, [sessionObj]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session]);

  const searchChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();

      setUserName(data?.username);
    };

    console.log();

    if (userId === session?.user.id) {
      return setUserName('My');
    }
    fetchUser();
  }, [session]);

  const editHandler = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };
  const deleteHandler = async (postToDelete) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${postToDelete._id.toString()}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.log(error);
      }
      const filteredPosts = posts.filter(
        (post) => post._id !== postToDelete._id
      );
      setPosts(filteredPosts);
    }
  };

  return (
    <>
      {!userName ? (
        <p>User not found</p>
      ) : (
        <Profile
          name={userName}
          desc={`${userName} posts`}
          data={posts}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
};

export default UserProfile;
