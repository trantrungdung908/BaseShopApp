export const unique = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index;
};

export const str2int = (str: string) => {
  let r = 3;
  for (let i = 0; i < str.length; i++) {
    r += str.charCodeAt(i) * str.charCodeAt(i);
  }
  return (r % 8) + 1;
};

export const getAvatarColorText = (str: string | undefined) => {
  if (!str) {
    str = '';
  }
  const colors = {
    1: '#2a91d6',
    2: '#7c32a1',
    3: '#11bdbf',
    4: '#4CAF50',
    5: '#5969c5',
    6: '#dbaa07',
    7: '#FF6F22',
    8: '#CF5555',
    9: '#ee59ba',
  };
  let color = str2int(str);
  // @ts-ignore
  return colors[color];
};
