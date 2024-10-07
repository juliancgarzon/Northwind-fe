window.onload = (event) => {

    //const apiUrl = 'https://node-project-ql7a.vercel.app';

    const categoriesForm = document.getElementById('categoriesForm');

    categoriesForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const categoryId = document.getElementById('id').value;
        const categoryName = document.getElementById('name').value;
        const categoryDescription = document.getElementById('description').value;

        try {
            //const response = await fetch(`${apiUrl}/createCategories`, {
            const response = await fetch(`http://localhost:3000/createCategories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({categoryId, categoryName, categoryDescription}),
            });
            const data = await response.json();
            if (response.ok) {
                window.alert('Categoría Creada Exitosamente.'); 
            } else {
                window.alert('Categoría No Fue Creada.');
            }
        } catch (error) {
            console.error(error);
            window.alert('Tenemos problemas técnicos.');
        }
    });
};