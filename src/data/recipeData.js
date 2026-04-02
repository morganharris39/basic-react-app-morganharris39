export const makeId = () => Date.now() + Math.floor(Math.random() * 100000)

export const createIngredient = () => ({
  id: makeId(),
  measure: '',
  name: '',
})

export const createDirection = () => ({
  id: makeId(),
  text: '',
})

export const createRecipeDraft = () => ({
  name: '',
  ingredients: [createIngredient()],
  directions: [createDirection()],
})

export const initialRecipes = [
  {
    id: makeId(),
    name: 'Chocolate Chip Cookies',
    favorite: true,
    ingredients: [
      { id: makeId(), measure: '1 cup', name: 'butter, softened' },
      { id: makeId(), measure: '3/4 cup', name: 'brown sugar' },
      { id: makeId(), measure: '2 cups', name: 'flour' },
      { id: makeId(), measure: '1 cup', name: 'chocolate chips' },
    ],
    directions: [
      { id: makeId(), text: 'Cream the butter and sugar until fluffy.' },
      { id: makeId(), text: 'Mix in flour, then fold in chocolate chips.' },
      { id: makeId(), text: 'Bake at 350F for 10 to 12 minutes.' },
    ],
  },
]
