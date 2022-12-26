import React, { createContext, FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

type ContextType = {
  setLogin: (value: boolean) => void;
  login: boolean;
};

export const LoginContext = createContext<ContextType>({} as ContextType);

export const LoginProvider: FC<Props> = ({ children }) => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
