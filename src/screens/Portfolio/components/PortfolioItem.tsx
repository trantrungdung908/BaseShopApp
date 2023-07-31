import {ViewProps} from 'react-native';
import React, {memo} from 'react';
import {styled} from '@/global';
import {Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import FastImage from 'react-native-fast-image';
import {usePortfolio} from '@/store/portfolio';

interface PortfolioItemInterface extends ViewProps {
  onPress?: () => void;
  item: any;
}

export const PortfolioItem = memo(function PortfolioItem({
  onPress,
  item,
}: PortfolioItemInterface) {
  const portfolio = usePortfolio(item);
  // @ts-ignore
  if (!portfolio) {
    return null;
  }

  return (
    <STouchPortfolio key={portfolio.id} onPress={onPress}>
      <AvaPortfolio source={{uri: portfolio.yoast_head_json.og_image[0].url}} />
      <ContentView>
        <TextName numberOfLines={1}>{portfolio.title.rendered}</TextName>
      </ContentView>
    </STouchPortfolio>
  );
});

const STouchPortfolio = styled.TouchableOpacity`
  background-color: ${Colors.white};
  border-radius: 12px;
  margin: 0 0 12px 6px;
  padding-bottom: 20px;
  overflow: hidden;
`;

const ContentView = styled.View`
  margin-left: 12px;
  margin-top: 12px;
`;

const AvaPortfolio = styled(FastImage)`
  width: ${scale(167)}px;
  height: ${scale(165)}px;
`;

const TextName = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray1};
  max-width: ${scale(150)}px;
`;
