import { MAX_LENGTH_TEXT } from '../constants';

function TextareaWithLabel({
  elementId,
  labelText = '',
  onChange,
  ref,
  value,
  placeholder,
  error,
}) {
  return (
    <div className="mt-2.5 flex w-full flex-col">
      <label htmlFor={elementId} className="formElementLabel">
        {labelText}
      </label>
      <div className="mt-2">
        <div className={`formElementWrapper ${error && 'error'}`}>
          <textarea
            className="formElement"
            id={elementId}
            maxLength={MAX_LENGTH_TEXT}
            onChange={onChange}
            value={value}
            ref={ref}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}

export default TextareaWithLabel;
