import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { IconProps } from './IconProps';

/**
 * Icon component wrapper for vector icons
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000000',
  family = 'Ionicons',
  style,
  testID,
}) => {
  const iconProps = {
    name,
    size,
    color,
    style,
    testID,
  };

  switch (family) {
    case 'MaterialIcons':
      return <MaterialIcons {...iconProps} />;
    case 'FontAwesome':
      return <FontAwesome {...iconProps} />;
    case 'Ionicons':
    default:
      return <Ionicons {...iconProps} />;
  }
};

Icon.displayName = 'Icon';
