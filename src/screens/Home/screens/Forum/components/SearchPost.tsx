import {Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {navigateToBlogScreen} from '@/utils/navigation';

// @ts-ignore
export const SearchPost = memo(function SearchPost({item, index, isLast}) {
  const onSelect = useCallback(() => {
    // @ts-ignore
    navigateToBlogScreen({idBlog: item.id});
  }, [item]);

  return (
    <Container isLast={isLast}>
      <STouch onPress={onSelect}>
        <SText>{index + 1}.</SText>
        <SText>{item.title.rendered}</SText>
      </STouch>
    </Container>
  );
});

const Container = styled.View<{isLast: boolean}>`
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${p => (p.isLast ? 'transparent' : Colors.gray5)};
`;

const STouch = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

const SText = styled(Regular)`
  margin-left: 10px;
  color: ${Colors.gray1};
`;
