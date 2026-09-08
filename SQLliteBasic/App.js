import { Suspense } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { DATABASE_NAME, initDb } from './src/db/db';
import ExpenseScreen from './src/screens/ExpenseScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      <Suspense fallback={<Loading />}>
        <SQLiteProvider databaseName={DATABASE_NAME} onInit={initDb} useSuspense>
          <ExpenseScreen />
        </SQLiteProvider>
      </Suspense>
    </>
  );
}

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#61DAFB" />
      <Text style={styles.text}>กำลังโหลดข้อมูล</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
