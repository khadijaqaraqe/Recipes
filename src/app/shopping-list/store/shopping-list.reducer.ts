import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedeIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedeIngredientIndex: -1
};

export function shoppingListReducer(
    state: State = initialState,
    action: ShoppingListActions.ShoppingListActions//ShoppingListActions.AddIngredient
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedeIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedeIngredientIndex: -1
            };
        default:
            return state;
    }
}