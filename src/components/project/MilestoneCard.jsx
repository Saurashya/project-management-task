import React, { useState } from "react";
import TaskCard from "./TaskCard";

const MilestoneCard = ({ milestone }) => {
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);
  return (
    <article className="transition-all duration-500">
      {!isMilestoneOpen ? (
        <div
          className="bg-white/10 p-4 rounded-2xl my-2 flex items-center justify-between"
          onClick={() => setIsMilestoneOpen((prev) => !prev)}
        >
          <div>
            <div>
              <h2 className="text-lg font-semibold">{milestone.title}</h2>
            </div>
            <div>
              <p className="text-sm text-slate-300">
                Deadline: {milestone.deadline}
              </p>
            </div>
          </div>
          <button className="text-2xl cursor-pointer">+</button>
        </div>
      ) : (
        <div className="bg-white/10 p-4 rounded-2xl my-2">
          <div className="flex items-center justify-between">
            <div>
              <div>
                <h2 className="text-lg font-semibold">{milestone.title}</h2>
              </div>
              <div>
                <p className="text-sm text-slate-300">
                  Deadline: {milestone.deadline}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMilestoneOpen((prev) => !prev)}
              className="text-2xl cursor-pointer"
            >
              -
            </button>
          </div>
          <div className="tasks grid grid-cols-1 gap-y-4 pt-4">
            {milestone.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          <div className="flex justify-end">
            <button className="align-self-end rounded-full px-4 py-2 mt-4 text-xs font-semibold uppercase tracking-wide bg-emerald-400 text-slate-900 hover:bg-emerald-300">
              Add Task
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default MilestoneCard;
