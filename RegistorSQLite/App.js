import { StatusBar, Text, View } from 'react-native';
import {SQLiteProvider} from 'expo-sqlite';
import {DATABASE_NAME, initDb} from './src/db/database';
import { colors } from './src/styles/theme';
import RegistorScreen from './src/screens/RegistorScreen';
import { styles } from './src/styles/appStyles';

export default function App() {
  return (
    <>
      <SQLiteProvider databaseName = {DATABASE_NAME} inInit = {initDb}>
        <StatusBar barStyle = 'light-content' backgroundColor={colors.bg}/>
        <View style = {styles.container}>
          <View style = {styles.header}>
            <Text style = {styles.title}> ระบบลงทะเบียนนิสิต </Text>
          </View>
          <RegistorScreen />
        </View>
      </SQLiteProvider>
    </>
  );
}

