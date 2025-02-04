import { useSelector } from 'react-redux';
import { StoreType } from '../store/store';
import { RecipeType } from '../types/recipeType';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';
import { useParams } from 'react-router';

const RecipeDetails = () => {
   
    const { id } = useParams<{ id: string }>();
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    
    const recipe: RecipeType = recipesList.find((r: { id: number; }) => r.id === Number(id));

    if (!recipe) {
        return <Typography variant="h6">recipe is not found</Typography>;
    }
    return (
        <>
        <Box  sx={{ 
            position: 'absolute',
            top: '15%',
            maxWidth: '75%',
            marginLeft: '3%',
            marginTop:'0%',
            padding: 2, 
            backgroundColor: '#f9f9f9', 
            borderRadius: 2, 
            boxShadow: 1,
           
        }}>
            <Typography variant="h4" component="h1" gutterBottom>{recipe.title}</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>{recipe.description}</Typography>
            <Typography variant="h6" component="h2" gutterBottom>Ingredients</Typography>
            <List sx={{ paddingLeft: 2 }}>
                {recipe.ingredients.map((ingredient, index) => (
                    <ListItem key={index}>
                        <Typography variant="body1">{ingredient}</Typography>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ margin: '16px 0' }} />
            <Typography variant="h6" component="h2" gutterBottom>Instructions</Typography>
            <Typography variant="body1">{recipe.instructions}</Typography>
        </Box>
        </>
    );
};

export default RecipeDetails;
