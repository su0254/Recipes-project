import { useDispatch, useSelector } from "react-redux";
import { RecipeDispatch, StoreType } from "../store/store";
import { Link, Outlet } from "react-router";
import { useEffect } from "react";
import { fetchData } from "../store/recipesSlice";

const Recipes = () => {

    const dispatch = useDispatch<RecipeDispatch>();
    useEffect(()=>{
        dispatch(fetchData())
    },[dispatch])

    const containerStyle:React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        margin: '10px',
        width: '25%', 
        position: 'absolute',
        right: '20px', 
        top: '15%' 
    }

    const linkStyle:React.CSSProperties = {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: 'transparent',
        color: 'black',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        maxWidth: '100%'
    }

    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);

    return (
        <>
            <div style={containerStyle}>
                {recipesList.map((r:{id:number, title:string}) => <Link to={`${r.id}`} style={linkStyle} key={r.id}>{r.title}</Link>)}
            </div>
            <Outlet />
        </>
    )
}
export default Recipes
