import { PixelRatio, Platform } from 'react-native';
import { ImageSource } from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const navIconSize = __DEV__ === false && Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(40) : 40;
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons: { [key: string]: [number, string?] } = {
  delete: [30],
  edit: [30],
  home: [navIconSize]
};

const iconsMap: { [key: string]: ImageSource } = {};
const iconsLoaded = new Promise((resolve, reject) => {
  Promise.all(
    Object.keys(icons).map(iconName =>
      // IconName--suffix--other-suffix is just the mapping name in iconsMap
      MaterialIcons.getImageSource(iconName.replace(replaceSuffixPattern, ''), icons[iconName][0], icons[iconName][1])
    )
  ).then(sources => {
    Object.keys(icons).forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));

    // Call resolve (and we are done)
    resolve(true);
  });
});

export { iconsMap, iconsLoaded };
