import React, {useCallback, useEffect, useState} from 'react';
import {styled} from '@/global';
import {IMG_ONBOARD1, IMG_ONBOARD2} from '@/assets';
import {StyleSheet} from 'react-native';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';
import {navigateToRootScreen} from '@/utils/navigation';
import PagerView from 'react-native-pager-view';
import {BaseStyles} from '@/themes/BaseStyles';
import {getApp, setApp} from '@/store/constant';
import {scale} from '@/utils/scale';
import {Colors} from '@/themes';
import {Bold, Regular} from '@/components/CommonStyled';
import {StatusBarViewTransparent} from '@/components/Header/DynamicHeader';

export const OnboardScreen = React.memo(function OnboardScreen() {
  const initApp = getApp();
  useEffect(() => {
    if (!initApp) {
      setApp(true);
    }
  }, [initApp]);
  const [currentPage, setCurrentPage] = useState(0);

  const onNavigate = useCallback(() => {
    navigateToRootScreen();
  }, []);
  const onClick = useCallback(() => {
    pagerViewRef.current?.setPage(1);
  }, []);
  const onPageScroll = useCallback(
    (event: {nativeEvent: {position: any}}) => {
      const {position} = event.nativeEvent;
      setCurrentPage(position);
    },
    [currentPage],
  );

  const pagerViewRef = React.useRef<PagerView>();
  return (
    <Container>
      <StatusBarViewTransparent />
      <PagerView
        onPageScroll={onPageScroll}
        ref={pagerViewRef as any}
        initialPage={0}
        style={BaseStyles.flex1}>
        <WrapPager>
          <ViewWrap>
            <ImageView source={IMG_ONBOARD1} />
          </ViewWrap>
          <Content>
            <Title>Welcome to LokMart! {'\n'}Grocery Applications</Title>
            <SubTitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </SubTitle>
          </Content>
        </WrapPager>

        <WrapPager>
          <ViewWrap>
            <ImageView source={IMG_ONBOARD2} />
          </ViewWrap>
          <Content>
            <Title>
              Best Quality and {'\n'}
              Fast Delivery!
            </Title>
            <SubTitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </SubTitle>
          </Content>
        </WrapPager>
      </PagerView>

      <Footer>
        <ViewDot>
          {currentPage ? (
            <>
              <Dot />
              <Dot1 />
            </>
          ) : (
            <>
              <Dot1 />
              <Dot />
            </>
          )}
        </ViewDot>

        <ButtonNext
          title={currentPage ? 'Get Started' : 'Next'}
          textStyle={styles.nextText}
          onPress={currentPage ? onNavigate : onClick}
        />
      </Footer>
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundColor};
`;
const WrapPager = styled.View`
  flex: 1;
`;
const ViewWrap = styled.View`
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const ImageView = styled.Image`
  z-index: 1;
  position: absolute;
  align-self: center;
`;

const ImageBg = styled.Image`
  width: 100%;
  height: 100%;
`;
const Content = styled.View`
  margin-top: 27.92px;
  width: 319px;
  align-self: center;
  height: 30%;
`;
const Title = styled(Bold)`
  width: 319px;
  font-size: 22px;
  text-align: center;
  color: ${Colors.gray1};
`;
const SubTitle = styled(Regular)`
  font-size: 16px;
  margin-top: 12px;
  text-align: center;
  color: ${Colors.gray1};
`;
const ViewDot = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin-bottom: 40px;
`;
const Dot = styled.View`
  width: ${scale(15)}px;
  height: ${scale(8)}px;
  margin-right: 4px;
  border-radius: 4px;
  background: ${Colors.gray5};
  margin-top: 12px;
`;
const Dot1 = styled(Dot)`
  width: ${scale(21)}px;
  height: ${scale(8)}px;
  background: ${Colors.orange1};
`;
const ButtonNext = styled(SubmitButtonColor)`
  margin-bottom: 44px;
  height: 60px;
  width: 311px;
  align-self: center;
`;
const Footer = styled.View``;
const styles = StyleSheet.create({
  nextText: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
export default OnboardScreen;
