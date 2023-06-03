import React, { useState } from "react";
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, DialogContentText, FormControl, FormLabel, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import './dashboard.css';


const Dashboard = (): any => {
  var cardStyle = {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
    height: '100%'
  }
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [edit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const [editData, setEditData] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 

  const onSubmitHandler = () => {
    let res = [];
    if (commentList.length == 0) {
      res.push(comment)
    }
    else {
      res.push(comment)
      commentList.forEach((item) => {
        res.push(item)
      })
    }
    setCommentList(res);
    setComment('');
  }
  const OnDeleteHandler = (id) => {
    const data = commentList.filter((ele) => commentList.indexOf(ele) !== id);
    setCommentList(data);
  }
  const OnEditHandler = (id) => {
    const data = commentList.filter((ele) => commentList.indexOf(ele) === id);
    setEditData(data)
    setEditId(id)
    setIsEdit(true)
  }
  const onChangeHandler = (val, id) => {
    let copy = [...commentList]
    copy[id] = val;
    setCommentList(copy)
  }
  const OnEditSubmitHandler = () => {
    setIsEdit(false)
  }
  const handleClose = () => {
    setIsEdit(false)
  }
  return (
    <div className="pad-10">
     <span className="header-cn"> <h1> Dashboard - Comments </h1></span>
     <div className="header-cn">
      <FormControl fullWidth>
        <TextField multiline
          rows={2}
          maxRows={4} label="Your Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button onClick={onSubmitHandler}>Submit</Button>
      </FormControl>
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {commentList.length !== 0 &&
          commentList.map((item, key) => {
            return (
              <>

                <Grid item xs={4}>
                  <Card id={key} style={cardStyle}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Comments
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => OnDeleteHandler(key)}>Delete</Button>
                      <Button size="small" onClick={() => OnEditHandler(key)}>Edit</Button>
                    </CardActions>
                  </Card>

                </Grid>
                <div>
                {edit && editId == key &&
                <Dialog
        fullScreen={fullScreen}
        open={edit}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Edit Comment
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TextField multiline
                            variant="standard" defaultValue={editData[0]} onChange={(e) => onChangeHandler(e.target.value, key)} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button size="small" onClick={OnEditSubmitHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
          }
                </div>
              </>
            )
          })
        }

      </Grid>

    </div>
  )
}

export default Dashboard