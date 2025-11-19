import React, { useState } from "react";
import TaskCard from "./TaskCard";
import DocumentViewerModal from "../../ui/modals/DocumentViewerModal";

const MilestoneCard = ({
  milestone,
  isOpen = false,
  highlightTaskId,
  projectId,
  milestoneId,
}) => {
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(isOpen);
  const [activeDocument, setActiveDocument] = useState(null);

  const getDocumentType = (url) => {
    if (url.endsWith(".pdf")) return "pdf";
    if (/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url)) return "image";
    return "iframe";
  };

  return (
    <article className="transition-all duration-500">
      {!isMilestoneOpen ? (
        <div
          className="bg-white/10 p-4 rounded-2xl my-2 flex items-center justify-between"
          onClick={(e) => {
            e.stopPropagation();
            setIsMilestoneOpen((prev) => !prev);
          }}
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
              <TaskCard
                key={task.id}
                task={task}
                highlight={task.id === highlightTaskId}
                projectId={projectId}
                milestoneId={milestoneId}
              />
            ))}
          </div>
          <section>
            {milestone.documents && milestone.documents.length > 0 && (
              <div className="rounded-xl border border-white/5 bg-white/5 p-4 mt-4">
                <h4 className="text-sm font-semibold text-white/70">
                  Documents
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {milestone.documents.map((docItem) => (
                    <button
                      type="button"
                      key={docItem.id}
                      onClick={() => setActiveDocument(docItem)}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80 hover:border-white"
                    >
                      {docItem.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
          <div className="flex justify-end">
            <button className="align-self-end rounded-full px-4 py-2 mt-4 text-xs font-semibold uppercase tracking-wide bg-emerald-400 text-slate-900 hover:bg-emerald-300">
              Add Task
            </button>
          </div>
        </div>
      )}
      <DocumentViewerModal
        isOpen={!!activeDocument}
        documentType={
          activeDocument ? getDocumentType(activeDocument.url) : "iframe"
        }
        documentUrl={activeDocument?.url}
        document={activeDocument}
        onClose={() => setActiveDocument(null)}
      />
    </article>
  );
};

export default MilestoneCard;
