// import '../../styles/profile.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isAuth } from '../../../../redux/actions/loginActions'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField'
import css from './profile.module.css'

class viewProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: false
    }
  }
  handleClick = (event) => {
    this.setState({
      anchorEl: true
    })
  }
  handleClose = () => {
    this.setState({
      anchorEl: false
    })
  }
  render() {
    console.log('USER', this.props.user)
    return (
      <div className={css.container}>
        <div className={css.rowProfile}>
          <div className={css.titleProfile}>
            <h1>Mis Datos</h1>
          </div>
          <div className={css.accordionEmailPassword}>
            <h2 className={css.accountData}>Datos de cuenta</h2>
            <Accordion className={css.styleAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Email</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={css.optionNameLastName}>
                  <TextField id="outlined-basic" className={css.emailTextField} label="Email" variant="outlined" value={this.props.user.email}></TextField>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='accordion-name-lastName'>
            <h2 className='personal-data'>Datos personales</h2>
            <Accordion className='style-accordion'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Nombre y Apellido</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={css.optionNameLastName}>
                  <TextField id="outlined-basic" className={css.nameTextField} label="Nombre" variant="outlined" value={this.props.user.name}></TextField>
                  <TextField id="outlined-basic" className={css.lastNameTextField} label="Apellido" variant="outlined" value={this.props.user.lastName}></TextField>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className={css.styleAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Documento</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={css.optionNameLastName}>
                  <TextField id="outlined-basic" className={css.nameTextField} label="Documento" variant="outlined" value={this.props.user.dni}></TextField>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth,
    user: state.users.user,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { isAuth },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(viewProfile)