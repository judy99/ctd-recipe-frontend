import { useRecipeContext } from '../../context/RecipeContext';

export default function Modal({ children }) {
  const { state, dispatch } = useRecipeContext();

  const handleModalClose = () =>
    dispatch({ type: 'modalOpen', isModalOpen: false });

  if (!state.isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]"
      onClick={handleModalClose}
    >
      <div
        className="relative z-[1000] bg-white px-8 py-4 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.3)] w-[70%] min-w-[400px] max-sm:w-[95%] max-sm:min-w-0 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
