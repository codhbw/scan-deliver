import { Image } from 'react-native';
import { Asset, Font } from 'expo';

export default function cacheAssetsAsync({ images = [], fonts = [], ms = 20000 }) {
  return Promise.all([...cacheImages(images), ...cacheFonts(fonts), ...sleep(ms)]);
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
