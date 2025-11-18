import {useState } from 'react'
// import useDebounce from '../../hooks/useDebounce'

const ProjectFilter = () => {
    const [searchInput,setSearchInput] = useState("")
    const[status,setStatus] = useState("")
    const[department,setDepartment] = useState("")

    // const debouncedSearch = useDebounce(searchInput,500)

    const handleReset = () => {
        setSearchInput("")
        setStatus("")
        setDepartment("")
    }
  return (
    <section className='flex flex-wrap gap-x-4 bg-white/10 p-4 rounded text-white'>
        <input type="text" className='text-md p-1 px-2 outline-none border border-white/40 rounded flex-1 focus:border-blue-400' placeholder='search by project name' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
        <select onChange={(e)=>setStatus(e.target.value)} className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none' value={status}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Planning">Planning</option>
        </select>
        <select className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none'
        onChange={(e)=>setDepartment(e.target.value)} value={department}>
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
        </select>
        <button className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none' onClick={handleReset}>Reset Filters</button>
    </section>
  )
}

export default ProjectFilter