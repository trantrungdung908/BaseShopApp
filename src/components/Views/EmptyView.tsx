import React, {memo} from 'react';
import {styled, translate} from '@/global';
import {EmptyViewSvg} from '@/components/Views/EmptyViewSvg';
import {Colors} from '@/themes';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin: 56px;
`;

const Text = styled.Text`
  font-size: 17px;
  line-height: 20px;
  color: ${Colors.grey3};
  padding-top: 16px;
`;

interface EmptyViewProps {
  title?: string;
}
export const EmptyView = memo(({title}: EmptyViewProps) => {
  const checkedTitle = title || translate('list.No_data');
  return (
    <Container>
      <EmptyViewSvg />
      <Text>{checkedTitle || 'No notification record!'}</Text>
    </Container>
  );
});
