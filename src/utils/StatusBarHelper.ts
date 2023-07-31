import {StatusBar, StatusBarProps} from 'react-native';

type Entry = Partial<StatusBarProps>;

class StatusBarHelper {
  private _setEntry = (props: Entry): Entry => {
    return {
      animated: true,
      barStyle: 'default',
      hidden: false,
      networkActivityIndicatorVisible: true,
      showHideTransition: 'fade',
      translucent: false,
      ...props,
    };
  };

  pushStackEntry = (props: Entry) => {
    let newProps = this._setEntry(props);

    // @ts-ignore
    const newStatusBar = StatusBar.pushStackEntry(newProps);

    return {
      statusBar: newStatusBar,
      // @ts-ignore
      pop: () => StatusBar.popStackEntry(newStatusBar),

      replace: (prop: Entry) => {
        const newProp = this._setEntry(prop);
        // @ts-ignore
        return StatusBar.replaceEntry(newStatusBar, newProp);
      },
    };
  };

  popStackEntry = (entry: Entry): void => {
    // @ts-ignore
    return StatusBar.popStackEntry(entry);
  };

  replaceStackEntry = (entry: Entry, props: Entry): Entry => {
    // @ts-ignore
    return StatusBar.replaceStackEntry(entry, props);
  };
}

export default new StatusBarHelper();
