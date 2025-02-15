import { create } from "zustand";

type UserDetail = { name: string; email: string; password: string; };

type LoginStore = {
  userDetail:UserDetail | null;
  userType:string | null;
  isLogin: boolean;
  setLogin: (isLogin:boolean) => void;
  getLogin: () => void;
  setType: (type:string) => void;
  getType: () => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
  userDetail: null,
  userType:null,
  isLogin: false,
  setLogin: (isLogin:boolean) => {
    if(isLogin){
      localStorage.setItem("isLogin", "true")
    }else{
      localStorage.clear()
    }
    set(() => ({ isLogin: isLogin }));
  },
  getLogin: () => {
    const bool = localStorage.getItem("isLogin")==="true"?true:false
    console.log(bool)
    set(() => ({ isLogin: bool }));
  },
  setType:(type:string)=>{
    set(() => ({ userType: type }));
    localStorage.setItem("userType",type)
  },
  getType:()=>{
    const type = localStorage.getItem("userType")
    console.log(type)
    set(() => ({ userType: type }));
  }
}));