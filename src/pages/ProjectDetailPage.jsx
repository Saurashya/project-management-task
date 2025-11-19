import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import useProjectsStore from "../store/useProjectsStore";
import { FaArrowLeft } from "react-icons/fa";
import TaskFilter from "../components/project/filters/TaskFilter";
import MilestoneCard from "../components/project/cards/MilestoneCard";
import { useState, useEffect, lazy, Suspense } from "react";

const BudgetPieChart = lazy(() => import("../components/ui/charts/BudgetPieChart"));

const ProjectDetailPage = () => {
  const projects = useProjectsStore((state) => state.projects);
  const params = useParams();
  const Project = projects.find(
    (project) => project.id === parseInt(params.projectId)
  );

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const milestoneParam = searchParams.get("milestone");
  const taskParam = searchParams.get("task");

  const [filteredTasks, setFilteredTasks] = useState(null);

  useEffect(() => {
    if (taskParam) {
      const taskElement = document.getElementById(`task-${taskParam}`);
      if (taskElement) {
        taskElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [taskParam]);

  if (!Project) {
    return (
      <div>
        <h1 className="text-white text-2xl">Project not found !</h1>
      </div>
    );
  }

  const allTasks = Project.milestones.flatMap((milestone) => milestone.tasks);
  const isFiltered = filteredTasks && filteredTasks.length < allTasks.length;
  return (
    <main>
      <NavLink
        to="/projects"
        className="text-xs text-cyan-300 py-4 flex items-center gap-2 hover:text-white w-fit"
      >
        <FaArrowLeft />
        <span>Back to Projects</span>
      </NavLink>
      <article className="text-white project-details-container shadow">
        <div className="h-fit bg-white/5 text-white p-6 rounded-2xl min-h-fit">
          <div className="title-container flex items-center justify-between">
            <div className="py-2">
              <h3 className="uppercase text-sm tracking-wide">
                {Project.department}
              </h3>
              <h2 className="text-xl">{Project.name}</h2>
            </div>
            <button className="text-slate-200 border border-white/20 px-4 py-1 rounded-full text-xs">
              {Project.status}
            </button>
          </div>
          <section className="details-container text-slate-300 text-sm ">
            <p>Owner: {`${Project.owner.name} (${Project.owner.email})`}</p>
            <p>
              Contact:{" "}
              {`${Project.owner.contact?.phone ?? "N/A"} (${
                Project.owner.contact?.office ?? "N/A"
              })`}
            </p>
          </section>
          {/* CARDS */}
          <section className="cards flex gap-2 mt-4 flex-wrap">
            {/* Budget Card */}
            <div className="text-sm p-4 bg-white/5 my-2 rounded-xl flex-1">
              <h2 className="uppercase font-light tracking-wide text-slate-300">
                Budget
              </h2>
              <p className="text-xl text-white font-bold pb-2">
                Rs. {Project.resources.budget}
              </p>
              <p className="text-sm">Spent: Rs. {Project.resources.spent}</p>
            </div>
            {/* Assets Card */}
            <div className="text-sm p-4 bg-white/5 my-2 rounded-xl flex-1">
              <h2 className="uppercase font-light tracking-wide text-slate-300 pb-2">
                Assets
              </h2>
              {Project.resources.assets.map((asset) => {
                return (
                  <p className="text-sm" key={asset.id}>
                    {asset.name} - {asset.usage}%
                  </p>
                );
              })}
            </div>
          </section>
          <figure className="flex justify-center items-center">
            <Suspense fallback={<div>Loading...</div>}>
              <BudgetPieChart project={Project} />
            </Suspense>
          </figure>
          {/* TASK FILTER */}
          <TaskFilter
            location={location}
            navigate={navigate}
            tasks={allTasks}
            setFilteredTasks={setFilteredTasks}
            projectId={Project.id}
          />
          {/* MILESTONES */}
          <section className="milestones">
            {isFiltered ? (
              Project.milestones.some((milestone) =>
                milestone.tasks.some((task) =>
                  filteredTasks.some((item) => item.id === task.id)
                )
              ) ? (
                Project.milestones.map((milestone) => {
                  const filteredMilestoneTasks = milestone.tasks.filter(
                    (task) => filteredTasks.some((item) => item.id === task.id)
                  );
                  const shouldOpen =
                    filteredMilestoneTasks.length > 0 &&
                    (milestone.id === milestoneParam ||
                      milestoneParam === null);
                  return filteredMilestoneTasks.length > 0 ? (
                    <MilestoneCard
                      key={milestone.id}
                      milestone={{
                        ...milestone,
                        tasks: filteredMilestoneTasks,
                      }}
                      isOpen={shouldOpen}
                      highlightTaskId={taskParam}
                      projectId={Project.id}
                      milestoneId={milestone.id}
                    />
                  ) : null;
                })
              ) : (
                <h2 className="text-lg text-white p-4">
                  No tasks match the filters
                </h2>
              )
            ) : Project.milestones.length < 1 ? (
              <h2 className="text-lg text-white p-4">No milestones yet</h2>
            ) : (
              <div>
                {Project.milestones.map((milestone) => (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    isOpen={milestone.id === milestoneParam}
                    highlightTaskId={taskParam}
                    projectId={Project.id}
                    milestoneId={milestone.id}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </article>
    </main>
  );
};

export default ProjectDetailPage;
