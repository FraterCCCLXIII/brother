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
    <View style={{ marginBottom: 20 }}>
      <Text style={{ 
        color: '#000000', 
        fontSize: 16, 
        fontWeight: '600', 
        marginBottom: 8,
        paddingHorizontal: 4,
      }}>
        {label}
        {required && <Text style={{ color: '#DC3545' }}> *</Text>}
      </Text>
      <TextInput
        style={{
          backgroundColor: '#F8F9FA',
          borderWidth: 1,
          borderColor: error ? '#DC3545' : '#E9ECEF',
          borderRadius: 16,
          paddingHorizontal: 20,
          paddingVertical: 16,
          color: '#000000',
          fontSize: 16,
          minHeight: 56,
        }}
        placeholderTextColor="#6C757D"
        accessibilityLabel={label}
        accessibilityRole="text"
        {...inputProps}
      />
      {error && (
        <Text style={{ 
          color: '#DC3545', 
          fontSize: 14, 
          marginTop: 8,
          paddingHorizontal: 4,
        }}>
          {error}
        </Text>
      )}
    </View>
  );
};
