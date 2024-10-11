window.onload = (event) => {
    
    const createCategories = document.getElementById('createCategories');
    createCategories.addEventListener('click', function(event){
    
        console.log('Hice click');
        window.location.href = './createCategories.html';
    });
    
    loadCategories();

};

const apiUrl = 'https://node-project1-e58o.vercel.app';

async function loadCategories() {
    try {
        const response = await fetch(`${apiUrl}/categories`, {   
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const categories = await response.json();
        console.log(categories);

        const tableBody = document.getElementById('categoriesTBody');
        tableBody.innerHTML = '';

        categories.forEach(categorie => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = categorie.category_id;

            const nameCell = document.createElement('td');
            nameCell.textContent = categorie.category_name;

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = categorie.description;

            const actionCell = document.createElement('td');

            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modificar';
            modifyButton.className = 'modify_button';
            modifyButton.onclick = () => modifyCategory(categorie.category_id);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete_button';
            deleteButton.onclick = () => deleteCategory(categorie.category_id);

            actionCell.appendChild(modifyButton);
            actionCell.appendChild(deleteButton); 

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        }); 


    } catch (error) {
        console.error(error);
    }
    
}

async function deleteCategory(id) {
    try {
        const response = await fetch(`${apiUrl}/deleteCategories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (response.ok) {
            window.alert('Categoría Eliminada Exitosamente.');
            location.reload(); 
        } else {
            window.alert('Categoría No Fue Eliminada.');
        }
    } catch (error) {
        console.error(error);
        window.alert('Tenemos problemas técnicos.');
    }
};

function modifyCategory (id) {
    window.location.href = `updateCategories.html?id=${id}`;
}