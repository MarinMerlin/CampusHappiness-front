import React from 'react'
import { Paper, Typography } from '@material-ui/core';
import SoftRadar from '../chartDisplayers/SoftRadar';
import backgroundColorList from '../colorSet'
const ThematiqueDisplayer = ({thematique, colorIndex}) => {
    thematique.questionList.forEach(question=>{
        question.avg = Math.round(question.avg*100)/100
    })
    // regroup by keyWord
    let keyWordMap = new Map();
    thematique.questionList.forEach(question => {
        const keyWord = question.keyWord.toLowerCase()
        if (keyWordMap.has(keyWord)) {
            keyWordMap.set(
                keyWord,
                {
                    avg: question.avg + keyWordMap.get(keyWord).avg,
                    questionNumber: 1 + keyWordMap.get(keyWord).questionNumber
                }
            )
        }
        else{
            keyWordMap.set(
                keyWord,
                {
                    avg: question.avg,
                    questionNumber: 1
                }
            )
        }
    });
    const newQuestionList = []
    keyWordMap.forEach(({avg, questionNumber}, keyWord)=>{
        newQuestionList.push({
            keyWord: keyWord,
            avg: avg/questionNumber
        })
    })
    thematique.questionList = newQuestionList
    return (
        <Paper style={{backgroundColor: backgroundColorList[colorIndex%6], border:'1px solid', borderColor:'#ecf0f1'}} >
            <Typography style={{color:'white', fontFamily: 'Roboto', fontWeight:100, fontSize:'1.7em', textAlign: 'center', padding:'1vh'}} >
                {thematique.name}
            </Typography>
            <SoftRadar thematique={thematique} />
        </Paper>
    )
}


export default ThematiqueDisplayer