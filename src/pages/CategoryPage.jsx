import Katha from '../assets/katha.svg?react';
import Back from '../assets/back.svg?react';

import styled from 'styled-components';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import { useCategory } from '../hooks/useCategory';
import CategoryCarousel from '../components/CategoryCarousel';
import CategoryItems from '../components/CategoryItems';
import { useMoveBack } from '../hooks/useMoveBack';
import MenuModal from '../components/MenuModal';
import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';

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

const SearchInput = styled.input`
  background: url('/src/assets/search.svg') no-repeat left;
  background-size: 2rem;
  background-color: #eaeaea;
  border-radius: 0.3rem;
  padding: 1rem 3rem;
  border: unset;
  border-left: inset 1rem transparent;
  overflow: hidden;
`;

function CategoryPage() {
  const { isLoading, categories, error } = useContext(CategoryContext);
  const moveBack = useMoveBack();

  const { categoryType } = useParams();

  if (isLoading) {
    return <Spinner />;
  }

  const category = categories.find((category) =>
    category.categoryCTA.includes(categoryType)
  );

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value.length < 4) return;
  };

  const {
    categoryName: { line1, line2 },
  } = category;

  return (
    <StyledCategory>
      <Nav>
        <BackNav>
          <Back onClick={moveBack} />
          <Katha />
        </BackNav>
        <MenuModal categories={categories}/>
      </Nav>
      <Header>{`${line1} ${line2}`}</Header>
      <SearchInput
        type='text'
        placeholder='Search'
        onChange={(e) => handleSearch(e)}
      ></SearchInput>
      <CategoryCarousel category={category}></CategoryCarousel>
      <CategoryItems category={category} />
    </StyledCategory>
  );
}

export default CategoryPage;
