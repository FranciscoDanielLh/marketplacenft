import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./Navbar";
import Inicio from './Inicio'
import Home from "./Home";
import Create from "./Create";
import MyListedItems from "./MyListedItems";
import MyPurchases from "./MyPurchases";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import { useState } from "react";
import { ethers } from "ethers";
import { Spinner } from "react-bootstrap";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });

    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div
     
            >
          
              <Routes>
              <Route
                path="/"
                element={<Inicio marketplace={marketplace} nft={nft} />}
              />
            </Routes>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Inicio marketplace={marketplace} nft={nft} />}
              />
              <Route
                path="/marketplace"
                element={<Home marketplace={marketplace} nft={nft} />}
              />

              <Route
                path="/create"
                element={<Create marketplace={marketplace} nft={nft} />}
              />

              <Route
                path="/my-listed-items"
                element={
                  <MyListedItems
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />

              <Route
                path="/my-purchases"
                element={
                  <MyPurchases
                    marketplace={marketplace}
                    nft={nft}
                    account={account}
                  />
                }
              />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
