export default function AddRecipeForm({
  newRecipe,
  onNameChange,
  onAddIngredient,
  onRemoveIngredient,
  onIngredientChange,
  onAddDirection,
  onRemoveDirection,
  onDirectionChange,
  onSubmit,
}) {
  return (
    <section className="rounded-3xl border border-orange-200 bg-white p-6 shadow-md sm:p-8">
      <h2 className="text-xl font-semibold text-orange-950">Add New Recipe</h2>
      <form className="mt-5 space-y-5" onSubmit={onSubmit}>
        <div>
          <label htmlFor="recipe-name" className="mb-2 block text-sm font-medium text-orange-900">
            Recipe Name
          </label>
          <input
            id="recipe-name"
            type="text"
            value={newRecipe.name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Example: Lemon Garlic Chicken"
            className="w-full rounded-xl border border-orange-200 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-orange-900">Ingredients and Measurements</h3>
            <button
              type="button"
              onClick={onAddIngredient}
              className="rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200"
            >
              + Add Ingredient
            </button>
          </div>
          {newRecipe.ingredients.map((ingredient) => (
            <div key={ingredient.id} className="grid gap-2 sm:grid-cols-[170px_1fr_auto]">
              <input
                type="text"
                value={ingredient.measure}
                onChange={(event) => onIngredientChange(ingredient.id, 'measure', event.target.value)}
                placeholder="Measure (1 cup)"
                className="rounded-xl border border-orange-200 px-3 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
              <input
                type="text"
                value={ingredient.name}
                onChange={(event) => onIngredientChange(ingredient.id, 'name', event.target.value)}
                placeholder="Ingredient (sugar)"
                className="rounded-xl border border-orange-200 px-3 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
              <button
                type="button"
                onClick={() => onRemoveIngredient(ingredient.id)}
                className="rounded-lg border border-orange-200 px-3 py-2 text-sm text-orange-900 hover:bg-orange-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-orange-900">Directions</h3>
            <button
              type="button"
              onClick={onAddDirection}
              className="rounded-lg bg-orange-100 px-3 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200"
            >
              + Add Direction
            </button>
          </div>
          {newRecipe.directions.map((direction, index) => (
            <div key={direction.id} className="grid gap-2 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <span className="text-sm font-medium text-orange-900">{index + 1}.</span>
              <input
                type="text"
                value={direction.text}
                onChange={(event) => onDirectionChange(direction.id, event.target.value)}
                placeholder="Describe this step"
                className="rounded-xl border border-orange-200 px-3 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
              <button
                type="button"
                onClick={() => onRemoveDirection(direction.id)}
                className="rounded-lg border border-orange-200 px-3 py-2 text-sm text-orange-900 hover:bg-orange-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Save Recipe
        </button>
      </form>
    </section>
  )
}
