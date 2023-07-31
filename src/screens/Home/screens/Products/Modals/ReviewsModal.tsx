import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '@/utils/scale';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper from '@/components/ScreenWrapper';
import {IC_STAR, IC_STAR_FILL} from '@/assets';
import {InputBorder} from '@/components/Input/components/InputBorder';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {getInfo} from '@/store/user';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import ToastService from '@/services/ToastService';
import {goBack} from '@/utils/navigation';
import {requestPostReviews} from '@/store/reviews/functions';
import useAutoToastError from '@/hooks/useAutoToastError';

export interface ParamsReviewInterface {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
}

export interface ReviewsModalInterface {
  idProduct: number;
  callReviews: () => void;
}

export const ReviewModal = memo(function ReviewScreen() {
  const {idProduct, callReviews} = useNavigationParams<ReviewsModalInterface>();
  const user = getInfo();
  const [defaultStar, setDefaultStar] = useState<number>(0);
  const [paramsReviews, setParamsReviews] = useState<ParamsReviewInterface>({
    product_id: idProduct,
    review: '',
    reviewer: user ? user?.username : '',
    reviewer_email: user ? user?.email : '',
    rating: defaultStar || 0,
  });

  const [{loading, error}, call] = useAsyncFn(async () => {
    if (
      paramsReviews.review === '' ||
      paramsReviews.rating === 0 ||
      paramsReviews.reviewer === '' ||
      paramsReviews.reviewer_email === ''
    ) {
      ToastService.showError('Các trường bắt buộc không được để trống !');
      return;
    }
    await requestPostReviews(paramsReviews);
    await callReviews();
    ToastService.show('Đánh giá thành công!');
    goBack();
  }, [paramsReviews]);

  const handleStar = useCallback((star: number) => {
    setDefaultStar(star);
    setParamsReviews(state => ({...state, rating: star}));
  }, []);
  const onChangeText = useCallback((keyName: string, value: string) => {
    setParamsReviews(state => ({...state, [keyName]: value}));
  }, []);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title="Đánh giá" />
      <WrapStar>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <TouchableOpacity
              style={{padding: 5}}
              key={item}
              onPress={() => handleStar(item)}>
              {item <= defaultStar ? (
                <SIcon source={IC_STAR_FILL} key={index} />
              ) : (
                <SIcon source={IC_STAR} key={index} />
              )}
            </TouchableOpacity>
          );
        })}
      </WrapStar>
      <Container>
        <InputBorder
          value={paramsReviews.review}
          keyName={'review'}
          placeHolder={'Nhận xét'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          required={true}
          multiline={true}
        />
        <InputBorder
          value={paramsReviews.reviewer}
          keyName={'reviewer'}
          placeHolder={'Tên'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          required={true}
        />
        <InputBorder
          value={paramsReviews.reviewer_email}
          keyName={'reviewer_email'}
          placeHolder={'Email'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          required={true}
        />
      </Container>
      <SRoundedButton
        onPress={call}
        disabled={loading}
        title={'Gửi đi'}
        loading={loading}
        textStyle={styles.submitText}
      />
    </ScreenWrapper>
  );
});

const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  margin: 10px 16px;
  margin-bottom: ${getBottomSpace() + 32}px;
`;

const WrapStar = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SIcon = styled.Image`
  width: ${scale(25)}px;
  height: ${scale(25)}px;
`;

const SRoundedButton = styled(SubmitButtonColor)`
  margin-top: ${scale(40)}px;
  padding: 0 16px;
  margin-bottom: 32px;
`;

const styles = StyleSheet.create({
  containerInput: {
    marginTop: 20,
  },

  submitText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
export default ReviewModal;
