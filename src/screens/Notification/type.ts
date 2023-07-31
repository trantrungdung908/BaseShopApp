import {
  IC_CHAT,
  IC_DELIVERY,
  IC_GIFT_V2,
  IC_IMAGE_GALLERY,
  IC_LOCATION,
  IC_LUCKY_SPIN,
  IC_MALL,
  IC_MENU,
  IC_NETWORK,
  IC_STAR,
  IC_TOPIC,
  IC_VIDEO,
} from '@/assets';
interface NotifItem {
  icon: string;
  title: string;
  date: string;
}

interface HistoryItem {
  icon: string;
  point: string;
  date: string;
}

export const NotifItems: NotifItem[] = [
  {
    icon: IC_MENU,
    title: 'Đơn hàng của bạn đã được xác nhận',
    date: '6 phút trước',
  },
  {
    icon: IC_VIDEO,
    title: 'Nhà cung cấp đang phát trực tiếp: “Xả kho giá sốc”',
    date: '14:23, 13/08/2020',
  },
  {
    icon: IC_CHAT,
    title: 'ABC shop đã nhắn tin cho bạn',
    date: '14:23, 13/08/2020',
  },
  {
    icon: IC_CHAT,
    title: 'Tú Đội đã bình luận bài viết của bạn',
    date: '14:23, 13/08/2020',
  },
  {
    icon: IC_DELIVERY,
    title: 'Đơn hàng của bạn đang được giao',
    date: '14:23, 13/08/2020',
  },
  {
    icon: IC_STAR,
    title: 'Bạn được cộng 100 điểm khi giới thiệu ứng dụng',
    date: '14:23, 13/08/2020',
  },
  {
    icon: IC_GIFT_V2,
    title: 'Yêu cầu đổi quà của bạn được phê duyệt',
    date: '14:23, 13/08/2020',
  },

  {
    icon: IC_GIFT_V2,
    title: 'Yêu cầu đổi quà của bạn được phê duyệt',
    date: '14:23, 13/08/2020',
  },
];

export const HistoryItems: HistoryItem[] = [
  {
    icon: IC_LUCKY_SPIN,
    point: '10 điểm',
    date: '10:14,26/08/2020',
  },
  {
    icon: IC_LUCKY_SPIN,
    point: '10 điểm',
    date: '10:14,26/08/2020',
  },
  {
    icon: IC_LUCKY_SPIN,
    point: '10 điểm',
    date: '10:14,26/08/2020',
  },
  {
    icon: IC_LUCKY_SPIN,
    point: '10 điểm',
    date: '10:14,26/08/2020',
  },
  {
    icon: IC_LUCKY_SPIN,
    point: '10 điểm',
    date: '10:14,26/08/2020',
  },
  {
    icon: IC_LUCKY_SPIN,
    point: '10 điểm',
    date: '10:14,26/08/2020',
  },
  {
    icon: IC_LUCKY_SPIN,
    point: '10 điểm',
    date: '10:14,26/08/2020',
  },
];
