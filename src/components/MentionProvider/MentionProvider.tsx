import React, {
  ComponentProps,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import {Keyboard, LayoutRectangle, ScrollView, View} from 'react-native';
import SuggestionRow from './SuggestionRow';
import {EventEmitter} from 'events';
import {RawUserInterface} from '@/store/user';

const SContainer = styled.View`
  width: 100%;
  justify-content: flex-end;
  max-height: 100%;
`;

const SScrollView = styled(ScrollView)<{layout: LayoutRectangle | undefined}>`
  width: ${props => (props.layout ? props.layout.width + 'px' : '100%')};
`;

const SMentionWrapper = styled.View<{layout: LayoutRectangle | undefined}>`
  left: ${props => (props.layout ? props.layout.x : 0)}px;
  width: ${props => (props.layout ? props.layout.width + 'px' : '100%')};
  border-top-width: 0.5px;
  border-top-color: ${props => props.theme.grey5}80;
`;

export interface MentionProviderRequiredPropsForChildren {
  onTextChange: (text: string) => any;
  pressUserListener: (callback: (user: RawUserInterface) => any) => {
    remove: () => void;
  };
}

interface Props {
  renderChildren: (
    params: MentionProviderRequiredPropsForChildren,
  ) => React.ReactNode;
  allowedUserIds?: string[];
  limit?: number;
}
const MentionProvider = memo(
  ({renderChildren, allowedUserIds, limit = 5}: Props) => {
    const viewRef = useRef<View>(null);
    const [layout, setLayout] = useState<LayoutRectangle | undefined>(
      undefined,
    );
    const [keyword, setKeyword] = useState('');
    const [isKeyboardShown, setKeyboardShown] = useState(false);
    // const users = useUsersByKeyword(keyword.substr(1), {
    //   userIds: allowedUserIds,
    // });

    const {onPressUser, pressUserListener} = useMemo(() => {
      const e = new EventEmitter();

      const onPressUser = (user: RawUserInterface) => {
        e.emit('onPressUser', user);
      };

      const pressUserListener: MentionProviderRequiredPropsForChildren['pressUserListener'] =
        callback => {
          e.addListener('onPressUser', callback);
          return {
            remove: () => e.removeListener('onPressUser', callback),
          };
        };

      return {
        event: e,
        onPressUser,
        pressUserListener,
      };
    }, []);

    const onLayout: ComponentProps<typeof View>['onLayout'] = useCallback(
      event => {
        setLayout(event.nativeEvent.layout);
      },
      [],
    );

    useEffect(() => {
      const hideListener = Keyboard.addListener('keyboardDidHide', () =>
        setKeyboardShown(false),
      );
      const showListener = Keyboard.addListener('keyboardDidShow', () =>
        setKeyboardShown(true),
      );
      return () => {
        hideListener.remove();
        showListener.remove();
      };
    }, []);

    const onTextChange = useCallback((text: string) => {
      if (/@(\w*)$/g.test(text)) {
        const keywordMatch = text.match(/@(\w*)$/gm);
        if (keywordMatch && keywordMatch[0]) {
          setKeyword(keywordMatch[0]);
        }
      } else {
        setKeyword('');
      }
    }, []);

    return (
      <SContainer>
        <SScrollView layout={layout} keyboardShouldPersistTaps="always">
          {/*{isKeyboardShown && !!keyword && !!users.length && (*/}
          {/*  <SMentionWrapper layout={layout}>*/}
          {/*    {users*/}
          {/*      .slice(0, limit)*/}
          {/*      .map(*/}
          {/*        user =>*/}
          {/*          !!user && (*/}
          {/*            <SuggestionRow*/}
          {/*              user={user}*/}
          {/*              key={user.id}*/}
          {/*              onPress={onPressUser}*/}
          {/*            />*/}
          {/*          ),*/}
          {/*      )}*/}
          {/*  </SMentionWrapper>*/}
          {/*)}*/}
        </SScrollView>
        <View ref={viewRef} onLayout={onLayout}>
          {renderChildren({onTextChange, pressUserListener})}
        </View>
      </SContainer>
    );
  },
);

export default MentionProvider;
