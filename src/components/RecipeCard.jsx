function EditableValue({
  isEditing,
  defaultValue,
  onSave,
  onBeginEdit,
  textClassName,
  value,
  autoFocus = false,
}) {
  if (isEditing) {
    return (
      <div className="mt-1 flex gap-2">
        <input
          type="text"
          defaultValue={defaultValue}
          className="w-full rounded border border-orange-300 px-2 py-1 text-sm outline-none"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSave(event.currentTarget.value)
            }
          }}
          autoFocus={autoFocus}
        />
        <button
          type="button"
          onClick={(event) => {
            const input = event.currentTarget.parentElement?.querySelector('input')
            onSave(input?.value ?? '')
          }}
          className="rounded bg-emerald-600 px-2 py-1 text-xs text-white"
        >
          Save
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onBeginEdit}
      className={textClassName}
    >
      {value}
    </button>
  )
}

export default function RecipeCard({
  recipe,
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
    <article className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        {editing?.type === 'name' && editing.recipeId === recipe.id ? (
          <div className="flex w-full flex-wrap items-center gap-2">
            <input
              type="text"
              defaultValue={recipe.name}
              className="min-w-[220px] flex-1 rounded-lg border border-orange-300 px-3 py-2 outline-none focus:border-orange-500"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onSaveRecipeName(recipe.id, event.currentTarget.value)
                }
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={(event) => {
                const input = event.currentTarget.parentElement?.querySelector('input')
                onSaveRecipeName(recipe.id, input?.value ?? '')
              }}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancelEditing}
              className="rounded-lg border border-orange-300 px-3 py-2 text-sm text-orange-900 hover:bg-orange-100"
            >
              Cancel
            </button>
          </div>
        ) : (
          <h3 className="text-2xl font-semibold text-orange-950">{recipe.name}</h3>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onToggleFavorite(recipe.id)}
            className="rounded-lg bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200"
          >
            {recipe.favorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <button
            type="button"
            onClick={() => onBeginEditing({ type: 'name', recipeId: recipe.id })}
            className="rounded-lg border border-orange-300 px-3 py-2 text-sm text-orange-900 hover:bg-orange-100"
          >
            Edit Name
          </button>
          <button
            type="button"
            onClick={() => onDeleteRecipe(recipe.id)}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete Recipe
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-800">
            Ingredients
          </h4>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="rounded-lg border border-orange-100 bg-white p-3"
              >
                <div className="grid gap-2 sm:grid-cols-[1fr_1fr] sm:items-center">
                  <div>
                    <span className="block text-xs uppercase text-orange-700">Measure</span>
                    <EditableValue
                      isEditing={
                        editing?.type === 'ingredient-measure' &&
                        editing.recipeId === recipe.id &&
                        editing.itemId === ingredient.id
                      }
                      defaultValue={ingredient.measure}
                      value={ingredient.measure}
                      onSave={(value) => onSaveIngredientField(recipe.id, ingredient.id, 'measure', value)}
                      onBeginEdit={() =>
                        onBeginEditing({
                          type: 'ingredient-measure',
                          recipeId: recipe.id,
                          itemId: ingredient.id,
                        })
                      }
                      textClassName="mt-1 text-left text-sm text-orange-950 underline decoration-orange-300 underline-offset-4"
                      autoFocus
                    />
                  </div>

                  <div>
                    <span className="block text-xs uppercase text-orange-700">Ingredient</span>
                    <EditableValue
                      isEditing={
                        editing?.type === 'ingredient-name' &&
                        editing.recipeId === recipe.id &&
                        editing.itemId === ingredient.id
                      }
                      defaultValue={ingredient.name}
                      value={ingredient.name}
                      onSave={(value) => onSaveIngredientField(recipe.id, ingredient.id, 'name', value)}
                      onBeginEdit={() =>
                        onBeginEditing({
                          type: 'ingredient-name',
                          recipeId: recipe.id,
                          itemId: ingredient.id,
                        })
                      }
                      textClassName="mt-1 text-left text-sm text-orange-950 underline decoration-orange-300 underline-offset-4"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-800">
            Directions
          </h4>
          <ol className="space-y-2">
            {recipe.directions.map((direction, index) => (
              <li key={direction.id} className="rounded-lg border border-orange-100 bg-white p-3">
                <span className="mr-2 text-sm font-semibold text-orange-800">{index + 1}.</span>
                <EditableValue
                  isEditing={
                    editing?.type === 'direction' &&
                    editing.recipeId === recipe.id &&
                    editing.itemId === direction.id
                  }
                  defaultValue={direction.text}
                  value={direction.text}
                  onSave={(value) => onSaveDirectionText(recipe.id, direction.id, value)}
                  onBeginEdit={() =>
                    onBeginEditing({
                      type: 'direction',
                      recipeId: recipe.id,
                      itemId: direction.id,
                    })
                  }
                  textClassName="mt-1 text-left text-sm text-orange-950 underline decoration-orange-300 underline-offset-4"
                  autoFocus
                />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}
