import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import { Provider } from 'react-redux'
import store from './store/store'
import { createContext, Dispatch } from 'react'

export const IsAdd = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])

function App() {

  return (<>

    <Provider store={store}>
      <RouterProvider router={router} />

      {/* <IsAdd value={[isAdd, setIsAdd]}>
        <RecipesList />
      </IsAdd> */}

    </Provider>

  </>)
}

export default App
