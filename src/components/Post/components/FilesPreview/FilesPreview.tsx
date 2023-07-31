import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {Keyboard, ScrollView} from 'react-native';
import FilePreview from './FilePreview';
import useBoolean from '@/hooks/useBoolean';
import {FileType} from '@/services/File';
import PhotoViewModal from '@/components/PhotoView';

const SWrapper = styled.View`
  height: 120px;
  padding-left: 8px;
  flex-direction: row;
`;

interface Props {
  files: FileType[];
  onFileRemove: (index: number) => any;
}
const FilesPreview = memo(({files, onFileRemove}: Props) => {
  const [isPhotoViewVisible, setPhotoViewOn, setPhotoViewOff] =
    useBoolean(false);

  const originImages: string[] = useMemo(() => {
    const images: string[] = [];
    files.forEach(file => {
      const isImage: boolean =
        file && file.type ? file.type.startsWith('image') : false;
      if (isImage) {
        images.push(file.uri);
      }
    });
    return images;
  }, [files]);

  const [currentImageUri, setCurrentImageUri] = useState<string | undefined>(
    undefined,
  );

  const onSelectImage = useCallback(
    (uri: string) => {
      setCurrentImageUri(uri);
      setPhotoViewOn();
    },
    [setCurrentImageUri, setPhotoViewOn],
  );
  const currentImageIndex = useMemo(() => {
    const index = originImages.indexOf(currentImageUri || '');
    return index >= 0 ? index : 0;
  }, [originImages, currentImageUri]);

  if (!files.length) {
    return null;
  }
  return (
    <SWrapper>
      <ScrollView horizontal={true}>
        {files.map((file, index) => (
          <FilePreview
            file={file}
            key={file.uri}
            index={index}
            onRemove={onFileRemove}
            onPressImageFile={onSelectImage}
          />
        ))}
        <PhotoViewModal
          images={originImages}
          isVisible={!!(isPhotoViewVisible && currentImageUri)}
          onCloseRequest={setPhotoViewOff}
          initialIndex={currentImageIndex}
        />
      </ScrollView>
    </SWrapper>
  );
});

FilesPreview.displayName = 'FilesPreview';

export default FilesPreview;
