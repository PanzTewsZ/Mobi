import { View, Text, TextInput } from 'react-native';
import { styles } from '../styles/fieldStyles';
import { colors } from '../styles/theme';

export default function Field({label, style, error, hint, ...inputProps}) {
    return (
        <View style = {[styles.container, style]}>
            <Text style =  {styles.label}> {label} </Text>
            
            <TextInput 
                style = {styles.input}
                placeholderTextColor={colors.dim}
                {...inputProps} //อะไรก็ตามที่อยู่ใน TextInput ก็จะถูกส่งมา
            />
        </View>
    )
}   