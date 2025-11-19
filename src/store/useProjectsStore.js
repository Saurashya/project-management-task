import { create } from "zustand";
import { projects } from "../data/projectData";

const useProjectsStore = create((set, get) => ({
  projects: projects,
  getProjects: () => get().projects,
  completeTask: (taskId) =>
    set((state) => ({
      projects: state.projects.map((project) => ({
        ...project,
        milestones: project.milestones.map((milestone) => ({
          ...milestone,
          tasks: milestone.tasks.map((task) =>
            task.id === taskId ? { ...task, status: "completed" } : task
          ),
        })),
      })),
    })),
  addProjects: (payload) =>
    set((state) => ({ projects: [...state.projects, payload] })),
}));

export default useProjectsStore;
