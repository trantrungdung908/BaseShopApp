import React, {memo} from 'react';

interface Props {
  type: 'post' | 'comment';
  onCloseRequest: () => any;
}
const Header = memo(({type, onCloseRequest}: Props) => {
  return (
    <>
      {/*<HeaderAction/>*/}
      {/*<HeaderContent title={('post/' + type)}/>*/}
      {/*<HeaderAction icon={'close'} onPress={onCloseRequest}/>*/}
    </>
  );
});

Header.displayName = 'Header';

export default Header;
