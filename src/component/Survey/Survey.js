import React from 'react';
import { connect } from 'react-redux';
import { Grid, withStyles, Paper } from '@material-ui/core';

import ErrorBanner from './ErrorBanner';
import Loading from './Loading';
import QuestionsForm from './QuestionsForm';
import SettingDialog from './SettingDialog';
import RedirectToUser from './RedirectToUser';

import { getSurvey, readUrlToken, getToken } from '../../redux/user/actions/userSurveyActions';

const styles = theme => ({
    root: {
        backgroundColor: '#2c3e50',
    },
    paper: {
        margin: theme.spacing.unit,
        marginBottom: 10 * theme.spacing.unit,
        padding: theme.spacing.unit * 2,
        backgroundColor: '#2c3e50',
    }
});

class Survey extends React.Component {

    constructor(props) {
        super(props);

        // On récupère un token si l'utilisateur est connecté et qu'il n'en a pas 
        if (!props.token) {
            if (props.isConnected) {
                props.getToken(props.getSurvey);
            }
            else {
                props.readUrlToken(window.location.href, props.getSurvey);
            }
        }
        else {
            props.getSurvey(props.token);
        }
    }


    render() {


        let headDisplay;
        // Si les données n'ont pas encore été récupérées, on affiche loading
        if (!this.props.loaded) {
            headDisplay = <Loading />;
        }
        else {
            //headDisplay = <Typography variant="display2" align="center" color="textSecondary" gutterBottom> Bonjour {this.props.firstName} </Typography>
            headDisplay = null;
        }
        return (
            <div className={this.props.classes.root}>
                {this.props.error ?
                    (headDisplay = <ErrorBanner message={this.props.errorMessage} />)
                    : (
                        <Grid container direction='column'>
                            <Grid item>
                                <Grid container justify="space-between">
                                    <Grid item>
                                    <SettingDialog />
                                    </Grid>
                                    <Grid item>
                                    {!this.props.isConnected && <RedirectToUser />}
                                    </Grid>
                                </Grid>
                                
                <h1 style={{color: 'white', fontFamily: 'Roboto', textAlign: 'center'}}> Survey : {this.props.sondageName} </h1>
                            </Grid>
                            <Grid item>

                                <Paper className={this.props.classes.paper} elevation={0}>
                                    {headDisplay}
                                    <QuestionsForm />
                                </Paper>
                            </Grid>
                        </Grid>
                    )
                }
            </div>
        );
    }
}


const mapActionToProps = {
    getSurvey: getSurvey,
    readUrlToken: readUrlToken,
    getToken: getToken,
};

const mapStateToProps = (state) => ({

    token: state.userSurvey.token,
    loaded: state.userSurvey.loaded,
    firstName: state.userSurvey.firstName,
    error: state.userSurvey.error,
    errorMessage: state.userSurvey.errorMessage,
    sondageName: state.userSurvey.sondageName,
    isConnected: state.auth.isConnected,

});

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Survey));