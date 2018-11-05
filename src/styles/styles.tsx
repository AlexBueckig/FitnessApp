import { Dimensions, StyleSheet } from 'react-native';

const Screen = Dimensions.get('window');

const layout = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  container: {
    marginHorizontal: 16,
    width: '90%',
    alignSelf: 'center'
  },
  backgroundImage: {
    width: Screen.width,
    height: (Screen.width / 750) * 800,
    position: 'absolute'
  },
  spacer: {
    height: 300
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
  roundView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    opacity: 0.54,
    marginTop: 16
  },
  addButtonPosition: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 72,
    width: 72
  },
  addButton: {
    width: 56,
    height: 56,
    borderWidth: 0,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: 'green'
  },
  button: {
    borderRadius: 24,
    borderWidth: 5,
    borderColor: 'green',
    height: 36,
    minWidth: 150,
    backgroundColor: 'transparent',
    alignContent: 'center',
    margin: 10
  }
});

export default layout;
