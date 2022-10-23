import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card } from "react-bootstrap";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import background from "../assets/ot.jpg";
import Modal from "react-modal";
export default function MyPurchases({ marketplace, nft, account }) {

    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [owner, setOwner] = useState(null);

  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundImage: `url(${background})`,

      height: "300px",
      borderRadius: "15px",
      textAlign: "center",
    },
    overlay: {
      background: "rgba(49, 71, 128, 0.8)",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(value) {
    setOwner(value)
    setIsOpen(true);
    
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }



  const loadPurchasedItems = async () => {
  
    console.log("Bien")
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      account
    );
    

    const results = await marketplace.queryFilter(filter);
    
    const purchases = await Promise.all(
      results.map(async (i) => {
        i = i.args;
        const uri = await nft.tokenURI(i.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          item_string: i.itemId.toString(),
          qr:
            "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=" +
            i.itemId.toString() + "--"+account,
        };
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
  };
  useEffect(() => {
    loadPurchasedItems();
  }, []);
  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    );
  return (
    <div>
      <div class="nav-header headerMarket">
        <h3 class="span loader">
          <span class="m">M</span>
          <span class="m">I</span>
          <span class="m"> </span>
          <span class="m">C</span>
          <span class="m">O</span>
          <span class="m">L</span>
          <span class="m">E</span>
          <span class="m">C</span>
          <span class="m">C</span>
          <span class="m">I</span>
          <span class="m">Ó</span>
          <span class="m">N</span>
        </h3>
      </div>

      <div className="flex justify-center">
        {purchases.length > 0 ? (
          <div className="px-5 py-3 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-3">
              {purchases.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    {item.item_string}
                    <Card.Footer>
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                      <Nav>
                        <Button onClick={() => openModal(item.qr)} variant="flat">
                          ENTRAR
                        </Button>
                      </Nav>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>

            <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className="titulo-modal">BENEFICIOS </h2>
          <hr className="titulo-modal" />
          <br />
          <img src={owner} height="120" className="" alt="" />
           <br />
           <br />
         <h4 style={{ color: "white"}} >  ESCANEA EL QR CON UN NEGOCIO PARTICIPANTE Y CONSIGUE TU BENEFICIO</h4> 
          <br />
          <br />
         
        </Modal>
      </div>
          </div>
        ) : (
          <main style={{ padding: "1rem 0" }}>
            <h2> No purchases </h2>
          </main>
        )}
      </div>
    </div>
  );
}
