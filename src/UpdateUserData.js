import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableHighlight, Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Axios from 'axios';
import { DATABASE } from '../variable/secret';

export default class UpdateUserDataScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;

    this.state = { loading: false, username: navigation.getParam('username', "") };
    this.id = navigation.getParam('id', 0);
  }

  submit() {
    this.setState({ loading: true });
    
    Axios.patch(DATABASE + '/users/' + this.id + '/', {
      username: this.state.username.replace(' ', '_')
    }, {
      timeout: 5000,
    }).then((response) => {
      this.setState({ loading: false });
      alert("Success!");
      this.props.navigation.popToTop();
    }).catch((error) => {
      console.log(error);
      this.setState({ loading: false });
      alert("Error: " + error);
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