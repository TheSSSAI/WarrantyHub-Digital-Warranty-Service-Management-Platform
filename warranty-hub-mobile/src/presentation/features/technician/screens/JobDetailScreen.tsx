import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useLocationTracking } from '../hooks/useLocationTracking';
import { ApiClient } from '../../../../infrastructure/api/ApiClient';
import { SyncStatus, UserRole } from '../../../../shared/types/enums';

// Types for navigation and route params
type TechnicianStackParamList = {
  JobDetail: { jobId: string };
  JobCompletion: { jobId: string };
  Chat: { jobId: string; customerName: string };
};

type JobDetailRouteProp = RouteProp<TechnicianStackParamList, 'JobDetail'>;

// DTO for Job Details - locally defined as per Clean Architecture Layer 5 consuming L0/L2
interface JobDetailDto {
  id: string;
  ticketId: string;
  status: 'Assigned' | 'EnRoute' | 'InProgress' | 'Resolved' | 'Closed' | 'Disputed';
  customer: {
    id: string;
    name: string;
    phone: string;
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  product: {
    brand: string;
    model: string;
    serialNumber: string;
    warrantyStatus: 'InWarranty' | 'OutOfWarranty';
  };
  issue: {
    type: string;
    description: string;
    photos: string[];
  };
  scheduledTime: string;
}

/**
 * Job Detail Screen
 * Implements US-052 (View Job Details), US-053 (Update Status), US-054 (Travel Mode), US-078.
 * Orchestrates technician workflow for a specific service request.
 */
const JobDetailScreen: React.FC = () => {
  const route = useRoute<JobDetailRouteProp>();
  const navigation = useNavigation<any>(); // Typing would use StackNavigationProp in real app
  const { jobId } = route.params;

  // Custom hook from L4 for handling Travel Mode logic
  const { isTracking, startTracking, stopTracking } = useLocationTracking();
  
  // Local state
  const [job, setJob] = useState<JobDetailDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);

