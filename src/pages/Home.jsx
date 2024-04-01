import styled from 'styled-components';
import Category from '../components/Category';
import Katha from '../assets/katha.svg?react';
import { useCategory } from '../hooks/useCategory';
import Spinner from '../components/Spinner';
import MenuModal from '../components/MenuModal';
import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.2rem;
  grid-column: 1/-1;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 6rem;
  margin-top: 2rem;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 3.4rem;
  grid-column: 1/-1;
  line-height: 1.2;
  font-family: SFProSemiBold;
`;

function Home() {
  const { isLoading, categories, error } = useContext(CategoryContext);


  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <CategoryGrid>
        <Nav>
          <Katha />
          <MenuModal categories={categories}/>
        </Nav>
        <H1>
          Welcome to <br></br>Katha.
        </H1>
        {categories?.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </CategoryGrid>
    </>
  );
}

export default Home;
