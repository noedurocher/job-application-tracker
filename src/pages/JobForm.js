import {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/JobForm.css';


function JobForm(){

    const [form, setForm] = useState({
        title:'',
        company:'',
        status:'',
        dateApplied:'',
        notes:''
    })

    const [jobs, setJobs] = useState([]);
    const [message, setMessage]=useState('');
    const [messageType, setMessageType]= useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [sortColumn, setSortColumn] = useState('dateApplied');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
    const userId = Number(localStorage.getItem("userId"));

    const username = localStorage.getItem("username");
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = ()=>setMenuOpen(!menuOpen);

    const handleLogout = ()=>{
        localStorage.clear();
        window.location.href="/login";
    }

    useEffect( ()=>{
        fetchJobs();
    }, []);

    useEffect( ()=>{
        applySorting();
    }, [jobs, sortColumn, sortOrder]);

    const handleDelete = async(id)=>{
        await axios.delete(`${process.env.REACT_APP_API_URL}/jobs/id/${id}`);
        fetchJobs();
    }

    const handleEdit = (job)=>{
        setForm(job);
    }

    const applySorting = ()=>{
        const sorted = [...jobs].sort((a, b) => {
            const aVal = a[sortColumn]?.toLowerCase?.() || a[sortColumn];
            const bVal = b[sortColumn]?.toLowerCase?.() || b[sortColumn];
            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredJobs(sorted);
    }

    const handleSort = (column) => {
        if (sortColumn === column) {
          setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
          setSortColumn(column);
          setSortOrder('asc');
        }
     };

    const indexOfLast = currentPage * jobsPerPage;
    const indexOfFirst = indexOfLast - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const fetchJobs = async()=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/jobs/user/${userId}`);
            setJobs(res.data)
        }catch(err){
            setMessage("No jobs found.")
            console.error("Error fetching jobs", err);
        }
    }
    const handleChange = (e) =>{
        setForm({...form, [e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const payload = {
            ...form, userId:userId
        }

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/jobs/user/${userId}`, payload);

            if(res.status === 200){
                setMessage("Job added successfully.");
                setForm({ title: '', company: '', status: '', dateApplied:'', notes:''});
                fetchJobs();
                //setMessageType('success')
            }else{
                setMessage('Error. Make sure you complete the form correctly.');
                //setMessageType('error');
            }
        }catch(err){
            setMessage("Error. Try again.");
            //setMessageType('error');
        }
    }
    return (
        <div className="main-job-form">
             <div className="user-menu-container">
                <div className="user-icon" onClick={toggleMenu}>
                    <span className="initials">
                        {username ? username[0].toUpperCase(): 'U'}
                    </span>
                </div>
                {menuOpen && (<div className="dropdown">
                                 <button onClick={handleLogout}>Log Out </button>
                                 </div>)}

            </div>

            <div className="job-form">
                <div className="header">
                    <h2>Job Form</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                    <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
                    <label>Select a status</label><br/>
                    <select name="status" value={form.status} onChange={handleChange} required>
                        <option value="">-- Please choose an option --</option>
                        <option value="applied">Applied</option>
                        <option value="interviewed">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="declined">Declined</option>
                    </select>
                    <input type="date" name="dateApplied" placeholder="Date Applied" value={form.dateApplied} onChange={handleChange} required />
                    <textarea name="notes" placeholder="Notes..." value={form.notes} onChange={handleChange} />
                    <button>Add Job</button>
                </form>
                <br/>
                {message && <div style={{fontWeight:"bold"}}>{message}</div>}

            </div>

            <div className="pagination">

                  <h3>Your Job Applications</h3>
                  <table>
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('title')}>Title</th>
                        <th onClick={() => handleSort('company')}>Company</th>
                        <th onClick={() => handleSort('status')}>Status</th>
                        <th onClick={() => handleSort('dateApplied')}>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentJobs.map((job) => (
                        <tr key={job.id}>
                          <td>{job.title}</td>
                          <td>{job.company}</td>
                          <td>{job.status}</td>
                          <td>{job.dateApplied}</td>
                          <td>
                            <button onClick={() => handleEdit(job)}>Edit</button>
                            <button onClick={() => handleDelete(job.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                   {Array.from({ length: totalPages }, (_, i) => (
                              <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                              >
                                {i + 1}
                              </button>
                            ))}
            </div>
        </div>
    )

}


export default JobForm;