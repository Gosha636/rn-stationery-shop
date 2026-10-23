import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchDrugById } from '../api/mockDrugsAPI';
import { Drug } from '../types/drug';
import { DrugDetailsCard } from '../components/DrugDetailsCard';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DrugDetails'>;

export default function DrugDetailsScreen({ route }: Props) {
  const { id } = route.params;
  const [drug, setDrug] = useState<Drug | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrugById(id)
      .then((d) => setDrug(d ?? null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00897b" />
      </View>
    );
  }

  if (!drug) return null;

  return (
    <ScrollView>
      <DrugDetailsCard drug={drug} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});