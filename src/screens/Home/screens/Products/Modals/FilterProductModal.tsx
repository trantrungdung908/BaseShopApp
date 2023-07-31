import React, {memo, useCallback, useMemo, useState} from 'react';
import {styled} from '@/global';
import {RefreshControl, StyleSheet} from 'react-native';
import {Regular} from '@/components/CommonStyled';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import ScreenWrapper, {ScreenScrollWrapper} from '@/components/ScreenWrapper';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';
import {MenuSelector} from '@/components/BottomMenu/MenuSelector';
import {ParamsProductInterface} from '@/screens/Home/screens/Products/ListProductScreen';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import useAutoToastError from '@/hooks/useAutoToastError';
import {requestListProductAttributes} from '@/store/attributes/functions';
import {getAttributesByQuery} from '@/store/attributes';
import {SelectorOption} from '@/components/BottomMenu';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import _ from 'lodash';
import {goBack} from '@/utils/navigation';

export interface FilterProductModalInterface {
  paramFilter: ParamsProductInterface;
  onPressFilter?: (params: ParamsProductInterface) => void;
}

export const FilterProductModal = memo(function FilterScreen() {
  const {paramFilter, onPressFilter} =
    useNavigationParams<FilterProductModalInterface>();
  const [paramsCustom, setParamsCustom] =
    useState<ParamsProductInterface>(paramFilter);
  const brands = getAttributesByQuery('2');
  const colors = getAttributesByQuery('1');
  const sizes = getAttributesByQuery('3');

  const {loading, error, call} = useAsyncEffect(async () => {
    return await requestListProductAttributes();
  });

  const selectorBrands = useMemo((): SelectorOption[] => {
    return brands.map((item: {id: any; name: any}) => ({
      value: item.id,
      label: item.name,
    }));
  }, [brands]);

  const selectorColors = useMemo((): SelectorOption[] => {
    return colors.map((item: {id: any; name: any}) => ({
      value: item.id,
      label: item.name,
    }));
  }, [colors]);

  const selectorSizes = useMemo((): SelectorOption[] => {
    return sizes.map((item: {id: any; name: any}) => ({
      value: item.id,
      label: item.name,
    }));
  }, [sizes]);

  const onChangeParams = useCallback(
    (inputName: string, value: string | number) => {
      setParamsCustom(state => ({
        ...state,
        attribute: _.uniq((state.attribute || []).concat(inputName)),
        attribute_term: _.uniq(
          (state.attribute_term || []).concat(value.toString()),
        ),
      }));
    },
    [],
  );

  const onFilter = useCallback(() => {
    onPressFilter && onPressFilter(paramsCustom);
    goBack();
  }, [onPressFilter, paramsCustom]);

  const onClear = useCallback(() => {
    onPressFilter &&
      onPressFilter({
        ...paramsCustom,
        page: 1,
        per_page: 10,
        attribute: [],
        attribute_term: [],
      });
    goBack();
  }, [onPressFilter, paramsCustom]);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Lọc nâng cao'}>
        <STouchClear onPress={onClear}>
          <TextClear>{'Bỏ lọc'}</TextClear>
        </STouchClear>
      </DynamicHeader>

      <ScreenScrollWrapper
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={call} />
        }>
        <MenuSelector
          label={'Sắp xếp theo màu'}
          options={selectorColors}
          inputName={'pa_color'}
          onSelectOption={onChangeParams}
          selectedValue={paramsCustom.attribute_term || []}
        />

        <MenuSelector
          label={'Sắp xếp theo thương hiệu'}
          options={selectorBrands}
          inputName={'pa_brand'}
          onSelectOption={onChangeParams}
          selectedValue={paramsCustom.attribute_term || []}
        />
        <MenuSelector
          label={'Sắp xếp theo size'}
          options={selectorSizes}
          inputName={'pa_size'}
          onSelectOption={onChangeParams}
          selectedValue={paramsCustom.attribute_term || []}
        />
      </ScreenScrollWrapper>
      <SubmitButtonColor
        color={Colors.orange1}
        style={styles.button}
        title={'Lọc'}
        textStyle={styles.textButton}
        onPress={onFilter}
      />
    </ScreenWrapper>
  );
});

const STouchClear = styled.TouchableOpacity`
  margin-right: 16px;
`;
const TextClear = styled(Regular)`
  font-size: 14px;
  line-height: ${scale(18)}px;
  color: ${Colors.gray1};
`;

const styles = StyleSheet.create({
  button: {
    marginRight: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  textButton: {
    fontSize: 16,
    color: Colors.white,
  },
});
export default FilterProductModal;
