import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [textColor, setTextColor] = useState('#f35');

  const colorInterval = useRef<NodeJS.Timeout | null>(null);

  const generateColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;

  const handlePress = () => {
    setBackgroundColor(generateColor());
    setTextColor(generateColor());
  };

  const startColorAnimation = () => {
    if (!colorInterval.current) {
      colorInterval.current = setInterval(() => {
        setBackgroundColor(generateColor());
        setTextColor(generateColor());
      }, 300);
    }
  };

  const stopColorAnimation = () => {
    if (colorInterval.current) {
      clearInterval(colorInterval.current);
      colorInterval.current = null;
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={startColorAnimation}
      onPressOut={stopColorAnimation}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>Hello there</Text>
      <StatusBar style="auto" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
