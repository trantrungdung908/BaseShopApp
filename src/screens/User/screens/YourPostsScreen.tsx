import React, {memo, useCallback, useMemo} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getAllReviews, RawProductReviewsInterface} from '@/store/reviews';
import {getInfo} from '@/store/user';
import {FlatList} from 'react-native';
import {ReviewsItem} from '@/screens/User/components/ReviewsItem';

export const YourPostsScreen = memo(function () {
  const getReviews = getAllReviews();
  const user = getInfo();

  const getMyReviews = useMemo(() => {
    return getReviews.filter(
      (i: {reviewer_email: string}) => i.reviewer_email === user.email,
    );
  }, [getReviews, user.email]);

  const renderItem = useCallback(
    ({item}: {item: RawProductReviewsInterface}) => {
      return <ReviewsItem item={item} />;
    },
    [],
  );

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Đánh giá của tôi'} />
      <Container showsVerticalScrollIndicator={false}>
        <FlatList data={getMyReviews} renderItem={renderItem} />
      </Container>
    </ScreenWrapper>
  );
});

const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {},
}))`
  margin-bottom: ${getBottomSpace() + 32}px;
`;
