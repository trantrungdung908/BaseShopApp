import * as React from 'react';
import {memo} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {Icon} from '@/components/Views/Icon';
import {IC_ARROW_DOWN} from '@/assets';

const SWrapper = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
  min-height: 36px;
`;

const SText = styled.Text`
  font-size: 13px;
  font-weight: 500;
  margin-right: 8px;
  line-height: 15px;
`;

const SLoading = styled.ActivityIndicator`
  width: 20px;
  height: 20px;
`;

const SIcon = styled(Icon)`
  height: 4px;
  width: 12px;
`;

interface Props {
  loadMoreFn: () => Promise<any>;
}

const LoadMore = memo(({loadMoreFn}: Props) => {
  const [loadState, load] = useAsyncFn(loadMoreFn, [loadMoreFn]);

  return (
    <TouchableOpacity onPress={load} disabled={loadState.loading}>
      <SWrapper>
        <SText>{'Hiển thị thêm'}</SText>
        {loadState.loading ? <SLoading /> : <SIcon source={IC_ARROW_DOWN} />}
      </SWrapper>
    </TouchableOpacity>
  );
});

LoadMore.displayName = 'LoadMore';

export default LoadMore;
