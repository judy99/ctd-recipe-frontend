import RecipeList from '../features/RecipeList/RecipeList';
import Button from '../shared/Button/Button';
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
      {state?.errorMessage?.length ? (
        <div className="absolute inset-0 h-full w-full bg-black/10">
          <div className="absolute top-5 right-5 w-[400px] rounded-lg border border-red-500 bg-azure p-4">
            <p>Error: {state?.errorMessage}</p>
            <Button
              title="Dismiss"
              onClickHandler={() => dispatch({ type: 'clearError' })}
            />
          </div>
        </div>
      ) : null}
      <RecipeList />
    </>
  );
}
