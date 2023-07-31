import React from 'react';
import DeviceInfo from 'react-native-device-info';

export const useSimulator = () => {
  const [isSimulator, setSimulator] = React.useState<boolean>(false);

  const getSimulator = async () => {
    const result: boolean = await DeviceInfo?.isEmulator();
    console.log('result: ' + JSON.stringify(result));
    setSimulator(result);
  };

  React.useEffect(() => {
    getSimulator();
  }, []);

  return {isSimulator};
};
