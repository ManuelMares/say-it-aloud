import React, { createContext, useContext, useState } from 'react';


//==============================================================================
//Indicating the initial values
//Interfaces for the contexts' values
interface FileDirToOpen_type {
  fileDirToOpen: string | null;
  setFileDirToOpen: (dir: string | null) => void;
}
interface IsSafeToOpen_type {
  isSafeToOpen: boolean;
  setIsSafeToOpen: (dir: boolean) => void;
}
interface TryToOpen_type {
  tryToOpen: boolean;
  setTryToOpen: (dir: boolean) => void;
}


//Initial values for the contexts
const fileDirToOpen_initialContext: FileDirToOpen_type = {
  fileDirToOpen: null,
  setFileDirToOpen: () => {}, // Placeholder function
};
const isSafeToOpen_initialContext: IsSafeToOpen_type = {
  isSafeToOpen: false,
  setIsSafeToOpen: () => {}, // Placeholder function
};
const tryToOpen_initialContext: TryToOpen_type = {
  tryToOpen: false,
  setTryToOpen: () => {}, // Placeholder function
};
//==============================================================================





//==============================================================================
//creating the contexts
const FileDirToOpen_Context = createContext<FileDirToOpen_type>(fileDirToOpen_initialContext);
const IsSafeToOpen_Context  = createContext<IsSafeToOpen_type>(isSafeToOpen_initialContext);
const TryToOpen_Context     = createContext<TryToOpen_type>(tryToOpen_initialContext);


//exposing the contexts
export function useFileDirToOpen(){
  return useContext(FileDirToOpen_Context);
}
export function useIsSafeToOpen(){
  return useContext(IsSafeToOpen_Context);
}
export function useTryToOpen(){
  return useContext(TryToOpen_Context);
}
//==============================================================================


// interface Props{
//   children?: ReactNode
// }
export function FileContextProvider({ children }: { children: React.ReactNode }) {
  const [fileDirToOpen, setFileDirToOpen] = useState<string | null>(null);
  const [isSafeToOpen, setIsSafeToOpen]   = useState<boolean>(false);
  const [tryToOpen, setTryToOpen]         = useState<boolean>(false);


  return (
    <FileDirToOpen_Context.Provider   value={{fileDirToOpen, setFileDirToOpen}}>
      <IsSafeToOpen_Context.Provider  value={{isSafeToOpen, setIsSafeToOpen}}>
        <TryToOpen_Context.Provider   value={{tryToOpen, setTryToOpen}}>
          {children}
        </TryToOpen_Context.Provider>
      </IsSafeToOpen_Context.Provider>
    </FileDirToOpen_Context.Provider>
  );
};










