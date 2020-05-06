import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//!bring components
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

const MenuNavigator = createStackNavigator();

const HeaderOptions = {
  headerStyle: {
    backgroundColor: '#512DA8',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff',
  },
};

function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={HeaderOptions}
    >
      <MenuNavigator.Screen name="Menu" component={Menu} />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: 'Dish Detail' }}
      />
    </MenuNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={HeaderOptions}
    >
      <HomeNavigator.Screen name="Home" component={Home} />
    </HomeNavigator.Navigator>
  );
}

const stack = createStackNavigator();

function AboutNavigatorScreen() {
  return (
    <stack.Navigator screenOptions={HeaderOptions}>
      <stack.Screen name="About" component={About} />
    </stack.Navigator>
  );
}

function ContactNavigatorScreen() {
  return (
    <stack.Navigator screenOptions={HeaderOptions}>
      <stack.Screen name="Contact" component={Contact} />
    </stack.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#D1C4E9',
      }}
      screenOptions={HeaderOptions}
    >
      <MainNavigator.Screen name="Home" component={HomeNavigatorScreen} />
      <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} />
      <MainNavigator.Screen name="About" component={AboutNavigatorScreen} />
      <MainNavigator.Screen name="Contact" component={ContactNavigatorScreen} />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorDrawer />
      </NavigationContainer>
    );
  }
}

export default Main;

//! initialRouteName: The name of the route to render on first load of the navigator
