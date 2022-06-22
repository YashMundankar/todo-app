import React from 'react'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



import { ThemeProvider, createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function TaskList(props) {
    let tasks=props.tasks;
    let doneTasks=props.doneTasks;
  return (
    <ThemeProvider theme={darkTheme}>


    <div>
        {
            tasks.map((task,index)=>
            <div key={index}>

                    <Card  onClick={()=>props.handleDone(index)} sx={{marginTop:'5px',border:'1px solid grey'}}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="text.primary">
                                    {task}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            </div>
            )
        }
        {
            doneTasks.map((doneTask,index)=>
            <div key={index}>

                    <Card sx={{backgroundColor:'green',marginTop:'5px',border:'1px solid black'}} >
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="text.primary">
                                    {doneTask}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
            </div>
            )
        }

    </div>
    </ThemeProvider>
  )
}

export default TaskList