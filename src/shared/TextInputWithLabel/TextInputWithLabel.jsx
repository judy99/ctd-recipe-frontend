function TextInputWithLabel({
  elementId,
  labelText = '',
  onChange,
  ref,
  value,
  placeholder,
  error,
}) {
  return (
    <>
      {labelText.length > 0 && (
        <label htmlFor={elementId} className="formElementLabel">
          {labelText}
        </label>
      )}
      <div className="mt-2">
        <div className={`formElementWrapper ${error && 'error'}`}>
          <input
            className="formElement"
            type="text"
            id={elementId}
            onChange={onChange}
            value={value}
            ref={ref}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
}

export default TextInputWithLabel;
