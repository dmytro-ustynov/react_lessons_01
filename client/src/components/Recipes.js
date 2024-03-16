import {Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";

function ChosenRecipe({recipe}) {
    const {name, prepTimeMinutes, ingredients, instructions, image} = recipe

    return (<div>
        <h2>{name}</h2>
        {prepTimeMinutes && <div>prepare time: {prepTimeMinutes} min</div>}
        <div style={{display: 'flex'}}>
            {image && <img src={image} alt={name} width={480}/>}
            {ingredients && <div><h3>Ingredients:</h3>
                <ul style={{textAlign: "start"}}>
                    {ingredients.map((i, index) => <li key={index}>{i}</li>)}
                </ul>
            </div>}
        </div>

        {instructions && <div><h3>Instructions:</h3>
            <ol style={{textAlign: "start"}}>
                {instructions.map((i, index) => <li key={index}>{i}</li>)}
            </ol>
        </div>}

    </div>)
}


export default function Recipes() {

    const [recipe, setRecipe] = useState({})
    const [allRecipes, setAllRecipes] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        fetch('http://dummyjson.com/recipes?limit=50')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAllRecipes(data.recipes)
            })
    }, []);

    useEffect(() => {
        if (search.length < 3) {
            return
        }
        let r = allRecipes.find(r => r.name.toLowerCase().includes(search.toLowerCase()))

        if (r) {
            setRecipe(r)
        }

    }, [search]);

    const chooseRandom = () => {
        let r = allRecipes[Math.floor(Math.random() * allRecipes.length)]
        setRecipe(r)
        setSearch(r.name)
    }

    return (
        <div>
            <TextField label='Search recipe' value={search} onInput={(e) => {
                setSearch(e.target.value)
            }}/>
            <Button onClick={chooseRandom}>Random Recipe</Button>
            {!!recipe ? <ChosenRecipe recipe={recipe}/> : <div> recipe not found</div>}
        </div>
    )
}