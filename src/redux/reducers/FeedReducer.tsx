import { FeedAction, IFeedState } from '../../types/feedTypes';
import * as constants from '../constants/feedConstants';

export default (state: IFeedState = { posts: [], error: '' }, action: FeedAction): IFeedState => {
  switch (action.type) {
    case constants.GET_FEED_SUCCESS:
      return { ...state, posts: action.posts };
    case constants.GET_FEED_FAILURE:
      return { ...state, posts: [], error: action.error };
    default:
      return state;
  }
};
