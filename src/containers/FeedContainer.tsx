import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getFeed } from '../redux/actions/feedActions';
import FeedScreen from '../screens/FeedScreen';
import IStoreState from '../types';
import { FeedAction } from '../types/feedTypes';

export const mapStateToProps = (state: IStoreState) => ({
  posts: state.feedState.posts
});

export const mapDispatchToProps = (dispatch: Dispatch<FeedAction>) => ({
  getPosts: () => dispatch(getFeed())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedScreen);
