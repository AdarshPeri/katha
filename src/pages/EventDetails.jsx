/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Katha from '../assets/katha.svg?react';
import Back from '../assets/back.svg?react';

import { useMoveBack } from '../hooks/useMoveBack';
import MenuModal from '../components/MenuModal';
import Spinner from '../components/Spinner';
import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';
import { useMoveHome } from '../hooks/useMoveHome';
import { useLocation } from 'react-router-dom';

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
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
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
  }
`;

const DescPrice = styled.div`
  display: flex;
  gap: 1rem;
`;

const DateDesc = styled.h2`
  font-size: 2rem;
`;

const Button = styled.button`
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border: unset;
  height: 4.5rem;
  border-radius: var(--border-radius-sm);
  font-size: 2.4rem;
  font-family: SFProSemiBold;
`;

function EventDetails() {
  const { isLoading, categories } = useContext(CategoryContext);
  const { state } = useLocation();

  const moveBack = useMoveBack();
  const moveHome = useMoveHome();

  const { event } = state || {};

  if (isLoading) {
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

      <Header>{event?.title}</Header>

      <DateDesc>{event?.fullDate}</DateDesc>

      <Container>
        <StyledCarousel>
          <img src={event?.fullImage} />
        </StyledCarousel>
      </Container>

      <DescPrice>
        <StyledDescription>{event?.description}</StyledDescription>
      </DescPrice>

      <Button>
        <a href={event?.rsvp} target='_blank'>RSVP</a>
      </Button>
    </ItemLayout>
  );
}

export default EventDetails;
