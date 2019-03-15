import { Dimensions, StyleSheet } from 'react-native';
import toasts from './toast';

const Screen = Dimensions.get('window');

const layout = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  container: {
    paddingHorizontal: 16,
    width: '100%'
  },
  backgroundImage: {
    width: Screen.width,
    height: (Screen.width / 750) * 800,
    position: 'absolute'
  },
  card: {
    height: 100,
    padding: 16,
    marginBottom: 25,
    marginHorizontal: 16,
    borderRadius: 0,
    backgroundColor: 'white',
    shadowColor: '#606060',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 4,
    flex: 1
  },
  addButtonPosition: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    height: 56,
    width: 56,
    elevation: 1
  },
  addButton: {
    width: 56,
    height: 56,
    borderWidth: 0,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: '#14C788'
  }
});

export default { toasts, ...layout };
