import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import TodoScreen from './src/screens/TodoScreen';
import { COLORS } from './src/constants/colors'; 

export default function App() {
  return (
    <>
      <StatusBar style='light-content' background={COLORS.bg}/>
      <TodoScreen/>
    </>
  );
}

