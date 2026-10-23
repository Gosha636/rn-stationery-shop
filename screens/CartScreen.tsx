import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  useCartStore,
  useCartLines,
  selectCartCount,
} from '../stores/cartStore';
import { CartItem } from '../components/CartItem';

export default function CartScreen() {
  const lines = useCartLines();
  const count = useCartStore(selectCartCount);
  const clear = useCartStore((s) => s.clear);

  if (lines.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Корзина пуста</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lines}
        keyExtractor={(l) => l.drug.id}
        renderItem={({ item }) => <CartItem line={item} />}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Позиций: {count}</Text>
        <Pressable style={styles.clearBtn} onPress={clear}>
          <Text style={styles.clearText}>Очистить</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { color: '#888', fontSize: 16 },
  list: { paddingVertical: 8 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  total: { fontSize: 16, fontWeight: '600' },
  clearBtn: { paddingHorizontal: 12, paddingVertical: 8 },
  clearText: { color: '#c62828', fontWeight: '600' },
});