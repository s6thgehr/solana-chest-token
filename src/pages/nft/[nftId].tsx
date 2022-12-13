import { Button, Flex, List, ListItem, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fakeNftData } from "utils/fakeData";

export default function NftDetails() {
  const router = useRouter();

  const { nftId } = router.query;

  const [nftData, setNftData] = useState([]);
  const [nftDetails, setNftDetails] = useState(null);
  const [addNft, setAddNft] = useState("");

  function navigateToDetails(id: number) {
    router.push(`/nft/${id}`);
  }

  function onAddNft(e) {
    setAddNft(e.target.value);
  }

  function onSubmitAddNft() {
    console.log("onSubmitAddNft");
  }

  useEffect(() => {
    setNftData(fakeNftData);
  }, [fakeNftData, setNftData]);

  useEffect(() => {
    setNftDetails(nftData.find((nft) => nft.id.toString() === nftId));
  }, [nftData, setNftDetails, nftId]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#4a2103] to-[#e4f009]">
          Nft {nftId} {nftDetails && `- ${nftDetails.name}`}
        </h1>

        {nftDetails && nftDetails.isChest && <div>Is a Chest</div>}
        {nftDetails && !nftDetails.isChest && <div>Is no Chest</div>}

        {nftDetails && (
          <div className="mt-8">
            <h2 className="text-center text-3xl bg-clip-text">
              Current Details
            </h2>

            <p className="text-left text-2xl mt-4">
              Description: {nftDetails.description}
            </p>
          </div>
        )}

        {nftDetails && nftDetails.isChest && (
          <List className="mt-4">
            {nftDetails?.holds?.map((nftId) => {
              const nft = nftData.find((nft) => nft.id === nftId);

              return (
                <ListItem
                  key={nftId}
                  className="cursor-pointer mt-2"
                  onClick={() => navigateToDetails(nft?.id)}
                >
                  {nft?.name}
                </ListItem>
              );
            })}
          </List>
        )}

        <Flex alignItems="center" className="mt-16">
          <Select
            placeholder="Add to Chest Nft"
            className="bg-clip-text"
            value={addNft}
            onChange={onAddNft}
          >
            {fakeNftData
              .filter((nft) => nft.id.toString() !== nftId)
              .map((nft) => {
                return (
                  <option key={nft.id} value={nft.id}>
                    {nft.name}
                  </option>
                );
              })}
          </Select>
          <Button
            variant="solid"
            className="ml-4 bg-gradient-to-r btn from-[#4a2103] to-[#e4f009] hover:from-pink-500 hover:to-yellow-500"
            onClick={onSubmitAddNft}
          >
            Add Nft
          </Button>
        </Flex>
      </div>
    </div>
  );
}
