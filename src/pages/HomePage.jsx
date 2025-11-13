import RecipeList from '../features/RecipeList/RecipeList';
import Alert from '../shared/Alert';
import RecipeFilterForm from '../features/RecipeFilterForm/RecipeFilterForm';
import { useRecipeContext } from '../context/RecipeContext';

export default function HomePage({ addRecipe }) {
  const { state, dispatch } = useRecipeContext();

  return (
    <>
      <RecipeFilterForm
        addRecipe={addRecipe}
        // to force re-render to clear search and filters
        key={state.isModalOpen ? 'open' : 'closed'}
      />
      {state?.errorMessage && (
        <Alert
          type="error"
          message={state.errorMessage}
          onClose={() => dispatch({ type: 'clearError' })}
        />
      )}

      <RecipeList />
    </>
  );
}
