import RecipeCard from './RecipeCard'

export default function RecipeList({
  filteredRecipes,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  editing,
  onBeginEditing,
  onCancelEditing,
  onToggleFavorite,
  onDeleteRecipe,
  onSaveRecipeName,
  onSaveIngredientField,
  onSaveDirectionText,
}) {
  return (
    <section className="rounded-3xl border border-orange-200 bg-white p-6 shadow-md sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-orange-950">Recipes</h2>
        <button
          type="button"
          onClick={onToggleFavoritesOnly}
          className="rounded-lg border border-orange-300 px-3 py-2 text-sm font-medium text-orange-900 hover:bg-orange-100"
        >
          {showFavoritesOnly ? 'Show All Recipes' : 'Show Favorites Only'}
        </button>
      </div>

      <div className="space-y-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            editing={editing}
            onBeginEditing={onBeginEditing}
            onCancelEditing={onCancelEditing}
            onToggleFavorite={onToggleFavorite}
            onDeleteRecipe={onDeleteRecipe}
            onSaveRecipeName={onSaveRecipeName}
            onSaveIngredientField={onSaveIngredientField}
            onSaveDirectionText={onSaveDirectionText}
          />
        ))}

        {filteredRecipes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-orange-300 bg-orange-50 p-6 text-center text-orange-900">
            No recipes in this view yet. Add a recipe or switch off favorites-only mode.
          </div>
        )}
      </div>
    </section>
  )
}
