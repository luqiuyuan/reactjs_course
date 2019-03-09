let ref = null
let Popup = {
  open: (param) => ref && ref.open(param),
  close: () => ref && ref.close(),
  warn: (message) => Popup.open({ type: 'warn', message })
}

// export the UI of popup
// export { default as Modal } from './components/Modal';

// export the method to save Modal ref
export const register = _ref => ref = _ref


// export the open/close method as default
export default Popup;