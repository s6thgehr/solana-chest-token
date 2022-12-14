import create, { State } from "zustand";
import produce from "immer";
import { fakeNftData } from "utils/fakeData";

interface NftStore extends State {
  nfts: Array<{
    id: number;
    name: string;
    description: string;
    isChest: boolean;
    holds?: Array<number>;
  }>;
  set: (x: any) => void;
}

const useNftStore = create<NftStore>((set, _get) => ({
  nfts: fakeNftData,
  set: (fn) => set(fn),
}));

export default useNftStore;
