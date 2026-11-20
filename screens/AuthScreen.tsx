import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { usePreventScreenCapture } from 'expo-screen-capture';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import PasswordInput from '../components/PasswordInput';

WebBrowser.maybeCompleteAuthSession();

const GITHUB_CLIENT_ID = 'Ov23liEq0F7X9IN0BQtZ';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
};

const FAKE_LOGIN = 'admin';
const FAKE_PASSWORD = '12345';

type Props = { onLogin: () => void };

export default function AuthScreen({ onLogin }: Props) {
  usePreventScreenCapture(); 

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const redirectUri = makeRedirectUri({ scheme: 'stationeryshop' });

  const [request, response, promptAsync] = useAuthRequest(
    { clientId: GITHUB_CLIENT_ID, scopes: ['read:user'], redirectUri },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      onLogin();
    }
  }, [response]);

  const handleLogin = () => {
    if (login === FAKE_LOGIN && password === FAKE_PASSWORD) {
      onLogin();
    } else {
      Alert.alert('Ошибка', 'Неверный логин или пароль');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <TextInput
        style={styles.input}
        placeholder="Логин"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />
      <PasswordInput placeholder="Пароль" value={password} onChangeText={setPassword} />
      <View style={styles.gap} />
      <Button title="Войти" onPress={handleLogin} />
      <View style={styles.gap} />
      <Button title="Войти через GitHub" disabled={!request} onPress={() => promptAsync()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  gap: { height: 12 },
});