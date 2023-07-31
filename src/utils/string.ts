export const normalizeStringForSearch = (raw: string = ''): string => {
  let str: string = raw.trim();
  str = str.toLowerCase();
  str = removeAccents(str);
  str = removeDesc(str);
  return str;
};

export const removeAccents = (str: string): string => {
  if (str.length === 0) {
    return str;
  }
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/[ỲÝYỶỸ]/g, 'Y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/[!@%^*()+=<>?\/,.:;'"&#\[]~\$_`-{}|\\]/g, ' ');
  str = str.replace(/ + /g, ' ');
  str = str.replace(/\[\/?vc(.*?)\]/gm, '');
  str = str.replace(/<(.*?)>",(.*?)>/gm, '');
  return str;
};

export const removeDesc = (str: string): string => {
  if (str.length === 0) {
    return str;
  }
  str = str.replace(/\[\/?vc(.*?)\]/gm, '');
  str = str.replace(/<(.*?)>",(.*?)>/gm, '');
  return str;
};

export const capitalize = (s: any) => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
