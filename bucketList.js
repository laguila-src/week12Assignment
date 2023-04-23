/*****
 *
 * 	WEEK 12 -   CREATE A FULL CRUD APPLICATION
 •	Create a full CRUD application of your choice using either an API or local Array.
	•	Use an existing API with AJAX to interact with it. 
	•	If you do not use an API, store the entities you will create, read, update, and delete in an array.
 •	Use a form to post new entities.
 •	Build a way for users to update or delete entities
 •	Use Bootstrap and CSS to style your project. 
 *
*****/

// Test Data using a local array
const itemList = [
  {
    id: 1,
    country: "Japan",
    places: "Tokyo, Kyoto, Osaka, Hiroshima",
  },

  {
    id: 2,
    country: "Jordan",
    places: "Petra, Amman, Wadi Rum",
  },

  {
    id: 3,
    country: "Greece",
    places: "Athens, Santorini, Mykonos, Corfu",
  },
];

const container = $("#items-container");

/***** RENDERING  *****/
let editItemId = null;

// Tells jquery to run the renderItems function when the webpage first loads
$(renderItems);

function renderItems() {
  container.empty(); // jquery method to remove all child nodes and content
  for (const item of itemList) {
    container.prepend(
      `
		<div class="col">
			<div class="card border-3 h-100" style="width: 18rem">
  				<img
				src="./images/${item.country}.jpg"
				class="card-img-top h-100 w-100 rounded"
				alt="..."
  				/>
  				<div class="card-body">
					<h5 class="card-title">${item.country}</h5>
					<p class="card-text">${item.places}</p>
  				</div>
				<div class="d-grid gap-2 d-md-flex justify-content-md-end">
					<button onclick="deleteItem(${item.id})" class="btn btn-secondary btn-sm">🗑</button>
					<button onclick="startEditItem(${item.id})" class="btn btn-secondary btn-sm">✎</button>
				</div>
			</div>
		</div>
		`
    );
  }
}

let nextId = 10; // arbitrary id

/***** EVENT LISTENERS *****/

const country = $("#country-name");
const places = $("#places-to-visit");

/***** CREATE AN ITEM IN BUCKET LIST *****/
function addItem() {
  const newItem = {
    id: nextId++,
    country: country.val(),
    places: places.val(),
  };

  itemList.push(newItem);

  // For a better user experience, set these values to blank
  country.val("");
  places.val("");
  renderItems();
}

/***** DELETE AN ITEM IN BUCKET LIST */
function deleteItem(idToDelete) {
  const index = itemList.findIndex((item) => item.id === idToDelete);
  itemList.splice(index, 1);
  renderItems();
}

/***** UPDATE/EDIT ITEM IN BUCKET LIST *****/

/*****USING BOOTSTRAP MODAL COMPONENT FOR EDIT/UPDATE OF ITEM. A WINDOW POPS OUT *****/
const countryNameInput = $("#new-country-input");
const placesInput = $("#new-places-input");
const fileModal = new bootstrap.Modal("#item-modal");

function startEditItem(id) {
  const itemToUpdate = itemList.find((item) => item.id === id);
  editItemId = id;

  // Get the form ready for the user: display current information
  countryNameInput.val(itemToUpdate.country);
  placesInput.val(itemToUpdate.places);

  // open the modal
  fileModal.show();
}
function finishEditItem() {
  const itemToUpdate = itemList.find((item) => item.id === editItemId);

  itemToUpdate.country = countryNameInput.val();
  itemToUpdate.places = placesInput.val();

  editItemId = null;

  countryNameInput.val("");
  placesInput.val("");

  renderItems();
}

function saveItem() {
  if (editItemId === null) {
    addItem();
  } else {
    finishEditItem();
    fileModal.hide();
  }
}
