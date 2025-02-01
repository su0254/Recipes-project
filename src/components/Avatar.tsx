import { Avatar } from "@mui/material";
import { createContext, Dispatch, useContext } from "react";
import { CurrentUser } from "./Header";

export const IsUpdate = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])

const avatar = () => {

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    const userContext = useContext(CurrentUser)
    console.log(userContext);
    
    const lastName: string = userContext.user.lastName ? userContext.user.lastName : ''
    const firstName: string = userContext.user.firstName ? userContext.user.firstName : ''

    return (
        <>
                <Avatar sx={{ bgcolor: stringToColor(lastName) }}>{firstName[0]}</Avatar>
                hello {firstName}
        </>)
}

export default avatar;