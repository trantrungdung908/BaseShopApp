import {Dimensions, ViewProps} from 'react-native';
import React, {memo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import {Regular} from '@/components/CommonStyled';
interface CategoryItemInterface extends ViewProps {
  item: any;
  isEven: boolean;
  onSelected?: () => void;
}

export const CategoryItem = memo(function CategoryItem({
  onSelected,
  item,
  isEven,
}: CategoryItemInterface) {
  return (
    <STouchCat isEven={isEven} onPress={onSelected} key={item.id}>
      <WrapperImage>
        <SImage source={item.img} />
      </WrapperImage>
      <TitleCat numberOfLines={2}>{item.title}</TitleCat>
    </STouchCat>
  );
});

const STouchCat = styled.TouchableOpacity<{isEven?: boolean}>`
  align-items: center;
  margin: ${props => (props.isEven ? 12 : 4)}px;
`;

const TitleCat = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray1};
  margin: 10px 0;
  text-align: center;
  width: ${scale(100)}px;
`;
const WrapperImage = styled.View`
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border-color: ${Colors.gray7};
  border-width: 1px;
`;

const SImage = styled.Image`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;
