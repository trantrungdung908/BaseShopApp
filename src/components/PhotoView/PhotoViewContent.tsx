import * as React from 'react';
import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import ToastService from '@/services/ToastService';
import useBoolean from '@/hooks/useBoolean';
import File from '@/services/File';
import Share from 'react-native-share';
import {IC_CLOSE, IC_DOWNLOAD, IC_SHARE} from '@/assets';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBarViewTransparent} from '@/components/Header/DynamicHeader';
import {Colors} from '@/themes';
import FastImage from 'react-native-fast-image';

const SWrapper = styled(SafeAreaView)`
  background-color: #000;
  flex: 1;
  padding-bottom: ${() => getBottomSpace()}px;
`;

const SSingleImageWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #000;
  width: ${() => Dimensions.get('window').width}px;
`;

const SImage = styled.Image`
  flex: 1 1;
  width: 100%;
  max-width: ${() => Dimensions.get('window').width}px;
`;

const SLoadingIndicator = styled.ActivityIndicator`
  margin: auto;
  width: 56px;
  height: 56px;
  position: absolute;
`;

const SHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: 0 8px;
  background-color: #00000080;
`;

const SHeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SCloseButton = styled.Image`
  height: 24px;
  width: 24px;
  tint-color: ${Colors.white};
`;

const SShareButton = styled(SCloseButton)`
  height: 16px;
  width: 16px;
  margin-left: 12px;
  tint-color: ${Colors.white};
`;

const PhotoViewSingleImage = memo(({image}: {image: string}) => {
  const [loading, , setLoadingFalse] = useBoolean(true);

  return (
    <SSingleImageWrapper>
      <SImage
        source={{uri: image}}
        onLoadEnd={setLoadingFalse}
        resizeMode={FastImage.resizeMode.contain}
      />

      {loading && <SLoadingIndicator />}
    </SSingleImageWrapper>
  );
});

interface Props {
  images: string[];
  initialIndex?: number;
  onCloseRequest: () => any;
}
const PhotoViewContent = memo(
  ({initialIndex = 0, images, onCloseRequest}: Props) => {
    const currentPage = useRef(initialIndex);
    const scrollView = useRef<ScrollView>(null);
    const [renderedPages, setRenderedPages] = useState<Set<number>>(
      () => new Set([initialIndex]),
    );

    useEffect(() => {
      if (!initialIndex && scrollView.current) {
        return;
      }
      const dimensions = Dimensions.get('window');

      let timeout = setTimeout(() => {
        // @ts-ignore
        scrollView.current.scrollTo({
          x: dimensions.width * initialIndex,
          y: 0,
          animated: false,
        });
      });

      return () => {
        return clearTimeout(timeout);
      };
    }, [scrollView, initialIndex]);

    const onScrollEnd: ScrollView['props']['onMomentumScrollEnd'] = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {contentOffset, layoutMeasurement} = event.nativeEvent;

        const pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);

        currentPage.current = pageNum;

        setRenderedPages((value: any) => {
          const newState = new Set<number>(value);
          newState.add(pageNum);
          return newState;
        });
      },
      [],
    );

    const actions = useMemo(() => {
      return {
        share: () =>
          File.share({
            url: images[currentPage.current],
            social: Share.Social.FACEBOOK,
          }),
        download: async () => {
          await File.download({
            url: images[currentPage.current],
          });
          onCloseRequest();
          ToastService.show('Photo downloaded successfully');
        },
      };
    }, [currentPage, images]);
    return (
      <SWrapper>
        <StatusBarViewTransparent />
        <SHeader>
          <SHeaderLeft>
            <TouchableOpacity onPress={actions.download}>
              <SCloseButton source={IC_DOWNLOAD} />
            </TouchableOpacity>
            <TouchableOpacity onPress={actions.share}>
              <SShareButton source={IC_SHARE} />
            </TouchableOpacity>
          </SHeaderLeft>
          <TouchableOpacity onPress={onCloseRequest}>
            <SCloseButton source={IC_CLOSE} />
          </TouchableOpacity>
        </SHeader>
        <ScrollView
          ref={scrollView}
          pagingEnabled={true}
          horizontal={true}
          onMomentumScrollEnd={onScrollEnd}>
          {images.map((image, index) =>
            renderedPages.has(index) ? (
              <PhotoViewSingleImage key={image} image={image} />
            ) : (
              <SSingleImageWrapper key={image} />
            ),
          )}
        </ScrollView>
      </SWrapper>
    );
  },
);

export default PhotoViewContent;
