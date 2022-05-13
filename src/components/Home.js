import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

import ProductBox from "./products/ProductBox";

// import Header from "./Header";

function Home() {
    const [last, setLast] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        try {
            const res = await axios.get(`http://localhost:5000/products?limit=10&last=${last}`);
            setProducts(res.data);
        } catch (error) {
            alert("deu ruim papa");
        }
    }, [last]);

    const previousPageIcon = last !== 0 && (<PreviousPage onClick={() => setLast(last - 10)}/>);

    return (
        <>
            {/* <Header /> */}
            <Container>
                {products.map(product => <ProductBox key={product.id} product={product} />)}
            </Container>
            <PageNavigation>
                {previousPageIcon}
                <NextPage onClick={() => setLast(last + 10)}/>
            </PageNavigation>
        </>

    )
}

export default Home;

const Container = styled.main`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 70px;
`;

const PageNavigation = styled.div`
    margin: 30px auto 30px auto;
    display: flex;
    justify-content: center;
`;

const PreviousPage = styled(FaArrowCircleLeft)`
    font-size: 35px;
`;

const NextPage = styled(FaArrowCircleRight)`
    font-size: 35px;
`;
