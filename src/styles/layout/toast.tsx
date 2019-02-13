import { StyleSheet } from 'react-native';

const toasts = StyleSheet.create({
  container: {
    width: '60%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F9465',
    marginBottom: 8,
    borderRadius: 3,
    height: 40,
    paddingLeft: 12,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4
  },
  toast__message: {
    flex: 1,
    textAlign: 'center',
    color: 'white'
  },
  toast__button: {
    color: 'white'
  }
});

export default toasts;
