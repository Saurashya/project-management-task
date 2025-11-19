import useProjectsStore from "../store/useProjectsStore";
import ProjectFilter from "../components/project/filters/ProjectFilter";
import ProjectCard from "../components/project/cards/ProjectCard";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddProjectModal } from "../components/ui/modals/AddProjectModal";
import useNotificationStore from "../store/useNotificationStore";

const Projects = () => {
  const projects = useProjectsStore((state) => state.projects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main>
      <header className="flex items-center w-full justify-between">
        <div>
          <h1 className="text-xl text-white">Projects</h1>
          <p className="text-sm text-slate-300">Manage your projects here</p>
        </div>
        <button
          className="font-semibold btn-success text-white px-4 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all ease-in-out text-sm"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add Project
        </button>
      </header>
      <hr className="my-2 text-slate-400/40" />
      <section>
        <ProjectFilter
          projects={projects}
          setFilteredProjects={setFilteredProjects}
          location={location}
          navigate={navigate}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 m-auto gap-8 my-4 h-fit">
          {filteredProjects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      </section>
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addNotification}
      />
    </main>
  );
};

export default Projects;
