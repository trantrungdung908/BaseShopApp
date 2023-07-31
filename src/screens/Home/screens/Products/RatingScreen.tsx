import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {
  IC_SELECT_IMG,
  IC_STAR,
  IC_STAR_FILL,
  IMG_PRODUCT_DETAILS,
} from '@/assets';
import {Colors} from '@/themes';
import {Medium, Regular} from '@/components/CommonStyled';
import {scale} from '@/utils/scale';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper, {ScreenScrollWrapper} from '@/components/ScreenWrapper';

export const RatingScreen = memo(function RatingScreen() {
  const [value, setValue] = useState(5);
  const handleStar = useCallback((item: number) => {
    setValue(item);
  }, []);
  return (
    <ScreenWrapper>
      <DynamicHeader title="Đánh giá" />
      <ScreenScrollWrapper>
        <SViewInfo>
          <SImage source={IMG_PRODUCT_DETAILS} />
          <WrapInfo>
            <STitle>Nike Air Zoom Pegasus</STitle>
            <ViewRow>
              <TextInfo>xanh dương</TextInfo>
              <Dive />
              <TextInfo>41</TextInfo>
            </ViewRow>
          </WrapInfo>
        </SViewInfo>
        <ContainerRate>
          <STouchSelect>
            <SIcon source={IC_SELECT_IMG} />
            <TextSelect>Chọn ảnh</TextSelect>
          </STouchSelect>
          <SViewRate>
            {[1, 2, 3, 4, 5].map(item => {
              return (
                <SViewRate key={item}>
                  <STouchStar onPress={() => handleStar(item)}>
                    {value >= item ? (
                      <SIcon source={IC_STAR_FILL} />
                    ) : (
                      <SIcon source={IC_STAR} />
                    )}
                  </STouchStar>
                </SViewRate>
              );
            })}
          </SViewRate>
          <SInput multiline={true} placeholder={'Nhập đánh giá của bạn'} />
        </ContainerRate>
      </ScreenScrollWrapper>
      <STouchRate>
        <TextRate>Đánh giá</TextRate>
      </STouchRate>
    </ScreenWrapper>
  );
});

const SViewInfo = styled.View`
  background-color: ${Colors.backgroundColor};
  padding: 10px 20px;
  flex-direction: row;
  margin: 2px 0;
`;

const SImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const WrapInfo = styled.View`
  margin-left: 14px;
`;
const STitle = styled(Medium)`
  font-size: 15px;
  color: ${Colors.gray1};
`;
const ViewRow = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;
const TextInfo = styled(Regular)`
  font-size: 15px;
  color: ${Colors.gray1};
`;

const Dive = styled.View`
  height: 100%;
  width: 1px;
  justify-content: center;
  align-self: center;
  background-color: ${Colors.gray1};
  margin: 0 10px;
`;

const SViewRate = styled.View`
  flex-direction: row;
  background-color: ${Colors.backgroundColor};
  justify-content: center;
  align-items: center;
  margin: 22px 0px;
`;
const STouchStar = styled.TouchableOpacity`
  margin: 0 10px;
`;

const SIcon = styled.Image`
  width: 35px;
  height: 35px;
`;

const ContainerRate = styled.View`
  margin-bottom: 12px;
  padding: 22px 20px 16px 20px;
  background-color: ${Colors.backgroundColor};
`;

const STouchSelect = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border: 1px dashed ${Colors.gray1};
  border-radius: 10px;
  padding: 16px 6px 6px 6px;
  margin: 0 auto;
`;

const TextSelect = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray1};
  margin-top: 2px;
`;

const SInput = styled.TextInput`
  padding: 12px 16px;
  border: 1px solid ${Colors.gray7};
  border-radius: 16px;
  height: ${scale(111)}px;
`;

const STouchRate = styled.TouchableOpacity`
  background-color: ${Colors.orange1};
  margin: 20px;
  border-radius: 16px;
`;

const TextRate = styled(Medium)`
  font-size: 16px;
  color: ${Colors.white};
  text-align: center;
  padding: 12px 0px;
`;

export default RatingScreen;
