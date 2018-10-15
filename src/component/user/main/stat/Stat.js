import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core';
import { getUserStat } from '../../../../redux/user/actions/userStatActions';
import LongSoftLine from '../../../admin/dashboard/chartDisplayers/LongSoftLine';
import Button from '@material-ui/core/Button';
export class Stat extends Component {
  constructor(props){
    super(props);

    this.onGetUserStat = this.onGetUserStat.bind(this);
  }

  onGetUserStat() {
    this.props.onGetUserStat();
  }
  showThemStat(statThematique){
    return(
    <Grid>
        <LongSoftLine data= {statThematique} />
    </Grid>
    );
  }
  render() {
    return (
      <div>
    Stat
      <Button onClick={this.onGetUserStat}>
        Plop
      </Button>
      {this.props.stat &&
      this.props.stat.map(statThematique => {
        return this.showThemStat(statThematique)
      })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stat: state.userStat.monthSatisfaction
  }
};

const mapDispatchToProps = {
  onGetUserStat: getUserStat,
}

export default connect(mapStateToProps, mapDispatchToProps)(Stat)
