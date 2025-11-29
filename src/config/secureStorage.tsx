import * as KeyChain from 'react-native-keychain'


export const SecureKeychain = {

    saveAccessToken : async (data : string)=>{
        await KeyChain.setGenericPassword('access', data,
            {service : 'accesskey',
            accessible : KeyChain.ACCESSIBLE.WHEN_UNLOCKED
        })
    },
    saveRefreshToken : async( data : string)=>{
        await KeyChain.setGenericPassword('refresh', data,
            {service : 'refreshKey',
            accessible : KeyChain.ACCESSIBLE.WHEN_UNLOCKED
        })
    },
    getAccessToken : async ()=>{
        const cred = await KeyChain.getGenericPassword({service : "accesskey" })
        return cred ? cred.password : null

    },
    getRefreshToken : async ()=>{
        const refreshCred = await KeyChain.getGenericPassword({service : 'refreshKey'})
        return refreshCred ? refreshCred.password : null
    },
    removeAll : async ()=>{   
        await KeyChain.resetGenericPassword({service : "accesskey"})
        await KeyChain.resetGenericPassword({service : "refreshKey"})
    }
    
}

