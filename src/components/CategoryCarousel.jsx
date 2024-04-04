/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useSubCategories } from '../hooks/useSubCategories';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CarouselItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & p {
    font-size: 1.1rem;
    max-width: 5.5rem;
    text-align: center;
  }
`;

const CarouselItem = styled.button`
  border: 0.5px solid #b7b7b7;
  border-radius: 10rem;
  background-color: ${(props) =>
    props.active ? '#305F35' : props.bgColor || '#fff'};
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 4rem;
    height: 4rem;
  }
`;

const StyledCarousel = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 0.7rem;
`;

const Container = styled.div`
  overflow-x: scroll;
  scroll-behavior: smooth;
  /* display: inline-grid;
  grid-template-columns: auto auto; */
`;

function CategoryCarousel({ category }) {
  const { title } = category;
  let { isLoading, subCategories } = useSubCategories({ categoryTitle: title });
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(1);
  useEffect(() => {
    const currentSub = searchParams.get('sub');
    const subCat = subCategories?.find((sub) => sub?.title === currentSub);
    setActive(subCat?.id || 1);
  }, [searchParams, active, setActive, subCategories]);

  if (isLoading) {
    return <Spinner />;
  }

  subCategories = [
    {
      id: 1,
      hex: '#fff',
      image: '/static/images/star.svg',
      title: 'Bestsellers',
    },
    ...subCategories,
  ];

  const handleClick = (subCategory) => {
    setActive(subCategory.id);
    searchParams.set('sub', subCategory.title);
    setSearchParams(searchParams);
  };

  return (
    <Container>
      <StyledCarousel>
        {subCategories.map((subCategory) => (
          <CarouselItems key={subCategory.id}>
            <CarouselItem
              bgColor={subCategory.hex}
              onClick={() => handleClick(subCategory)}
              active={active === subCategory.id}
            >
              <img src={subCategory.image} alt='subCategory' />
            </CarouselItem>
            <p>{subCategory.title}</p>
          </CarouselItems>
        ))}
      </StyledCarousel>
    </Container>
  );
}

export default CategoryCarousel;
