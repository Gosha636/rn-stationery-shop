import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useCartStore, selectCartCount } from '../stores/cartStore';

interface Props {
  onPress: () => void;
}

export default function HeaderCartButton({ onPress }: Props) {
  const count = useCartStore(selectCartCount);
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>🛒 {count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingHorizontal: 8, paddingVertical: 4 },
  text: { fontSize: 16, color: '#00897b', fontWeight: '600' },
});