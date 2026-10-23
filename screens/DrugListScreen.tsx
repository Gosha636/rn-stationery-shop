import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchDrugs } from '../api/mockDrugsAPI';
import { Drug } from '../types/drug';
import { DrugListItem } from '../components/DrugListItem';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DrugList'>;

export default function DrugListScreen({ navigation }: Props) {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrugs()
      .then(setDrugs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00897b" />
      </View>
    );
  }

  return (
    <FlatList
      data={drugs}
      keyExtractor={(d) => d.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <DrugListItem
          drug={item}
          onPress={() => navigation.navigate('DrugDetails', { id: item.id })}
        />
      )}
      ListEmptyComponent={<Text style={styles.empty}>Нет лекарств</Text>}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingVertical: 8 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
});