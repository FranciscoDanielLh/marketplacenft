import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";


const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const loadMarketplaceItem = async () => {
    const itemCount = await marketplace.itemCount();

    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);

      if (!item.sold) {
        const ej = await nft.getName(1);

        console.log("EJEM", ej.toString());

        const uri = await nft.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          nombre: metadata.nombre,
          descripcion: metadata.description,
          imagen: metadata.imagen,
        });
      }
    }
    setLoading(false);
    setItems(items);
  };

  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItem();
  };

  useEffect(() => {
    loadMarketplaceItem();
  }, []);

  if (loading)
    return (
      <div>
        <main style={{ color: "#072146!important"}} > loading... </main>
      </div>
    );

  return (
    <div>
      <div class="nav-header headerMarket">
        <h3 class="span loader">
          <span class="m">M</span>
          <span class="m">A</span>
          <span class="m">R</span>
          <span class="m">K</span>
          <span class="m">E</span>
          <span class="m">T</span>
          <span class="m">P</span>
          <span class="m">L</span>
          <span class="m">A</span>
          <span class="m">C</span>
          <span class="m">E</span>
      
        </h3>
      </div>


      <div className="flex justify-center">
        {items.length > 0 ? (
          <div className="px-5 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {items.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card>
                    <Card.Img variant="top" src={item.imagen} />
                    <Card.Body color="secondary">
                      <Card.Title>{item.nombre}</Card.Title>
                      <Card.Text>{item.descripcion}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <div className="d-grid">
                        <Button
                          onClick={() => buyMarketItem(item)}
                          variant="primary"
                          size="lg"
                        >
                        {ethers.utils.formatEther(item.totalPrice)} ETH
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No assets</h2>
          </main>
        )}
      </div>
    </div>
  );
};

export default Home;
