import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import GlobalService from '@services/GlobalService';
import CustomButton from '@components/CustomButton';

export default function DetailScreen({ navigation, route }) {
  // Nhận params từ màn hình trước (nếu có)
  const { itemId, itemName } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Màn hình Chi tiết</Text>
      
      {itemId && (
        <View style={styles.infoBox}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{itemId}</Text>
        </View>
      )}
      
      {itemName && (
        <View style={styles.infoBox}>
          <Text style={styles.label}>Tên:</Text>
          <Text style={styles.value}>{itemName}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Quay lại"
          onPress={() => navigation.goBack()}
        />
        
        <View style={{ height: 15 }} />
        
        <CustomButton
          title="Mở Notification"
          onPress={() => navigation.navigate('Notification')}
          color="#FF9500"
        />
        
        <View style={{ height: 15 }} />
        
        <CustomButton
          title="Về Home (Tab)"
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
          color="#34C759"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 30,
  },
});