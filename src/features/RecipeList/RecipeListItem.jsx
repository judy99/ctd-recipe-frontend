import { Link } from 'react-router';
import CategoryBadge from '../../shared/CategoryBadge/CategoryBadge';
import { DEFAULT_PHOTO_URL } from '../../shared/constants';

function RecipeListItem({ recipe }) {
  return (
    <li className="text-left bg-white border border-gray-300 rounded-lg overflow-hidden flex flex-col bg-origin-border m-2.5 w-[250px]">
      <img
        className="mb-2.5 h-[150px] object-cover"
        src={recipe.urlCloudinary || DEFAULT_PHOTO_URL}
        alt={recipe.title}
      />
      <div className="px-2.5 pb-2.5 flex flex-col justify-between">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="m-0 mb-2 text-lg leading-5 text-[#1a1b22] overflow-hidden text-ellipsis min-h-[50px] h-[50px] hover:cursor-pointer">
            {recipe.title}
          </h3>
        </Link>
        <div className="flex">
          <CategoryBadge category={recipe.category} />
        </div>
        <a
          href={recipe.source}
          className="font-['Roboto_Slab','Arial','Helvetica',sans-serif] not-italic text-[13px] leading-5 text-[#b6bcbf] h-[20px] max-h-[20px] overflow-hidden whitespace-nowrap text-ellipsis mt-2.5 no-underline"
        >
          {recipe.source}
        </a>
      </div>
    </li>
  );
}

export default RecipeListItem;
