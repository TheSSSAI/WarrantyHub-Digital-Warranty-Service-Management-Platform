import { registerAs } from '@nestjs/config';

export default registerAs('serviceBus', () => ({
  connectionString: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
  topics: {
    serviceRequests: process.env.SB_TOPIC_SERVICE_REQUESTS || 'service-requests',
    products: process.env.SB_TOPIC_PRODUCTS || 'products',
    chat: process.env.SB_TOPIC_CHAT || 'chat',
  },
  subscriptions: {
    notificationServiceRequestSub: process.env.SB_SUB_NOTIFICATION_SR || 'notification-service-sr-sub',
    notificationProductSub: process.env.SB_SUB_NOTIFICATION_PRODUCT || 'notification-service-product-sub',
    notificationChatSub: process.env.SB_SUB_NOTIFICATION_CHAT || 'notification-service-chat-sub',
  },
  prefetchCount: parseInt(process.env.SB_PREFETCH_COUNT, 10) || 10,
  maxConcurrentCalls: parseInt(process.env.SB_MAX_CONCURRENT_CALLS, 10) || 10,
}));