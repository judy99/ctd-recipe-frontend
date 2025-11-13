import { Link } from 'react-router';
import CategoryBadge from '../../shared/CategoryBadge/CategoryBadge';
import { DEFAULT_PHOTO_URL } from '../../shared/constants';
import RatingStars from '../../shared/RatingStars';

function RecipeListItem({ recipe }) {
  return (
    <li className="card">
      <img
        className="mb-2.5 h-[150px] object-cover"
        src={recipe.urlCloudinary || DEFAULT_PHOTO_URL}
        alt={recipe.title}
      />
      <div className="px-2.5 pb-2.5 flex flex-col justify-between">
        <Link to={`/recipe/${recipe.id}`} className="no-underline">
          <h4 className="m-0 mb-2 overflow-hidden text-ellipsis min-h-[50px] h-[50px] hover:cursor-pointer hover:text-gray-600">
            {recipe.title}
          </h4>
        </Link>
        <RatingStars />
        <div className="flex">
          <CategoryBadge category={recipe.category} />
        </div>
        <a
          href={recipe.source}
          className="not-italic text-[13px] leading-5 text-[#b6bcbf] h-[20px] max-h-[20px] overflow-hidden whitespace-nowrap text-ellipsis mt-2.5 no-underline"
        >
          {recipe.source}
        </a>
      </div>
    </li>
  );
}

export default RecipeListItem;
