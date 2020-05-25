/**
 * 信鸽推送
 * Created by Jeepeng on 16/8/3.
 */

import {
  Platform,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

let { XGPushManager } = NativeModules;
let XGNativeEventEmitter = new NativeEventEmitter(XGPushManager);

let _handlers = new Map();

const EventMapping = Platform.select({
  android: {
    register: 'remoteNotificationsRegistered',
    notification: 'remoteNotificationReceived',
    localNotification: 'localNotificationReceived',
    message: 'messageReceived'
  },
  ios: {
    register: 'remoteNotificationsRegistered',
    notification: 'remoteNotificationReceived',
    message: 'remoteMessageReceived',
    localNotification: 'localNotificationReceived',
  },
});

class XGPush {

  static init(accessId, accessKey) {
    let accessIdNum = Number(accessId);
    if (isNaN(accessIdNum)) {
      console.error(`[XGPush init] accessId is not a number!`);
    } else {
      if (Platform.OS === 'ios') {
        XGPushManager.startXGWithAppID(accessIdNum, accessKey);
      }
    }
  }

  static register(account) {
    if (Platform.OS === 'ios') {
      return XGPushManager.bindWithAccount(account);
    }
  }

  static setTag(tagName) {
    if (Platform.OS === 'ios') {
      return XGPushManager.bindWithTag(tagName);
    }
  }

  static deleteTag(tagName) {
    if (Platform.OS === 'ios') {
      return XGPushManager.unbindWithTag(tagName);
    }
  }

  static unRegister() {
    if (Platform.OS === 'ios') {
      return XGPushManager.stopXGNotification();
    }
  }

  static setApplicationIconBadgeNumber(number) {
    XGPushManager.setApplicationIconBadgeNumber(number);
  }

  static getApplicationIconBadgeNumber(callback) {
    XGPushManager.getApplicationIconBadgeNumber(callback);
  }

  static checkPermissions(callback) {
    if (Platform.OS === 'ios') {
      return XGPushManager.checkPermissions(callback);
    }
  }

  static getInitialNotification() {
    if (Platform.OS === 'ios') {
      return XGPushManager.getInitialNotification();  
    }
  }

  static onLocalNotification(callback) {
    if (Platform.OS === 'ios') {
      this.addEventListener('localNotification', callback)
    }
  }

  /**
   * 获取设备的token，只有注册成功才能获取到正常的结果
   */
  static getToken() {
    if (Platform.OS === 'ios') {
      return Promise.resolve();
    }
  }


}

export default XGPush;
