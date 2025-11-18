import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import useProjectsStore from '../store/useProjectsStore'
import { FaArrowLeft} from 'react-icons/fa';

const ProjectDetailPage = () => {
  const projects = useProjectsStore((state) => state.projects)
  const params = useParams();
  const Project = projects.find((project) => project.id == params.projectId)
 
  return (
    <div>
      <NavLink to="/projects" className='text-xs text-cyan-300 py-4 flex items-center gap-2 hover:text-white'><FaArrowLeft/><span>Back to Projects</span></NavLink>
      <div className="text-white project-details-container">
        <div className='h-fit bg-white/5'>
          <div>
            <div className='heading'>
              <h3>{Project.department}</h3>
              <h2>{Project.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage