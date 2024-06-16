interface IUserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserState {
  user: IUserInfo | null;
  isAuthenticated: boolean;
}

type Action =
  | { type: "SET_IS_AUTHENTICATED"; payload: boolean }
  | { type: "SET_CURRENT_USER"; payload: IUserInfo | null };

export const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};

export const userReducer = (state: IUserState, action: Action): IUserState => {
  switch (action.type) {
    case "SET_IS_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
