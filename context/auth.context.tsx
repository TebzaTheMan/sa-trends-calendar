import { createContext, FC, useContext } from "react";
import { User } from "firebase/auth";
import { auth, db } from "../firebase";
import { query, collection, where, DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Center, Spinner } from "@chakra-ui/react";

interface IAuth {
  user: User | null | undefined;
  extraInfo: DocumentData | undefined;
}

const AuthContext = createContext<IAuth>({
  user: null,
  extraInfo: undefined,
});

const AuthProvider: FC = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [values, collectionLoading] = useCollectionData(
    query(collection(db, "users"), where("uid", "==", user ? user.uid : null))
  );

  if (loading || collectionLoading) {
    return (
      <Center mt={4}>
        <Spinner size={"lg"} color="primary" thickness="4px" />
      </Center>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        extraInfo: values ? values[0] : undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
