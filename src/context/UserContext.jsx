import {useContext, createContext } from "react";
import {useEffect,useState} from "react";
//firebase config 
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";


const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);

    // erste status False : Wenn die app mit unsuscribe gibt zurück null
    // zweite status False: wenn die useState false
    // dritte wenn die Object setUser
    
    useEffect(()=>{
        // console.log("useEffect ");
        const unsuscribe = onAuthStateChanged(auth, (user)=>{
            console.log(user);
            setUser(user);
        });
        return unsuscribe; //destructor 
    },[]);

    if(user === false) return <p>Loading app...</p>
    
    return (
        <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
    );
}
export const useUserContext = () => useContext(UserContext);
