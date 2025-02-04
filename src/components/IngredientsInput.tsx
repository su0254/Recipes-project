import { TextField } from '@mui/material';
import React, { useState } from 'react';

const IngredientsInput: React.FC<{ onIngredientsChange: (ingredients: string[]) => void }> = ({ onIngredientsChange }) => {
    const [ingredients, setIngredients] = useState<string[]>(['']);

    const handleInputChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
        onIngredientsChange(newIngredients);
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (ingredients[index].trim() !== '') {
                setIngredients([...ingredients, '']);
                onIngredientsChange([...ingredients, '']);
            }
        }
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
        onIngredientsChange(newIngredients);
    };

    return (
        <div>
            {ingredients.map((ingredient, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <div><TextField
                        id={`ingredient${index}`}
                        label={`ingredient ${index+1}`}
                        variant="standard"
                        value={ingredient}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(index, e)}
                        placeholder="enter ingredient"
                    />
                    </div>
                    <button onClick={() => handleRemoveIngredient(index)}>✖</button>
                </div>
            ))}
        </div>
    );
};

export default IngredientsInput;
