import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import * as React from 'react';
import {ComponentProps, memo, PropsWithChildren, useEffect} from 'react';
import {
  ImageSourcePropType,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '../Views/Icon';
import {Colors} from '@/themes';
import {Medium} from "@/components/CommonStyled";

const SWrapper = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`;

const SContainer = styled(View)`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${Colors.backgroundColor};
`;

interface Props {
  isVisible: boolean;
  onCloseRequest: () => any;
}
export const ActionSheetWrapper = memo(
  ({isVisible, onCloseRequest, children}: PropsWithChildren<Props>) => {
    useEffect(() => {
      isVisible && Keyboard.dismiss();
    }, [isVisible]);

    return (
      <SWrapper
        isVisible={isVisible}
        swipeDirection={'down'}
        onSwipeComplete={onCloseRequest}
        onDismiss={onCloseRequest}
        onBackdropPress={onCloseRequest}
        onBackButtonPress={onCloseRequest}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        avoidKeyboard={true}>
        <SContainer>{children}</SContainer>
      </SWrapper>
    );
  },
);

const SHeader = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.gray4};
`;
const STitle = styled(Medium)`
  font-size: 17px;
  color: ${Colors.gray1};
  flex: 1;
`;

const SCloseIcon = styled(Icon)`
  color: ${props => props.theme.grey4};
  font-size: 24px;
  height: 40px;
  line-height: 40px;
  margin-left: 16px;
`;
interface ActionSheetHeaderProps {
  title: string;
  onCloseRequest?: () => any;
}
export const ActionSheetHeader = memo(
  ({title, onCloseRequest}: ActionSheetHeaderProps) => {
    return (
      <SHeader>
        <STitle numberOfLines={1}>{title}</STitle>
        {!!onCloseRequest && (
          <TouchableOpacity onPress={onCloseRequest}>
            <SCloseIcon />
          </TouchableOpacity>
        )}
      </SHeader>
    );
  },
);

const SRow = styled(TouchableOpacity)`
  flex-flow: row;
  align-items: center;
  height: 44px;
  padding: 0 16px;
`;

const SIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const SText = styled(Medium)`
  font-size: 15px;
  color: ${Colors.gray1};
`;

const LoadingIndicator = styled.ActivityIndicator`
  margin-right: 8px;
`;

interface ActionSheetRowProps {
  icon: ImageSourcePropType;
  text: string;
  onPress: ComponentProps<typeof TouchableOpacity>['onPress'];
  isLoading?: boolean;
}
export const ActionSheetRow = memo(
  ({icon, text, onPress, isLoading}: ActionSheetRowProps) => {
    return (
      <SRow onPress={onPress}>
        {isLoading ? <LoadingIndicator /> : <SIcon source={icon} />}
        <SText>{text}</SText>
      </SRow>
    );
  },
);
