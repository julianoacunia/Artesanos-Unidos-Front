// import '../../styles/successPopUp.css'
import React, { Component } from 'react'
import Modal from 'react-modal'


export default class SuccessPopUp extends Component {
  render() {
    return (
      <>
        <div className='modal-container'>
          <Modal className='modal' isOpen={this.props.isModalOpen}>
            <h2>Felicidades</h2>
            <p>Usted se ha registrado con exito!</p>
            <div>
              <button className='btn-modal' onClick={this.props.redirect}>Listo</button>
            </div>
          </Modal>
        </div>
      </>
    )
  }
}
