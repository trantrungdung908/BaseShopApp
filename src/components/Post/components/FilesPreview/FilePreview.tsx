import React, {memo, useCallback, useMemo} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes';
import {FileType} from '@/services/File';
import {TouchableOpacity} from 'react-native';
import {IC_CLOSE} from '@/assets';

const SWrapper = styled.View`
  border-color: ${Colors.gray3}80;
  border-width: 0.5px;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
`;

const SImage = styled.Image`
  width: 180px;
  height: 100%;
`;

const SFileWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 16px;
`;

const SFileName = styled.Text`
  text-align: center;
  font-size: 11px;
  color: ${Colors.gray3};
`;

const SCloseIcon = styled.Image`
  width: 16px;
  height: 16px;
  tint-color: ${Colors.gray1};
`;

const STouch = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 8px;
`;

interface Props {
  file: FileType;
  index: number;
  onRemove: (index: number) => any;
  onPressImageFile?: (uri: string) => void;
}
const FilePreview = memo(({file, index, onRemove, onPressImageFile}: Props) => {
  const onPressRemove = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  const isImage = useMemo(
    () => (file && file.type ? file.type.startsWith('image') : false),
    [file],
  );

  const onPressImage = useCallback(() => {
    try {
      onPressImageFile && onPressImageFile(file.uri);
    } catch (error) {}
  }, [onPressImageFile, file]);

  return (
    <SWrapper>
      {isImage ? (
        <TouchableOpacity onPress={onPressImage}>
          <SImage source={{uri: file.uri}} resizeMode={'contain'} />
        </TouchableOpacity>
      ) : (
        <SFileWrapper>
          <SFileName>{file.name}</SFileName>
        </SFileWrapper>
      )}
      <STouch onPress={onPressRemove}>
        <SCloseIcon source={IC_CLOSE} />
      </STouch>
    </SWrapper>
  );
});

FilePreview.displayName = 'FilePreview';

export default FilePreview;
