import { IGetFeed, IPost } from '../../types/feedTypes';
import * as constants from '../constants/feedConstants';

export function getFeed(): IGetFeed {
  return {
    type: constants.GET_FEED
  };
}

export const getFeedSuccess = (posts: IPost[]) => ({
  type: constants.GET_FEED_SUCCESS,
  posts
});

export const getFeedFailure = (error: string) => ({
  type: constants.GET_FEED_FAILURE,
  error
});