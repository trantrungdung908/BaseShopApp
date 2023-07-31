import React, {memo} from 'react';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {StyleSheet, View} from 'react-native';
import ScreenWrapper, {ScreenScrollWrapper} from '@/components/ScreenWrapper';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {usePortfolio} from '@/store/portfolio';
import {HTMLRenderer} from '@/components/Views/HTMLRender';
import {removeAccents} from '@/utils/string';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export interface DetailsPortfolioInterface {
  idPortfolio: number;
}

export const PortfolioDetailsScreen = memo(function () {
  const {idPortfolio} = useNavigationParams<DetailsPortfolioInterface>();
  const detailsPortfolio = usePortfolio(idPortfolio.toString());
  if (!detailsPortfolio) {
    return null;
  }
  return (
    <ScreenWrapper>
      <DynamicHeader title={`${detailsPortfolio.title.rendered}`} />
      <ScreenScrollWrapper>
        <View style={styles.container}>
          <HTMLRenderer
            htmlContent={removeAccents(detailsPortfolio.content.rendered)}
          />
        </View>
      </ScreenScrollWrapper>
    </ScreenWrapper>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: getBottomSpace() + 30,
  },
});

export default PortfolioDetailsScreen;
