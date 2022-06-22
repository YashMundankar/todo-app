import './App.css';
import * as React from 'react';
import {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TaskList from './components/TaskList';
import ReplayIcon from '@mui/icons-material/Replay';


import { ThemeProvider, createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const getLocalTasks=()=>{
  let tasks=localStorage.getItem('tasks');
  if(tasks) return JSON.parse(tasks);
  return [];
}

const getLocalDoneTasks=()=>{
  let doneTasks=localStorage.getItem('doneTasks');
  if(doneTasks) return JSON.parse(doneTasks);
  return [];
}

function App() {
  const textInput = React.useRef(null);
  const [tasks, setTasks] = useState(getLocalTasks())
  const [task, setTask] = useState('')
  const [doneTasks, setDoneTasks] = useState(getLocalDoneTasks())

  const handleAdd=()=>{
    if(task) {setTasks([task,...tasks]); setTask(''); textInput.current.value = ""};
  }

  const handleReset=()=>{
    setTasks([]);
    setDoneTasks([]);
  }

  const handleDone= (indx)=>{
    const updatedTasks=tasks.filter((task,index)=>{
      return index!==indx;
    })
    const updatedDoneTasks=tasks.filter((task,index)=>{
      return index===indx;
    })
    setDoneTasks([updatedDoneTasks,...doneTasks]);
    setTasks(updatedTasks);   
  }

  useEffect(() => {
   localStorage.setItem('tasks',JSON.stringify(tasks)) 
   localStorage.setItem('doneTasks',JSON.stringify(doneTasks)) 
  }, [tasks,doneTasks])
  
  return (
  <div className="App" 
    style={{minHeight:'100vh', height: "100%" ,backgroundColor:'#161717'}}>
    <Box  display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="25vh">
        <ThemeProvider theme={darkTheme}>
              <TextField style={{marginLeft:'4rem'}} color='success' label="Task" variant="outlined" onChange={(e)=>setTask(e.target.value)} sx={{ input: { color: 'white' } }} inputRef={textInput}/>
              <Button color='success' style={{height:'50px',marginLeft:'3px'}} variant="contained" onClick={handleAdd}>Add</Button>
              <Button color='success' onClick={handleReset}><ReplayIcon/></Button>
        </ThemeProvider>
    </Box>
    <div style={{width:'40%', margin:'auto'}}>
        <h2 style={{color:'white'}}>To-Do List</h2>
        {
          (tasks.length!==0 || doneTasks.length!==0)?(<TaskList tasks={tasks} handleDone={handleDone} doneTasks={doneTasks}/>):(<p  style={{color:'white'}}>No tasks...</p>)
        }
    </div>
  </div>
  );
}

export default App;
