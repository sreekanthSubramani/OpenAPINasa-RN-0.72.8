import { GoogleSignin } from "@react-native-google-signin/google-signin";

export function configureGoogleSignin(){
    GoogleSignin.configure({
        webClientId : "11726429302-ab076phcqnh6kr2odmvib3vipp3uc504.apps.googleusercontent.com",
        iosClientId : "11726429302-guvbs0jcdq48soin0f01fidbnotr29lj.apps.googleusercontent.com",
        offlineAccess : true
    })
}