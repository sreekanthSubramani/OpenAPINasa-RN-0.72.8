import Toast from "react-native-toast-message";
import type {SuccessMessage} from '../Types/component-types'

export const successToast :SuccessMessage = (text1, text2) =>{
    Toast.show({
        type : "success",
        text1 : text1,
        text2 : text2
    })
}