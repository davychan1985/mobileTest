import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import orderDataManager from '../../src/dataManager/dataManager';
import { ShippingOrder, VoyageSegment } from '../../src/types';

const ShippingOrderScreen = () => {
  const [orderInfo, setOrderInfo] = useState<ShippingOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 组件挂载时获取数据并订阅更新
  useEffect(() => {
    const unsubscribe = orderDataManager.subscribeToUpdates(data => {
      setOrderInfo(data);
      setIsLoading(false);
      console.log('获取到的订单数据:', data);
    });

    // 初始获取数据
    orderDataManager.getOrderData();

    // 组件卸载时取消订阅
    return () => unsubscribe();
  }, []);

  // 手动刷新数据
  const handleDataRefresh = async () => {
    setIsLoading(true);
    await orderDataManager.refreshData();
    setIsLoading(false);
  };

  // 格式化过期时间（时间戳转本地时间）
  const formatExpiryDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString();
  };

  // 渲染单个航段
  const renderSegmentItem = ({ item }: { item: VoyageSegment }) => {
    const { origin, destination } = item.originAndDestinationPair;
    return (
      <View style={styles.segmentCard}>
        <Text style={styles.segmentId}>航段 {item.id}</Text>
        <View style={styles.routeContainer}>
          <View>
            <Text style={styles.locationCode}>{origin.code}</Text>
            <Text style={styles.locationName}>{origin.displayName}</Text>
            <Text style={styles.locationCity}>{item.originAndDestinationPair.originCity}</Text>
          </View>
          
          <View style={styles.arrowWrapper}>
            <Text style={styles.arrowSymbol}>→</Text>
          </View>
          
          <View>
            <Text style={styles.locationCode}>{destination.code}</Text>
            <Text style={styles.locationName}>{destination.displayName}</Text>
            <Text style={styles.locationCity}>{item.originAndDestinationPair.destinationCity}</Text>
          </View>
        </View>
      </View>
    );
  };

  // 加载中状态
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>正在加载订单数据...</Text>
      </View>
    );
  }

  // 无数据状态
  if (!orderInfo) {
    return (
      <View style={styles.container}>
        <Text>暂无订单数据</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={handleDataRefresh}>
          <Text>刷新数据</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 正常展示订单信息
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.pageTitle}>订单详情</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={handleDataRefresh}>
          <Text>刷新数据</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.orderInfoCard}>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>订单编号: </Text>
          {orderInfo.shipReference}
        </Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>过期时间: </Text>
          {formatExpiryDate(orderInfo.expiryTime)}
        </Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>行程时长: </Text>
          {orderInfo.duration} 分钟
        </Text>
        <Text style={styles.infoItem}>
          <Text style={styles.infoLabel}>是否可检票: </Text>
          {orderInfo.canIssueTicketChecking ? '是' : '否'}
        </Text>
      </View>
      
      <View style={styles.segmentsSection}>
        <Text style={styles.sectionTitle}>航段信息</Text>
        <FlatList
          data={orderInfo.segments}
          renderItem={renderSegmentItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  refreshBtn: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  orderInfoCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoItem: {
    marginBottom: 8,
    fontSize: 14,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  segmentsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  segmentCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  segmentId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#666',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationCode: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationName: {
    fontSize: 14,
    color: '#333',
  },
  locationCity: {
    fontSize: 12,
    color: '#666',
  },
  arrowWrapper: {
    padding: 0,
  },
  arrowSymbol: {
    fontSize: 24,
    color: '#999',
  },
});

export default ShippingOrderScreen;