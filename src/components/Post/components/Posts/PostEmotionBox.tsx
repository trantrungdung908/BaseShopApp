import * as React from 'react';
import {memo, useEffect} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Emotions, {EmotionType} from '../../services/Emotions';
import {SubmitPostFunctionType} from '../../types';
import {useAsyncFn} from '@/hooks/useAsyncFn';

const SWrapper = styled.View`
  background-color: ${props => props.theme.primaryColor}10;
  height: 200px;
`;

const SScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})`
  flex: 1;
`;

const SEmotionView = styled.Image`
  width: 36px;
  height: 36px;
  margin: 8px;
`;

const SEmotionIndicator = styled.ActivityIndicator`
  margin: 8px;
`;

const EmotionView = memo(
  ({
    emotion,
    submitPostFn,
    onCloseRequest,
  }: {
    emotion: EmotionType;
    submitPostFn: SubmitPostFunctionType;
    onCloseRequest: () => any;
  }) => {
    const [submitState, submit] = useAsyncFn(async () => {
      const submit = await submitPostFn({
        content: `:${emotion}:`,
        files: [],
        title: '',
      });
      onCloseRequest();
      return submit;
    }, [emotion, submitPostFn]);

    return (
      <TouchableOpacity onPress={submit} disabled={submitState.loading}>
        {submitState.loading ? (
          <SEmotionIndicator size={36} />
        ) : (
          <SEmotionView
            key={emotion}
            source={{uri: Emotions.getEmotionImage(emotion)}}
            resizeMode={'cover'}
          />
        )}
      </TouchableOpacity>
    );
  },
);

interface Props {
  visible?: boolean;
  submitPostFn: SubmitPostFunctionType;
  onCloseRequest: () => any;
}
const PostEmotionBox = memo(
  ({visible, submitPostFn, onCloseRequest}: Props) => {
    useEffect(() => {
      const listener = Keyboard.addListener('keyboardDidShow', onCloseRequest);
      return () => {
        listener.remove();
      };
    }, [onCloseRequest]);

    useEffect(() => {
      if (visible) {
        Keyboard.dismiss();
      }
    }, [visible]);

    if (!visible) {
      return null;
    }
    return (
      <SWrapper>
        <SScrollView>
          {Emotions.getAllEmotions().map(value => {
            return (
              <EmotionView
                key={value}
                emotion={value}
                submitPostFn={submitPostFn}
                onCloseRequest={onCloseRequest}
              />
            );
          })}
        </SScrollView>
      </SWrapper>
    );
  },
);

PostEmotionBox.displayName = 'PostEmotionBox';

export default PostEmotionBox;
