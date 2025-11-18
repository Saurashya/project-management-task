import React from 'react'
import { useParams } from 'react-router-dom';

const ProjectDetailPage = () => {
  const params = useParams();
  return (
    <div>{params.projectId}</div>
  )
}

export default ProjectDetailPage