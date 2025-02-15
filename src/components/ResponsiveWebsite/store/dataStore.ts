import { create } from "zustand";

type PostProp =  {
  id: number,
  title: string,
  body: string,
  userId: number
};

type DataStore = {
  posts:PostProp[];
  bookmark : number[];
  setPosts: (posts:PostProp[]) => void;
  removeBookmark:(id:number)=>void;
};

export const useDataStore = create<DataStore>((set) => ({
  posts:[],
  bookmark:[],
  setPosts:(posts:PostProp[])=>{
    set(() => ({ posts:posts || null }));
  },
  removeBookmark:(id:number)=>{
    set((state)=>({bookmark:state.bookmark.filter((value)=>value!=id)}))
  }
}));