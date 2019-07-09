import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, FlatList, Text, Button, TouchableHighlight } from 'react-native';
import { DATABASE } from '../variable/secret';

export default class GetUserDataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, data: null };
  }

  componentDidMount() {
    const axios = require('axios');

    axios.get(DATABASE + "/users")
      .then((response) => {
        let users = response.data.results;
        this.setState({isLoaded: true, data: users});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoaded == false) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          style={{ alignSelf: 'stretch' }}
          data={this.state.data}
          keyExtractor={(item, index) => item.url.split('/').reverse()[1]}
          renderItem={({item}) => 
            <View style={styles.line}>
              <View>
                <Text style={styles.label}>Name: </Text>
                <Text style={styles.name}>{item.username}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight>
                  <Button 
                    title="Update"
                    onPress={() => this.props.navigation.navigate('UpdateUserData')}
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ marginLeft: 10 }}
                >
                  <Button 
                    title="Delete"
                    onPress={() => this.props.navigation.navigate('')}
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