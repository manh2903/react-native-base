import React, { Component } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';
import GlobalService from '@services/GlobalService';

const { width } = Dimensions.get('window');

export default class GlobalToast extends Component {
  state = {
    visible: false,
    message: '',
    type: 'info',
  };

  animatedValue = new Animated.Value(0);
  timeout = null;

  componentDidMount() {
    GlobalService.setToastRef(this);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  show = ({ message, type = 'info', duration = 3000 }) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.setState({ visible: true, message, type }, () => {
      Animated.sequence([
        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({ visible: false });
      });
    });
  };

  getBackgroundColor = () => {
    const colors = {
      info: '#007AFF',
      success: '#34C759',
      error: '#FF3B30',
      warning: '#FF9500',
    };
    return colors[this.state.type] || colors.info;
  };

  render() {
    const { visible, message } = this.state;

    if (!visible) return null;

    const translateY = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    const opacity = this.animatedValue;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: this.getBackgroundColor(),
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  message: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});