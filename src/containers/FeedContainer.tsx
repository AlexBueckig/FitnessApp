import { connect, Dispatch } from 'react-redux';
import { getFeed } from '../actions/feedActions';
import FeedScreen from '../screens/FeedScreen';
import IStoreState from '../types';
import { FeedAction } from '../types/feedTypes';

export const mapStateToProps = (state: IStoreState) => ({
  posts: state.feed.posts
});

export const mapDispatchToProps = (dispatch: Dispatch<FeedAction>) => ({
  getPosts: () => dispatch(getFeed())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { withRef: true }
)(FeedScreen);
