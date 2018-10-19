import React from 'react'
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function PostWriter({post, postNews, onChange, closeSnackBar, openSnackBar}) {
  return (
    <Grid container direction='column'>
        <div>
            <h2 style={{
                margin:0,
                paddingTop: '5vh',
                textAlign: 'center',
                paddingBottom: '3vh',
                fontFamily: 'Roboto',
                color: 'white',
                fontWeight: '100',
                fontSize:'4em',
                backgroundImage:'url(https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a0e7207ff5062fea921df59767ca430f&auto=format&fit=crop&w=634&q=80)'
            }} >
                News & Survey Feedback
            </h2>
        </div>
        <Grid container direction='row' spacing={0} style={{width: '100%', height: '100vh', backgroundColor:'#ecf0f1'}} >
            <Grid item xs={6}>
                <h3 style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto',
                    color: '#2c3e50',
                    fontWeight: '100',
                    fontSize:'2em',
                }}
                >
                    Edit
                </h3>
                <Card style={{width:'80%', height: '65vh', position:'relative', margin:'auto'}} >
                    <Grid container direction='column' style={{padding:'40px'}} >
                        <TextField
                            id="imageURL"
                            label="imageURL"
                            value={post.imageURL}
                            margin="normal"
                            onChange={onChange}
                            style={{height: '10vh'}}
                        />
                        <TextField
                            id="title"
                            label="title"
                            value={post.title}
                            onChange={onChange}
                            margin="normal"
                            autoComplete= 'off'
                        />
                        <TextField
                            id="text"
                            label="text"
                            value={post.text}
                            onChange={onChange}
                            margin="normal"
                            variant="outlined"
                            autoComplete= 'off'
                            multiline={true}
                            rows={5}
                        />
                        <TextField
                            id="linkURL"
                            label="link URL"
                            value={post.linkURL}
                            onChange={onChange}
                            margin="normal"
                            autoComplete= 'off'
                            style={{position:'absolute', bottom:'5%'}}
                        />
                    </Grid>
                </Card>
                <Button 
                variant="outlined" 
                color='primary'
                style={{width:'80%', marginLeft:'10%', marginTop:'2vh'}}
                onClick={postNews}
                >
                    Post News
                </Button>
            </Grid>
            <Grid item xs={6} >
                <h3 style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto',
                    color: '#2c3e50',
                    fontWeight: '100',
                    fontSize:'2em',
                }}
                >
                    How it looks
                </h3>
                <Grid container justify='center'>
                    <Card style={{ width:'50%', height: '65vh', position:'relative', overflow: 'scroll'}} >
                        <img src={post.imageURL} style={{width:'100%', height:'40%', objectFit: 'cover'}} alt='post' />
                        <CardContent>
                            {post.title? 
                            <h3 style={{fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 500, margin:0}}>
                                {post.title}
                            </h3>:
                            <h3 style={{fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 500, margin:0}} >
                                title
                            </h3>
                            }
                            {post.text?
                            <p style={{fontFamily: 'Roboto', fontWeight: 300, textAlign:'justify'}}>
                                {post.text}
                            </p>:
                            <p style={{fontFamily: 'Roboto', fontWeight: 300, textAlign:'justify'}} >
                                Write Here your text
                            </p>
                            }
                        </CardContent>
                        <CardActions>
                            {post.linkURL && <Button 
                                size="small" 
                                color="primary" 
                                style={{position: 'absolute', bottom:'5%'}}
                                href={post.linkURL} 
                            >
                                Learn More
                            </Button>}
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openSnackBar}
          onClose={closeSnackBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Success Posting</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={closeSnackBar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    </Grid>
  )
}

export default PostWriter