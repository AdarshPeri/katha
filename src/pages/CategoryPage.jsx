import Katha from '../assets/katha.svg?react';
import Back from '../assets/back.svg?react';

import styled from 'styled-components';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import CategoryCarousel from '../components/CategoryCarousel';
import CategoryItems from '../components/CategoryItems';
import { useMoveBack } from '../hooks/useMoveBack';
import MenuModal from '../components/MenuModal';
import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';
import { useMoveHome } from '../hooks/useMoveHome';

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

const StyledCategory = styled.div`
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

function CategoryPage() {
  const { isLoading, categories } = useContext(CategoryContext);
  const moveBack = useMoveBack();
  const moveHome = useMoveHome();


  const { categoryType } = useParams();

  if (isLoading) {
    return <Spinner />;
  }

  const category = categories.find((category) =>
    category.title.includes(categoryType)
  );

  const {
    categoryName: { line1, line2 },
  } = category;

  return (
    <StyledCategory>
      <Nav>
        <BackNav>
          <Back onClick={moveBack} />
          <Katha onClick={moveHome}/>
        </BackNav>
        <MenuModal categories={categories}/>
      </Nav>
      <Header>{`${line1} ${line2}`}</Header>
      <CategoryCarousel category={category}></CategoryCarousel>
      <CategoryItems categoryTitle={category.title} />
    </StyledCategory>
  );
}

export default CategoryPage;
