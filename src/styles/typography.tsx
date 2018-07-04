import { StyleSheet } from 'react-native';

const fontColor = '#000000';
export const opacityPrimary = 0.87;
export const opacitySecondary = 0.54;
export const opacityDisabled = 0.38;

const typography = StyleSheet.create({
  headline: { fontSize: 24, fontFamily: 'sans-serif', color: fontColor, opacity: opacityPrimary },
  title: { fontSize: 20, fontFamily: 'sans-serif-medium', color: fontColor, opacity: opacityPrimary, lineHeight: 20 },
  subheader: { fontSize: 16, fontFamily: 'sans-serif', color: fontColor, opacity: opacityPrimary },
  body: { fontSize: 14, fontFamily: 'sans-serif', color: fontColor, opacity: opacityPrimary },
  menu: { fontSize: 14, fontFamily: 'sans-serif-medium', color: fontColor, opacity: opacityPrimary },
  caption: { fontSize: 12, fontFamily: 'sans-serif', color: fontColor, opacity: 1 },
  button: { fontSize: 14, fontFamily: 'sans-serif-medium', color: fontColor, opacity: opacityPrimary }
});

export default typography;
