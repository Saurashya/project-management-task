import React from 'react';
import { useNavigate } from 'react-router-dom';
import useNotificationStore from '../store/useNotificationStore';

const Notifications = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsSeen = useNotificationStore((state) => state.markAsSeen);
  const navigate = useNavigate();

  const handleNotificationClick = (notificationId, ref) => {
    markAsSeen(notificationId);
    if (ref?.projectId) {
      const searchParams = new URLSearchParams();
      if (ref.milestoneId) searchParams.set('milestone', ref.milestoneId);
      if (ref.taskId) searchParams.set('task', ref.taskId);
      navigate({
        pathname: `/projects/${ref.projectId}`,
        search: searchParams.toString()
      });
    }
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Notification Center</h1>
        <p className="text-sm text-white/60">Stay ahead of project updates</p>
      </header>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <button
            key={notification.id}
            type="button"
            onClick={() => handleNotificationClick(notification.id, notification.ref)}
            className={`w-full rounded-2xl border border-white/10 p-4 text-left transition ${
              notification.seen ? 'bg-slate-900/50 text-white/70' : 'bg-slate-900 text-white'
            }`}
          >
            <div className="flex items-center justify-between text-xs uppercase text-white/40">
              <span>{notification.type}</span>
              <span>{notification.createdAt ? new Date(notification.createdAt).toLocaleString() : ''}</span>
            </div>
            <p className="mt-2 text-sm">{notification.message}</p>
            {notification.ref && (
              <p className="mt-1 text-xs text-white/50">
                Project {notification.ref.projectId}
                {notification.ref.milestoneId ? ` · Milestone ${notification.ref.milestoneId}` : ''}
                {notification.ref.taskId ? ` · Task ${notification.ref.taskId}` : ''}
              </p>
            )}
          </button>
        ))}
        {notifications.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
