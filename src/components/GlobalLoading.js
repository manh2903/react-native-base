import React, { Component } from 'react';
import { View, Modal, ActivityIndicator, Text, StyleSheet } from 'react-native';
import GlobalService from '@services/GlobalService';

export default class GlobalLoading extends Component {
  state = {
    visible: false,
    message: 'Đang tải...',
  };

  componentDidMount() {
    GlobalService.setLoadingRef(this);
  }

  show = (message = 'Đang tải...') => {
    this.setState({ visible: true, message });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, message } = this.state;

    return (
      <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
        <View style={styles.container}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 150,
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});