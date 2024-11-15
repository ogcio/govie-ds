import { Notyf } from 'notyf';
import React  from 'react'

export default React.createContext(
  new Notyf({
    types: [{
        type: 'open',
    }]
  })
);