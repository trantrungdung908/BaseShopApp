import {Image, StyleSheet, ViewProps} from 'react-native';
import React, {memo} from 'react';
import {styled} from '@/global';
import {
  IC_CHAT,
  IC_HEART,
  IC_HEART_LIKE,
  IC_SHARE,
  IC_THREEDOTS,
  IMG_AVA,
} from '@/assets';
import {scale} from '@/utils/scale';
import {Colors} from '@/themes';

interface NewsItemInterface extends ViewProps {
  onPress?: () => void;
  item: any;
  index: number;
}

export const NewsItem = memo(function NewsItem({
  onPress,
  item,
  index,
}: NewsItemInterface) {
  return (
    <ContainerNews
      key={index}
      style={index === 0 ? styles.NoSpace : styles.SpaceTop}>
      <WrapView>
        <WrapInfo>
          <AvaImg source={IMG_AVA} />
          <ViewInfo>
            <TextName>{item.name}</TextName>
            <TextTime>{item.postedAt}</TextTime>
          </ViewInfo>
          <SDots>
            <IconDots source={IC_THREEDOTS} />
          </SDots>
        </WrapInfo>

        <ContainerImg>
          <STouchImg>
            <Image source={item.imgProduct[0]} />
          </STouchImg>
          <ViewImg>
            <STouch>
              <Image source={item.imgProduct[1]} />
            </STouch>
            <STouchImg>
              <Image source={item.imgProduct[2]} />
            </STouchImg>
          </ViewImg>
        </ContainerImg>
        <ActionContainer>
          <SHeart>
            <HeartIcon source={item.isLike ? IC_HEART_LIKE : IC_HEART} />
            <HeartNumber>{item.heartNumber}</HeartNumber>
          </SHeart>
          <SComment onPress={onPress}>
            <CommentIcon source={IC_CHAT} />
            <CommentNumber>{item.commentNumber}</CommentNumber>
          </SComment>
          <SShare>
            <ShareIcon source={IC_SHARE} />
          </SShare>
        </ActionContainer>

        <ContainerDescript>
          <TextDesc>{item.desc}</TextDesc>
          <MoreBtn>
            <TextMore>Thêm</TextMore>
          </MoreBtn>
        </ContainerDescript>
      </WrapView>
    </ContainerNews>
  );
});
const ContainerNews = styled.View`
  background-color: ${Colors.white};
  width: 100%;
`;
const WrapView = styled.View`
  margin: 16px 15px;
`;
const WrapInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;
const AvaImg = styled.Image``;
const ViewInfo = styled.View`
  margin-left: 16px;
`;
const TextName = styled.Text`
  margin-bottom: 2px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: ${Colors.black};
  line-height: 22px;
`;
const TextTime = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #8c8c8c;
`;
const SDots = styled.TouchableOpacity`
  margin-left: auto;
  margin-bottom: 15px;
`;
const IconDots = styled.Image``;
const ContainerImg = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;
const STouchImg = styled.TouchableOpacity``;
const STouch = styled.TouchableOpacity`
  margin-bottom: 3px;
`;

const ViewImg = styled.View`
  margin-left: 3.1px;
`;
const ActionContainer = styled.View`
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;
const SHeart = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;
const HeartIcon = styled.Image<{color?: string}>``;
const HeartNumber = styled.Text`
  margin-left: 6.5px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #262626;
`;
const SComment = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;
const CommentIcon = styled.Image`
  margin-left: 12px;
`;
const CommentNumber = styled.Text`
  margin-left: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #262626;
`;
const SShare = styled.TouchableOpacity`
  margin-left: auto;
`;
const ShareIcon = styled.Image``;

const ContainerDescript = styled.View`
  width: ${scale(315)}px;
  justify-content: center;
`;
const TextDetail = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #262626;
`;

const TextDesc = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #262626;
`;
const MoreBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 90px;
`;
const TextMore = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #69747e;
  text-align: center;
`;
const styles = StyleSheet.create({
  NoSpace: {
    marginTop: 0,
  },
  SpaceTop: {
    marginTop: 8,
  },
});
