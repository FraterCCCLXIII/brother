import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  required = false,
  ...inputProps 
}) => {
  return (
    <View className="mb-4">
      <Text className="text-text text-sm font-medium mb-2">
        {label}
        {required && <Text className="text-danger"> *</Text>}
      </Text>
      <TextInput
        className={`
          bg-card border rounded-2xl px-4 py-3 text-text text-base
          ${error ? 'border-danger' : 'border-gray-600'}
        `}
        placeholderTextColor="#A1A1AA"
        accessibilityLabel={label}
        accessibilityRole="text"
        {...inputProps}
      />
      {error && (
        <Text className="text-danger text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};
