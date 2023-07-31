import React, {memo, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import Emotions from '../../services/Emotions';
// @ts-ignore
import HTML from 'react-native-render-html';
import {useStore} from 'react-redux';
import {Store} from 'redux';
import he from 'he';
import linkifyHtml from 'linkify-html';
import {BaseCoreRootReducer} from '@/types';
import useBoolean from '@/hooks/useBoolean';
import {HTMLRenderer} from '@/components/Views/HTMLRender';

const urlRegex = /\bhttps?:\/\/[a-z0-9\.\-_](:\d+)?[^ \n\t<>()\[\]]*/i;

const getHttpLink = (href: string) => {
  try {
    let url = href.match(urlRegex)[0];
    if (url) {
      if (url.endsWith(';')) {
        url = url.substring(0, url.length - 1);
      }
      if (url.endsWith('”')) {
        url = url.substring(0, url.length - 1);
      }
      return url;
    }
  } catch (error) {}
  return href;
};
const linkifyOptions = {
  validate: {
    url: function (value) {
      return urlRegex.test(value);
    },
    email: false,
  },
  ignoreTags: ['a', 'script', 'style'],
};

const SContent = styled(HTML).attrs(props => ({
  baseFontStyle: {
    fontSize: 13,
  },
  tagsStyles: {
    a: {},
    b: {},
  },
  classesStyles: {
    mention: {
      fontSize: 13,
      textDecorationLine: 'none',
    },
  },
  containerStyle: {
    marginTop: 4,
  },
}))`
  font-size: 13px;
`;

const SEmotionImage = styled.Image`
  width: 32px;
  height: 32px;
  margin-top: 4px;
`;

const getNameByUsername = (store: Store, username: string) => {
  const state: BaseCoreRootReducer = store.getState();
  const userId = state.users.byUsername[username];
  if (!userId) {
    return username;
  }
  const user = state.users.byId[userId];
  return user ? user.name : username;
};

interface Props {
  content: string;
  onLinkPress?: (link: string) => void;
  type: string;
}
const PostContent = memo(({content, onLinkPress, type}: Props) => {
  const [isProfileVisible, setProfileVisibleOn, setProfileVisibleOff] =
    useBoolean(false);
  const [profileModalUsername, setProfileModalUsername] = useState<
    string | undefined
  >(undefined);
  // const profileModalUser = useUserByUsername(profileModalUsername);
  const store = useStore();

  const emotion = useMemo(() => {
    if (!content) {
      return null;
    }
    if (!/^:\w+:$/.test(content)) {
      return null;
    }
    const e = content.substr(1, content.length - 2);
    if (!Emotions.getAllEmotions().includes(e as any)) {
      return null;
    }
    return <SEmotionImage source={{uri: Emotions.getEmotionImage(e as any)}} />;
  }, [content]);

  const parts = useMemo(() => {
    let convertedContent = content
      ? linkifyHtml(
          type === 'post' ? he.unescape(content) : content,
          linkifyOptions,
        )
      : content;
    return convertedContent.replace(/({{@\w+}})/gm, substring => {
      const username = substring.substr(3, substring.length - 5);
      const userName = getNameByUsername(store, username);
      return `<a href="#pressMention_${username}" class="mention" data-username="${username}">@${userName} </a>`;
    });
  }, [content, store, type]);

  const onLinkPressHandle = useCallback((event, link: string) => {
    if (link.startsWith('#pressMention_')) {
      const username = link.replace(/^#pressMention_/, '');
      setProfileModalUsername(username);
      setProfileVisibleOn();
    } else {
      const href = getHttpLink(link);
      onLinkPress && onLinkPress(href);
    }
  }, []);

  if (emotion) {
    return emotion;
  }

  if (!content) {
    return null;
  }

  return (
    <>
      <HTMLRenderer htmlContent={parts} />

      {/*{!!profileModalUser && (*/}
      {/*  <ProfileModal*/}
      {/*    isVisible={isProfileVisible}*/}
      {/*    userId={profileModalUser.id}*/}
      {/*    onCloseRequest={setProfileVisibleOff}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
});

PostContent.displayName = 'PostContent';

export default PostContent;
