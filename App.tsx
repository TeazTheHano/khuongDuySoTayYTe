import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProviderTotal } from './data/store';
import clrStyle from './assets/componentStyleSheet';
import { ColorValue } from 'react-native';

// screen import
import Onboarding from './screens/Onboarding';
import LoginOpt from './screens/LoginOpt';
import Login from './screens/Login';
import Register from './screens/Register';
import DataCollect from './screens/DataCollect';
import BottomTab from './assets/BottomTab';
import Home from './screens/Home';
import User from './screens/Profile';
import Shop from './screens/Nav';
import Community from './screens/Map';
import ListView from './screens/ListView';
import Setting from './screens/Setting';
// >>>>>>>>>>


// ____________________END OF IMPORT_______________________

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <ProviderTotal>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: clrStyle.white as ColorValue } }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="LoginOpt" component={LoginOpt} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name="DataCollect" component={DataCollect} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Shop" component={Shop} />
          <Stack.Screen name="Community" component={Community} />
          <Stack.Screen name="Setting" component={Setting} />

          {/* >>>> */}
          <Stack.Screen name="ListView" component={ListView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProviderTotal>
  )
}

export default App;