/* eslint-disable react/prop-types */
import Modal from './Modal';
import Hamburger from '../assets/hamburger.svg?react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MenuItem = styled.p`
  font-size: 1.8rem;
  border-bottom: 0.5px solid black;
  padding-bottom: 0.5rem;
`;

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  & p:last-child {
    border-bottom: unset;
  }
`;

function MenuModal({ categories }) {
  const modalCategories = categories.filter(
    (category) => !!category?.categoryEmoji?.emoji && category.title !== 'events'
  );

  return (
    <Modal>
      <Modal.Open opens='hamburger-menu'>
        <Hamburger />
      </Modal.Open>
      <Modal.Window name='hamburger-menu'>
        <Menu modalCategories={modalCategories} />
      </Modal.Window>
    </Modal>
  );
}

const Menu = ({ modalCategories, onCloseModal }) => {
  const navigate = useNavigate();

  const handleClick = (categoryCTA) => {
    navigate(`/category/${categoryCTA}`);
    onCloseModal?.();
  };

  return (
    <StyledMenu>
      {modalCategories.map((category) => {
        const {
          categoryName: { line1, line2 },
          categoryEmoji: { emoji },
          title,
        } = category;
        return (
          <MenuItem key={emoji} onClick={() => handleClick(title)}>
            {`${emoji} ${line1} ${line2}`}
          </MenuItem>
        );
      })}
    </StyledMenu>
  );
};

export default MenuModal;
