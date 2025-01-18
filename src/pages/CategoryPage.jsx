import Katha from "../assets/katha.svg?react";
import Back from "../assets/back.svg?react";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import CategoryCarousel from "../components/CategoryCarousel";
import CategoryItems from "../components/CategoryItems";
import MenuModal from "../components/MenuModal";
import { useContext, useRef, useState } from "react";
import { CategoryContext } from "../context/categoryContext";
import { useMoveHome } from "../hooks/useMoveHome";

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
  background: url("/static/images/search.svg") no-repeat left;
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
  const [searchValue, setSearchValue] = useState("");

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
    setSearchValue(value);
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
        type="text"
        placeholder="Look up an item."
        value={searchValue}
        onChange={(e) => handleSearch(e)}
      ></SearchInput>
      {searchValue?.length < 3 ? (
        <Header>{`${line1} ${line2}`}</Header>
      ) : (
        <Header>{`Search Results`}</Header>
      )}
      <CategoryCarousel
        category={category}
        search={searchValue.trim().toLowerCase()}
      ></CategoryCarousel>
      <CategoryItems
        categoryTitle={category.title}
        refer={ref}
        search={searchValue.trim().toLowerCase()}
      />
    </StyledCategory>
  );
}

export default CategoryPage;
