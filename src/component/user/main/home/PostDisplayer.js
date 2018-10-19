import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const PostDisplayer = ({postList}) => {
  return (
        <div style={{backgroundColor: "#ecf0f1"}} >
            <div style={{
                margin: 0,
                width: '100%',
                height: '20vh',
                backgroundImage: 'url(https://images.unsplash.com/photo-1505762088641-031f116a9906?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9ceec808f75276c1a1b125b77023c01a&auto=format&fit=crop&w=1350&q=80)',
                objectFit: 'cover',
            }} >
                <h1 style={{
                    margin:0,
                    paddingTop: '5vh',
                    textAlign: 'center',
                    paddingBottom: '3vh',
                    fontFamily: 'Roboto',
                    color: 'white',
                    fontWeight: '100',
                    fontSize:'4em',
                }} >
                    News & Feedback
                </h1>
            </div>
        <GridList cellHeight={600} cols={3} spacing={10} style={{margin: '40px', marginTop:0, marginBottom:0}} >
            {postList.map(post=>(
                <GridListTile key={post.id} cols={1} >
                    <Card style={{height: '90%', margin: '15px', overflow: 'scroll'}} >
                            <img src={post.imageURL} style={{width:'100%', height:'40%', objectFit: 'cover'}} alt='post' />
                            <CardContent>
                            <h3 style={{fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 500, margin:0}} >
                                {post.title}
                            </h3>
                            <p style={{fontFamily: 'Roboto', fontWeight: 300, textAlign:'justify'}}>
                                {post.text}
                            </p>
                            </CardContent>
                        <CardActions>
                            {post.linkURL && <Button 
                                size="small" 
                                color="primary" 
                                style={{position: 'absolute', bottom:'10%'}}
                                href={post.linkURL} 
                            >
                                Learn More
                            </Button>}
                        </CardActions>
                    </Card>
                </GridListTile>
            ))}
        </GridList>
    </div>
  )
}

export default PostDisplayer