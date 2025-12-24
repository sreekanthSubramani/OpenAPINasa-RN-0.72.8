import {createContext, useState, useEffect} from 'react'
import {SecureKeychain} from '../src/config/secureStorage'


export const UseAuthContext = createContext(null)


export function AuthProvider({children} : any){

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)


    useEffect(()=>{
        async function restoreAuth(){ 
            const getAuth = await SecureKeychain.getAccessToken()
            if(getAuth){
              setIsAuthenticated(true)   
            }
            setAuthLoading(false)
        }
        restoreAuth()
    },[])

  const login = async (accessToken: string, refreshToken?: string) => {
    await SecureKeychain.saveAccessToken(accessToken);
    if (refreshToken) {
      await SecureKeychain.saveRefreshToken(refreshToken);
    }
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureKeychain.removeAll();
    setIsAuthenticated(false);
  };




    return(
        <UseAuthContext.Provider value={{isAuthenticated, authLoading, login, logout}}>
                {children}
        </UseAuthContext.Provider>
    )
} 