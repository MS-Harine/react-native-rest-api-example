import React, { Component } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

export default class ActivityModalIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.task();
    this.setState({ loading: false });
  }
  
  render() {
    return (
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
    )
  }
}

const styles = StyleSheet.create({
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