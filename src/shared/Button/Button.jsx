export default function Button({ title, onClickHandler, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="border border-gray-400 rounded-lg px-2.5 py-1 text-base mx-2 w-fit hover:cursor-pointer disabled:hover:cursor-not-allowed disabled:text-gray-400"
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
}
