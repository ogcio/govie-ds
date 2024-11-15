import { Notyf } from 'notyf';
import React  from 'react'

export default React.createContext(
  new Notyf({
    duration: 0, // Set your global Notyf configuration here
    types: [{
        type: 'test',
        className: 'testing-class',
        background: 'transparent'
    }]
  })
);