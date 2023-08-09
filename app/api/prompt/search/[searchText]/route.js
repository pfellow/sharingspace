import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import User from '@models/user';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const regex = new RegExp(params.searchText, 'i');

    let prompts = await Prompt.find({
      prompt: { $regex: regex }
    }).populate('creator');

    if (prompts.length === 0) {
      prompts = await Prompt.find({
        tag: { $regex: regex }
      }).populate('creator');

      if (prompts.length === 0) {
        const user = await User.findOne({
          username: params.searchText
        });

        if (user) {
          prompts = await Prompt.find({
            creator: user._id
          }).populate('creator');
        }
      }
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
