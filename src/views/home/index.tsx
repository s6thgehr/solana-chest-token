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

export const HomeView: FC = ({}) => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const balance = useUserSOLBalanceStore((s) => s.balance);
    const { getUserSOLBalance } = useUserSOLBalanceStore();

    const fakeNftData = [
        {
            name: "SMB#321",
            isChest: false,
        },
        {
            name: "y00ts#71",
            isChest: false,
        },
        {
            name: "DeGods#198",
            isChest: true,
        },
        {
            name: "Claynosaurz#22",
            isChest: false,
        },
    ];

    const [nftData, setNftData] = useState([]);

    useEffect(() => {
        setNftData(fakeNftData);
    }, []);

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
                    Transform your Token into a chest which can store other SPL
                    tokens.
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
                    {wallet && (
                        <p>SOL Balance: {(balance || 0).toLocaleString()}</p>
                    )}
                </div>
                {wallet.connected && (
                    <>
                        <h2 className="text-center text-3xl md:pl-12 bg-clip-text">
                            Your tokens
                        </h2>
                        <List spacing={2}>
                            {nftData.map((item, index) => {
                                return (
                                    <ListItem key={index}>
                                        <div className="flex items-stretch">
                                            <div className="mr-16">
                                                {item.name}{" "}
                                            </div>
                                            {item.isChest ? (
                                                <ListIcon
                                                    as={GiChest}
                                                    color="green.500"
                                                    className="ml-auto"
                                                />
                                            ) : (
                                                <button className="ml-auto">
                                                    Transform to chest
                                                </button>
                                            )}
                                        </div>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </>
                )}
            </div>
        </div>
    );
};
