import { Platform, Rationale } from 'react-native';
import { PERMISSIONS, Permission } from 'react-native-permissions';

/**
 * Configuration for OS permission requests.
 * Maps application-specific permission types to platform-specific permission constants.
 * Defines rationales for user transparency.
 */

export enum AppPermissionType {
  LOCATION = 'LOCATION',
  CAMERA = 'CAMERA',
  PHOTO_LIBRARY = 'PHOTO_LIBRARY',
  NOTIFICATIONS = 'NOTIFICATIONS'
}

interface PermissionDefinition {
  permission: Permission;
  rationale?: Rationale;
  mandatory: boolean;
}

type PlatformPermissionMap = Record<AppPermissionType, PermissionDefinition>;

const IOS_PERMISSIONS: PlatformPermissionMap = {
  [AppPermissionType.LOCATION]: {
    permission: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, // Upgraded to ALWAYS via background modes if needed
    rationale: {
      title: 'Location Access Required',
      message: 'WarrantyHub needs your location to enable Travel Mode and share your ETA with customers.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
    mandatory: true,
  },
  [AppPermissionType.CAMERA]: {
    permission: PERMISSIONS.IOS.CAMERA,
    rationale: {
      title: 'Camera Access Required',
      message: 'Camera access is needed to scan QR codes for product registration and upload invoice photos.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
    mandatory: false,
  },
  [AppPermissionType.PHOTO_LIBRARY]: {
    permission: PERMISSIONS.IOS.PHOTO_LIBRARY,
    rationale: {
      title: 'Photo Library Access',
      message: 'Access is needed to upload existing invoice images or screenshots.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
    mandatory: false,
  },
  [AppPermissionType.NOTIFICATIONS]: {
    permission: PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY, // Placeholder, usually handled by push lib
    mandatory: true,
  },
};

const ANDROID_PERMISSIONS: PlatformPermissionMap = {
  [AppPermissionType.LOCATION]: {
    permission: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    rationale: {
      title: 'Location Access Required',
      message: 'WarrantyHub needs your location to enable Travel Mode and share your ETA with customers.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
    mandatory: true,
  },
  [AppPermissionType.CAMERA]: {
    permission: PERMISSIONS.ANDROID.CAMERA,
    rationale: {
      title: 'Camera Access Required',
      message: 'Camera access is needed to scan QR codes for product registration and upload invoice photos.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
    mandatory: false,
  },
  [AppPermissionType.PHOTO_LIBRARY]: {
    permission: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, // Android 13+
    rationale: {
      title: 'Photo Library Access',
      message: 'Access is needed to upload existing invoice images or screenshots.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
    mandatory: false,
  },
  [AppPermissionType.NOTIFICATIONS]: {
    permission: PERMISSIONS.ANDROID.POST_NOTIFICATIONS, // Android 13+
    rationale: {
      title: 'Notifications Required',
      message: 'We need to send you alerts about service requests and status updates.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
    mandatory: true,
  },
};

/**
 * Returns the platform-specific permission configuration for a given intent.
 * @param type The application permission type
 */
export const getPermissionConfig = (type: AppPermissionType): PermissionDefinition => {
  return Platform.select({
    ios: IOS_PERMISSIONS[type],
    android: ANDROID_PERMISSIONS[type],
    default: ANDROID_PERMISSIONS[type],
  });
};