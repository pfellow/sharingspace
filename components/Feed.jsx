'use client';

import { useEffect, useState } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, tagClickHandler }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          tagClickHandler={tagClickHandler}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);
  const searchChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={searchChangeHandler}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={posts} tagClickHandler={() => {}} />
    </section>
  );
};

export default Feed;
