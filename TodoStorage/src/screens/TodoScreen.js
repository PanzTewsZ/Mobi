import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { TOP_INSET } from '../constants/layout';
import { COLORS } from '../constants/colors';
import { useState, useEffect } from 'react';
import { loadTodo, saveTodos, clearTodos, debugDump } from '../utils/storage';


const TodoScreen = () => {
  const [Todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await loadTodo();
      setTodos(saved);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) saveTodos(Todos);
  }, [Todos, loading]);

  const addTodo = () => {
    const trimed = text.trim();
    if (trimed.length === 0) return;
    setTodos((prev) => [
      { id: Date.now().toString(), text: trimed, done: false },
      ...prev,
    ]);
    setText('');
  };

  const toggleTodo = (id) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const handleClear = () => {
    Alert.alert('ล้างทั้งหมด', 'ลบรายการทั้งหมดและกู้คืนไม่ได้', [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ล้าง',
        style: 'destructive',
        onPress: async () => {
          await clearTodos();
          setTodos([]);
        },
      },
    ]);
  };

  const handleDebug = async () => {
    const pairs = await debugDump();
    const body = pairs.length ? 
    pairs.map(([key, value]) => `${key}\n${String(value ?? '').slice(0, 80)}`).join('\n\n')
    : 'ยังไม่มีข้อมูลในเครื่อง';
    Alert.alert('ข้อมูลใน AsyncStorage', body);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.cyan} />
        <Text style={styles.loadingText}>กำลังอ่านข้อมูลจากเครื่อง...</Text>
      </View>
    );
  }

  const remainings = Todos.filter((t)=>!t.done).length

  return (
    <View style={styles.container}>
      <Text style={styles.title}>สิ่งที่ต้องทำ [{remainings}/{Todos.length}]</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
          placeholder="เพิ่มสิ่งที่ต้องทำ"
          placeholderTextColor={COLORS.textDim}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addText}>เพิ่ม</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => toggleTodo(item.id)}
            onLongPress={() => removeTodo(item.id)}
          >
            <Text style={[styles.itemText, item.done && styles.itemDone]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.item} onPress={handleDebug}>
        <Text style={[styles.itemText, { color: COLORS.cyan }]}>
          ดูข้อมูลที่เก็บไว้
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={handleClear}>
        <Text style={[styles.itemText, { color: COLORS.red }]}>
          ล้างทั้งหมด
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: TOP_INSET,
    paddingHorizontal: 20,
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
    gap: 12
  },
  loadingText: {
    color: COLORS.text, fontSize: 28, fontWeight: '800', marginBottom: 16
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.text,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: COLORS.cyan,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  itemText: {
    color: COLORS.text,
    fontSize: 16,
  },
  itemDone: {
    color: COLORS.textDim,
    textDecorationLine: 'line-through',
  },
  addText: {
  color: COLORS.text,
  fontSize: 16,
  fontWeight: '700',
},

});


export default TodoScreen