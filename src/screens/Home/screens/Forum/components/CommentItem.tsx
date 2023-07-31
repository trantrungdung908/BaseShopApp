import React, {memo} from 'react';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import FastImage from 'react-native-fast-image';
import {HTMLRenderer} from '@/components/Views/HTMLRender';
import moment from 'moment';

export interface CommentItemInterface {
  item: {
    id: number;
    author_name: string;
    author_avatar_urls: {
      24: string;
      48: string;
      96: string;
    };
    content: {
      rendered: string;
    };
    date: string;
  };
}

export const CommentItem = memo(function CommentItem({
  item,
}: CommentItemInterface) {
  return (
    <Container key={item.id}>
      <SImage source={{uri: item.author_avatar_urls['96']}} />
      <WrapContent>
        <SText>{item.author_name}</SText>
        <HTMLRenderer htmlContent={item.content.rendered} />
      </WrapContent>
      <SDate>{moment(item.date).format('MMM Do YY, h:mm:ss')}</SDate>
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-color: ${Colors.gray7};
  border-bottom-width: 1px;
`;

const SImage = styled(FastImage)`
  width: ${scale(50)}px;
  height: ${scale(50)}px;
  border-radius: 100px;
`;

const WrapContent = styled.View`
  margin-left: 12px;
  max-width: ${scale(150)}px;
`;

const SText = styled(Medium)`
  font-size: 16px;
  color: ${Colors.gray1};
  margin-bottom: 6px;
`;

const SDate = styled(Regular)`
  color: ${Colors.gray4};
  margin-left: auto;
`;
