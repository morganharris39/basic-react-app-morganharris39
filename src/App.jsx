import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import { useRecipeManager } from './hooks/useRecipeManager'

export default function App() {
  const {
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
  } = useRecipeManager()

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-lime-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="rounded-3xl border border-orange-200 bg-white/85 p-6 shadow-lg backdrop-blur-sm sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-orange-950 sm:text-4xl">
            Recipe Box
          </h1>
          <p className="mt-2 text-orange-900/75">
            Build and manage your recipes with ingredients, measurements, and step-by-step directions.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-orange-950">
            <span className="rounded-full bg-orange-100 px-3 py-1">{recipes.length} total recipes</span>
            <span className="rounded-full bg-yellow-100 px-3 py-1">{favoriteCount} favorites</span>
          </div>
        </header>

        <AddRecipeForm
          newRecipe={newRecipe}
          onNameChange={handleNewRecipeName}
          onAddIngredient={addIngredientRow}
          onRemoveIngredient={removeIngredientRow}
          onIngredientChange={updateNewIngredient}
          onAddDirection={addDirectionRow}
          onRemoveDirection={removeDirectionRow}
          onDirectionChange={updateNewDirection}
          onSubmit={addRecipe}
        />

        <RecipeList
          filteredRecipes={filteredRecipes}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
          editing={editing}
          onBeginEditing={beginEditing}
          onCancelEditing={cancelEditing}
          onToggleFavorite={toggleFavorite}
          onDeleteRecipe={deleteRecipe}
          onSaveRecipeName={saveRecipeName}
          onSaveIngredientField={saveIngredientField}
          onSaveDirectionText={saveDirectionText}
        />
      </div>
    </div>
  )
}
