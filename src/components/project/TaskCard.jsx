import useProjectsStore from "../../store/useProjectsStore";
import useNotificationStore from "../../store/useNotificationStore";

const TaskCard = ({ task, highlight = false, projectId, milestoneId }) => {
  const completeTask = useProjectsStore((state) => state.completeTask);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const handleTaskComplete = async () => {
    addNotification({
      id: Date.now(),
      message: `Task "${task.title}" marked completed.`,
      type: "task",
      ref: {
        projectId: projectId,
        milestoneId: milestoneId,
        taskId: task.id,
      },
      seen: false,
      createdAt: new Date().toISOString(),
    });

    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Task Completed', {
          body: `Task "${task.title}" has been marked as completed.`,
        });
      }
    }
    completeTask(task.id);
  };
  return (
    <article
      id={`task-${task.id}`}
      className={`rounded-xl border border-white/5 bg-white/5 p-4 transition hover:border-white/20 ${highlight ? 'ring-2 ring-cyan-400' : ''}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-white/50">Task</p>
          <h4 className="text-lg font-semibold">{task.title}</h4>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
          {task.status}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
        {task.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full border border-white/10 px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-white/60">Assigned to</p>
          <ul className="mt-2 space-y-1 text-sm text-white/80">
            {task.assignedTo.map((member) => (
              <li key={member.id}>
                <p>
                  <span className="font-semibold">{member.name}</span>—{" "}
                  {member.role} ({member.skills.join(", ")})
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-white/60">Comments</p>
          {task.comments.length > 0 ? (
            <ul className="mt-2 space-y-2 text-sm text-white/80">
              {task.comments.map((comment) => (
                <li
                  key={comment.id}
                  className="rounded-lg border border-white/5 bg-white/5 p-2"
                >
                  <strong>{comment.by}</strong>: {comment.message}
                  <span className="block text-xs text-white/50">
                    {comment.date}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-xs text-white/50">No comments yet.</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-white/70">
        <button
          type="button"
          onClick={() => handleTaskComplete()}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide" ${
            task.status === "completed"
              ? "border border-emerald-400 text-emerald-300"
              : "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
          }`}
          disabled={task.status === "completed"}
        >
          {task.status === "completed" ? "Completed" : "Mark Complete"}
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
