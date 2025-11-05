import RecipeListItem from './RecipeListItem';
import Pagination from '../Pagination/Pagination';
import { useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useRecipeContext } from '../../context/RecipeContext';
import { ITEMS_PER_PAGE } from '../../shared/constants';
import Loader from '../../shared/Loader/Loader';

function RecipeList() {
  const { state } = useRecipeContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const itemsPerPage = ITEMS_PER_PAGE;
  let currentPage = parseInt(searchParams.get('page') || 1, 10);
  const indexOfFirstRecipe = (currentPage - 1) * itemsPerPage;
  const slicedRecipes = state.recipes.slice(
    indexOfFirstRecipe,
    indexOfFirstRecipe + itemsPerPage
  );

  let totalPages = Math.ceil(state.recipes.length / itemsPerPage);

  useEffect(() => {
    // don’t redirect when data is empty
    if (totalPages > 0) {
      if (
        currentPage < 1 ||
        currentPage > totalPages ||
        Number.isNaN(currentPage)
      ) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  // if we search and nothing found
  if (state.queryString && !slicedRecipes.length) {
    return <p>{'Nothing found...'}</p>;
  }

  return state.isLoading ? (
    <Loader />
  ) : slicedRecipes.length ? (
    <>
      <ul className="list-none mb-4 pl-0 overflow-y-scroll flex flex-wrap justify-center">
        {slicedRecipes.map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </>
  ) : (
    // if recipe list is empty
    <p>{'Your recipe book is empty. Add recipe to get started...'}</p>
  );
}

export default RecipeList;
