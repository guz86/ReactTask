import './Notification.css';

interface NotificationProps {
  count: number;
}

const Notification: React.FC<NotificationProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <div className="notification">
      {count} item{count > 1 ? 's' : ''} selected
    </div>
  );
};

export default Notification;
