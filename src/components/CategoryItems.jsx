/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Veg from '../assets/veg-non.svg?react';
import More from '../assets/more.svg?react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useItems } from '../hooks/useItems';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const StyledItem = styled.div`
  border-top: 0.7px solid #b7b7b7;
  border-bottom: 0.7px solid #b7b7b7;
  height: 15.5rem;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 1rem;
`;

const StyledDescription = styled.p`
  font-size: 1.2rem;
  grid-row: 2;
  grid-column: 1/-1;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  grid-row: 3;
  align-items: flex-end;
`;

const ItemInfo = styled.div`
  border-right: 0.7px solid #b7b7b7;
  display: grid;
  grid-template-columns: 10fr 1fr;
  padding: 1rem 0.5rem;
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 2rem;
  font-family: SFProSemiBold;
  line-height: 1.2;
`;

const MoreButton = styled.button`
  border: 0.5px solid black;
  border-radius: 10rem;
  background-color: white;
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  align-self: flex-end;
`;

const VegOption = styled.div`
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

const ItemImage = styled.div`
  margin-top: 1rem;
  height: 10rem;
  width: 10.2rem;
  & img {
    border-radius: var(--border-radius-sm);
  }
`;

const Items = styled.div`
  display: block;
  margin-bottom: 2rem;
`;

const StyledPrice = styled.h2`
  font-family: SFProBold;
  font-size: 1.4rem;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  line-height: 1.2;
  margin: 1rem 0;
  font-family: SFProSemiBold;
`;

function CategoryItems({ categoryTitle }) {
  const { items, isLoading } = useItems({ categoryTitle });
  const [searchParams] = useSearchParams();
  const title = searchParams.get('sub');

  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let filteredItems = [];
    if (title === 'Bestsellers') {
      filteredItems = items?.filter((item) => item?.isBestSeller);
    } else {
      filteredItems = items?.filter((item) => item?.subCategory === title);
    }
    setItemsToDisplay(filteredItems);
  }, [title, items]);

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    })
      .format(value)
      .replace('.00', '');

  const handleNav = (item) => {
    navigate(`:${item.title}`, {
      state: {
        item: item,
      },
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Items>
      <Category>
        <Heading>{title}</Heading>
        {itemsToDisplay?.map((item) => (
          <StyledItem key={item.id} onClick={() => handleNav(item)}>
            <ItemInfo>
              <Title>{item.title}</Title>
              <VegOption vegOption={item.veg}>
                <Veg />
              </VegOption>
              <StyledDescription>
                {item.description?.slice(0, 115) + '...'}
              </StyledDescription>
              <StyledFooter>
                <StyledPrice>{numberFormat(item.price)}</StyledPrice>{' '}
              </StyledFooter>
              <MoreButton onClick={() => handleNav(item)}>
                <More />
              </MoreButton>
            </ItemInfo>
            <ItemImage>
              <img src={item.image} width='100%' height='100%' />
            </ItemImage>
          </StyledItem>
        ))}
      </Category>
    </Items>
  );
}

export default CategoryItems;
