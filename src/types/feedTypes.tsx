import * as constants from '../redux/constants/feedConstants';

/* Post Types */

export interface IPost {
  key: string;
  text: string;
}

export interface IFeedState {
  posts: IPost[];
  error: string;
}

/* Action Types */
export interface IGetFeed {
  type: constants.GET_FEED;
}

export interface IGetFeedSuccess {
  type: constants.GET_FEED_SUCCESS;
  posts: IPost[];
}

export interface IGetFeedFailure {
  type: constants.GET_FEED_FAILURE;
  error: string;
}

export type FeedAction = IGetFeed | IGetFeedSuccess | IGetFeedFailure;
