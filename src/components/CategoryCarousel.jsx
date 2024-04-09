/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useSubCategories } from '../hooks/useSubCategories';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

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

  & img {
    width: 4rem;
    height: 4rem;
    pointer-events: none;
  }

  & p {
    font-size: 4rem;
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
`;

const extraSubs = [
  {
    id: 2,
    hex: '#ffe6ca',
    emoji: '☀️',
    title: 'Project Garmi',
    to: '/category/specials',
  },
  {
    id: 3,
    hex: '#ffe6ca',
    emoji: '🥐',
    title: 'Bakes Menu',
    to: '/category/bakes',
  },
];

function CategoryCarousel({ category }) {
  const { title } = category;
  let { isLoading, subCategories } = useSubCategories({ categoryTitle: title });
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const { categoryType } = useParams();

  useEffect(() => {
    const currentSub = searchParams.get('sub') || "";
    const subCat = subCategories?.find((sub) => sub?.title === currentSub);
    setActive(subCat?.id || 0);
  }, [searchParams, active, setActive, subCategories, setSearchParams]);

  if (isLoading) {
    return <Spinner />;
  }

  subCategories = subCategories?.length
    ? [
        {
          id: 1,
          hex: '#fff',
          image: '/static/images/star.svg',
          title: 'Bestsellers',
        },
        ...subCategories,
      ]
    : [];

  if (subCategories?.length && categoryType !== 'bakes') {
    subCategories.push(...extraSubs);
  }

  subCategories.sort((a,b) => a.order - b.order)

  const handleClick = (subCategory) => {
    if (subCategory?.emoji && subCategory?.to) {
      navigate(subCategory.to);
      return;
    }
    setActive(subCategory.id);
    searchParams.set('sub', subCategory.title);
    setSearchParams(searchParams);
  };

  return (
    <Container>
      {subCategories?.length > 1 && (
        <StyledCarousel>
          {subCategories.map((subCategory) => (
            <CarouselItems key={subCategory.id}>
              <CarouselItem
                bgColor={subCategory.hex}
                onClick={() => handleClick(subCategory)}
                active={active === subCategory.id}
              >
                {subCategory.image ? (
                  <img src={subCategory.image} alt='subCategory' />
                ) : (
                  <p>{subCategory.emoji}</p>
                )}
              </CarouselItem>
              <p>{subCategory.title}</p>
            </CarouselItems>
          ))}
        </StyledCarousel>
      )}
    </Container>
  );
}

export default CategoryCarousel;
