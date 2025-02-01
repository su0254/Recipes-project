import { Outlet } from "react-router"
import Header from "./Header"

const appLayout =()=>{
    return(<>
    <Header/>
    <Outlet/>
    </>)
}
export default appLayout