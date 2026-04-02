import { useState } from 'react'
import {
  createDirection,
  createIngredient,
  createRecipeDraft,
  initialRecipes,
  makeId,
} from '../data/recipeData'

export function useRecipeManager() {
  const [recipes, setRecipes] = useState(initialRecipes)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [newRecipe, setNewRecipe] = useState(createRecipeDraft)
  const [editing, setEditing] = useState(null)

  const filteredRecipes = showFavoritesOnly
    ? recipes.filter((recipe) => recipe.favorite)
    : recipes

  const favoriteCount = recipes.filter((recipe) => recipe.favorite).length

  const handleNewRecipeName = (value) => {
    setNewRecipe((prev) => ({ ...prev, name: value }))
  }

  const addIngredientRow = () => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, createIngredient()],
    }))
  }

  const removeIngredientRow = (id) => {
    setNewRecipe((prev) => {
      if (prev.ingredients.length === 1) return prev

      return {
        ...prev,
        ingredients: prev.ingredients.filter((ingredient) => ingredient.id !== id),
      }
    })
  }

  const updateNewIngredient = (id, field, value) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient,
      ),
    }))
  }

  const addDirectionRow = () => {
    setNewRecipe((prev) => ({
      ...prev,
      directions: [...prev.directions, createDirection()],
    }))
  }

  const removeDirectionRow = (id) => {
    setNewRecipe((prev) => {
      if (prev.directions.length === 1) return prev

      return {
        ...prev,
        directions: prev.directions.filter((direction) => direction.id !== id),
      }
    })
  }

  const updateNewDirection = (id, value) => {
    setNewRecipe((prev) => ({
      ...prev,
      directions: prev.directions.map((direction) =>
        direction.id === id ? { ...direction, text: value } : direction,
      ),
    }))
  }

  const addRecipe = (event) => {
    event.preventDefault()

    const cleanedName = newRecipe.name.trim()
    const cleanedIngredients = newRecipe.ingredients
      .map((ingredient) => ({
        ...ingredient,
        measure: ingredient.measure.trim(),
        name: ingredient.name.trim(),
      }))
      .filter((ingredient) => ingredient.measure && ingredient.name)
    const cleanedDirections = newRecipe.directions
      .map((direction) => ({
        ...direction,
        text: direction.text.trim(),
      }))
      .filter((direction) => direction.text)

    if (!cleanedName || cleanedIngredients.length === 0 || cleanedDirections.length === 0) {
      return
    }

    setRecipes((prev) => [
      ...prev,
      {
        id: makeId(),
        name: cleanedName,
        favorite: false,
        ingredients: cleanedIngredients,
        directions: cleanedDirections,
      },
    ])

    setNewRecipe(createRecipeDraft())
  }

  const deleteRecipe = (recipeId) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId))
    setEditing((prev) => (prev?.recipeId === recipeId ? null : prev))
  }

  const toggleFavorite = (recipeId) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, favorite: !recipe.favorite } : recipe,
      ),
    )
  }

  const beginEditing = (details) => {
    setEditing(details)
  }

  const cancelEditing = () => {
    setEditing(null)
  }

  const saveRecipeName = (recipeId, value) => {
    const nextName = value.trim()
    if (!nextName) return

    setRecipes((prev) =>
      prev.map((recipe) => (recipe.id === recipeId ? { ...recipe, name: nextName } : recipe)),
    )
    setEditing(null)
  }

  const saveIngredientField = (recipeId, ingredientId, field, value) => {
    const nextValue = value.trim()
    if (!nextValue) return

    setRecipes((prev) =>
      prev.map((recipe) => {
        if (recipe.id !== recipeId) return recipe

        return {
          ...recipe,
          ingredients: recipe.ingredients.map((ingredient) =>
            ingredient.id === ingredientId ? { ...ingredient, [field]: nextValue } : ingredient,
          ),
        }
      }),
    )
    setEditing(null)
  }

  const saveDirectionText = (recipeId, directionId, value) => {
    const nextText = value.trim()
    if (!nextText) return

    setRecipes((prev) =>
      prev.map((recipe) => {
        if (recipe.id !== recipeId) return recipe

        return {
          ...recipe,
          directions: recipe.directions.map((direction) =>
            direction.id === directionId ? { ...direction, text: nextText } : direction,
          ),
        }
      }),
    )
    setEditing(null)
  }

  return {
    recipes,
    filteredRecipes,
    favoriteCount,
    showFavoritesOnly,
    setShowFavoritesOnly,
    newRecipe,
    editing,
    handleNewRecipeName,
    addIngredientRow,
    removeIngredientRow,
    updateNewIngredient,
    addDirectionRow,
    removeDirectionRow,
    updateNewDirection,
    addRecipe,
    deleteRecipe,
    toggleFavorite,
    beginEditing,
    cancelEditing,
    saveRecipeName,
    saveIngredientField,
    saveDirectionText,
  }
}
