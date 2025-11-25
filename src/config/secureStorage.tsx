import * as KeyChain from 'react-native-keychain'


export const SecureKeychain = {
    save : async ( data : any )=>{
        await KeyChain.setGenericPassword('auth', JSON.stringify(data),
        {accessible : KeyChain.ACCESSIBLE.WHEN_UNLOCKED}
    )},
    get : async()=>{
        const cred = await KeyChain.getGenericPassword()
        return cred ? JSON.parse(cred.password) : null
    },

    remove : async () =>{
        await KeyChain.resetGenericPassword()
    }
}


