import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Ingredient } from '../shared/ingredient.model';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
   // recipeSelected = new Subject<Recipe>();
    private recipes: Recipe[] = [];
    /* private recipes: Recipe[] = [
        new Recipe('First Recipe', 'First Recipe Description',
        'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
        [   new Ingredient('Jam', 1),
            new Ingredient('Banana', 1),
            new Ingredient('Sugar', 3),
            new Ingredient('Milk', 2)
        ]),
            new Recipe('Second Recipe', 'Second Recipe Description', 
        'https://www.forksoverknives.com/wp-content/uploads/vegan-quesadilla-recipe-quick-easy-plant-based-recipes.jpg',
        [   new Ingredient('Oil', 4),
            new Ingredient('Flour', 7),
            new Ingredient('Cocoa', 6),
            new Ingredient('Coconut', 2)
        ]),
        new Recipe('Third Recipe', 'Third Recipe Description', 
        'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg',
        [   new Ingredient('Pasta', 4),
            new Ingredient('Peper', 6),
            new Ingredient('Water', 1),
            new Ingredient('Orange', 5)
        ])
    ]; */
    
    constructor(
        private store: Store<fromApp.AppState>
    ){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes.slice()[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        //this.shoppingListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe (index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}