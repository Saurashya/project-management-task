import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import Notifications from './pages/Notifications'
import ProjectDetailPage from './pages/ProjectDetailPage'

const App = () => {
  return (
	<Routes>
		<Route>
			<Route path="/" element={<Navigate to="/projects" />}/>
			<Route path="/projects" element={<Projects/>}/>
			<Route path="/projects/:projectId" element={<ProjectDetailPage/>}/>
			<Route path="/notifications" element={<Notifications/>}/>
		</Route>
	</Routes>
  )
}

export default App