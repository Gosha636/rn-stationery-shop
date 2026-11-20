import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, TextInputProps } from 'react-native';

export default function PasswordInput(props: TextInputProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        secureTextEntry={hidden}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity onPress={() => setHidden((h) => !h)}>
        <Text style={styles.toggle}>{hidden ? 'Показать' : 'Скрыть'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: { flex: 1, paddingVertical: 12 },
  toggle: { color: '#2563eb', marginLeft: 8 },
});