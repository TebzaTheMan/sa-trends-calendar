import { createContext, FC, useContext } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../firebase";
import { query, collection, where, DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
  const [values, collectionLoading] = useCollectionData(
    query(collection(db, "users"), where("uid", "==", user ? user.uid : null))
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        extraInfo: values ? values[0] : undefined,
        loading: loading || collectionLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