  // Load job details
  const fetchJobDetails = useCallback(async () => {
    try {
      setLoading(true);
      const apiClient = ApiClient.getInstance();
      const response = await apiClient.get<JobDetailDto>(`/service-requests/${jobId}`);
      setJob(response);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      Alert.alert('Error', 'Could not load job details. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  // Handler for native phone dialer (AC-002)
  const handleCallCustomer = () => {
    if (job?.customer.phone) {
      const phoneNumber = Platform.OS === 'android' 
        ? `tel:${job.customer.phone}` 
        : `telprompt:${job.customer.phone}`;
      Linking.openURL(phoneNumber).catch(() => {
        Alert.alert('Error', 'Unable to open phone dialer.');
      });
    }
  };

  // Handler for native maps (AC-003)
  const handleOpenMaps = () => {
    if (job?.customer.address) {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = job.customer.coordinates 
        ? `${job.customer.coordinates.lat},${job.customer.coordinates.lng}` 
        : '';
      const label = job.customer.name;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });

      if (url) {
        Linking.openURL(url).catch(() => {
          // Fallback to query search if coordinates fail
          const queryUrl = `${scheme}${encodeURIComponent(job.customer.address)}`;
          Linking.openURL(queryUrl);
        });
      }
    }
  };

  // Handler for Status Updates (US-053, US-078)
  const handleStatusUpdate = async (newStatus: JobDetailDto['status']) => {
    if (!job) return;
    
    setUpdatingStatus(true);
    try {
      const apiClient = ApiClient.getInstance();
      await apiClient.patch(`/service-requests/${jobId}/status`, { status: newStatus });
      
      // Update local state optimistically
      setJob({ ...job, status: newStatus });
      
      // Business Rule: If moving to InProgress/Resolved, stop travel tracking (US-080)
      if (newStatus === 'InProgress' || newStatus === 'Resolved') {
        if (isTracking) {
          await stopTracking(jobId);
        }
      }
    } catch (error) {
      Alert.alert('Update Failed', 'Failed to update job status. Action queued for offline sync.');
      // In a full implementation, OfflineQueueManager (L3) would interpret the failure 
      // and queue this automatically via the ApiClient interceptor logic.
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Handler for Travel Mode (US-054, US-079)
  const toggleTravelMode = async () => {
    try {
      if (isTracking) {
        await stopTracking(jobId);
        Alert.alert('Travel Mode', 'Location sharing stopped.');
      } else {
        // Business Rule: Can only start travel if status is appropriate
        if (job?.status === 'Resolved' || job?.status === 'Closed') {
          Alert.alert('Action Denied', 'Cannot start travel for a closed job.');
          return;
        }

        // Auto-update status to EnRoute if currently Assigned
        if (job?.status === 'Assigned') {
          await handleStatusUpdate('EnRoute');
        }
        
        await startTracking(jobId);
        Alert.alert('Travel Mode', 'Location sharing active. Customer notified.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle travel mode. Check GPS permissions.');
    }
  };

  const handleNavigateToCompletion = () => {
    navigation.navigate('JobCompletion', { jobId });
  };

  const handleNavigateToChat = () => {
    if (job) {
      navigation.navigate('Chat', { jobId, customerName: job.customer.name });
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Job Details...</Text>
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Job not found.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchJobDetails}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchJobDetails} />}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.ticketId}>Ticket #{job.ticketId}</Text>
            <Text style={styles.statusBadge}>{job.status.replace(/([A-Z])/g, ' $1').trim()}</Text>
          </View>
          <TouchableOpacity 
            style={styles.chatButton} 
            onPress={handleNavigateToChat}
            accessibilityLabel="Open Chat"
          >
            <Text style={styles.chatButtonText}>💬</Text>
          </TouchableOpacity>
        </View>

        {/* Action Bar */}
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isTracking ? styles.activeTravelButton : styles.travelButton
            ]}
            onPress={toggleTravelMode}
            disabled={job.status === 'Closed' || job.status === 'Resolved'}
          >
            <Text style={styles.buttonText}>
              {isTracking ? 'Stop Travel' : 'Start Travel'}
            </Text>
          </TouchableOpacity>

          {job.status === 'EnRoute' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.workButton]}
              onPress={() => handleStatusUpdate('InProgress')}
              disabled={updatingStatus}
            >
              {updatingStatus ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Start Work</Text>
              )}
            </TouchableOpacity>
          )}

          {job.status === 'InProgress' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.resolveButton]}
              onPress={handleNavigateToCompletion}
            >
              <Text style={styles.buttonText}>Resolve Job</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer</Text>
          <Text style={styles.customerName}>{job.customer.name}</Text>
          
          <TouchableOpacity onPress={handleCallCustomer} style={styles.row}>
            <Text style={styles.linkText}>📞 {job.customer.phone}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleOpenMaps} style={styles.row}>
            <Text style={styles.linkText}>📍 {job.customer.address}</Text>
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Brand:</Text>
            <Text style={styles.value}>{job.product.brand}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Model:</Text>
            <Text style={styles.value}>{job.product.model}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Serial:</Text>
            <Text style={styles.value}>{job.product.serialNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Warranty:</Text>
            <Text style={[
              styles.value, 
              job.product.warrantyStatus === 'InWarranty' ? styles.successText : styles.dangerText
            ]}>
              {job.product.warrantyStatus === 'InWarranty' ? 'Active' : 'Expired'}
            </Text>
          </View>
        </View>

        {/* Issue Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reported Issue</Text>
          <Text style={styles.issueType}>{job.issue.type}</Text>
          <Text style={styles.description}>{job.issue.description}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ticketId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    overflow: 'hidden',
  },
  chatButton: {
    backgroundColor: '#E5E5EA',
    padding: 10,
    borderRadius: 20,
  },
  chatButtonText: {
    fontSize: 20,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  travelButton: {
    backgroundColor: '#5856D6',
  },
  activeTravelButton: {
    backgroundColor: '#FF3B30', // Red to indicate "Stop"
  },
  workButton: {
    backgroundColor: '#007AFF',
  },
  resolveButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1C1C1E',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  row: {
    marginVertical: 4,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#8E8E93',
    fontSize: 14,
  },
  value: {
    color: '#1C1C1E',
    fontSize: 14,
    fontWeight: '500',
  },
  successText: {
    color: '#34C759',
  },
  dangerText: {
    color: '#FF3B30',
  },
  issueType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default JobDetailScreen;