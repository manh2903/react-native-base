import React, { Component } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import GlobalService from '@services/GlobalService';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class GlobalBottomSheet extends Component {
  state = {
    visible: false,
    content: null,
    height: 300,
    title: '',
  };

  animatedValue = new Animated.Value(0);
  panResponder = null;

  componentDidMount() {
    GlobalService.setBottomSheetRef(this);
    this.createPanResponder();
  }

  createPanResponder = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          this.animatedValue.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          this.hide();
        } else {
          Animated.spring(this.animatedValue, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  };

  show = ({ content, height = 300, title = '' }) => {
    this.setState({ visible: true, content, height, title }, () => {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    });
  };

  hide = () => {
    Animated.timing(this.animatedValue, {
      toValue: this.state.height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ visible: false });
    });
  };

  render() {
    const { visible, content, height, title } = this.state;

    return (
      <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
        <TouchableWithoutFeedback onPress={this.hide}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.bottomSheet,
                  {
                    height,
                    transform: [{ translateY: this.animatedValue }],
                  },
                ]}
              >
                <View {...this.panResponder?.panHandlers} style={styles.header}>
                  <View style={styles.dragIndicator} />
                  {title ? <Text style={styles.title}>{title}</Text> : null}
                </View>
                <View style={styles.content}>{content}</View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});