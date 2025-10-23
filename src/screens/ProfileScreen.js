import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GlobalService from '@services/GlobalService';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nguyễn Văn A</Text>
        <Text style={styles.email}>nguyenvana@example.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            GlobalService.showToast({
              message: 'Chức năng đang phát triển',
              type: 'info',
            });
          }}
        >
          <Text style={styles.menuText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            GlobalService.showAlert({
              title: 'Đăng xuất',
              message: 'Bạn có chắc chắn muốn đăng xuất?',
              type: 'warning',
              buttons: [
                { text: 'Hủy', style: 'cancel' },
                {
                  text: 'Đăng xuất',
                  onPress: () => {
                    GlobalService.showLoading('Đang đăng xuất...');
                    setTimeout(() => {
                      GlobalService.hideLoading();
                      GlobalService.showToast({
                        message: 'Đã đăng xuất thành công',
                        type: 'success',
                      });
                    }, 1500);
                  },
                },
              ],
            });
          }}
        >
          <Text style={[styles.menuText, { color: '#FF3B30' }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  menu: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});