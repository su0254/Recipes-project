import { Button } from "@mui/material"
import { IsLogin } from "./Header"
import { useContext } from "react"

const logout = () => {

    const [isLogin, setIsLogin] = useContext(IsLogin)
    console.log("logout");
    
    return (<>

        <Button onClick={()=>setIsLogin(false) } color="inherit">logout</Button>
    </>)
}
export default logout