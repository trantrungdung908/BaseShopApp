import * as React from 'react';
import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ImageURISource,
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import {SubmitPostFunctionType} from '../../types';
import useBoolean from '@/hooks/useBoolean';
import useAsyncFn from '@/hooks/useAsyncFn';
import {FileType} from '@/services/File';
import PickFileActionsSheet from '@/components/PickFileActionsSheet';
import {Colors} from '@/themes';
import MentionProvider, {
  MentionProviderRequiredPropsForChildren,
} from '@/components/MentionProvider/MentionProvider';
import {IC_CAMERA, IC_SEND} from '@/assets';
import FilesPreview from '@/components/Post/components/FilesPreview/FilesPreview';
import ToastService from '@/services/ToastService';

type Props = {
  allowedUserIds?: string[];
  submitPostFn: SubmitPostFunctionType;
  type?: 'post' | 'comment';
  placeholder: string;
  textInputProps?: Partial<TextInputProps>;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  avatarImageSource: ImageURISource;
  includePickFile?: boolean;
};
const InsertPost = memo(
  ({
    submitPostFn,
    placeholder,
    type = 'comment',
    onTextChange,
    pressUserListener,
    textInputProps = {},
    textInputContainerStyle,
    avatarImageSource,
    includePickFile,
  }: Props & MentionProviderRequiredPropsForChildren) => {
    // @ts-ignore
    const textInputRef = useRef<InstanceType<TextInput>>();
    const textRef = useRef('');
    const [files, setFiles] = useState<FileType[]>([]);
    const [isFilePickerASVisible, setFilePickerASOn, setFilePickerASOff] =
      useBoolean(false);

    const onChangeText = useCallback(
      (text: string) => {
        textRef.current = text;
        onTextChange && onTextChange(text);
      },
      [onTextChange],
    );

    useEffect(() => {
      const listener = pressUserListener((user: any) => {
        const text = textRef.current.replace(/(@\w*)$/gm, `@${user.username} `);

        textRef.current = text;

        textInputRef.current &&
          textInputRef.current.setNativeProps({
            text,
          });

        onTextChange(text);
      });

      return () => {
        listener.remove();
      };
    }, [onTextChange, pressUserListener]);

    const [submitState, submit] = useAsyncFn(async () => {
      if (!textRef.current && !files.length) {
        ToastService.showError('Không được để trống thông tin');
        return;
      }
      await submitPostFn({
        title: 'note',
        content: textRef.current,
        files: files,
      });
      textInputRef.current && textInputRef.current.clear();
      textRef.current = '';
      // Keyboard.dismiss();
      setFilePickerASOff();
      setFiles([]);
    }, [submitPostFn, textRef, textInputRef, files]);

    const onFilesPicked = useCallback(
      (newFiles: FileType[]) => {
        setFilePickerASOff();
        setFiles(value => {
          if (type === 'comment' && value.length >= 1) {
            return newFiles;
          }

          const mappedFiles = new Map(value.map(file => [file.uri, file]));
          newFiles.forEach(file => mappedFiles.set(file.uri, file));
          return [...mappedFiles.values()];
        });
      },
      [setFilePickerASOff, type],
    );

    const onFileRemove = useCallback((index: number) => {
      setFiles(value => {
        value = [...value];
        value.splice(index, 1);
        return value;
      });
    }, []);

    return (
      <View>
        <SWrapper>
          <SAvatar source={avatarImageSource} />
          <SInputWrapper style={textInputContainerStyle}>
            <SInput
              ref={textInputRef}
              placeholder={placeholder}
              onChangeText={onChangeText}
              multiline={true}
              {...textInputProps}
            />
            <TouchableOpacity onPress={setFilePickerASOn}>
              <SIconWrapper>
                <CameraIcon source={IC_CAMERA} />
              </SIconWrapper>
            </TouchableOpacity>
          </SInputWrapper>
          <TouchableOpacity onPress={submit} disabled={submitState.loading}>
            <SSendIconWrapper>
              {submitState.loading ? (
                <ActivityIndicator color={Colors.gray3} size={26} />
              ) : (
                <SendIcon source={IC_SEND} />
              )}
            </SSendIconWrapper>
          </TouchableOpacity>
        </SWrapper>
        <FilesPreview files={files} onFileRemove={onFileRemove} />
        <PickFileActionsSheet
          isVisible={isFilePickerASVisible}
          onCloseRequest={setFilePickerASOff}
          onFilePicked={onFilesPicked}
          pickImageOptions={{multiple: type === 'post'}}
          takeCameraOptions={{multiple: type === 'post'}}
          pickFileOptions={{multiple: type === 'post'}}
          includePickFile={includePickFile || false}
        />
      </View>
    );
  },
);

InsertPost.displayName = 'InsertPost';

const InsertBoxWithMentionSupport = memo((props: Props) => {
  return (
    <MentionProvider
      allowedUserIds={props.allowedUserIds}
      renderChildren={(params: any) => {
        return (
          <InsertPost
            onTextChange={params.onTextChange}
            pressUserListener={params.pressUserListener}
            {...props}
          />
        );
      }}
    />
  );
});

const SAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 40px;
  margin-right: 7px;
  border-width: 0.5px;
  border-color: ${Colors.gray1};
`;

const CameraIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

const SendIcon = styled.Image`
  width: 24px;
  height: 20px;
`;

const SWrapper = styled.View`
  padding: 10px 16px;
  flex-direction: row;
  align-items: center;
`;

const SInputWrapper = styled.View`
  flex: 1;
  padding: 0 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.gray5};
  border-radius: 22px;
  border-width: 0.5px;
  border-color: ${Colors.gray5};
  min-height: 44px;
`;

const SInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.placeholderTextColor
    ? props.placeholderTextColor
    : Colors.gray3,
}))`
  font-size: 15px;
  line-height: 20px;
  flex: 1;
  padding: 10px;
  margin: 0;
`;

const SIconWrapper = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const SSendIconWrapper = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

export default InsertBoxWithMentionSupport;
