import { useState } from "react";
import { ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { Buffer } from "buffer";

// @ts-ignore
window.Buffer = Buffer;

const projectId = "2GNzY8Z4IvMS720dWNEKZQEGs8o";
const projectSecret = "6aec003d1b3c3bcd6fab95c92a43b9ca";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://lcd2ga.infura-ipfs.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("BAD IPFS: ", error);
      }
    }
  };
  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description  })
      );
      console.log("AAAA", result);
      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri uload error: ", error);
    }
  };

  const createNFTs = async () => {
    console.log("INICIO")
    const imagen =
      "https://lcd2ga.infura-ipfs.io/ipfs/Qmc13s3g9dtLyzxyLgz7X96vDkqCNHF3bcBWq8PUD7ouuS";

    const precio = 1;
    const nombre = "Decada 1990";
    const descripcion = "NUEVA ETAPA BBVA";
    const existencias = 1;
    var ident = []

    for (let i = 10; i < existencias+10; i++) {
      const id = i;
      const result = await client.add(
        JSON.stringify({ id, imagen, precio, nombre, descripcion, existencias })
      );
      
      const uri = `https://lcd2ga.infura-ipfs.io/ipfs/${result.path}`;
      const obj = await (await fetch(uri)).json();
      
      console.log("RESULTS",obj.nombre)
      await (
        await nft.mint(obj.nombre, obj.existencias, obj.descripcion, uri)
      ).wait();
      console.log("BIEN" )
      ident.push(i)
     
    }

    console.log("IDENT", ident)
    mintThenList(ident);

  };

  const mintThenListf = async (result) => {
    await (
      await nft.mint(
        result.nombre,
        result.existencias,
        result.descripcion,
        result
      )
    ).wait();

    await await nft.setApprovalForAll(marketplace.address, true);

    const listingPrice = ethers.utils.parseEther("1".toString());
    const sizeN = await nft.getSize();

    console.log("SIZE: ", sizeN.toString());

    await (await marketplace.makeItem(nft.address, listingPrice, 3)).wait();
  };

  const mintThenList = async (ident) => {

        var idFinal = [1,2,3]
    await await nft.setApprovalForAll(marketplace.address, true);
    console.log("MINT",ident)

        const listingPrice = ethers.utils.parseEther("1".toString());
        await (await marketplace.makeItem(nft.address, 10, listingPrice,2)).wait();
  

    const id = await nft.tokenCount();
  
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                required
                type="number"
                placeholder="Price (ETH)"
              />
              <div className="g-grid px-0">
                <Button onClick={createNFTs} variant="primary" size="lg">
                  Create and list NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
