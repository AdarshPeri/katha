/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Katha from '../assets/katha.svg?react';
import Back from '../assets/back.svg?react';
import Veg from '../assets/veg-non.svg?react';
import Vegan from '../assets/vegan.svg?react';

import { useMoveBack } from '../hooks/useMoveBack';
import MenuModal from '../components/MenuModal';
import Spinner from '../components/Spinner';
import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMoveHome } from '../hooks/useMoveHome';
import { useSubCategoryByTitle } from '../hooks/useSubCategoryTitle';

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
  justify-content: center;

  & img {
    border-radius: var(--border-radius-sm);
    pointer-events: none;
  }
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
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    height: 4rem;
    width: 4rem;
  }
`;

const DescPrice = styled.div`
  display: flex;
  gap: 1rem;
`;

const Price = styled.p`
  align-self: flex-end;
  font-size: 1.4rem;
  font-family: SFProBold;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & p {
    font-size: 1rem;
    max-width: 6rem;
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

const AddOn = styled.span`
  font-family: SFProSemibold;
  font-size: 1.6rem;
`;
const AddOnLine = styled.span`
  font-size: 1.4rem;
`;

function ItemDetail() {
  const { isLoading, categories } = useContext(CategoryContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const moveHome = useMoveHome();

  const { item } = state || {};
  let { pairsWith } = item;

  const { isLoading: subLoading, subCategory: sub1 } = useSubCategoryByTitle({
    subTitle: pairsWith?.[0]?.title,
  });
  const { isLoading: subLoading1, subCategory: sub2 } = useSubCategoryByTitle({
    subTitle: pairsWith?.[1]?.title,
  });

  pairsWith = pairsWith.filter(
    (sub) =>
      (sub1 && sub1.title === sub.title) || (sub2 && sub2.title === sub.title)
  );

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    })
      .format(value)
      .replace('.00', '');

  const moveBack = useMoveBack();

  const handlePair = (sub) => {
    navigate(`/category/${sub.category}?sub=${sub.title?.replace('&', '%26')}`);
  };

  if (isLoading || subLoading || subLoading1) {
    return <Spinner />;
  }

  return (
    <ItemLayout>
      <Nav>
        <BackNav>
          <Back onClick={moveBack} />
          <Katha onClick={moveHome} />
        </BackNav>
        <MenuModal categories={categories} />
      </Nav>
      <div>
        <Header>
          {item?.title}{' '}
          {item.veg !== 'vegan' ? (
            <VegOption vegOption={item?.veg}>
              <Veg />
            </VegOption>
          ) : (
            <Vegan width='1.9rem' height='1.9rem' />
          )}
        </Header>
      </div>

      <DescPrice>
        <StyledDescription>{item?.description}</StyledDescription>
        <Price>{numberFormat(item?.price)}</Price>
      </DescPrice>

      {item?.addOns && (
        <p>
          <AddOn>Add ons:</AddOn> <br></br>
          <AddOnLine>{item.addOns}</AddOnLine>
        </p>
      )}

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
