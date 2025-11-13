import Button from './Button/Button';

export default function Alert({ type = 'error', message, onClose }) {
  const styles = {
    error: 'border-red-500 bg-red-50 text-red-800',
    success: 'border-green-500 bg-green-50 text-green-800',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    info: 'border-blue-500 bg-blue-50 text-blue-800',
  };

  return (
    <div className="absolute inset-0 flex items-start justify-end bg-black/10">
      <div
        className={`mt-5 mr-5 w-[400px] rounded-lg border p-4 shadow-lg transition-all duration-200 ${styles[type]}`}
      >
        <p className="mb-3 font-medium">
          {type.charAt(0).toUpperCase() + type.slice(1)}: {message}
        </p>
        <Button title="Dismiss" onClickHandler={onClose} />
      </div>
    </div>
  );
}
