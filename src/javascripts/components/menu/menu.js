import './menu.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import smash from '../../helpers/data/smash';
import menuData from '../../helpers/data/menuData';
import menuIngredientsData from '../../helpers/data/MenuIngredientData';

const removeMenuIngredients = (menuId) => {
  menuIngredientsData.getAllMenuIngredients().then((ingredients) => {
    const menuIngredientsToDelete = ingredients.filter((x) => x.menuItemId === menuId);
    menuIngredientsToDelete.forEach((menuIngredient) => {
      menuIngredientsData.deleteMenuIngredients(menuIngredient.id);
    });
  }).catch((err) => console.error(err));
};

const removeFromMenu = (e) => {
  const menuToDelete = $(e.target).closest('.card').attr('id');
  menuData.deleteMenuItem(menuToDelete).then(() => {
    removeMenuIngredients(menuToDelete);
    // eslint-disable-next-line no-use-before-define
    printMenuCards();
  }).catch((err) => console.error(err));
};

const printMenuCards = () => {
  smash.getMenuWithIngredients().then((menuArr) => {
    let menuString = `
      <h2 class="whiteh1">Menu</h2>
      <button class="cudButton hide btn btn-secondary m-1"><i class="fas fa-plus cudButton hide whiteh1 cursor">Add Menu Item</i></button>
      <div class="container mx-auto">
      <div class="d-flex flex-wrap flex-row">
    `;
    menuArr.forEach((item) => {
      const ingredientString = item.ingredientName.join(', ');
      menuString += `
        <div id="${item.id}" class="card col-6">
          <div class="row d-flex">
            <div class="imgDiv col-5">
              <img class="card-img" src="${item.imgUrl}" alt="picture of ${item.name}" />
            </div>
            <div class="menuDetails col-7">
              <div class="row d-flex">
                <h5 class="card-title text-center col-6 p-0">${item.name}</h5>
                <h5 class="card-title text-center col-5 offset-1 p-0">$${(item.price / 100).toFixed(2)}</h5>
              </div>
              <div class="row d-flex">
                <p class="card-title text-center col-6 p-0">${item.category}</p>
                <p class="card-title text-center col-5 offset-1 p-0">${item.isAvailable}</p>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row d-flex">
              <p class="card-text col-11">${item.description}</p>
              <button class="cudButton hide btn btn-secondary col-1"><i class="fas fa-pencil-alt"></i></button>
            </div>
            <div class="row d-flex">
              <p class="card-text col-11">Ingredients: ${ingredientString}</p>
              <button class="cudButton hide btn btn-secondary col-1"><i class="fas fa-pencil-alt"></i></button>
            </div>
            <div class="card-text">
              <small class="text-muted d-flex align-right">
              <button class="cudButton hide btn btn-secondary col-1 deleteMenuItem"><i class="fas fa-trash-alt" id=${item.id}></i></button>
              </small>
            </div>
          </div>
        </div>
      `;
    });
    menuString += '</div></div>';
    utilities.printToDom('printComponent', menuString);
    $('body').on('click', '.deleteMenuItem', removeFromMenu);
  }).catch((err) => console.error(err));
};
export default { printMenuCards };