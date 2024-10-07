window.onload = async (event) => {
    const idCategory = getQueryParams('id');
    const category = await loadCategory(idCategory);
    const id = document.getElementById('id');
    const name = document.getElementById('name');
    const description = document.getElementById('description');

    id.value = category.category_id;
    name.value = category.category_name;
    description.value = category.description;

    categoriesForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        await updateCategory(idCategory, name.value, description.value);
    });
};
//const apiUrl = 'https://node-project-ql7a.vercel.app';

function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

async function loadCategory(id) {
    try {
        const response = await fetch(`http://localhost:3000/categories/${id}`, {
        //const response = await fetch(`${apiUrl}/categories/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const categories = await response.json();
        return categories[0];
    } catch (error) {
        console.error(error);
    }
};

async function updateCategory(id, categoryName, categoryDescription) {
    try {
        const response = await fetch(`http://localhost:3000/updateCategories/${id}`, {
        //const response = await fetch(`${apiUrl}/updateCategories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({categoryName, categoryDescription}),
        });
        const data = await response.json();
            if (response.ok) {
                window.alert('Categoría Actualizada Exitosamente.'); 
            } else {
                window.alert('Categoría No Fue Actualizada.');
            }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
};