import {useState } from 'react'


const TaskFilter = () => {
    const [searchInput,setSearchInput] = useState("")
    const[status,setStatus] = useState("")
    const[tags,setTags] = useState("")
    

    const handleReset = () => {
        setSearchInput("")
        setStatus("")
        setTags("")
    }
  return (
    <section className='flex flex-wrap gap-x-4 bg-white/5 p-4 rounded text-white'>
        <input type="text" className='text-md p-1 px-2 outline-none border border-white/40 rounded flex-1 focus:border-blue-400' placeholder='search by task name' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
        <select onChange={(e)=>setStatus(e.target.value)} className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none' value={status}>
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Planning">Planning</option>
        </select>
        <select className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none'
        onChange={(e)=>setTags(e.target.value)} value={tags}>
            <option value="">All Tags</option>
            <option value="Engineering">DevOps</option>
            <option value="Marketing">Automation</option>
        </select>
        <button className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none' onClick={handleReset}>Reset Filters</button>
    </section>
  )
}

export default TaskFilter