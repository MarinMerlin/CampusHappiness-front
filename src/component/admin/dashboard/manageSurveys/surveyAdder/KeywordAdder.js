import React, { Component } from 'react'
import { Button, Menu, MenuItem, withStyles, DialogContent, Dialog, DialogActions, DialogContentText, TextField } from '@material-ui/core'
import { KeyboardArrowDownRounded } from '@material-ui/icons';
import { connect } from 'react-redux';
import { addKeyword } from '../../../../../redux/admin/actions/manageSurveyAction';

const styles = {
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
}
class KeywordAdder extends Component {
    state = {
        anchorEl: null,
        open: false,
        keyword: "",
      }

    constructor(props){
    super(props);

    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.updateKeyword = this.updateKeyword.bind(this);
    this.onAddKeyword = this.onAddKeyword.bind(this);
    this.onSelectKeyword = this.onSelectKeyword.bind(this);
    }
    
      handleChange = event => {
        this.setState({ anchorEl: null });
        this.props.changeStat(event.target.value);
      };
    
      onToggleMenu(event){
          this.setState({ anchorEl: event.currentTarget });
      }
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };

      handleClose = () => {
          this.setState({ anchorEl: null, open: false });
      };

      updateKeyword(event){
          this.setState({ keyword: event.target.value})
      }

      onSelectKeyword(e){
        this.setState({anchorEl: null, keyword: e.target.getAttribute('value')});
        const passedEvent = {
            target: {
                name: e.target.getAttribute('name'),
                value: e.target.getAttribute('value')
            }
        }
        this.props.onKeywordChange(passedEvent);
      }

      onAddKeyword(){
        this.props.addKeyword(this.state.keyword);
        const e = {
            target: {
                name: "keyword",
                value: this.state.keyword
            }
        }
        this.props.onKeywordChange(e)
        this.setState({open: false, anchorEl: null});
      }

    render(){
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { classes } = this.props;
        return(
            <div>
              <Button onClick={this.onToggleMenu} variant="contained" color="default">
                {this.state.keyword.length>0 ? <div>{this.state.keyword}</div>: <div>Add keyword</div>}
                <KeyboardArrowDownRounded/>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: 200,
                    },
                  }}
                >
                  {this.props.keywordList.map((keyword) => {
                    return (<MenuItem key={keyword} name="keyword" onClick={this.onSelectKeyword} value={keyword}>{keyword}</MenuItem>)
                  })}
                  <MenuItem name="keyword" onClick={this.handleClickOpen}>
                    <Button variant="contained" classes={{root: classes.root}}>Add Keyword</Button>
                  </MenuItem>
              </Menu>
              <div>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogContent>
                    <DialogContentText>
                    New Keyword :
                    </DialogContentText>
                    <TextField
                    autoFocus
                    onChange={this.updateKeyword}
                    margin="dense"
                    id="name"
                    label="keyword"
                    type="text"
                    fullWidth
                    value={this.state.keyword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onAddKeyword} color="primary">
                    Add +
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        keywordList: state.manageSurvey.keywordList,
    }
}

const mapActionsToProps = {
    addKeyword: addKeyword
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(KeywordAdder))
