
let ReactNative = require('react-native');
// 获取屏幕的dp
let Dimensions = require('Dimensions');
let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
let fontScale = ReactNative.PixelRatio.getFontScale();
let pixelRatio = ReactNative.PixelRatio.get();
// 高保真的宽度和告诉
const designWidth = 750.0;
const designHeight = 1334.0;

// 根据dp获取屏幕的px
let screenPxW = ReactNative.PixelRatio.getPixelSizeForLayoutSize(screenW);
let screenPxH = ReactNative.PixelRatio.getPixelSizeForLayoutSize(screenH);

/*
 * 设置text
 * @param size  px
 * @returns {Number} dp
 */
export function setSpText(size: Number) {
    var scaleWidth = screenW / designWidth;
    var scaleHeight = screenH / designHeight;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size * scale / fontScale + 0.5);
    return size;
}

/*
 * 设置高度
 * @param size  px
 * @returns {Number} dp
 */
export function scaleSizeH(size: Number) {
    var scaleHeight = size * screenPxH / designHeight;
    size = Math.round((scaleHeight / pixelRatio + 0.5));
    return size;
}

/*
 * 设置宽度
 * @param size  px
 * @returns {Number} dp
 */
export function scaleSizeW(size: Number) {
    var scaleWidth = size * screenPxW / designWidth;
    size = Math.round((scaleWidth / pixelRatio + 0.5));
    return size;
}
