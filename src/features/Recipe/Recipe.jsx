import Button from '../../shared/Button/Button';
import CategoryBadge from '../../shared/CategoryBadge/CategoryBadge';
import { DEFAULT_PHOTO_URL } from '../../shared/constants';

export default function Recipe({ recipe, dispatch }) {
  return (
    <div className="min-h-screen flex flex-col container px-4 py-10 gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-10 items-start">
        {/* Image */}
        <div>
          <img
            src={recipe?.urlCloudinary || DEFAULT_PHOTO_URL}
            alt={recipe?.title}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
        {/* Recipe Info */}
        <div className="space-y-6">
          {/* Category Badge */}
          <CategoryBadge category={recipe?.category} />
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900">
            {recipe?.title}
          </h2>

          {/* Button */}
          <Button
            title="Edit Recipe"
            onClickHandler={() => {
              dispatch({
                type: 'modalOpen',
                isModalOpen: true,
                recipeToEdit: recipe,
              });
            }}
          />

          {/* Ingredients and Method */}
          <div className="grid grid-cols-1 gap-10 mt-6">
            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
              <p className="text-gray-800 leading-relaxed">
                {recipe?.ingredients}
              </p>
            </div>

            {/* Method */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Method:</h3>
              <p className="text-gray-800 leading-relaxed">{recipe?.method}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Notes */}
      {recipe?.notes && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Notes:</h3>
          <p className="text-gray-800 leading-relaxed">{recipe?.notes}</p>
        </div>
      )}
      <div className="text-sm text-gray-600">
        <span className="text-lg font-semibold text-black mr-2">Source:</span>
        <a
          href={recipe?.source}
          className="underline hover:text-gray-800"
          target="_blank"
          rel="noreferrer"
        >
          {recipe?.source}
        </a>
      </div>
    </div>
  );
}
