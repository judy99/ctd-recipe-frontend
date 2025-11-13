export default function Button({
  title,
  onClickHandler,
  disabled,
  variant = 'secondary',
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`btn btn-${variant}`}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
}
