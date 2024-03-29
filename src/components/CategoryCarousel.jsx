/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useSubCategories } from '../hooks/useSubCategories';
import Spinner from './Spinner';
import { useState } from 'react';

const CarouselItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & p {
    font-size: 1.2rem;
    max-width: 5.5rem;
    text-align: center;
  }
`;

const CarouselItem = styled.button`
  border: 0.5px solid #b7b7b7;
  border-radius: 10rem;
  background-color: ${(props) =>
    props.active ? '#305F35' : props.bgColor || '#fff'};
  width: 5.5rem;
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCarousel = styled.div`
  display: flex;
  gap: 0.9rem;
`;

const Container = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
  display: inline-grid;
  grid-template-columns: auto auto;
`;

function CategoryCarousel({ category }) {
  const { title: categoryTitle } = category;
  let { isLoading, subCategories } = useSubCategories({ categoryTitle });
  const [active, setActive] = useState(1);

  if (isLoading) {
    return <Spinner />;
  }

  subCategories = [
    {
      id: 1,
      subHex: '#fff',
      subImage: '/src/assets/star.svg',
      title: 'Bestsellers',
    },
    ...subCategories,
  ];

  const handleClick = (subCategory) => {
    setActive(subCategory.id);
  };

  return (
    <Container>
      <StyledCarousel>
        {subCategories.map((subCategory) => (
          <CarouselItems key={subCategory.id}>
            <CarouselItem
              bgColor={subCategory.subHex}
              onClick={() => handleClick(subCategory)}
              active={active === subCategory.id}
            >
              <img src={subCategory.subImage} alt='subCategory' />
            </CarouselItem>
            <p>{subCategory.title}</p>
          </CarouselItems>
        ))}
      </StyledCarousel>
    </Container>
  );
}

export default CategoryCarousel;
