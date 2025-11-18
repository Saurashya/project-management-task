import useProjectsStore from '../store/useProjectsStore'
import ProjectFilter from '../components/project/ProjectFilter'
import ProjectCard from '../components/project/ProjectCard'
const Projects = () => {
  const projects = useProjectsStore((state) => state.projects)
  return (
    <div>
      <div className='flex items-center w-full justify-between'>
        <div>
          <h1 className='text-xl text-white'>Projects</h1>
          <p className='text-sm text-slate-300'>Manage your projects here</p>
        </div>
        <button className='font-semibold btn-success text-white px-4 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all ease-in-out text-sm'>Add Project</button>
      </div>
        <hr className='my-2 text-slate-400/40'/>
      <ProjectFilter/>
      <div className='grid grid-cols-2 m-auto gap-8 my-4 h-fit'>
        {
        projects.map((project)=>{
          return <ProjectCard key={project.id} project={project}/>
        })
      }
      </div>
    </div>
  )
}

export default Projects