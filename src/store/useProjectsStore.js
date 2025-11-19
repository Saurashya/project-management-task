import {create} from 'zustand'
import {projects} from '../data/projectData'


const useProjectsStore = create((set,get) => ({
    projects: projects,
    getProjects: () => get().projects,
    completeTask: (id) => set((state) => ({projects: state.projects.map((task) => task.id === id ? {...task, isComplete: !task.isComplete} : task)})),
    addProjects: (payload) =>set((state) => ({projects: [...state.projects, payload]}))
}))

export default useProjectsStore