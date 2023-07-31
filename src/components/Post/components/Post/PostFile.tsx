import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {Linking, Platform, TouchableOpacity} from 'react-native';
import {RawAttachmentInterface} from '@/types';
import Icon from '@/components/Icon';
import File from '@/services/File';

const SWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  height: 36px;
`;

const SIcon = styled(Icon)`
  color: ${props => props.theme.grey3};
  font-size: 16px;
`;

const SName = styled.Text`
  color: ${props => props.theme.grey3};
  font-size: 13px;
  margin-left: 8px;
  flex: 1;
`;

const SDownloadButton = styled(Icon)`
  color: ${props => props.theme.grey3}80;
  font-size: 24px;
`;

interface Props {
  file: RawAttachmentInterface;
}
const PostFile = memo(({file}: Props) => {
  const onPressPreview = useCallback(async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(file?.download || file?.src || file?.src || '');
    } else {
      const _url = file?.src || file?.url || file?.download || '';
      console.log('_url ', _url, /\.(doc|docx|xls|xlsx)$/i.test(_url));
      if (_url && /\.(doc|docx|xls|xlsx)$/i.test(_url)) {
        Linking.openURL(
          `https://view.officeapps.live.com/op/embed.aspx?src=${_url}`,
        );
      } else {
        Linking.openURL(_url);
      }
    }
  }, [file]);

  const onPressDownload = useCallback(async () => {
    try {
      file.download &&
        (await File.download({
          url: file.download,
          openFile: true,
          filename: file.name,
        }));
    } catch (e) {
      console.log('e', e.message);
    }
  }, [file]);

  return (
    <SWrapper onPress={onPressPreview}>
      <SIcon name={'file_copy'} />
      <SName>{file.name}</SName>

      <TouchableOpacity onPress={onPressDownload}>
        <SDownloadButton name={'download'} />
      </TouchableOpacity>
    </SWrapper>
  );
});

PostFile.displayName = 'PostFile';

export default PostFile;
