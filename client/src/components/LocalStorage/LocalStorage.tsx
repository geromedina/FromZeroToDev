// import { useState } from "react";

// export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       return initialValue;
//     }
//   });
  
//   const setValue = (value: T) => {
//     try {
//       setStoredValue(value);
//       window.localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [storedValue, setValue];
// }

export const getItem =(key: string): any => {
  return JSON.parse(localStorage.getItem(key)!);
}
export const setItem =(key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data))
}