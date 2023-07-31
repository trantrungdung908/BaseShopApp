import React, {memo, useCallback, useRef} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  Animated,
  ImageSourcePropType,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '@/themes';
import useBoolean from '@/hooks/useBoolean';
import {IC_LIVESTREAM, IMG_BOTTOM_TAB_BG} from '@/assets';
import {scale} from '@/utils/scale';
import FastImage from 'react-native-fast-image';

export interface TabBarIconProps {
  icon: ImageSourcePropType;
  focused: boolean;
  color: any;
}

const Icon = styled.Image<{color?: string; focused?: boolean}>`
  width: 25px;
  height: 25px;
  tint-color: ${props => (props.focused ? Colors.orange1 : Colors.gray3)};
`;

const Label = styled.Text<{focused: boolean}>`
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  padding-top: 4px;
  color: ${p => (p.focused ? Colors.orange1 : Colors.gray3)};
`;
const ContentContainer = styled.View`
  background-color: ${Colors.backgroundColor};
  border-width: 1px;
  border-color: ${Colors.gray6};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

export const TabBarIcon = memo(function TabBarIcon({
  icon,
  focused,
  color,
}: TabBarIconProps) {
  if (focused) {
    return <Icon source={icon} focused={focused} color={color} />;
  }
  return <Icon source={icon} focused={focused} color={color} />;
});

export const CustomTabBar = memo(function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [visible, show, hide] = useBoolean(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const onHide = useCallback(() => {
    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    hide();
  }, [hide, rotateAnimation]);

  return (
    <View>
      <ContentContainer style={styles.containerAbsolute}>
        <View style={styles.contentContainer}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const onPress = useCallback(() => {
              onHide();
              InteractionManager.runAfterInteractions(() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              });
            }, [route, isFocused]);

            return (
              <TouchableOpacity
                key={'tab-' + index.toString()}
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.bottomBarIcon}>
                {options &&
                  options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: Colors.green2,
                    size: 0,
                  })}
                <Label numberOfLines={1} focused={isFocused}>
                  {`${label}`}
                </Label>
              </TouchableOpacity>
            );
          })}
        </View>
      </ContentContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  viewIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(60),
  },
  containerAbsolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(60),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bottomBarIcon: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
