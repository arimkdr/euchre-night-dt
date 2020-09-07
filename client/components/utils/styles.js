import {makeStyles} from '@material-ui/core/styles'

export default makeStyles({
  backdropA: /* green backdrop */ {
    background: '#05a20b'
  },
  backdropB: /* navebar red */ {
    background: 'linear-gradient(135deg, #AE6B8B 40%, #EF8083 80%)'
  },
  buttonA: /* login/signup button */ {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
  titleA: /* navbar title */ {
    fontFamily: ['"Sonsie One"', 'cursive'],
    fontSize: '6vh'
  }
})
