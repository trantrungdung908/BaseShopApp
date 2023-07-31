import he from 'he';

interface StripHtmlOptions {
  withLineBreak?: boolean;
  trimWhiteSpaces?: boolean;
}

class StringHelperClass extends String {
  _str: string;

  constructor(str: string) {
    super(str);
    this._str = str;
  }

  stripHtml = (options: StripHtmlOptions = {}) => {
    options = {
      withLineBreak: true,
      trimWhiteSpaces: true,
      ...options,
    };

    this._str = this._str.replace(
      /<\/?(br|p)[^>]*>?/gm,
      options.withLineBreak ? '\n' : ' ',
    ); // convert br and p to space

    this._str = this._str.replace(/<[^>]*>?/gm, '');

    if (options.trimWhiteSpaces) {
      this._str = this._str.replace(/\s{2,}/gm, ' ').trim();
    }

    this._str = he.unescape(this._str);

    this._str = this._str.replace(
      /(&#(\d+);)/gm,
      (match, capture, charCode) => {
        return String.fromCharCode(charCode);
      },
    );

    return this;
  };

  removeAccents = () => {
    this._str = this._str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    this._str = this._str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
    this._str = this._str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    this._str = this._str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
    this._str = this._str.replace(/[ìíịỉĩ]/g, 'i');
    this._str = this._str.replace(/[ÌÍỊỈĨ]/g, 'I');
    this._str = this._str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    this._str = this._str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
    this._str = this._str.replace(/[ùúụủũưừứựửữ]/g, 'u');
    this._str = this._str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
    this._str = this._str.replace(/[ỳýỵỷỹ]/g, 'y');
    this._str = this._str.replace(/[ỲÝYỶỸ]/g, 'Y');
    this._str = this._str.replace('đ', 'd');
    this._str = this._str.replace('Đ', 'D');
    this._str = this._str.replace(/[!@%^*()+=<>?/,.:;'"&#[]~\$_`-{}|\\]/g, ' ');
    this._str = this._str.replace(/ + /g, ' ');
    return this;
  };

  removeReductionMentionText = () => {
    this._str = this._str.replace(/{{(@\w+)}}/gm, '$1');

    return this;
  };
}

StringHelperClass.prototype.toString = function () {
  return this._str;
};

const StringHelper = (str: string) => new StringHelperClass(str);

export default StringHelper;
