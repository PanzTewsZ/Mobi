import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = 'todo_basic:items';

export async function loadTodo() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw != null ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('loadTodos ล้มเหลว', e);
    return [];
  }
}

export async function saveTodos(todos) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(todos));
    return true;
  } catch (e) {
    console.warn('saveTodos ล้มเหลว', e);
    return false;
  }
}

export async function clearTodos() {
  try {
    await AsyncStorage.removeItem(KEY);
    return true;
  } catch (e) {
    console.warn('clearTodos ล้มเหลว', e);
    return false;
  }
}

export async function debugDump() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (!keys.length) return [];
    return await AsyncStorage.multiGet(keys);
  } catch (e) {
    console.warn('debugDump ล้มเหลว', e);
    return [];
  }
}