import { Component, createRef } from "react";

class ProjectFilter extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(this.props.location.search);

    this.state = {
      search: params.get("search") || "",
      status: params.get("status") || "",
      department: params.get("department") || "",
    };

    this.searchRef = createRef();
    this.statusRef = createRef();
    this.departmentRef = createRef();
  }

  componentDidMount() {
    this.applyFilters();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      this.setState({
        search: params.get("search") || "",
        status: params.get("status") || "",
        department: params.get("department") || "",
      });
      return;
    }

    if (
      prevState.search !== this.state.search ||
      prevState.status !== this.state.status ||
      prevState.department !== this.state.department
    ) {
      this.applyFilters();
      this.updateURL();
    }
  }

  updateURL(){
    const { search, status, department } = this.state;
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (department) params.set("department", department);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : "";

    this.props.navigate(newUrl, { replace: true });
  };

  applyFilters(){
    const {search,status,department} = this.state;
    const {projects,setFilteredProjects} = this.props;

    if(!projects || typeof setFilteredProjects !== "function"){
        return;
    }
    
    let filteredProjects = projects;

    if(search.trim()){
        filteredProjects= filteredProjects.filter((project)=>{
            return project?.name?.toLowerCase().includes(search.toLowerCase())
        })
    }
    if(status){
        filteredProjects = filteredProjects.filter((project)=>{
            return project?.status?.toLowerCase() === status.toLowerCase()
        })
    }

    if(department){
        filteredProjects = filteredProjects.filter((project)=>{
            return project?.department?.toLowerCase() === department.toLowerCase()
        })
    }
        setFilteredProjects(filteredProjects)
  }

  handleReset = () =>{
    this.setState({search:"",status:"",department:""})
    this.props.navigate("/projects",{replace:true})
    this.props.setFilteredProjects(this.props.projects)

    if(this.searchRef.current){
        this.searchRef.current.focus()
    }
  }
  render(){
    const {search,status,department} = this.state;
    return (
    <section className='flex flex-wrap gap-x-4 bg-white/10 p-4 rounded text-white'>
        <input type="text" className='text-md p-1 px-2 outline-none border border-white/40 rounded flex-1 focus:border-blue-400' placeholder='search by project name' value={search} onChange={(e)=>this.setState({search:e.target.value})} ref= {this.searchRef}/>

        <select onChange={(e)=>this.setState({status:e.target.value})} className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none' value={status} ref={this.statusRef}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Planning">Planning</option>
        </select>
        <select className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none'
        onChange={(e)=>this.setState({department:e.target.value})} value={department} ref={this.departmentRef}>
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
        </select>
        <button className='border border-white/40 rounded p-1 hover:border-blue-400 outline-none' onClick={this.handleReset}>Reset Filters</button>
    </section>
  )
  }
}
export default ProjectFilter;
