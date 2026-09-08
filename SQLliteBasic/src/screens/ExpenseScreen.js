import { View, Text, StyleSheet, Pressable, FlatList, Alert, Platform, StatusBar,TextInput } from 'react-native';
import {useSQLiteContext} from 'expo-sqlite'
import {listExpenses, addExpense, totalExpense,deleteExpense} from '../db/db';
import { useState, useEffect} from 'react';

const COLORS = {
    bg: '#0D1117',
    card: '#161B22',
    border: '#30363D',
    text: '#E6EDF3',
    dim: '#8B949E',
    cyan: '#61DAFB',
    red: '#F85149',
}

const TOP = Platform.select({
  ios: 56,
  android: (StatusBar.currentHeight ?? 24) + 10,
  default: 24,
});

const ExpenseScreen = () => {
    const db = useSQLiteContext()

    const [item, setItem] = useState([])
    const [total , setTotal] = useState(0)
    const [title , setTitle] = useState('')
    const [amount , setAmount] = useState(0)

    async function reload() {
        setItem(await listExpenses(db))
        setTotal(await totalExpense(db))
    }

    useEffect(() => {
        reload()
    }, [])

  async function handleAdd() {
    if (!title.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อรายการ');
      return;
    }

    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกจำนวนเงินให้ถูกต้อง');
      return;
    }

    await addExpense(db, title.trim(), value);
    setTitle('');
    setAmount('');
    await reload();
  }

    return (
        <View>
            <Text style ={styles.heading}> บันทึกรายรับ รายจ่าย </Text>
            <Text style = {styles.total}> รวม {total} บาท </Text>
            <View style = {styles.form}>
                <TextInput 
                    style = {[styles.input, {flex:2}]}
                    value = {title}
                    onChangeText={setTitle}
                    placeholder= 'รายการ'
                    placeholderTextColor={COLORS.dim}
                />
                <TextInput 
                    style = {[styles.input, {flex:1}]}
                    value = {amount}
                    onChangeText={setAmount}
                    placeholder= 'บาท'
                    placeholderTextColor={COLORS.dim}
                />
                <Pressable style = {styles.addButton} onPress={handleAdd}>
                    <Text style = {styles.addButton}> เพิ่ม </Text>
                </Pressable>

                <FlatList 
                    data = {item}
                    keyExtractor = {(item) => String(item.id)}
                    renderItem = {({item}) => (
                        <Pressable style = {styles.row} >
                            <View style = {{flex: 1}}>
                                <Text style = {styles.rowTitle}> {item.title} </Text>
                                <Text style = {styles.rowDate}> {item.spent_at} </Text>
                            </View>
                            <Text style = {styles.rowAmount}> {item.amount} </Text>                                
                        </Pressable>
                    )}
                />

            </View>
        </View>
    )
}

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        paddingTop: TOP,
        paddingHorizontal: 20,
        },
        heading: { color: COLORS.text, fontSize: 26, fontWeight: '800' },
        total: { color: COLORS.cyan, fontSize: 18, fontWeight: '700', marginTop: 4 },
        form: { flexDirection: 'row', gap: 8, marginTop: 16, marginBottom: 14 },
        input: {
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 11,
        color: COLORS.text,
        fontSize: 15,
        },
        addButton: {
        backgroundColor: COLORS.cyan,
        borderRadius: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        },
        addText: { color: COLORS.bg, fontSize: 15, fontWeight: '700' },
        row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        padding: 14,
        marginBottom: 8,
        },
        rowTitle: { color: COLORS.text, fontSize: 16 },
        rowDate: { color: COLORS.dim, fontSize: 12, marginTop: 2 },
        rowAmount: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
        empty: { color: COLORS.dim, textAlign: 'center', marginTop: 40, fontSize: 15 },
        hint: {
        color: COLORS.dim,
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 10,
        },
    });
    
export default ExpenseScreen