import { create } from "zustand";
interface StoreState {
  responseData: any;
  setResponseData: (data: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  // success: boolean;
  // setSuccess: (success: boolean) => void;
}
export const useStore = create<StoreState>((set) => ({
  responseData: null,
  setResponseData: (newData) => set({ responseData: newData }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  // success: false,
  // setSuccess: (success) => set({ success }),
}));
