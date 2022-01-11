import { createContext, FC, useContext } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../firebase";
import { DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
interface IAuth {
  user: User | null | undefined;
  loading: boolean;
  extraInfo: DocumentData | undefined;
}

const AuthContext = createContext<IAuth>({
  user: null,
  loading: true,
  extraInfo: undefined,
});

const AuthProvider: FC = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [values, objectLoading, error] = useObjectVal(
    ref(db, `/users/${user ? user.uid : undefined}`)
  );
  return (
    <AuthContext.Provider
      value={{
        user,
        extraInfo: values,
        loading: loading || objectLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
