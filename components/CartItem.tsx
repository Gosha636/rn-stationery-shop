import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CartLine } from '../types/drug';
import { useCartStore } from '../stores/cartStore';

interface Props {
  line: CartLine;
}

export function CartItem({ line }: Props) {
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{line.drug.name}</Text>
        <Text style={styles.meta}>
          {line.drug.form} · {line.drug.dosage}
        </Text>
        {line.drug.prescription_required && (
          <Text style={styles.rx}>По рецепту</Text>
        )}
      </View>
      <View style={styles.controls}>
        <Pressable style={styles.step} onPress={() => decrement(line.drug.id)}>
          <Text style={styles.stepText}>−</Text>
        </Pressable>
        <Text style={styles.qty}>{line.quantity}</Text>
        <Pressable style={styles.step} onPress={() => increment(line.drug.id)}>
          <Text style={styles.stepText}>+</Text>
        </Pressable>
        <Pressable style={styles.remove} onPress={() => remove(line.drug.id)}>
          <Text style={styles.removeText}>✕</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: { flex: 1, marginRight: 12 },
  name: { fontSize: 15, fontWeight: '600' },
  meta: { color: '#666', fontSize: 12, marginTop: 2 },
  rx: { color: '#c62828', fontSize: 12, fontWeight: '600', marginTop: 2 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0f2f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: { fontSize: 18, color: '#00897b', fontWeight: '700' },
  qty: { marginHorizontal: 10, fontSize: 15, minWidth: 20, textAlign: 'center' },
  remove: { marginLeft: 10, padding: 6 },
  removeText: { color: '#c62828', fontSize: 16 },
});