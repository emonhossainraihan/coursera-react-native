I finished this course as a part of **react specialization** in _Coursera_

You can download the apk version of this application [here](https://expo.io/dashboard/emonhossainraihan/builds/e872b8d2-60ae-4397-a3a9-997ad10318ba)

## Available Scripts

In the project directory, you can run:

### `expo start`

This will run the application in the development mode but make sure you have installed any andriod simulator or expo client to view the application. Another important script you need to run is the `json-server` in the json-server directory. Unless your application didn't get their assets.

### `expo build:<TRAGETED DEVICE|android|iso>`

## Problem with react-navigation - march 2020

- [solve](https://www.coursera.org/learn/react-native/discussions/weeks/1/threads/8PifLG4EQ724nyxuBDO9DQ)
- [additionally](https://stackoverflow.com/questions/59560312/getting-this-error-error-bundling-failed-error-unable-to-resolve-module-rea) need `yarn add react-native-community/react-native-safe-area-view`

> [react-native](https://reactnavigation.org/docs/getting-started/) docs said _To finalize installation of react-native-gesture-handler, add the following at the top (make sure it's at the top and there's nothing else before it) of your entry file, such as index.js or App.js:_

**Problem with Stack Navigator:** [solve](https://www.coursera.org/learn/react-native/discussions/weeks/2/threads/VObG3wX3TrGmxt8F9_6xxA)

**Problem with gesture:** [solve](https://www.coursera.org/learn/react-native/discussions/weeks/3/threads/RS9dwNF5EeiaQxKeqT1mFg)

**Breaking Changes with NetInfo:** [solve](https://www.coursera.org/learn/react-native/discussions/weeks/4/threads/PMtGZErvRf2LRmRK76X97g)

## Breaking change and issues I faced in this course: march 2020

## Week 1:

| Issue                                                                                                                                                                                                                       | Solution                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Regular expression error due to node Version found at node_modules/metro_config/defaults/blacklist.js [here](https://stackoverflow.com/questions/58120990/how-to-resolve-the-error-on-react-native-start/58122821#58122821) | Please note that if you run a npm install or a yarn you need to change the code again.OR You can downgrade your node version.                                                                                                                                                                                                     |
| After the installation of react-navigation, we need to install some more dependencies. [here](https://reactnavigation.org/docs/en/getting-started.html)                                                                     | `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context`                                                                                                                                                                                                           |
| createStackNavigator() is offered by a different module [here](https://reactnavigation.org/docs/en/stack-navigator.html)                                                                                                    | `yarn add react-navigation-stack @react-native-community/masked-view`                                                                                                                                                                                                                                                             |
| Need to wrap MainNavigator inside of createAppContainer [here](https://stackoverflow.com/questions/53367195/invariant-violation-the-navigation-prop-is-missing-for-this-navigator)                                          | Use the createAppContainer on your Main navigator and use the resulting variable(component) inside your Main component. [here](https://reactnavigation.org/blog/#explicit-app-container-required-for-the-root-navigator)                                                                                                          |
| Title gets truncated on some devices due to native fonts. [here](https://github.com/react-navigation/react-navigation/issues/5050)                                                                                          | Set to something like Roboto for Andrdoid and Arial for iOS                                                                                                                                                                                                                                                                       |
| Need to separately install createDrawerNavigator(): [here](https://reactnavigation.org/docs/en/drawer-navigator.html)                                                                                                       | yarn add react-navigation-drawer                                                                                                                                                                                                                                                                                                  |
| Possible BUG in the Expo android application                                                                                                                                                                                | The menu component will be a blank white screen after navigating to it from the drawer navigator. To solve this, use the default ‘home’ button on the android device and go back into the expo application. It works thereafter. Must repeat step for every component in the drawer Navigator and every time you restart the app. |

## Week 2:

| Issue                                                                                           | Solution                                                                              |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Use Arrow function to provide ‘headerLeft’ attribute instead of a plain component               | `headerLeft: () => <Icon name=”menu” size={24}></Icon>`                               |
| Use iconStyle attribute to move the icon away from the edge. (Icon is too close to device edge) | Add another attribute as iconStyle={{marginLeft: 10}}                                 |
| DrawerItems needs to be imported from a different module                                        | Import from react-navigation-drawer                                                   |
| Json-server command change `json-server --watch db.json -p 3001 -H <YOUR IP ADDRESS>`           | json-server command change `json-server --watch db.json -p 3001 -H <YOUR IP ADDRESS>` |

## Week 3 and 4:

| Issue                                                                                                                          | Solution                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| react-native-swipeout                                                                                                          | this is no longer supported, please consider using [it](https://github.com/jemise111/react-native-swipe-list-view) instead. (Optional)                                                                                                                                      |
| Persist Store                                                                                                                  | `import { AsyncStorage } from 'react-native';const config = {key: 'root', debug: true,storage: AsyncStorage};` [here](https://github.com/rt2zz/redux-persist)                                                                                                               |
| Login Component                                                                                                                | `expo install expo-secure-store` `import * as SecureStore from 'expo-secure-store'` use prop inputContainerStyle instead of containerStyle                                                                                                                                  |
| Mail composer has moved to different module                                                                                    | `expo install expo-mail-composer` `import * as MailComposer from 'expo-mail-composer';`                                                                                                                                                                                     |
| Permission has moved out of expo. Notification for android require a separate object to create for sound and vibration to work | `expo install expo-permissions` `import * as Permissions from 'expo-permissions';` `Notifications.createChannelAndroidAsync('Confusion', {name: 'Confusion',sound: true,vibrate: true})` [here](https://docs.expo.io/versions/latest/sdk/notifications/)                    |
| Mail composer has moved to different module                                                                                    | `expo install expo-mail-composer` `import * as MailComposer from 'expo-mail-composer';`                                                                                                                                                                                     |
| Image picker has moved to different module expo install expo-image-picker                                                      | `import * as ImagePicker from ‘expo-image-picker` [here](https://docs.expo.io/versions/latest/sdk/imagepicker/)                                                                                                                                                             |
| createBottomTabNavigator has moved                                                                                             | `yarn add react-navigation-tabs` `import { createBottomTabNavigator } from 'react-navigation-tabs';`                                                                                                                                                                        |
| NetInfo API has changed.Expo not compatible with latest NetInfo Module                                                         | `expo install @react-native-community/netinfo` (Use 4.x.x) `import NetInfo from '@react-native-community/netinfo';` `const unsubscribe = NetInfo.addEventListener(state => {console.log('Connection type', state.type);console.log('Is connected?', state.isConnected);});` |
| Expo calendar API needs separate install                                                                                       | `expo install expo-calendar` `import * as Calendar from 'expo-calendar';`                                                                                                                                                                                                   |
| Calendar.DEFAULT is deprecated                                                                                                 | Need to use getCalendarsAsync() and manually find the default calender. Default Calender has the allowsModifications flag set to TRUE.                                                                                                                                      |

If you find any problem and tried enough although didn't solve those issues then let me know it.

👉 mail me at mdemon7475@gmail.com
👉 put a message at twitter.com/emonhossain_dev
