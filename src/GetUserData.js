import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, FlatList, Text, Button, TouchableHighlight, Modal } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@observer
export default class GetUserDataScreen extends Component {
  componentDidMount() {
    const { userStore } = this.props;
    userStore.getUserList();
  }

  render() {
    const { userStore } = this.props;

    if (userStore.state == 'pending') {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    else {
      if (userStore.state == 'error') {
        return (
          <View style={styles.container}>
            <Text>Failed to connect database.</Text>
            <Text>See detail error message below.</Text>
            <Text style={{ marginTop: 10, color: 'red' }}>{userStore.errorData}</Text>
          </View>
        )
      }
      return (
        <View style={styles.container}>
          <FlatList
            style={{ alignSelf: 'stretch' }}
            data={userStore.userList}
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
                      onPress={() => {userStore.deleteUser(item.id)}}
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