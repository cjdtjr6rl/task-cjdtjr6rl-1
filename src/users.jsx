import React, { useReducer, createContext, useContext, useRef } from "react";

const initialUsers = [
  {
    id: 1,
    elast: '',
    efirst: '',
    kname: '',
    gender: '',
    birth: '',
    hour: '시',
    minute: '분',
    pname: '',
    phone: '',
    extra: '',
    Celast: false,
    Cefirst: false,
    Ckname: false,
    Cmale: false,
    Cbirth: false,
    Chour: false,
    Cminute: false,
    Cpname: false,
    Cphone: false,
    Cextra: false,
    cc: false,
  }
];

function UserReducer(state, action) {
  switch (action.type) {
    case 'RESERVATION':
        alert('예약이 완료되었습니다.');
        return state;
    case 'CHANGE_VALUE':
        return state.map((user) =>
            user.id === action.id ? { ...user, [action.name]: action.value } : user
        );
    case 'CHECK_VALIDATION':
        return state.map((user) =>
            user.id === action.id ? { ...user, [action.k]: action.v } : user
        );
    default:
        throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const UserStateContext = createContext();
const UserDispatchContext = createContext();
const UserNextIdContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialUsers);
  const nextId = useRef(2);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        <UserNextIdContext.Provider value={nextId}>
          {children}
        </UserNextIdContext.Provider>
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("Cannot find UserProvider");
  }
  return context;
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error("Cannot find UserProvider");
  }
  return context;
}

export function useUserNextId() {
  const context = useContext(UserNextIdContext);
  if (!context) {
    throw new Error("Cannot find UserProvider");
  }
  return context;
}
