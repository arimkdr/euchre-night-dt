import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Typography} from '@material-ui/core'
import useStyles from './utils/styles'

const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = useStyles()
  return (
    <div
      className={classes.backdropB}
      style={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100vw',
        padding: '1vw 3vw 1vw 3vw',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography className={classes.titleA}>Euchre Night</Typography>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.player.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
