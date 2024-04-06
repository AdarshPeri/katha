import styled from 'styled-components';
import Katha from '../assets/katha.svg?react';
import Back from '../assets/back.svg?react';

import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';
import { useMoveBack } from '../hooks/useMoveBack';
import MenuModal from '../components/MenuModal';
import Spinner from '../components/Spinner';
import { useMoveHome } from '../hooks/useMoveHome';
import { useEvents } from '../hooks/useEvents';
import { useNavigate } from 'react-router-dom';

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

const StyledEvent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 1rem;
  margin-top: 2rem;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  text-transform: capitalize;
  font-size: 3rem;
  font-family: SFProBold;
`;

const EventCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const Title = styled.h2`
  text-transform: capitalize;
  font-size: 2.4rem;
  font-family: SFProRegular;
`;

const Summary = styled.div`
  display: flex;
  border-bottom: 0.5px solid #b1b1b1;
  gap: 0.5rem;
`;

const Desc = styled.p`
  font-size: 1.2rem;
  border-right: 0.5px solid #b1b1b1;
  padding-bottom: 0.5rem;
`;

const StyledDate = styled(Title)`
  padding-bottom: 0.5rem;
`;
function Events() {
  const { isLoading, categories } = useContext(CategoryContext);
  const { isLoading: isEventsLoading, events } = useEvents();
  const moveBack = useMoveBack();
  const moveHome = useMoveHome();
  const navigate = useNavigate();

  if (isLoading || isEventsLoading) {
    return <Spinner />;
  }

  const handleNav = (event) => {
    navigate(`:${event.title}`, {
      state: {
        event: event,
      },
    });
  };

  return (
    <StyledEvent>
      <Nav>
        <BackNav>
          <Back onClick={moveBack} />
          <Katha onClick={moveHome} />
        </BackNav>
        <MenuModal categories={categories} />
      </Nav>

      <Header>Events @Katha</Header>

      {events?.map((event) => (
        <EventCard key={event.id} onClick={() => handleNav(event)}>
          <img src={event.previewImage} />
          <Title>{event.title}</Title>
          <Summary>
            <Desc>{event.description}</Desc>
            <StyledDate>{event.previewDate}</StyledDate>
          </Summary>
        </EventCard>
      ))}
    </StyledEvent>
  );
}

export default Events;
