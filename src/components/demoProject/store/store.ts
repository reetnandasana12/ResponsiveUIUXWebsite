import { create } from "zustand";

type User = { id: number; name: string; age: number }

type UserStore = {
    users : User[],
    getUser: (user:User[]) => void,
}


export const useUserStore = create<UserStore>((set) => ({
    users: [],
    getUser: (users:User[])=>{
        set(()=>({users:users}))
    },
    
  }));