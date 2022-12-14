// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Divider,
} from "@chakra-ui/react";
import { GiChest } from "react-icons/gi";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
import { useRouter } from "next/router";
import { fakeNftData } from "utils/fakeData";
import useNftStore from "stores/useNftStore";

export const HomeView: FC = ({}) => {
  const router = useRouter();

  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  //   const [nftData, setNftData] = useState(fakeNftData);

  function navigateToDetails(id: number) {
    router.push(`/nft/${id}`);
  }

  const nftData = useNftStore((state) => state.nfts);
  const setNftData = useNftStore((state) => state.set);

  function transformToChest(id: number) {
    setNftData((prevState) => ({
      nfts: prevState.nfts.map((nft) => {
        if (nft.id === id) {
          return { ...nft, isChest: true, holds: [] };
        } else {
          return nft;
        }
      }),
    }));
    // console.log("transformToChest", id);
  }

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#4a2103] to-[#e4f009]">
          Solana Chest
          {/* <span className="text-sm font-normal align-top text-slate-700">
                        v{pkg.version}
                    </span> */}
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          Transform your Token into a chest which can store other SPL tokens.
        </h4>
        {/* <div className="max-w-md mx-auto mockup-code bg-primary p-6 my-2">
                    <pre data-prefix=">">
                        <code className="truncate">
                            Start building on Solana{" "}
                        </code>
                    </pre>
                </div> */}

        <div className="text-center">
          <RequestAirdrop />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
        </div>

        {wallet.connected && (
          <div className="w-full mt-8">
            <h2 className="text-center text-3xl bg-clip-text">Your tokens</h2>

            <List spacing={2} className="mt-8">
              {nftData.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <div className="flex items-center cursor-pointer my-2 h-10">
                      <div className="mr-16">{item.name}</div>
                      {item.isChest ? (
                        <ListIcon
                          as={GiChest}
                          //   color="green.500"
                          className="ml-auto"
                          width={30}
                          height={30}
                          onClick={() => navigateToDetails(item.id)}
                        />
                      ) : (
                        <button
                          className="ml-auto"
                          onClick={() => transformToChest(item.id)}
                        >
                          Transform to chest
                        </button>
                      )}
                    </div>
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};
