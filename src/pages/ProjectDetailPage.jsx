import { NavLink, useParams } from "react-router-dom";
import useProjectsStore from "../store/useProjectsStore";
import { FaArrowLeft } from "react-icons/fa";
import TaskFilter from "../components/project/TaskFilter";
import MilestoneCard from "../components/project/MilestoneCard";

const ProjectDetailPage = () => {
  const projects = useProjectsStore((state) => state.projects);
  const params = useParams();
  const Project = projects.find((project) => project.id == params.projectId);

  if(!Project){
    return(
      <div>
        <h1 className="text-white text-2xl">Project not found !</h1>
       </div> 
        )
  }

  return (
    <div>
      <NavLink
        to="/projects"
        className="text-xs text-cyan-300 py-4 flex items-center gap-2 hover:text-white"
      >
        <FaArrowLeft />
        <span>Back to Projects</span>
      </NavLink>
      <div className="text-white project-details-container shadow">
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
          <div className="details-container text-slate-300 text-sm ">
            <p>Owner: {`${Project.owner.name} (${Project.owner.email})`}</p>
            <p>
              Contact: {`${Project.owner.contact?.phone ?? "N/A"} (${Project.owner.contact?.office ?? "N/A"})`}
            </p>
          </div>
          {/* CARDS */}
          <div className="cards flex gap-2 mt-4">
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
          </div>
          {/* TASK FILTER */}
          <TaskFilter />
          {/* MILESTONES */}
          <div className="milestones">
              {Project.milestones.length<1 && <h2 className="text-lg text-white p-4">No milestones yet</h2>}
              <div>
                {Project.milestones.map((milestone) => <MilestoneCard milestone={milestone} key={milestone.id}/>)}
              </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
