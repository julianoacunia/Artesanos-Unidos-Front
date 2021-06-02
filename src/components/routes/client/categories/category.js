import '../../styles/category.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCategories } from '../../redux/actions/categorieActions'
import { Link } from 'react-router-dom'

class category extends Component {
    componentDidMount(){
        this.props.fetchCategories()
    }
    render() {
        const categorieItems = this.props.categories.map(category => (
        <div className='box-category' key={category._id}>
            <a href={`#${category._id}`} className='a-categories'>
                <div className='btn-div'>
                    <Link className='btn-name' to='/categoryProduct'>{category.name}</Link>
                </div>
            </a>
        </div>
        ) )
        return <div className='row'>{categorieItems}</div>
    }
}

const mapStateToProps = state => ({
    categories: state.categories.items
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchCategories }, dispatch)
}
  
export default connect(mapStateToProps, mapDispatchToProps)(category)