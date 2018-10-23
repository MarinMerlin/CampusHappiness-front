import React from 'react'
import {Paper} from '@material-ui/core';
import idGenerator from '../../../../customFunction/idGenerator'
import OneComment from './OneComment';

const CommentsDisplayer = ({comments}) => {
    return (
        <Paper style={{width:'100%', marginTop: '10vh', marginBottom:'3vh' , minHeight:'30vh', paddingBottom: '4vh'}} >
            <h3 style={{ fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} > Comments </h3>
            {
                comments.length > 0 ? 
                comments.map(comment=>(
                    <OneComment key={idGenerator()} comment={comment} />
                )):
                <p style={{ fontFamily: 'Roboto', fontSize: '1.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} >No Comments...</p>
            }
        </Paper>

    )
}


export default CommentsDisplayer