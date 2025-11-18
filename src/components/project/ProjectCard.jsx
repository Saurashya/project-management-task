import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const ProjectCard = ({project}) => {
  return (
    <article className='bg-white/5 text-white p-6 rounded-2xl min-h-fit'>
        <div className='title-container flex items-center justify-between'>
            <div className='py-2'>
                <h3 className='uppercase text-sm tracking-wide'>{project.department}</h3>
                <h2 className='text-xl'>{project.name}</h2>
            </div>
            <button className='text-slate-200 border border-white/20 px-4 py-1 rounded-full text-xs'>{project.status}</button>
        </div>
        <div className='details-container text-slate-300 text-sm '>
            <p>Owner: {project.owner.name}</p>
            <p>Budget: Rs. {project.resources.budget}</p>
            <p>Spent: Rs. {project.resources.spent}</p>
        </div>
        <div>
    {/* {project.milestones} */}
        </div>
            <NavLink to={`/projects/${project.id}`} className='text-sm text-cyan-300 py-4 flex items-center gap-2 hover:text-white w-fit'><span>View Project</span><FaArrowRight/></NavLink>
    </article>
  )
}

export default ProjectCard