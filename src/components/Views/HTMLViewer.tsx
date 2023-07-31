import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Keyboard,
  Linking,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import styled from 'styled-components/native';
import WebView from 'react-native-webview';
import PhotoViewModal from '@base/ui-kit/components/PhotoView/index';
import useBoolean from '@base/core/hooks/useBoolean';
// @ts-ignore
import linkifyHtml from 'linkifyjs/html';

interface Props {
  content: string;
  contentContainerStyle?: ViewStyle;
}

const urlRegex = /\bhttps?:\/\/[a-z0-9\.\-_](:\d+)?[^ \n\t<>()\[\]]*/i;
const {width} = Dimensions.get('window');

const linkifyOptions = {
  validate: {
    url: function (value: string) {
      return urlRegex.test(value);
    },
    email: false,
  },
  ignoreTags: ['a', 'script', 'style'],
};

// const Regular = Platform.select({
//   android: `file:///android_asset/fonts/${Fonts.Roboto.Regular}.ttf`,
//   ios: `${Fonts.Roboto.Regular}.ttf`,
// });
//
// const Medium = Platform.select({
//   android: `file:///android_asset/fonts/${Fonts.Roboto.Medium}.ttf`,
//   ios: `${Fonts.Roboto.Medium}.ttf`,
// });
// @font-face {
//   font-family: "${Fonts.Roboto.Regular}";
//   src: url(${Regular});
// }
//
// @font-face {
//   font-family: "${Fonts.Roboto.Medium}";
//   src: url(${Medium});
// }
const SAutoHeightWebView = styled(AutoHeightWebView).attrs(props => ({
  customStyle: `
      body {
          margin-bottom: 12px;
          padding-bottom: 12px;
          color: ${props.theme.grey1};
          font-family: sans-serif
      }

      img {
        display: inline; 
        height: auto; 
        max-width: 100%;
        border-radius: 8px;
        margin-top: 6px;
        margin-bottom: 6px
      }
      
      a {
        color: ${props.theme.blue}
      }
      
      div {
        color: ${props.theme.grey1};
      }
      
      
      p {
        margin: 0;
        padding-right: 3px;
        line-height: 25px;
        text-align: justify;
        -webkit-touch-callout: text;
        -webkit-user-select: text;  /* Chrome 49+ */
        -moz-user-select: text;     /* Firefox 43+ */
        -ms-user-select: text;      /* No support yet */
        user-select: text;          /* Likely future */  
        display: block;
      }
      
      b {
        fontSize: 15;
        lineHeight: 21;
      }
      
      h1 {
        margin: 0;
        fontSize: 25;
        lineHeight: 32;
      }
      
      h2 {
        margin: 0;
        fontSize: 22; 
        lineHeight: 30;
      }
      
      h3 {
        margin: 0;
        fontSize: 20;
        lineHeight: 28;
      }
  `,
  containerStyle: {
    backgroundColor: props.theme.backgroundColor,
  },
  customScript: `
      var imageNodes = document.getElementsByTagName('img');
      for(var i=0;  i<imageNodes.length;i++) {          
          imageNodes[i].addEventListener('click', onImgClick ,false);
      }
      function onImgClick (event) {
          if(window.ReactNativeWebView)
             window.ReactNativeWebView.postMessage(JSON.stringify({src: this.src}));
      }`,
}))``;

// @ts-ignore
const regexImgSrc = '<img .*?src="(.*?)".*?>';

export const HTMLViewer = memo((props: Props) => {
  const webview = useRef(WebView);
  const {content, contentContainerStyle} = props;
  const [loaded, setLoaded, setNoLoaded] = useBoolean(false);
  const [visibleImage, showVisibleImage, hideVisibleImage] = useBoolean(false);
  const [height, setHeight] = useState(0);

  const images = useMemo(() => {
    const result = content.match(new RegExp(regexImgSrc, 'gi'));
    return result
      ? result.map(_r => {
          const _regex = new RegExp(regexImgSrc, 'gi');
          const _result = _regex.exec(_r);
          return _result && _result.length ? _result[1] || '' : '';
        })
      : [];
  }, [content]);

  const [href, setHref] = useState('');

  const onImagePress = useCallback(
    _href => {
      setHref(_href);
      showVisibleImage();
    },
    [href],
  );

  const indexImage = useMemo(() => {
    const _index = images.indexOf(href);
    return _index > -1 ? _index : 0;
  }, [images, href]);

  useEffect(() => {
    // if (Platform.OS === 'ios') {
    //   StatusBar.setBarStyle(themeName === ThemeNameEnum.dark ? 'light-content' : 'dark-content');
    // } else {
    //   StatusBar.setBarStyle('light-content');
    // }

    const onKeyboardShowHide = () => {
      setTimeout(() => {
        // if (Platform.OS === 'ios') {
        //   StatusBar.setBarStyle(themeName === ThemeNameEnum.dark ? 'light-content' : 'dark-content');
        // } else {
        //   StatusBar.setBarStyle('light-content');
        // }
      }, 200);
    };
    onKeyboardShowHide();
    Keyboard.addListener('keyboardWillShow', onKeyboardShowHide);
    Keyboard.addListener('keyboardWillHide', onKeyboardShowHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardShowHide);
      Keyboard.removeListener('keyboardWillHide', onKeyboardShowHide);
      onKeyboardShowHide();
    };
  }, []);

  const newContent = useMemo(() => {
    return linkifyHtml(content, linkifyOptions);
  }, [content]);

  const onContentSizeChange = useCallback(
    size => {
      const {height} = size;
      setHeight(height);
    },
    [height],
  );

  const onShouldStartLoadWithRequest = (request: any) => {
    const {url} = request;
    if (loaded) {
      Linking.openURL(url).then();
      return false;
    }
    setLoaded();
    return true;
  };
  const onMessage = useCallback(
    event => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        if (message && message.src) {
          onImagePress(message.src);
        }
      } catch (e) {}
    },
    [onImagePress],
  );

  useEffect(() => {
    setNoLoaded();
  }, [newContent]);

  return (
    <View style={[styles.container, {height: height}]}>
      <>
        {newContent ? (
          <SAutoHeightWebView
            ref={webview}
            source={{
              html: newContent,
              baseUrl:
                Platform.OS === 'android' ? 'file:///android_asset/' : 'web/',
            }}
            style={contentContainerStyle}
            onLoadStart={setLoaded}
            originWhitelist={['*']}
            scrollEnabled={false}
            onSizeUpdated={onContentSizeChange}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            onMessage={onMessage}
            viewportContent={
              'user-scalable=no, initial-scale=1.0, maximum-scale=1.0, user-scalable=0.5'
            }
            javaScriptEnabled={true}
          />
        ) : null}
        <PhotoViewModal
          isVisible={visibleImage}
          onCloseRequest={hideVisibleImage}
          images={images}
          initialIndex={indexImage}
        />
      </>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionContainer: {
    paddingHorizontal: 0,
  },
});

export const HTMLViewStyles = StyleSheet.create({
  htmlViewerContainer: {
    width: width - 16 * 2,
  },
});
