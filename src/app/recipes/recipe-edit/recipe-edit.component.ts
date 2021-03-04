import { RecipeService } from '../recipe.service'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import { Params, ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode = false
  recipeForm: FormGroup
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingridients')).controls
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null
      this.initForm()
    })
  }
  initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    let recipeIngridients = new FormArray([])
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description
      if (recipe['ingridients']) {
        for (let i = 0; i < recipe.ingridients.length; i++) {
          recipeIngridients.push(
            this.fb.group({
              name: [recipe.ingridients[i].name, Validators.required],
              amount: [
                recipe.ingridients[i].amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
              ],
            })
          )
        }
      }
    }
    this.recipeForm = this.fb.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingridients: recipeIngridients,
    })
  }
  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingridients']
    // )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }
  onAddIngridient() {
    ;(<FormArray>this.recipeForm.get('ingridients')).push(
      this.fb.group({
        name: [null, Validators.required],
        amount: [
          null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
        ],
      })
    )
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  onDeleteIngridient(i: number) {
    ;(<FormArray>this.recipeForm.get('ingridients')).removeAt(i)
  }
}
