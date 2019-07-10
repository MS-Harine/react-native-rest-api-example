import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, FlatList, Text, Button, TouchableHighlight, Modal } from 'react-native';
import { DATABASE } from '../variable/secret';
import Axios from 'axios';

export default class GetUserDataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, isError: false, data: null };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    this.setState({ isLoaded: false });

    Axios.get(DATABASE + "/users/", {
      timeout: 5000,
    }).then((response) => {
        let users = response.data.results;
        this.setState({isLoaded: true, isError: false, data: users});
      })
      .catch((error) => {
        console.log(error);
        this.setState({isLoaded: true, isError: true, data: error});
      });
  }

  deleteUser(id) {
    this.setState({ isLoaded: false });

    Axios.delete(DATABASE + '/users/' + id + '/', {
      timeout: 5000,
    }).then((response) => {
      this.getUser();
    }).catch((error) => {
      alert("Error : " + error);
      this.setState({ isLoaded: true });
    })
  }

  render() {
    if (this.state.isLoaded == false) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    else {
      if (this.state.isError) {
        return (
          <View style={styles.container}>
            <Text>Failed to connect database.</Text>
            <Text>See detail error message below.</Text>
            <Text style={{ marginTop: 10, color: 'red' }}>{this.state.data.message}</Text>
          </View>
        )
      }
      return (
        <View style={styles.container}>
          <FlatList
            style={{ alignSelf: 'stretch' }}
            data={this.state.data}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item}) => 
              <View style={styles.line}>
                <View>
                  <Text style={styles.label}>[{item.id}] Name: </Text>
                  <Text style={styles.name}>{item.username}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableHighlight>
                    <Button 
                      title="Update"
                      onPress={() => this.props.navigation.navigate('UpdateUserData', {
                        id: item.id,
                        username: item.username,
                      })}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ marginLeft: 10 }}
                  >
                    <Button 
                      title="Delete"
                      onPress={() => {this.deleteUser(item.id)}}
                      color='red'
                    />
                  </TouchableHighlight>
                </View>
              </View>
            } />
          </View>
        )
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
  }
})