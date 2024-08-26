import { initialState, userReducer, IUserState } from "../reducers/userReducer";
import { createContext, Dispatch, useReducer } from "react";

interface IUserContext {
  userData: IUserState;
  dispatch: Dispatch<any>;
}

type UserContextProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<IUserContext>({
  userData: initialState,
  dispatch: () => null,
});

export const UserProvider = ({ children }: UserContextProps) => {
  const [userData, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ userData, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
