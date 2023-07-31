import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {IC_CAMERA, IC_SEND, IMG_AVA_CHAT, IMG_USER_REPLY} from '@/assets';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';

export const ChatDetails = memo(function ChatDetails() {
  return (
    <Wrapper>
      <WrapHeader>
        <DynamicHeader title={'Nguyễn Thu Trang'} />
      </WrapHeader>
      <ContainerChat>
        <TextDate>16:44</TextDate>
        <ViewTextSend>
          <TextChat>alo, chào shop</TextChat>
        </ViewTextSend>

        <WrapReply>
          <SImg>
            <Image source={IMG_USER_REPLY} />
          </SImg>
          <WrapChat>
            {['Vâng, chào bạn', 'Chúng tôi có thể giúp đỡ gì cho bạn ạ'].map(
              (chat, index) => {
                return (
                  <View key={index}>
                    <ViewTextRep>
                      <TextChat>{chat}</TextChat>
                    </ViewTextRep>
                  </View>
                );
              },
            )}
          </WrapChat>
        </WrapReply>
        <WrapSend>
          <ViewTextSend>
            <TextChat>Tôi muốn mua số lượng lớn giá cả ntn nhỉ ?</TextChat>
          </ViewTextSend>
        </WrapSend>
      </ContainerChat>
      <WrapInput>
        <InputChat placeholder="Nhập tin nhắn" multiline={true} />
        <WrapTouch>
          <STouchCam>
            <Image source={IC_CAMERA} />
          </STouchCam>
          <STouchSend>
            <Image source={IC_SEND} />
          </STouchSend>
        </WrapTouch>
      </WrapInput>
    </Wrapper>
  );
});

const Wrapper = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
const WrapHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray7};
`;

const ContainerChat = styled.ScrollView`
  flex: 1;
`;

const TextDate = styled(Medium)`
  margin-top: 48px;
  font-size: 12px;
  line-height: ${scale(14)}px;
  text-align: center;
  color: ${Colors.gray3};
`;
const WrapSend = styled.View`
  max-width: 65%;
  align-self: flex-end;
`;
const ViewTextSend = styled.View`
  background-color: rgba(18, 144, 204, 0.2);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 4px;
  margin: 0px 20px 20px 0px;
  align-self: flex-end;
`;
const WrapReply = styled.View`
  flex-direction: row;
  margin: 0 20px 20px 20px;
`;
const SImg = styled.View`
  justify-content: flex-end;
  margin-right: 12px;
`;
const WrapChat = styled.View``;
const ViewTextRep = styled.View`
  max-width: 85%;
  margin-bottom: 2px;
  background-color: ${Colors.gray7};
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 18px;
  align-self: flex-start;
`;
const TextChat = styled(Regular)`
  padding: 8px 8px 10px 16px;
  font-size: 16px;
  line-height: ${scale(24)}px;
  color: ${Colors.gray1};
`;
const WrapInput = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray7};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  height: 50px;
`;
const InputChat = styled.TextInput`
  padding-right: 10px;
  flex: 1;
`;

const WrapTouch = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const STouchCam = styled.TouchableOpacity`
  margin-right: 18px;
`;
const STouchSend = styled.TouchableOpacity``;

export default ChatDetails;
