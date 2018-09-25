import { getFeedPosts } from './feedApi';
import realm from './realm/';
import wger from './wger';

export default {
  feed: {
    posts: getFeedPosts
  },
  wger,
  realm
};
