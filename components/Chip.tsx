import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ label, selected, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: selected ? '#000000' : '#F8F9FA',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: selected ? '#000000' : '#E9ECEF',
        marginBottom: 8,
        marginRight: 8,
        opacity: disabled ? 0.5 : 1,
      }}
      activeOpacity={0.7}
    >
      <Text style={{
        color: selected ? '#FFFFFF' : '#000000',
        fontSize: 14,
        fontWeight: selected ? '600' : '500',
        textAlign: 'left',
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
