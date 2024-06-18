import { initialState, userReducer, IUserState } from "../reducers/userReducer";
import { createContext, Dispatch, useReducer } from "react";

interface IUserContext {
  state: IUserState;
  dispatch: Dispatch<any>;
}

type UserContextProps = {
  children: React.ReactNode;
}; 

export const UserContext = createContext<IUserContext>({
  state: initialState,
  dispatch: () => null,
});

export const UserProvider = ({ children }: UserContextProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}