import { COLOR_CRAB_SHELL_CYAN, COLOR_YAQING, COLOR_ERROR_RED } from '../../constants';

const styles = {
  container: {
    height: 51,
    width: 386,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    fontSize: 25,
    borderStyle: 'none',
    outline: 'none',
    color: COLOR_YAQING
  },
  line: (err) => ({
    border: '0.5px solid ' + (err ? COLOR_ERROR_RED : COLOR_CRAB_SHELL_CYAN),
  }),
};

export default styles;
