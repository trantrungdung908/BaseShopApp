import React, {memo, useMemo} from 'react';
import {styled} from '@/global';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import SubmitButton from '@/components/Buttons/SubmitButton';

export const CustomDrawerContent = memo(function () {
  const dataType = useMemo(() => {
    return [
      'Hybrid Bike',
      'Mountain Bike',
      'BMX Bike',
      'City Bike',
      'Touring Bike',
      'Road Bike',
    ];
  }, []);

  const dataRarity = useMemo(() => {
    return ['S', 'SR', 'SSR', 'S', 'S', 'S'];
  }, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Filter'} hideGoBack={true} />
      <Container nestedScrollEnabled={true}>
        <ContainerType>
          <TitleType>{'Type Bike'}</TitleType>
          <ContainerFilterType>
            {dataType.map(item => {
              return <ContainerBlockType />;
            })}
          </ContainerFilterType>
        </ContainerType>
        <ContainerType>
          <TitleType>{'Rarity'}</TitleType>
          <ContainerFilterType>
            {dataRarity.map(item => {
              return <ContainerBlockType />;
            })}
          </ContainerFilterType>
        </ContainerType>
        <ContainerType>
          <TitleType>{'Level'}</TitleType>
          <ContainerSlider>
            <ContainerTitleLevel>
              <TitleLevel>{'1'}</TitleLevel>
              <TitleLevel>{'20'}</TitleLevel>
            </ContainerTitleLevel>
          </ContainerSlider>
        </ContainerType>
        <ContainerType>
          <TitleType>{'Mint Bike'}</TitleType>
          <ContainerSlider>
            <ContainerTitleLevel>
              <TitleLevel>{'1'}</TitleLevel>
              <TitleLevel>{'7'}</TitleLevel>
            </ContainerTitleLevel>
          </ContainerSlider>
        </ContainerType>
        <SubmitButton
          title={'Confirm'}
          onPress={() => {}}
          color={Colors.green2}
          shadowColor={Colors.yellowBlur}
          containerStyle={{marginVertical: 30}}
          isDashed={true}
        />
      </Container>
    </ScreenWrapper>
  );
});

const ContainerTitleLevel = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 0px 24px;
`;

const TitleLevel = styled.Text`
  font-size: 12px;
`;

const ContainerSlider = styled.View`
  justify-content: center;
  align-items: center;
`;

const ContainerFilterType = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ContainerBlockType = styled.View`
  padding: 4px 0px;
`;

const ContainerType = styled.View`
  padding: 12px 0px;
  border-bottom-width: 1px;
`;

const Container = styled.ScrollView`
  margin: 12px;
`;

const TitleType = styled.Text`
  font-size: 16px;
  color: ${Colors.gray3};
  margin-bottom: 12px;
  margin-left: 12px;
`;

const NameType = styled(TitleType)`
  color: ${Colors.black};
  margin: 8px 4px;
  width: ${scale(85)}px;
  text-align: center;
`;

const NameRarity = styled.Text`
  color: ${Colors.black};
  margin: 8px 4px;
  width: ${scale(38)}px;
  text-align: center;
`;

export default CustomDrawerContent;
