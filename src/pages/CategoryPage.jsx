import Katha from '../assets/katha.svg?react';
import Back from '../assets/back.svg?react';
import styled from 'styled-components';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import CategoryCarousel from '../components/CategoryCarousel';
import CategoryItems from '../components/CategoryItems';
import MenuModal from '../components/MenuModal';
import { useContext, useRef } from 'react';
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
  scroll-behavior: smooth;
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
  const { isLoading, categories } = useContext(CategoryContext);
  const moveHome = useMoveHome();
  const ref = useRef(null);

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

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value.length < 4) return;
    console.log(value)
  };

  return (
    <StyledCategory>
      <Nav ref={ref}>
        <BackNav onClick={moveHome}>
          <Back />
          <Katha />
        </BackNav>
        <MenuModal categories={categories} />
      </Nav>
      <SearchInput
        type='text'
        placeholder='Search'
        onChange={(e) => handleSearch(e)}
      ></SearchInput>
      <Header>{`${line1} ${line2}`}</Header>
      <CategoryCarousel category={category}></CategoryCarousel>
      <CategoryItems categoryTitle={category.title} refer={ref} />
    </StyledCategory>
  );
}

export default CategoryPage;
