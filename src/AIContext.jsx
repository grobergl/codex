import {createContext,useContext} from 'react';
export const AIContext=createContext({available:true,runAI:(_label,work)=>{work();return true;}});
export const useAI=()=>useContext(AIContext);
