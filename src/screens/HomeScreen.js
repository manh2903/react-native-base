import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import GlobalService from '@services/GlobalService';

export default function HomeScreen({ navigation }) {
  const handleShowLoading = () => {
    GlobalService.showLoading('Đang xử lý...');
    setTimeout(() => {
      GlobalService.hideLoading();
      GlobalService.showToast({
        message: 'Hoàn thành!',
        type: 'success',
      });
    }, 2000);
  };

  const handleShowAlert = () => {
    GlobalService.showAlert({
      title: 'Thông báo',
      message: 'Đây là một thông báo từ Home Screen!',
      type: 'info',
    });
  };

  const handleShowConfirm = () => {
    GlobalService.showAlert({
      title: 'Xác nhận',
      message: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      type: 'warning',
      buttons: [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: () => {
            GlobalService.showToast({
              message: 'Đã xác nhận!',
              type: 'success',
            });
          },
        },
      ],
    });
  };

  const handleShowWebView = () => {
    GlobalService.showWebView('https://google.com', 'Google');
  };

  const handleShowToast = (type) => {
    const messages = {
      info: 'Đây là thông tin',
      success: 'Thành công!',
      error: 'Có lỗi xảy ra!',
      warning: 'Cảnh báo!',
    };

    GlobalService.showToast({
      message: messages[type],
      type,
      duration: 3000,
    });
  };

  const handleShowBottomSheet = () => {
    GlobalService.showBottomSheet({
      title: 'Chọn hành động',
      height: 250,
      content: (
        <View>
          <Button
            title="Tùy chọn 1"
            onPress={() => {
              GlobalService.hideBottomSheet();
              GlobalService.showToast({ message: 'Đã chọn tùy chọn 1', type: 'info' });
            }}
          />
          <View style={{ height: 10 }} />
          <Button
            title="Tùy chọn 2"
            onPress={() => {
              GlobalService.hideBottomSheet();
              GlobalService.showToast({ message: 'Đã chọn tùy chọn 2', type: 'info' });
            }}
          />
          <View style={{ height: 10 }} />
          <Button title="Đóng" onPress={() => GlobalService.hideBottomSheet()} color="#FF3B30" />
        </View>
      ),
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>🎉 Demo Global Services</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading</Text>
        <Button title="Hiển thị Loading" onPress={handleShowLoading} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alert</Text>
        <Button title="Hiển thị Alert" onPress={handleShowAlert} />
        <View style={{ height: 10 }} />
        <Button title="Hiển thị Confirm" onPress={handleShowConfirm} color="#FF9500" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toast Notifications</Text>
        <Button title="Info Toast" onPress={() => handleShowToast('info')} />
        <View style={{ height: 10 }} />
        <Button title="Success Toast" onPress={() => handleShowToast('success')} color="#34C759" />
        <View style={{ height: 10 }} />
        <Button title="Error Toast" onPress={() => handleShowToast('error')} color="#FF3B30" />
        <View style={{ height: 10 }} />
        <Button title="Warning Toast" onPress={() => handleShowToast('warning')} color="#FF9500" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bottom Sheet</Text>
        <Button title="Mở Bottom Sheet" onPress={handleShowBottomSheet} color="#5856D6" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WebView</Text>
        <Button title="Mở Google" onPress={handleShowWebView} color="#34C759" />
      </View>

      {/* PHẦN MỚI: Navigation đến màn hình không có Tab */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⭐ Navigation (Không có Tab)</Text>
        <Button 
          title="Mở màn Chi tiết" 
          onPress={() => navigation.navigate('Detail', { 
            itemId: 123, 
            itemName: 'Sản phẩm A' 
          })}
          color="#5856D6"
        />
        <View style={{ height: 10 }} />
        <Button 
          title="Mở màn Thông báo" 
          onPress={() => navigation.navigate('Notification')}
          color="#FF9500"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
});