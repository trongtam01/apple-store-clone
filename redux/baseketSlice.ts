import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface BaseketState {
  items: Product[]
}

// Define the initial state using that type
const initialState: BaseketState = {
  items: [],
}

export const baseketSlice = createSlice({
  name: 'baseket',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToBaseket: (state: BaseketState, action: PayloadAction<Product>) => {
        state.items = [...state.items, action.payload]
    },
    removeFromBasket: (
        state: BaseketState,
        action: PayloadAction<{ id: string}>
    ) => {
        const index = state.items.findIndex(
            (item: Product) => item._id === action.payload.id
        )

        let newBaseket = [...state.items]

        if(index >= 0) {
            newBaseket.splice(index, 1)
        } else {
            console.log(`Cant remove product (id: ${action.payload.id} as its not in baseket!`);
        }

        state.items = newBaseket
    }
  },
})

export const { addToBaseket, removeFromBasket } = baseketSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.baseket.items
export const selectBaseketItemWithId = (state: RootState, id: string) => {
    state.baseket.items.filter((item: Product) => {
        item._id = id
    })
}
export const selectBaseketTotal = (state: RootState) => (
    state.baseket.items.reduce((total: number, item: Product) => (total += item.price), 0)
)

export default baseketSlice.reducer