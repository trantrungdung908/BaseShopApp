import {FileType} from '@/services/File';
import {RawPostInterface} from '@/store/post';
import {ImageSourcePropType} from 'react-native';

export interface PostOrCommentStatsInterface {
  likes?: string; // Beware of this, maybe this a number or string
  comments?: string;
  number?: string;
}

export enum PostMetatype {
  DEFAULT = '',
  SYSTEM = 'system',
}

export type EditPostFunctionType = ({
  postId,
  postHid,
  postToken,
  content,
  type,
}: {
  postId: string;
  postHid: string;
  postToken: string;
  content: string;
  type: 'post' | 'comment';
}) => Promise<any>;

export type DeletePostFunctionType = ({
  postId,
  postHid,
  postToken,
  type,
}: {
  postId: string;
  postHid: string;
  postToken: string;
  type: 'post' | 'comment';
}) => Promise<any>;

export type SubmitPostFunctionType = ({
  title,
  content,
  files,
}: {
  title: string;
  content: string;
  files: FileType[];
}) => Promise<any>;

export interface ParamsPostFunctionType {
  title: string;
  content: string;
  files: FileType[];
}

export enum ReactionEnum {
  LIKE = 'like',
  LOVE = 'love',
  CARE = 'care',
  HAHA = 'haha',
  WOW = 'wow',
  SAD = 'sad',
  ANGRY = 'angry',
}

export type ReactPostFunctionType = ({
  postId,
  postHid,
  postToken,
  reaction,
  type,
}: {
  postId: string;
  postHid: string;
  postToken: string;
  reaction: ReactionEnum;
  type: 'post' | 'comment';
}) => Promise<any>;

export interface RawAttachmentInterface {
  download?: string;
  fid?: string;
  id: string;
  image?: number | string; //boolean for actually
  name: string;
  since?: number | string;
  size?: number | string;
  src?: string;
  type?: 'file';
  url?: string;
  username?: string;
}

export interface RawReactionInterface {
  reaction: ReactionEnum;
}

export interface RawPostInterface {
  hid: string;
  gid: number;
  // attachments: RawAttachmentInterface[];
  metatype: PostMetatype;
  title: string;
  type: 'post';
  content: string;
  liked: number;
  token: string;
  gavatar: ImageSourcePropType;
  attachment: null;
  user_id: string;
  // stats: PostOrCommentStatsInterface;
  reactions: RawReactionInterface[];
  id: string;
  username: string;
  since: number;
  star?: number[];
  star_fill?: number[];
}

export type PressCommentsFunctionType = (post: RawPostInterface) => any;

export type OnPressPostOrComment = (post: RawPostInterface) => any;
