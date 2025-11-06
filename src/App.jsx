import { useState, useCallback, useEffect } from 'react';
import { getOptions } from './utility/getOptions';
import Header from './shared/Header/Header';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import Modal from './features/Modal/Modal';
import RecipeForm from './features/RecipeForm/RecipeForm';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { Route, Routes, useLocation } from 'react-router';
import { createPayload } from './utility/createPayload';
import { useRecipeContext } from './context/RecipeContext';

function App() {
  const { state, dispatch } = useRecipeContext();
  const [title, setTitle] = useState('Home');
  const location = useLocation();

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(
    (id) => {
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

      if (id) return `${url}/${id}`;

      // construct filter formula
      const filterFormula = (() => {
        const parts = [];
        if (state.queryString) {
          parts.push(`SEARCH(LOWER("${state.queryString}"), LOWER({title}))`);
        }

        if (state.filterCategory !== 'all') {
          parts.push(`{category} = "${state.filterCategory}"`);
        }

        return parts.length > 1 ? `AND(${parts.join(', ')})` : parts[0] || '';
      })();

      // construct query params
      const params = new URLSearchParams();
      params.set('sort[0][field]', state.sortField);
      params.set('sort[0][direction]', state.sortDirection);

      if (filterFormula) {
        params.append('filterByFormula', filterFormula);
      }

      const queryParams = params.toString();

      return `${url}?${queryParams}`;
    },
    [
      state?.sortField,
      state?.sortDirection,
      state?.queryString,
      state.filterCategory,
    ]
  );

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Recipe Book');
    } else if (location.pathname === '/about') {
      setTitle('About');
    } else if (location.pathname.startsWith('/recipe')) {
      setTitle('Recipe');
    } else {
      setTitle('Page Not Found');
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchRecipes = async () => {
      dispatch({ type: 'fetchRecipes', isLoading: true });
      const options = getOptions('GET', token);
      try {
        const url = encodeUrl();
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(
            resp.message || 'An error occurred. Please try again.'
          );
        }
        const { records } = await resp.json();
        dispatch({ type: 'loadRecipes', records });
      } catch (error) {
        dispatch({
          type: 'setLoadError',
          errorMessage: error.message,
        });
      } finally {
        dispatch({ type: 'fetchRecipes', isLoading: false });
      }
    };
    fetchRecipes();
  }, [
    state?.sortField,
    state?.sortDirection,
    state?.queryString,
    state.filterCategory,
    dispatch,
    encodeUrl,
    token,
  ]);

  const addRecipe = async (newRecipe) => {
    const payload = createPayload(newRecipe);
    const options = getOptions('POST', token, payload);
    try {
      dispatch({ type: 'startRequest' });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok)
        throw new Error(resp.message || 'An error occurred. Please try again.');
      const { records } = await resp.json();
      dispatch({ type: 'addRecipe', records });
    } catch (error) {
      dispatch({
        type: 'setLoadError',
        errorMessage: error.message,
      });
    } finally {
      dispatch({ type: 'endRequest' });
    }
  };

  const updateRecipe = async (updatedRecipe) => {
    const { ingredients, method } = updatedRecipe;
    const ing = JSON.parse(ingredients);
    const m = method.split('|||');

    const recipeOptimisticUpdate = {
      ...updatedRecipe,
      ingredients: ing,
      method: m,
    };

    const originalRecipe = state.recipes.find(
      (recipe) => recipe.id === updatedRecipe.id
    );
    const payload = createPayload(updatedRecipe);
    const options = getOptions('PATCH', token, payload.records[0]);

    // optimistic update
    dispatch({ type: 'updateRecipe', editedRecipe: recipeOptimisticUpdate });
    try {
      const resp = await fetch(encodeUrl(updatedRecipe.id), options);
      if (!resp.ok) {
        throw new Error(resp.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      dispatch({
        type: 'revertRecipe',
        errorMessage: `${error.message}. Reverting recipe...`,
        editedRecipe: originalRecipe,
      });
    }
  };
  return (
    <div className="h-screen bg-white mx-auto flex flex-col max-w-[1300px] min-w-[350px]">
      <Header title={title} />
      <main className="flex-grow px-10 pt-10 pb-0">
        <Routes>
          <Route path="/" element={<HomePage addRecipe={addRecipe} />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Modal isModalOpen={state?.isModalOpen} dispatch={dispatch}>
        <RecipeForm
          recipeToEdit={state?.recipeToEdit}
          addRecipe={addRecipe}
          updateRecipe={updateRecipe}
        />
      </Modal>
      <footer className="mx-auto w-full text-center p-2 box-border mt-6 bg-[#a6e6e6]">
        <p className="m-0">
          &copy; <span className="pr-2.5">{currentYear}</span>
          Recipe Book
        </p>
      </footer>
    </div>
  );
}

export default App;
