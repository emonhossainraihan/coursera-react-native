## Problem with react-navigation

- [solve](https://www.coursera.org/learn/react-native/discussions/weeks/1/threads/8PifLG4EQ724nyxuBDO9DQ)
- [additionally](https://stackoverflow.com/questions/59560312/getting-this-error-error-bundling-failed-error-unable-to-resolve-module-rea) need `yarn add react-native-community/react-native-safe-area-view`

[react-native](https://reactnavigation.org/docs/getting-started/) said "To finalize installation of react-native-gesture-handler, add the following at the top (make sure it's at the top and there's nothing else before it) of your entry file, such as index.js or App.js:",

```js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```
