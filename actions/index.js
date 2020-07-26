import Base64 from '../Base64';
import {PermissionsAndroid, Platform} from 'react-native';

export const addBLE = (device) => ({
  type: "ADD_BLE",
  device
})

export const connectedDevice = (device) => ({
  type: "CONNECTED_DEVICE",
  connectedDevice: device
});

export const connectedServiceCharacteristics = (characteristic) => ({
  type: "CONNECTED_CHARACTERISTICS",
  connectedServiceCharacteristics: characteristic
});

export const connectedDeviceServices = (services) => ({
  type: "CONNECTED_SERVICES",
  connectedDeviceServices: services
});

export const selectedService = (serviceID) => ({
  type: "SELECTED_SERVICE",
  selectedService: serviceID
});

export const selectedCharacteristic = (characteristic) => ({
  type: "SELECTED_CHARACTERISTIC",
  selectedCharacteristic: characteristic
});

export const changeStatus = (status) => ({
  type: "CHANGE_STATUS",
  status: status
});

//some thunks to control the BLE Device

export const startScan = () => {
  return (dispatch, getState, DeviceManager) => {
    // you can use Device Manager here
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        console.log("crumbs")
        dispatch(scan());
        subscription.remove();
      }
    }, true);
  };
};

//on android device, we should ask permission
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location permission for bluetooth scanning',
        message: 'wahtever',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission for bluetooth scanning granted');
      return true;
    } else {
      console.log('Location permission for bluetooth scanning revoked');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const scan = () => {
  return async (dispatch, getState, DeviceManager) => {
    const permission = Platform.OS === 'ios'? true: await requestLocationPermission();
    if (permission) {
      DeviceManager.startDeviceScan(null , null, (error, device) => {
        dispatch(changeStatus('Scanning'));
        if (error) {
          console.log(error);
        }
        if (device !== null) {
          if(device.name === 'O2Ring 6598'){
            dispatch(addBLE(device));
          }
        }
      });
    } else {
      //TODO: here we could treat any new state or new thing when there's no permission to BLE
      console.log('Error permission');
    }
  };
};

export const getServiceCharacteristics = service => {
  return (dispatch, getState, DeviceManager) => {
    let state = getState();
    DeviceManager.characteristicsForDevice(
      state.BLEs.connectedDevice.id,
      service.uuid,
    ).then(characteristics => {
      dispatch(connectedServiceCharacteristics(characteristics));
    });
  };
};

export const connectDevice = (device) => {
  return (dispatch, getState, DeviceManager) => {
    dispatch(changeStatus("Connecting"));
    DeviceManager.stopDeviceScan()
    device
      .connect()
      .then((device) => {
        dispatch(changeStatus("Discovering"));
        let allCharacteristics = device.discoverAllServicesAndCharacteristics()
        dispatch(connectedDevice(device));
        return allCharacteristics;
      })
      .then((device) => {
        let services = device.services(device.id);
        return services;
      })
      .then((services) => {
          // console.log("found services: ", services)
          dispatch(connectedDeviceServices(services));
        }, (error) => {
          console.log(this._logError("SCAN", error));
        })

  }
}

const crcVal = (array) => {
  let currentVal;
  let output = array.reduce(function (currentVal, index) {
    currentVal = currentVal + index;
    if (currentVal > 256) {
      currentVal = currentVal - 256;
    }
    return currentVal;
  })
  return 255 - output;
}

function str2ab(str) {
  // console.log("string to send: ", str)
  var bufView = new Uint8Array(str.length);
  // console.log(bufView)
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    // console.log(str.charCodeAt(i))
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}

export const writeCharacteristic = (text) => {
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    console.log(state.BLEs.connectedDevice)
    let buffer = str2ab(text)
    let packetsize = 20;
    let offset = 0;
    let packetlength = packetsize;
    do {
      if (offset + packetsize > buffer.length) {
        packetlength = buffer.length;
      } else {
        packetlength = offset + packetsize;
      }
      let packet = buffer.slice(offset, packetlength);
      // console.log("packet: ", packet)
      let base64packet = Base64.btoa(String.fromCharCode.apply(null, packet));
      console.log("base64 packet: ", base64packet)
      let newbase64packet = "qhTrAAAAAMY="
      let resetpacket = "qhjnAAAAALs="
      state.BLEs.connectedDevice.writeCharacteristicWithoutResponseForService(state.BLEs.selectedService.uuid, state.BLEs.selectedCharacteristic.uuid, newbase64packet)
      console.log("\n\n\n")
      console.log(state.BLEs.connectedDevice)
      offset += packetsize;
    } while (offset < buffer.length)
  }
}