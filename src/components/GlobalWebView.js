import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview';
import GlobalService from '@services/GlobalService';

export default class GlobalWebView extends Component {
  state = {
    visible: false,
    url: '',
    title: '',
  };

  componentDidMount() {
    GlobalService.setWebViewRef(this);
  }

  show = (url, title = '') => {
    this.setState({ visible: true, url, title });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, url, title } = this.state;

    return (
      <Modal visible={visible} animationType="slide" statusBarTranslucent>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title || 'WebView'}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={this.hide}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
          {url ? <WebView source={{ uri: url }} style={styles.webview} startInLoadingState /> : null}
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  webview: {
    flex: 1,
  },
});