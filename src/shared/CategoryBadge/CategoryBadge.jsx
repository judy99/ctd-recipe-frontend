export default function CategoryBadge({ category }) {
  const bgColors = {
    breakfast: 'bg-cyan-200',
    lunch: 'bg-pink-300',
    dinner: 'bg-yellow-200',
    dessert: 'bg-pink-200',
    soup: 'bg-amber-400',
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-2xl w-fit h-fit mr-1 ${
        bgColors[category] || ''
      }`}
    >
      {category}
    </span>
  );
}
