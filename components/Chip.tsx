import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  selected = false, 
  onPress, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`
        px-3 py-2 rounded-full mr-2 mb-2
        ${selected 
          ? 'bg-black' 
          : 'bg-gray-200 border border-gray-300'
        }
        ${disabled ? 'opacity-50' : ''}
      `}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
    >
      <Text 
        className={`
          text-sm font-medium
          ${selected ? 'text-white' : 'text-black'}
        `}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
