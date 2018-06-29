import * as constants from '../constants/feedConstants';
import { IGetFeed, posts as postType } from '../types/feedTypes';

export function getFeed(): IGetFeed {
  return {
    type: constants.GET_FEED
  };
}

export const getFeedSuccess = (posts: postType) => ({
  type: constants.GET_FEED_SUCCESS,
  posts
});

export const getFeedFailure = (error: string) => ({
  type: constants.GET_FEED_FAILURE,
  error
});
