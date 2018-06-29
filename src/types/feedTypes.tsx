import * as constants from '../constants/feedConstants';

export interface IPost {
  key: string;
  text: string;
}
export type posts = IPost[];

export interface IFeedState {
  posts: posts;
  error: string;
}

/* Action Types */
export interface IGetFeed {
  type: constants.GET_FEED;
}

export interface IGetFeedSuccess {
  type: constants.GET_FEED_SUCCESS;
  posts: posts;
}

export interface IGetFeedFailure {
  type: constants.GET_FEED_FAILURE;
  error: string;
}

export type FeedAction = IGetFeed | IGetFeedSuccess | IGetFeedFailure;
