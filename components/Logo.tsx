import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G, Text as SvgText, TSpan } from 'react-native-svg';

interface LogoProps {
  type: 'text' | 'icon' | 'circle';
  size?: number;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ type, size = 120, color = '#000000' }) => {
  if (type === 'text') {
    return (
      <Svg width={size * 2} height={size} viewBox="0 0 200 100">
        <G fill={color}>
          {/* Brother text logo - simplified version */}
          <Path d="M20 20 L40 20 L40 80 L20 80 Z" />
          <Path d="M50 20 L70 20 L70 80 L50 80 Z" />
          <Path d="M80 20 L100 20 L100 80 L80 80 Z" />
          <Path d="M110 20 L130 20 L130 80 L110 80 Z" />
          <Path d="M140 20 L160 20 L160 80 L140 80 Z" />
          <Path d="M170 20 L190 20 L190 80 L170 80 Z" />
        </G>
      </Svg>
    );
  }

  if (type === 'icon') {
    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <G fill={color}>
          {/* B logo - simplified version */}
          <Path d="M20 20 L60 20 L60 40 L40 40 L40 60 L60 60 L60 80 L20 80 Z" />
        </G>
      </Svg>
    );
  }

  if (type === 'circle') {
    return (
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <G fill={color}>
          {/* Circle with B inside */}
          <Path d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 Z" />
          <Path d="M30 25 L60 25 L60 40 L40 40 L40 55 L60 55 L60 70 L30 70 Z" fill="#FFFFFF" />
        </G>
      </Svg>
    );
  }

  return null;
};
