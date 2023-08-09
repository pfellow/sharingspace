'use client';

import { useEffect, useState } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, tagClickHandler }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
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
    if (searchText.length !== 0) return;

    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, [searchText]);

  useEffect(() => {
    if (searchText.length === 0) return;

    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt/search/${searchText}`);
      const data = await response.json();

      setPosts(data);
    };

    const timeout = setTimeout(fetchPosts, 500);
    return () => clearTimeout(timeout);
  }, [searchText]);

  const searchChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const tagClickHandler = (tag) => {
    setSearchText(tag)
  }

  return (
    <section className='feed'>
      <form
        className='relative w-full flex-center'
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={searchChangeHandler}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={posts} tagClickHandler={tagClickHandler} />
    </section>
  );
};

export default Feed;
