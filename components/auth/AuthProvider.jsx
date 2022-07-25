

/** @jsx h */
import { h, createContext } from "preact"
import { 
  useEffect, 
  useState, 
  useMemo 
} from "preact/hooks"

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const [user, setUser] = useState("Guest")
  const [userInfo, setUserInfo] = useState({})

  const auth = useMemo(() => {
    return { 
        user, setUser,
        userInfo, setUserInfo
    }
  }, [user])

  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  )
}