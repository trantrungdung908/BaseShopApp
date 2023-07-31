import {
  navigateToBlogDetailScreen,
  navigateToCategoryScreen,
  navigateToForumsScreen,
  navigateToListProductScreen,
  navigateToSaleCodeScreen,
  navigateToTrackOrderScreen,
} from '@/utils/navigation';
import {
  IC_ACCESSORIES,
  IC_CLOCK,
  IC_COOKING,
  IC_COUPON,
  IC_FURNITURE,
  IC_LIGHTING,
  IC_TOYS,
  IMG_COMMUNITY,
  IMG_COUPON_SALE,
  IMG_FLOWER,
  IMG_GIFT,
  IMG_LISTS,
} from '@/assets';
import {ImageSourcePropType} from 'react-native';

export interface dataCat {
  id: number;
  title: string;
  img: ImageSourcePropType;
  onSelected?: () => void;
}

export const CategoryData: dataCat[] = [
  {
    id: 1,
    title: 'Phụ kiện',
    img: IC_ACCESSORIES,
    onSelected: () =>
      navigateToCategoryScreen({
        category: '21',
      }),
  },
  {
    id: 2,
    title: 'Đồng hồ',
    img: IC_CLOCK,
    onSelected: () =>
      navigateToCategoryScreen({
        category: '28',
      }),
  },
  {
    id: 3,
    title: 'Gia dụng',
    img: IC_COOKING,
    onSelected: () =>
      navigateToCategoryScreen({
        category: '29',
      }),
  },
  {
    id: 4,
    title: 'Nội thất',
    img: IC_FURNITURE,
    onSelected: () =>
      navigateToCategoryScreen({
        category: '33',
      }),
  },
  {
    id: 5,
    title: 'Thiết bị điện',
    img: IC_LIGHTING,
    onSelected: () =>
      navigateToCategoryScreen({
        category: '42',
      }),
  },
  {
    id: 6,
    title: 'Đồ chơi',
    img: IC_TOYS,
    onSelected: () =>
      navigateToCategoryScreen({
        category: '49',
      }),
  },
  {
    id: 7,
    title: 'Mã giảm giá',
    img: IC_COUPON,
    onSelected: () => navigateToSaleCodeScreen(),
  },
];

export const dataList = [
  {
    id: 1,
    title: 'Cộng đồng',
    img: IMG_COMMUNITY,
    color: '#FFA502',
    onSelected: () => navigateToForumsScreen(),
  },
  {
    id: 2,
    title: 'Sản phẩm',
    img: IMG_FLOWER,
    color: '#FF7F50',
    onSelected: () => navigateToListProductScreen(),
  },
  {
    id: 3,
    title: 'Đơn hàng',
    img: IMG_LISTS,
    color: '#F03E3E',
    onSelected: () => navigateToTrackOrderScreen(),
  },
  {
    id: 4,
    title: 'Blog',
    img: IMG_GIFT,
    color: '#1890FF',
    onSelected: () => navigateToBlogDetailScreen(),
  },
];

export interface VoucherItemsInterface {
  id: number;
  title: string;
  textMinimum: string;
  textDesc: string;
  couponFreeShip: string;
  img: ImageSourcePropType;
}

export const VoucherItems: VoucherItemsInterface[] = [
  {
    id: 1,
    title: 'Giảm tối đa 15k',
    img: IMG_COUPON_SALE,
    couponFreeShip: 'Free ship làm đẹp',
    textMinimum: 'Đơn tối thiểu 0đ',
    textDesc: 'Sắp hết hạn: Còn 15 giờ',
  },
  {
    id: 2,
    title: 'Giảm tối đa 15k',
    img: IMG_COUPON_SALE,
    couponFreeShip: 'Free ship làm đẹp',
    textMinimum: 'Đơn tối thiểu 0đ',
    textDesc: 'HSD: 30.04.2023',
  },
  {
    id: 3,
    title: 'Giảm tối đa 15k',
    img: IMG_COUPON_SALE,
    couponFreeShip: 'Free ship làm đẹp',
    textMinimum: 'Đơn tối thiểu 0đ',
    textDesc: 'Sắp hết hạn: Còn 15 giờ',
  },
  {
    id: 4,
    title: 'Giảm tối đa 15k',
    img: IMG_COUPON_SALE,
    couponFreeShip: 'Free ship làm đẹp',
    textMinimum: 'Đơn tối thiểu 0đ',
    textDesc: 'Sắp hết hạn: Còn 2 ngày ',
  },
  {
    id: 5,
    title: 'Giảm tối đa 15k',
    img: IMG_COUPON_SALE,
    couponFreeShip: 'Free ship làm đẹp',
    textMinimum: 'Đơn tối thiểu 0đ',
    textDesc: 'HSD: 30.04.2023',
  },
];
