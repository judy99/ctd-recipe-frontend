import { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel/TextInputWithLabel';
import Button from '../../shared/Button/Button';
import { useRecipeContext } from '../../context/RecipeContext';

const RecipeFilterForm = () => {
  const { state, dispatch } = useRecipeContext();

  const [localQueryString, setLocalQueryString] = useState(state?.queryString);

  const handleChangeSortField = (e) => {
    dispatch({ type: 'changeSortField', sortField: e.target.value });
  };

  const handleChangeSortDir = (e) => {
    dispatch({
      type: 'changeSortDirection',
      sortDirection: e.target.value,
    });
  };

  const handleChangeCategory = (e) => {
    dispatch({
      type: 'changeCategory',
      filterCategory: e.target.value,
    });
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch({
        type: 'changeQueryString',
        queryString: localQueryString,
      });
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, dispatch]);

  // prevent the page from refreshing if a user accidentally
  // hits enter while working with this form
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <div className="border border-gray-300 rounded-lg p-5 flex justify-between items-center flex-col md:flex-row">
      <form
        id="recipeFilterForm"
        className="w-[80%] mb-2.5 md:mb-0"
        onSubmit={preventRefresh}
      >
        {/* search */}
        <div className="pb-5 flex items-baseline max-sm:flex-col">
          <div className="flex-grow max-sm:mb-2">
            <TextInputWithLabel
              elementId={'recipeSearch'}
              onChange={(e) => setLocalQueryString(e.target.value)}
              value={localQueryString}
              placeholder={'Search by title...'}
            />
          </div>
          <div className="ml-2">
            <Button
              title="Clear"
              onClickHandler={() => setLocalQueryString('')}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-0">
          <div className="relative flex items-center max-w-[200px] mr-5">
            <label htmlFor="sortBy" className="mr-2.5">
              Sort by:{' '}
            </label>
            <div className="formElementWrapper">
              <select
                name="sortBy"
                onChange={handleChangeSortField}
                value={state?.sortField}
                className="formElement"
              >
                <option value="title">Title</option>
                <option value="createdTime">Time added</option>
              </select>
            </div>
          </div>

          {/* direction */}
          <div className="relative flex items-center max-w-[200px] mr-5">
            <label htmlFor="sortDir" className="mr-2.5">
              Direction:{' '}
            </label>
            <div className="formElementWrapper">
              <select
                name="sortDir"
                onChange={handleChangeSortDir}
                value={state?.sortDirection}
                className="formElement"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Meal Type */}
          <div className="relative flex items-center max-w-[200px] mr-5">
            <label htmlFor="filterCategory" className="mr-2.5">
              Meal Type:{' '}
            </label>
            <div className="formElementWrapper">
              <select
                name="filterCategory"
                onChange={handleChangeCategory}
                value={state?.categoryFilter}
                className="formElement"
              >
                <option value="all">All</option>
                <option value="breakfast">Breakfast</option>
                <option value="soup">Soup</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      <div className="self-end">
        <Button
          title="Add Recipe"
          variant="primary"
          onClickHandler={() => {
            dispatch({ type: 'clearFilters' });
            dispatch({
              type: 'modalOpen',
              isModalOpen: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default RecipeFilterForm;
