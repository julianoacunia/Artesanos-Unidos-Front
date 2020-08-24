import React, { Component } from 'react'
import '../../styles/alerts.css'

export default class errorAlert extends Component {
    render() {
        return (
            <div className="alert-danger" role="alert">
                <strong>El usuario y/o la contraseña son incorrectos!</strong>
            </div>
        )
    }
}