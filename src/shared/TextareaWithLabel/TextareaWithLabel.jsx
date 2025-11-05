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
      <label
        htmlFor={elementId}
        className={
          labelText.length && 'block text-sm/6 font-bold text-gray-900'
        }
      >
        {labelText}
      </label>
      <div className="mt-2">
        <div
          className={`flex items-center rounded-md bg-white pl-3 outline -outline-offset outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 ${error && `border border-red-500`}`}
        >
          <textarea
            className={`resize-none block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
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
