import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { RecipeType } from "../types/recipeType";
import { array, object, string } from "yup";
import { useDispatch } from 'react-redux';
import { addRecipe } from "../store/recipesSlice";
import IngredientsInput from "./IngredientsInput";
import { CurrentUser } from "./Header";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RecipeDispatch } from "../store/store";

const AddNewRecipe = () => {
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

    const dispatch = useDispatch<RecipeDispatch>();
    const user = useContext(CurrentUser);

    const schema = object().shape({
        title: string().required("Title is a required field").min(5),
        description: string().required("Description is a required field").min(10).max(50),
        ingredients:array().required(),
        instructions: string().required("Instructions is a required field").max(50)
    });

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<RecipeType>({
        resolver: yupResolver(schema)
    });

    const handleIngredientsChange = (newIngredients: string[]) => {
        setValue("ingredients", newIngredients);
    };

    const onSubmit: SubmitHandler<RecipeType> = (recipe) => {
        console.log(recipe);
        
        setValue("authorId", Number(user.user.id))
        dispatch(addRecipe(recipe));
        handleClose();
        reset();
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} color="inherit">Add Recipe</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter a new recipe
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <TextField 
                                    id="title" 
                                    label="Title" 
                                    variant="standard" 
                                    {...register("title")} 
                                    error={!!errors.title} 
                                    helperText={errors.title?.message} 
                                />
                            </div>
                            <div>
                                <TextField 
                                    id="description" 
                                    label="Description" 
                                    variant="standard" 
                                    {...register("description")} 
                                    error={!!errors.description} 
                                    helperText={errors.description?.message} 
                                />
                            </div>
                            <IngredientsInput onIngredientsChange={handleIngredientsChange} />
                            <div>
                                <TextField 
                                    id="instructions" 
                                    label="Instructions" 
                                    variant="standard" 
                                    {...register("instructions")} 
                                    error={!!errors.instructions} 
                                    helperText={errors.instructions?.message} 
                                />
                            </div>
                            <div><Button type='submit'>Add</Button></div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default AddNewRecipe;
