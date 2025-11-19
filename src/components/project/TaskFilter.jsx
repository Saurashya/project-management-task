import { Component, createRef } from "react";

class TaskFilter extends Component{
    constructor(props){
        super(props);
        const params = new URLSearchParams(this.props.location.search);

        this.state = {
            search: params.get("search") || "",
            status: params.get("status") || "",
            tags: params.get("tags") || "",
        };

        this.searchRef = createRef();
    }

    componentDidMount(){
        this.applyFilters();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            const params = new URLSearchParams(this.props.location.search);
            this.setState({
                search: params.get("search") || "",
                status: params.get("status") || "",
                tags: params.get("tags") || "",
            });
            return;
        }

        if(prevState.search !== this.state.search || prevState.status !== this.state.status || prevState.tags !== this.state.tags){
            this.applyFilters();
            this.updateURL();
        }
    }

    updateURL=()=>{
        const { search, status, tags } = this.state;
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (status) params.set("status", status);
        if (tags) params.set("tags", tags);

        const queryString = params.toString();
        const newUrl = queryString ? `?${queryString}` : "";

        this.props.navigate(newUrl, { replace: true });
    }

    applyFilters=()=>{
        const {search,status,tags} = this.state;
        const {tasks,setFilteredTasks} = this.props;

        if(!tasks || typeof setFilteredTasks !== "function"){
            return;
        }
        
        let filteredTasks = tasks;

        if(search.trim()){
            filteredTasks= filteredTasks.filter((task)=>{
                return task?.title?.toLowerCase().includes(search.toLowerCase())
            })
        }
        if(status){
            filteredTasks = filteredTasks.filter((task)=>{
                return task?.status?.toLowerCase() === status.toLowerCase()
            })
        }

        if(tags){
            filteredTasks = filteredTasks.filter((task)=>{
                return task?.tags?.some(tag => tag.toLowerCase() === tags.toLowerCase())
            })
        }  
        setFilteredTasks(filteredTasks)
    }

    handleReset = () => {
        this.setState({search:"",status:"",tags:""})
        this.props.navigate(`/projects/${this.props.projectId}`,{replace:true})
        this.props.setFilteredTasks(this.props.tasks)
        if(this.searchRef.current){
            this.searchRef.current.focus()
        }
    }

    render(){
        const {search,status,tags} = this.state
        const {tasks} = this.props

        const uniqueStatuses = Array.from(new Set(tasks.map((task) => task.status)));
        const uniqueTags = Array.from(new Set(tasks.flatMap((task) => task.tags)));
        

        return (
    <section className='flex flex-wrap gap-x-4 bg-white/5 p-4 rounded text-white'>
        <input type="text" className='text-md p-1 px-2 outline-none border border-white/40 rounded flex-1 focus:border-blue-400' placeholder='search by task title' value={search} onChange={(e)=>this.setState({search:e.target.value})} ref= {this.searchRef}/>
        <select onChange={(e)=>this.setState({status:e.target.value})} className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none' value={status}>
            <option value="">Status</option>
            {
                uniqueStatuses.map((status)=>{
                    return <option key={status} value={status}>{status}</option>
                })
            }
        </select>
        <select className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none'
        onChange={(e)=>this.setState({tags:e.target.value})} value={tags}>
            <option value="">All Tags</option>
            {
                uniqueTags.map((tag)=>{
                    return <option key={tag} value={tag}>{tag}</option>
                })
            }
        </select>
        <button className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none' onClick={this.handleReset}>Reset Filters</button>
    </section>
  )
    }
}

export default TaskFilter