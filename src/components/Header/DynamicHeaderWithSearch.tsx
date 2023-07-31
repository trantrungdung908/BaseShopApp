import React, {memo, ReactElement, useCallback, useEffect} from 'react';
import {styled, useNavigation} from '@/global';
import {Keyboard, StatusBar, View, ViewProps, ViewStyle} from 'react-native';
import {Medium, StyledText} from '../CommonStyled';
import {IC_BUY, IC_ARROW_LEFT, IC_DROPDOWN, IC_FILTER} from '@/assets';
import {SearchBar} from '@/components/SearchBar';
import {StatusBarView} from '@/components/Header/DynamicHeader';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import {navigateToCartScreen} from '@/utils/navigation';

const Wrapper = styled(View)`
  background-color: ${Colors.backgroundColor};
`;

const LeftActions = styled.View`
  margin-left: 6px;
`;

const RightActions = styled.View`
  margin-right: 16px;
  flex-direction: row;
`;

const Container = styled.View<{hideSeparator?: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  align-items: center;
  border-bottom-color: ${Colors.gray7};
  border-bottom-width: ${p => (p?.hideSeparator ? 0 : 1)}px;
`;

const ViewSearch = styled.View`
  justify-content: center;
  flex: 1;
`;

const IconBlack = styled.Image`
  tint-color: ${Colors.black};
`;

const ContainerSearch = styled.View<{hideSeparator?: boolean}>`
  height: 48px;
  flex-direction: row;
  border-bottom-color: ${Colors.gray7};
  align-items: center;
`;

const Title = styled(StyledText.Medium)`
  font-size: 20px;
  color: ${Colors.white}
  line-height: 22px;
  text-align: center;
`;
const SImage = styled.Image`
  tint-color: ${Colors.white};
`;

const STouchTitle = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  flex: 1;
`;

export const HeaderIconWrapper = styled.TouchableOpacity`
  min-width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const ViewAmount = styled.View`
  background-color: ${Colors.red1};
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  border-radius: 20px;
  position: absolute;
  justify-content: center;
  right: -2px;
  top: -4px;
}
`;

const SAmount = styled(Medium)`
  color: ${Colors.white};
  font-size: 16px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

interface DynamicHeaderProps extends ViewProps {
  title?: string;
  isSearch: boolean;
  onPresTitle?: () => void;
  onChangeText: (text: string) => void;
  styleTitle?: ViewStyle;
  hideInputSearch?: () => void;
  hideSeparator?: boolean;
  children?: ReactElement | ReactElement[] | null;
  onFilter?: () => void;
  amount?: string[];
}

export const DynamicHeaderWithSearch = memo(function DynamicHeaderWithSearch({
  title,
  isSearch,
  hideInputSearch,
  onChangeText,
  children,
  hideSeparator,
  onPresTitle,
  styleTitle,
  onFilter,
  amount,
  ...props
}: DynamicHeaderProps) {
  const {canGoBack, goBack} = useNavigation();

  useEffect(() => {
    const entry = StatusBar.pushStackEntry({
      barStyle: 'dark-content',
    });

    return () => {
      StatusBar.popStackEntry(entry);
    };
  }, []);

  const hide = useCallback(async () => {
    await Keyboard.dismiss;
    onChangeText('');
    // hideInputSearch();
  }, [hideInputSearch, onChangeText]);

  if (!amount) {
    return null;
  }
  return (
    <Wrapper {...props}>
      <StatusBarView />
      {!isSearch && (
        <Container hideSeparator={hideSeparator}>
          <LeftActions>
            {canGoBack() ? (
              <HeaderIconWrapper onPress={goBack}>
                <IconBlack source={IC_ARROW_LEFT} />
              </HeaderIconWrapper>
            ) : null}
          </LeftActions>
          <STouchTitle
            activeOpacity={0.6}
            disabled={!onPresTitle}
            onPress={onPresTitle}>
            <Title style={styleTitle} numberOfLines={1}>
              {title}
            </Title>
            {onPresTitle && <SImage source={IC_DROPDOWN} />}
          </STouchTitle>

          <RightActions>
            {!children && canGoBack() ? <HeaderIconWrapper /> : null}
            {children}
          </RightActions>
        </Container>
      )}
      {isSearch && (
        <ContainerSearch>
          <LeftActions>
            {canGoBack() ? (
              <HeaderIconWrapper onPress={goBack}>
                <IconBlack source={IC_ARROW_LEFT} />
              </HeaderIconWrapper>
            ) : null}
          </LeftActions>
          <ViewSearch>
            <SearchBar onSearchTextChange={onChangeText} />
          </ViewSearch>
          <RightActions>
            <HeaderIconWrapper onPress={() => navigateToCartScreen()}>
              <IconBlack source={IC_BUY} />
              {amount.length > 0 ? (
                <ViewAmount>
                  <SAmount>{amount.length}</SAmount>
                </ViewAmount>
              ) : (
                ''
              )}
            </HeaderIconWrapper>
            <HeaderIconWrapper onPress={onFilter}>
              <IconBlack source={IC_FILTER} />
            </HeaderIconWrapper>
          </RightActions>
        </ContainerSearch>
      )}
    </Wrapper>
  );
});
