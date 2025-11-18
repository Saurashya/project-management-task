import {create} from 'zustand'
import {projects} from '../data/projectData'


const useProjectsStore = create((set,get) => ({
    projects: projects,
    notifications:[],
    getProjects: () => get().projects,
    addProjects: (payload) =>set((state) => ({projects: [...state.projects, payload]}))

}))

export default useProjectsStore