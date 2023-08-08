import PromptCard from './PromptCard';

const Profile = ({ name, desc, data, editHandler, deleteHandler }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc taxt-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            editHandler={() => editHandler && editHandler(post)}
            deleteHandler={() => deleteHandler && deleteHandler(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
