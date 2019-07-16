import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableHighlight, Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Axios from 'axios';
import { DATABASE } from '../variable/secret';
import { inject } from 'mobx-react';

@inject('userStore')
export default class UpdateUserDataScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;

    this.state = { loading: false, username: navigation.getParam('username', "") };
    this.id = navigation.getParam('id', 0);
  }

  submit() {
    const { userStore } = this.props;
    this.setState({ loading: true });
    
    userStore.updateUser(this.id, this.state.username)
      .then(result => {
        if (userStore.state == "error") {
          alert("Error: ", userStore.errorData);
        }
        else 
          this.props.navigation.pop();
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.loading}
          transparent={true}
          animationType={'none'}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator />
            </View>
          </View>
        </Modal>
        <Input 
          placeholder="Username"
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          style={{ margin: 30 }} />
        <TouchableHighlight style={{ margin: 20 }} >
          <Button 
            title="Submit"
            onPress={() => this.submit()} />
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00000040"
  },
  activityIndicatorWrapper: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF"
  }
})