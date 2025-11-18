import React from 'react'
import useProjectsStore from '../store/useProjectsStore'
const Projects = () => {
  const projects = useProjectsStore((state) => state.projects)
  return (
    <div>
      <div>
        <h1>{JSON.stringify(projects)}</h1>
      </div>

    </div>
  )
}

export default Projects