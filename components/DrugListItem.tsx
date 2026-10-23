import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Drug } from '../types/drug';
import { useCartStore } from '../stores/cartStore';

interface Props {
  drug: Drug;
  onPress: () => void;
}

export function DrugListItem({ drug, onPress }: Props) {
  const add = useCartStore((s) => s.add);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{drug.name}</Text>
        {drug.prescription_required && (
          <Text style={styles.rx}>По рецепту</Text>
        )}
      </View>
      <Text style={styles.meta}>
        {drug.form} · {drug.dosage}
      </Text>
      <Text style={styles.meta}>{drug.manufacturer}</Text>
      <View style={styles.footer}>
        <Text style={styles.stock}>В наличии: {drug.stock}</Text>
        <Pressable
          style={styles.button}
          onPress={(e) => {
            e.stopPropagation();
            add(drug);
          }}
        >
          <Text style={styles.buttonText}>В корзину</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '600', flexShrink: 1 },
  rx: { color: '#c62828', fontSize: 12, fontWeight: '600' },
  meta: { color: '#666', fontSize: 13, marginTop: 2 },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stock: { color: '#00897b', fontSize: 13 },
  button: {
    backgroundColor: '#00897b',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});