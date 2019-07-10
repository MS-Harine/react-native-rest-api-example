import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Modal, ActivityIndicator, ToastAndroid } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { DATABASE } from '../variable/secret';
import Axios from 'axios';

export default class CreateUserDataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", loading: false };
  }

  submit() {
    if (!this.state.username) {
      alert("Input valid data!");
    }
    else {
      this.setState({loading: true});

      Axios.post(DATABASE + "/users/", {
        username: this.state.username.replace(' ', '_')
      }, {
        timeout: 5000,
      }).then((response) => {
        this.setState({loading: false});
        alert("Save!");
        this.props.navigation.navigate('Home');
      }).catch((error) => {
        this.setState({loading: false});
        alert(error);
      });
    }
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