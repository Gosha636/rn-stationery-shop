import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import DrugListScreen from '../screens/DrugListScreen';
import DrugDetailsScreen from '../screens/DrugDetailsScreen';
import CartScreen from '../screens/CartScreen';
import HeaderCartButton from '../components/HeaderCartButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#00897b',
        headerTitleStyle: { color: '#000' },
      }}
    >
      <Stack.Screen
        name="DrugList"
        component={DrugListScreen}
        options={({ navigation }) => ({
          title: 'Аптека',
          headerRight: () => (
            <HeaderCartButton onPress={() => navigation.navigate('Cart')} />
          ),
        })}
      />
      <Stack.Screen
        name="DrugDetails"
        component={DrugDetailsScreen}
        options={{ title: 'О препарате' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Корзина' }}
      />
    </Stack.Navigator>
  );
}