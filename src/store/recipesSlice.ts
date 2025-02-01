import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RecipeType } from "../types/recipeType";
import header from "../components/Header";

const url='http://localhost:3000/api/recipes'
export const fetchData = createAsyncThunk('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            console.log('in async thunk');
            const response = await axios.get(url)
            return response.data
        }
        catch (e:any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe:RecipeType, thunkAPI) => {
        try {
            console.log('add in async thunk');
            const response = await axios.post(url,
                {
                    title: recipe.title,
                    description: recipe.description,
                    ingredients:recipe.ingredients,
                    instructions:recipe.instructions
                } ,
                {
                    headers:{
                        'user-id':""+recipe.authorId
                    }
                }
            )
            console.log(response.data);
            return response.data.recipe
        }
        catch (e:any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { list: [] as RecipeType[], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled,
                (state, action) => {
                    console.log('fulfilled');
                    state.list = [...action.payload]
                })
            .addCase(fetchData.rejected,
                () => {
                    console.log('failed');
                })
            .addCase(addRecipe.fulfilled,
                (state, action)=>{
                    console.log("add recipe");
                    
                    state.list = [...state.list, {...action.payload}]

                })
            .addCase(addRecipe.rejected,
                ()=>{
                    console.log("The add was faild");
                })
    }
});
export default recipesSlice;