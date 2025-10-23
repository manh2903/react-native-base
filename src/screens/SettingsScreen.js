import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import GlobalService from '@services/GlobalService';

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông báo</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Push Notifications</Text>
          <Switch
            value={pushEnabled}
            onValueChange={(value) => {
              setPushEnabled(value);
              GlobalService.showToast({
                message: value ? 'Đã bật thông báo' : 'Đã tắt thông báo',
                type: value ? 'success' : 'info',
              });
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Giao diện</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Chế độ tối</Text>
          <Switch
            value={darkMode}
            onValueChange={(value) => {
              setDarkMode(value);
              GlobalService.showToast({
                message: 'Chức năng đang phát triển',
                type: 'info',
              });
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Về ứng dụng</Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            GlobalService.showAlert({
              title: 'Về ứng dụng',
              message: 'Expo RN Template\nVersion 1.0.0\n\n© 2025 Your Company',
              type: 'info',
            });
          }}
        >
          <Text style={styles.settingText}>Phiên bản</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            GlobalService.showWebView('https://github.com', 'GitHub');
          }}
        >
          <Text style={styles.settingText}>Mã nguồn</Text>
          <Text style={styles.settingValue}>GitHub →</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.dangerButton}
        onPress={() => {
          GlobalService.showAlert({
            title: 'Xóa dữ liệu',
            message: 'Bạn có chắc chắn muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác.',
            type: 'error',
            buttons: [
              { text: 'Hủy', style: 'cancel' },
              {
                text: 'Xóa',
                onPress: () => {
                  GlobalService.showLoading('Đang xóa dữ liệu...');
                  setTimeout(() => {
                    GlobalService.hideLoading();
                    GlobalService.showToast({
                      message: 'Đã xóa tất cả dữ liệu',
                      type: 'success',
                    });
                  }, 2000);
                },
              },
            ],
          });
        }}
      >
        <Text style={styles.dangerButtonText}>Xóa tất cả dữ liệu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
  dangerButton: {
    backgroundColor: 'white',
    marginTop: 30,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  dangerButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});