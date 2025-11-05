export default function CategoryBadge({ category }) {
  const bgColors = {
    breakfast: 'bg-cyan-200',
    lunch: 'bg-pink-200',
    dinner: 'bg-yellow-200',
    dessert: 'bg-pink-200',
    soup: 'bg-amber-200',
  };

  return (
    <span
      className={`inline-block text-gray-800 px-3 py-1 rounded-full text-sm uppercase font-medium ${
        bgColors[category] || ''
      }`}
    >
      {category}
    </span>
  );
}
