/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 15.5rem;
  height: 17.5rem;
  border-radius: 32px;
  box-shadow: var(--shadow-lg);
  background-color: ${(props) => props.categoryBg};
  line-height: 1.2;
  padding: 1rem;
`;

const SpecialCategoryCard = styled(CategoryCard)`
  & img {
    /* display: block; */
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  grid-column: 2;
  grid-row: 3;
`;

const H2 = styled.h2`
  font-weight: 500;
  text-align: center;
  font-size: 2rem;
  color: ${(props) => props.color};
`;

const H1 = styled.h1`
  font-size: 4rem;
`;
function Category({ category }) {
  const {
    categoryName: { line1, line2 },
    categoryBg,
    categoryEmoji: { emoji, imageUrl },
    title,
  } = category;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${title}`)
  }

  return (
    <>
      {emoji ? (
        <CategoryCard categoryBg={categoryBg} onClick={handleClick}>
          <H1>{emoji}</H1>
          <H2 color = {categoryBg === '#fff' ? '#000' : '#fff'}>
            {line1} <br /> {line2}
          </H2>
        </CategoryCard>
      ) : (
        <SpecialCategoryCard onClick={handleClick}>
          <img src={imageUrl}/>
        </SpecialCategoryCard>
      )}
    </>
  );
}

export default Category;
