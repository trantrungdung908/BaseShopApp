import {
  FileType,
  PickFileOptions,
  PickImageOptions,
  TakeCameraOptions,
} from '@/services/File';

export interface PickFileActionsSheetProps extends PickFileContentProps {
  isVisible: boolean;
}

export interface PickFileContentProps {
  title?: string;
  onCloseRequest: () => any;
  onFilePicked: (files: FileType[]) => any;
  takeCameraOptions?: TakeCameraOptions;
  pickImageOptions?: PickImageOptions;
  pickFileOptions?: PickFileOptions;
  includeTakeCamera?: boolean;
  includePickFile?: boolean;
}
