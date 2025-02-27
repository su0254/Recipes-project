
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import axios, { AxiosError } from "axios";
import { CurrentUser, IsLogin } from './Header';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function login() {
    const { user, userDispatch } = useContext(CurrentUser)
    const [, setIsLogin] = useContext(IsLogin)
    const [open, setOpen] = useState(false);
    const handleOpenLogin = () => { setClick("login"); setOpen(true); }
    const handleOpenRegister = () => { setClick("register"); setOpen(true); }
    const handleClose = () => setOpen(false);
    const [click, setClick] = useState("")

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const saveUser = async (e: React.FormEvent) => {
        e.preventDefault()
        const url = "http://localhost:3000/api/user/"
        try {
            const res = await axios.post(`${url}${click}`,
                {
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                }
            )
            
            userDispatch(
                {
                    type: 'ADD_USER',
                    data: click==="login"?{
                            ...res.data.user
                    }: {
                        id: res.data.userId,
                        email: emailRef.current?.value,
                        password: passwordRef.current?.value}
                })
                
            setIsLogin(true)
            handleClose();
        }
        catch (e: AxiosError | any) {
            if (e.response?.status === 422){
                handleClose();
                alert(e.response.data.message);
            }
            else if (e.response?.status===400) {
                handleClose();
                alert(e.response.data.message);
            }
            else if(e.response?.status===401){
                handleClose();
                alert(e.response.data.message);
            }
        }
    }
    return (
        <div>
            <Button onClick={handleOpenRegister} color="inherit">sign up</Button>
            <Button onClick={handleOpenLogin} color="inherit">sign in</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"         >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter your details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form action="">
                            <div><TextField id="standard-basic" label="email" variant="standard" inputRef={emailRef} type='email' required/></div>
                            <div><TextField id="standard-basic" label="password" variant="standard" inputRef={passwordRef} type='password' required /></div>
                            <div><Button onClick={(e: React.FormEvent) => saveUser(e)} type='submit'>Login</Button></div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}