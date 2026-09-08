import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import Field from "../components/Field";
import { styles } from "../styles/registerStyles";

const EMPTY_FORM = {
    name: '',
    surname: '',
    studentId: '',
    username: '',
    password: '',
    comfirm: ''
}

const RegistorScreen = () => {
    //const [name, setName] =useState('') แบบปกติ

    const [form, setForm] = useState([])
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState('')

    const handleSubmit = () => {
        console.log("กด summit เเล้ว")
    }
    
    return(
        <KeyboardAvoidingView 
            style= {{flex: 1}}
            behavior= {Platform.OS === 'ios' ? 'padding' : undefined}
        > 
            <ScrollView 
                contentContainerStyle = {styles.content}
                keyboardShouldPersistTaps = 'handled'    
            > 
                <Text style = {styles.intro}>
                    กรอกข้อมูลให้ครบทุกช่อง
                </Text>
                <View style = {styles.row}>
                    <Field 
                        style={styles.half} label="ชื่อ "
                        placeholder = "สมชาย"
                    />
                    <Field 
                        style={styles.half} label="นามสกุล"
                        placeholder = "ใจดี"
                    />
                </View>
                <Field
                    label = "รหัสนิสิต"
                    placeholder = "6721601401"
                />
                <Field 
                    label = "ชื่อผู้ใช้"
                    placeholder = "Somchai_J"
                />
                <Field 
                    label = "รหัสผ่าน"
                    placeholder = "อย่างน้อย 8 ตัวอักษร"
                    maxlength
                    secureTextEntry
                    autoCopitalize = "none"
                />
                <Field 
                    label = "ยืนยันรหัสผ่าน"
                    placeholder = "พิมพ์รหัสผ่านอีกรั้ง"
                    secureTextEntry
                    autoCopitalize = "none"
                />

                
                <Pressable style = {styles.submit} onPress={handleSubmit}>
                    <Text style = {styles.submitText}> ลงทะเบียน </Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegistorScreen