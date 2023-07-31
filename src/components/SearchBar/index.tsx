import * as React from 'react';
import {
  Image,
  ImageStyle,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {IC_CLOSE, IC_NAV_SEARCH} from '@/assets';
import debounce from 'lodash/debounce';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';

interface OwnProps {
  containerStyle?: ViewStyle;
  iconStyle?: ImageStyle;
  inputContainerStyle?: ViewStyle;
  placeholder?: string;
  onSearchTextChange?: (text: string) => void;
  debounceTime: number;
  autoFocus?: boolean;
  value?: string;
  onFocus?: () => void;
  onEndEditing?: () => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  defaultValue?: string;
  caretHidden?: boolean;
}

interface State {
  text: string;
}

type Props = OwnProps;

const SDarkIcon = styled.Image`
  tint-color: ${Colors.gray4};
  margin-left: 14.79px;
`;

const Icon = styled.Image`
  tint-color: ${Colors.white};
`;

const SSectionHeaderView = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.white};
  border: 1px solid #d9d9d9;
  border-radius: 20px;
`;

const ViewIcon = styled.View`
  background-color: ${Colors.gray5};
`;

export class SearchBar extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    debounceTime: 500,
  };

  constructor(props: Props) {
    super(props);

    props.debounceTime
      ? (this.onSearchTextChange = debounce(
          this.onSearchTextChange.bind(this),
          props.debounceTime,
        ))
      : this.onSearchTextChange.bind(this);

    this.state = {
      text: props.value || props.defaultValue || '',
    };
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any) {
    if (nextProps.value !== undefined && nextProps.value !== this.state.text) {
      this.setState({text: nextProps.value});
    }
  }

  onChangeText = (text: string) => {
    if (this.props.value) {
      return this.onSearchTextChange(text);
    }

    this.setState({text}, () => {
      this.onSearchTextChange(this.state.text);
    });
  };

  onSearchTextChange(text: string) {
    if (this.props.onSearchTextChange) {
      this.props.onSearchTextChange(text);
    }
  }

  onClearText = () => {
    this.onChangeText('');
  };

  render() {
    const placeholder = this.props.placeholder
      ? this.props.placeholder
      : 'Tìm kiếm sản phẩm';
    return (
      <SSectionHeaderView
        style={[this.props.containerStyle ? this.props.containerStyle : {}]}>
        <SDarkIcon
          style={[styles.searchIcon, this.props.iconStyle]}
          source={IC_NAV_SEARCH}
        />
        <GrayPlaceholder
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          style={[styles.input, this.props.inputContainerStyle]}
          placeholder={placeholder}
          value={this.state.text}
          defaultValue={this.props.defaultValue}
          autoFocus={this.props.autoFocus}
          onChangeText={this.onChangeText}
          autoCorrect={false}
          onEndEditing={this.props.onEndEditing}
          onSubmitEditing={this.props.onSubmitEditing}
          caretHidden={this.props.caretHidden}
          returnKeyType="send"
        />
        {this.state.text ? (
          <TouchableOpacity onPress={this.onClearText} style={styles.btnClear}>
            <ViewIcon style={styles.viewIcon}>
              <Icon style={styles.iconClear} source={IC_CLOSE} />
            </ViewIcon>
          </TouchableOpacity>
        ) : null}
      </SSectionHeaderView>
    );
  }
}

export const Divider = styled.View<{height?: number}>`
  width: 100%;
  height: ${p => p.height || 1}px;
  background-color: ${Colors.black10};
`;

const styles = StyleSheet.create({
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 10,
    fontWeight: '400',
    color: '#8898A7',
  },
  btnClear: {
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClear: {
    width: 10,
    height: 10,
  },
  viewIcon: {
    width: 16,
    height: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCamera: {
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewIconCamera: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCamera: {
    width: 25,
    height: 25,
  },
});
const GrayPlaceholder = styled(TextInput).attrs(props => ({
  placeholderTextColor: props.theme.grey4,
  selectionColor: props.theme.primaryColor,
}))`
  color: ${Colors.grey1};
`;
