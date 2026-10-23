import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Drug } from '../types/drug';
import { useCartStore } from '../stores/cartStore';

interface Props {
  drug: Drug;
}

export function DrugDetailsCard({ drug }: Props) {
  const add = useCartStore((s) => s.add);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{drug.name}</Text>
      <Text style={styles.latin}>{drug.latin_name}</Text>

      {drug.prescription_required && (
        <Text style={styles.rx}>Отпускается по рецепту</Text>
      )}

      <Row label="Действующее вещество" value={drug.active_substance} />
      <Row label="Категория" value={drug.category} />
      <Row label="Форма" value={drug.form} />
      <Row label="Дозировка" value={drug.dosage} />
      <Row label="Производитель" value={drug.manufacturer} />
      <Row label="Остаток" value={String(drug.stock)} />

      <Text style={styles.sectionTitle}>Описание</Text>
      <Text style={styles.description}>{drug.description}</Text>

      <Pressable style={styles.button} onPress={() => add(drug)}>
        <Text style={styles.buttonText}>Добавить в корзину</Text>
      </Pressable>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  name: { fontSize: 22, fontWeight: '700' },
  latin: { fontSize: 14, color: '#888', fontStyle: 'italic', marginBottom: 12 },
  rx: { color: '#c62828', fontWeight: '600', marginBottom: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  label: { color: '#666', flexShrink: 1 },
  value: { fontWeight: '500', flexShrink: 1, textAlign: 'right' },
  sectionTitle: { marginTop: 16, fontWeight: '600', fontSize: 16 },
  description: { marginTop: 6, color: '#333', lineHeight: 20 },
  button: {
    marginTop: 20,
    backgroundColor: '#00897b',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});