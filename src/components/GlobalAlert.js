import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GlobalService from '@services/GlobalService';

export default class GlobalAlert extends Component {
  state = {
    visible: false,
    title: '',
    message: '',
    buttons: [],
    type: 'info',
  };

  componentDidMount() {
    GlobalService.setAlertRef(this);
  }

  show = ({ title, message, buttons, type = 'info' }) => {
    this.setState({
      visible: true,
      title,
      message,
      buttons: buttons || [{ text: 'OK', onPress: () => this.hide() }],
      type,
    });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, title, message, buttons } = this.state;

    return (
      <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
        <View style={styles.container}>
          <View style={styles.alertBox}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {message ? <Text style={styles.message}>{message}</Text> : null}
            
            <View style={styles.buttonContainer}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, button.style === 'cancel' && styles.cancelButton]}
                  onPress={() => {
                    this.hide();
                    button.onPress?.();
                  }}
                >
                  <Text style={[styles.buttonText, button.style === 'cancel' && styles.cancelButtonText]}>
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
    padding: 20,
  },
  alertBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#666',
  },
});