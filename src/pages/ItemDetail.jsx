/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Katha from '../assets/katha.svg?react';
import Back from '../assets/back.svg?react';
import Veg from '../assets/veg-non.svg?react';
import Drink from '../assets/drink.svg?react';
import Pizza from '../assets/pizza.svg?react';
import Sandwich from '../assets/sandwich.svg?react';

import { useMoveBack } from '../hooks/useMoveBack';
import MenuModal from '../components/MenuModal';
import { useCategory } from '../hooks/useCategory';
import Spinner from '../components/Spinner';
import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BackNav = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-left: -1rem;
`;

const Header = styled.h1`
  text-transform: capitalize;
  font-size: 3.2rem;
  font-family: SFProBold;
`;

const StyledDescription = styled.p`
  font-size: 1.4rem;
  text-overflow: ellipsis;
`;

const ItemLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 1rem;
  margin-top: 2rem;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
  display: inline-grid;
  grid-template-columns: auto auto;
  border-top: 0.8px solid #b1b1b1;
  border-bottom: 0.8px solid #b1b1b1;
`;

const StyledCarousel = styled.div`
  display: flex;
  gap: 0.9rem;
  padding: 1.4rem 0;
`;

const Pairing = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: SFProBold;

  & p {
    font-size: 2.4rem;
  }
`;
const Pairs = styled.div`
  display: flex;
  gap: 1rem;
`;
const ItemImage = styled.button`
  border: 0.5px solid #b7b7b7;
  border-radius: 10rem;
  background-color: white;
  width: 5.5rem;
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DescPrice = styled.div`
  display: flex;
  gap: 1rem;
`;

const Price = styled.p`
  align-self: flex-end;
  font-size: 1.4rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & p {
    font-size: 1rem;
    max-width: 5.5rem;
    text-align: center;
    font-family: SFProRegular;
  }
`;

function ItemDetail() {
  const { isLoading, categories, error } = useContext(CategoryContext);

  const moveBack = useMoveBack();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ItemLayout>
      <Nav>
        <BackNav>
          <Back onClick={moveBack} />
          <Katha />
        </BackNav>
        <MenuModal categories={categories} />
      </Nav>
      <div>
        <Header>
          {`Grapefruit Lavender Cold Brew`} <Veg />
        </Header>
      </div>

      <DescPrice>
        <StyledDescription>
          our hyd take on english breakfast. brioche pav askdfjhskll
          asfkljhsdkfj lorem...
        </StyledDescription>
        <Price>$300</Price>
      </DescPrice>

      <Container>
        <StyledCarousel>
          <Drink />
          <Drink />
        </StyledCarousel>
      </Container>

      <Pairing>
        <p> Pairs well with </p>
        <Pairs>
          <Item>
            <ItemImage>
              <Pizza />
            </ItemImage>
            <p>Sourdough Pizzas</p>
          </Item>

          <Item>
            <ItemImage>
              <Sandwich />
            </ItemImage>
            <p>Between the breads</p>
          </Item>
        </Pairs>
      </Pairing>
    </ItemLayout>
  );
}

export default ItemDetail;
