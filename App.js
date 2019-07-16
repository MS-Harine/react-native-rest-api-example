import React, { Component } from 'react';
import { Button, View, StyleSheet, TouchableHighlight } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'mobx-react';
import UserStore from './stores/user';

import GetUserDataScreen from './src/GetUserData';
import CreateUserDataScreen from './src/CreateUserData';
import UpdateUserDataScreen from './src/UpdateUserData';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.content}>
          <Button
            title="전체 유저 정보 가져오기"
            onPress={() => this.props.navigation.navigate('GetUserData')}
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.content}>
          <Button
            title="새로운 유저 정보 만들기"
            onPress={() => this.props.navigation.navigate('CreateUserData')}
          />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    margin: 20,
  }
})

const AppNavigator = createStackNavigator(
  {
    Home: MainScreen,
    GetUserData: GetUserDataScreen,
    CreateUserData: CreateUserDataScreen,
    UpdateUserData: UpdateUserDataScreen,
  },
  {
    defaultNavigationOptions: {
      title: "REST API 뿌수기"
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);
const userStore = new UserStore();

export default class App extends Component {
  render() {
    return (
      <Provider userStore={userStore}>
        <AppContainer />
      </Provider>
    )
  }
}