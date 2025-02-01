import { createBrowserRouter } from "react-router";
import AppLayout from "./components/AppLayout";
import About from "./components/About";
import Recipes from "./components/Recipes";
import Home from "./components/Home";
import RecipeDetails from "./components/RecipeDetails";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>error</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'showAllRecipes', element: <Recipes />,
                children:[
                    {path: ':id', element: <RecipeDetails/>}
                ]    
            }
        ]
    }
])