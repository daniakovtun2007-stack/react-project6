import './Notification.css';

function Notification({ message, onClose, closeLabel, type = 'error' }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`notification notification-${type}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <span>{message}</span>
      <button
        type="button"
        className="notification-close"
        onClick={onClose}
        aria-label={closeLabel}
      >
        &times;
      </button>
    </div>
  );
}

export default Notification;
