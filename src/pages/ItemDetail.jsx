/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Katha from '../assets/katha.svg?react';
import Back from '../assets/back.svg?react';
import Veg from '../assets/veg-non.svg?react';

import { useMoveBack } from '../hooks/useMoveBack';
import MenuModal from '../components/MenuModal';
import Spinner from '../components/Spinner';
import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMoveHome } from '../hooks/useMoveHome';

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
  background-color: ${(props) => props.hex || '#fff'};
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

const VegOption = styled.span`
  margin-top: 0.5rem;

  & svg {
    rect {
      stroke: ${(props) => veg[props.vegOption]};
    }
    path {
      stroke: ${(props) => veg[props.vegOption]};
      fill: ${(props) => veg[props.vegOption]};
    }
  }
`;

const veg = {
  veg: '#3D8D45',
  'non-veg': '#D50A0A',
  egg: '#FFC700',
};

function ItemDetail() {
  const { isLoading, categories } = useContext(CategoryContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const moveHome = useMoveHome();

  const { item } = state || {};

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    })
      .format(value)
      .replace('.00', '');

  const moveBack = useMoveBack();
  const { pairsWith } = item;

  const handlePair = (sub) => {
    navigate(`/category/${sub.category}?sub=${sub.title}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ItemLayout>
      <Nav>
        <BackNav>
          <Back onClick={moveBack} />
          <Katha onClick={moveHome}/>
        </BackNav>
        <MenuModal categories={categories} />
      </Nav>
      <div>
        <Header>
          {item?.title}{' '}
          <VegOption vegOption={item?.veg}>
            <Veg />
          </VegOption>
        </Header>
      </div>

      <DescPrice>
        <StyledDescription>{item?.description}</StyledDescription>
        <Price>{numberFormat(item?.price)}</Price>
      </DescPrice>

      <Container>
        <StyledCarousel>
          <img src={item?.image} />
        </StyledCarousel>
      </Container>

      <Pairing>
        <p> Pairs well with </p>
        <Pairs>
          {pairsWith?.map((sub) => {
            return (
              <Item
                key={sub.id}
                onClick={() => {
                  handlePair(sub);
                }}
              >
                <ItemImage hex={sub.hex}>
                  <img src={sub.image} />
                </ItemImage>
                <p>{sub.title}</p>
              </Item>
            );
          })}
        </Pairs>
      </Pairing>
    </ItemLayout>
  );
}

export default ItemDetail;
