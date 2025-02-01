import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createContext, Dispatch, useReducer, useState } from 'react';
import userType, { Action, UserType } from '../types/userType';
import Avatar from './Avatar';
import NavBar from './NavBar';
import UpdateUserDetails from './UpdateUserDetails';
import LoginUser from './LoginUser';
import AddRecipe from './AddRecipe';
import Logout from './Logout';

export const CurrentUser = createContext<{ user: UserType, userDispatch: Dispatch<Action> }>({
    user: {},
    userDispatch: () => null,
})

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])

export default function header() {

    const [isLogin, setIsLogin] = useState(false)
    const [user, userDispatch] = useReducer(userType, {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    })

    return (
        <IsLogin value={[isLogin, setIsLogin]}>
            <CurrentUser value={{ user, userDispatch, }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <Box>

                                {!isLogin && <LoginUser />}

                                {isLogin && <Avatar />}

                            </Box>
                            <Box>
                                {isLogin && <Logout />}
                            </Box>
                            <Box>
                                {isLogin && <UpdateUserDetails />}
                            </Box>

                            {/* <Box>
                                {(!isLogin || isLogin) && <RecipeList />}
                            </Box> */}

                            <Box>
                                {isLogin && <AddRecipe />}
                            </Box>

                            <Box>
                                <NavBar />
                            </Box>

                        </Toolbar>
                    </AppBar>
                </Box>
            </CurrentUser>
        </IsLogin>
    )
}
