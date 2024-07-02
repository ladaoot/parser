import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Pages } from './pages/index.js'

const theme = {
  styles: {
    global: (props) => ({
      'html, body': {
        fontSize: 'sm',
        color: 'dark' ,
        lineHeight: 'tall',
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
      },
    }),
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode  >
    <ChakraProvider  theme={theme}>
      <Pages />
    </ChakraProvider>
  </React.StrictMode>
)