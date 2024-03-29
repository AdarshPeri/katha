import styled from 'styled-components';
import Veg from '../assets/veg-non.svg?react';
import Brekkie from '../assets/brekkie.svg?react';
import Drink from '../assets/drink.svg?react';

import More from '../assets/more.svg?react';

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
  padding: 1rem;
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
`;

const ItemImage = styled.div`
  margin-top: 1rem;
  height: 10rem;
  width: 10.2rem;
`;

const Items = styled.div`
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  height: 60rem;
  margin-bottom: 2rem;
`;

const StyledPrice = styled.h2`
  font-family: SFProSemiBold;
  font-size: 1.4rem;
`;

function CategoryItems({ category }) {
  return (
    <Items>
      <StyledItem>
        <ItemInfo>
          <Title>
            Hyderabadi <br></br>Breakfast
          </Title>

          <VegOption>
            <Veg />
          </VegOption>

          <StyledDescription>
            our hyd take on english breakfast. brioche pav askdfjhskll
            asfkljhsdkfj lorem...
          </StyledDescription>
          <StyledFooter>
            <StyledPrice>$500</StyledPrice>{' '}
          </StyledFooter>
            <MoreButton>
              <More />
            </MoreButton>
        </ItemInfo>
        <ItemImage>
          <Drink width="100%" height="100%"/>
        </ItemImage>
      </StyledItem>
      <StyledItem>
        <ItemInfo>
          <Title>
            Hyderabadi <br></br>Breakfast
          </Title>

          <VegOption>
            <Veg />
          </VegOption>

          <StyledDescription>
            our hyd take on english breakfast. brioche pav askdfjhskll
            asfkljhsdkfj lorem...
          </StyledDescription>
          <StyledFooter>
            <StyledPrice>$500</StyledPrice>{' '}
          </StyledFooter>
            <MoreButton>
              <More />
            </MoreButton>
        </ItemInfo>
        <ItemImage>
          <Brekkie />
        </ItemImage>
      </StyledItem>
      <StyledItem>
        <ItemInfo>
          <Title>
            Hyderabadi <br></br>Breakfast
          </Title>

          <VegOption>
            <Veg />
          </VegOption>

          <StyledDescription>
            our hyd take on english breakfast. brioche pav askdfjhskll
            asfkljhsdkfj lorem...
          </StyledDescription>
          <StyledFooter>
            <StyledPrice>$500</StyledPrice>{' '}
          </StyledFooter>
            <MoreButton>
              <More />
            </MoreButton>
        </ItemInfo>
        <ItemImage>
          <Brekkie />
        </ItemImage>
      </StyledItem>
      <StyledItem>
        <ItemInfo>
          <Title>
            Hyderabadi <br></br>Breakfast
          </Title>

          <VegOption>
            <Veg />
          </VegOption>

          <StyledDescription>
            our hyd take on english breakfast. brioche pav askdfjhskll
            asfkljhsdkfj lorem...
          </StyledDescription>
          <StyledFooter>
            <StyledPrice>$500</StyledPrice>{' '}
          </StyledFooter>
            <MoreButton>
              <More />
            </MoreButton>
        </ItemInfo>
        <ItemImage>
          <Brekkie />
        </ItemImage>
      </StyledItem>
      <StyledItem>
        <ItemInfo>
          <Title>
            Hyderabadi <br></br>Breakfast
          </Title>

          <VegOption>
            <Veg />
          </VegOption>

          <StyledDescription>
            our hyd take on english breakfast. brioche pav askdfjhskll
            asfkljhsdkfj lorem...
          </StyledDescription>
          <StyledFooter>
            <StyledPrice>$500</StyledPrice>{' '}
          </StyledFooter>
            <MoreButton>
              <More />
            </MoreButton>
        </ItemInfo>
        <ItemImage>
          <Brekkie />
        </ItemImage>
      </StyledItem>
    </Items>
  );
}

export default CategoryItems;
