document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 4; // Number of items to display per page
    let currentPage = 1; // Current page number
    let searchData = []; // Array to store the filtered search results

    // Function to fetch data from the API and render the results for the specified page
    async function fetchDataAndRender(page) {
        try {
            const url = 'https://64a6fca7096b3f0fcc80ef97.mockapi.io/posts';
            const response = await fetch(url);
            const data = await response.json();
            const row1 = document.querySelector('.row1');
            row1.innerHTML = '';

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentData = searchData.length > 0 ? searchData.slice(startIndex, endIndex) : data.slice(startIndex, endIndex);

            if (!currentData.length) {
                const not = document.createElement('div');
                not.className = 'p-5 text-center';
                not.textContent = 'NOT FOUND';
                row1.appendChild(not);
            } else {
                currentData.forEach((post) => {
                    const card1 = document.createElement('div');
                    const img1 = document.createElement('img');
                    const card1Body = document.createElement('div');
                    const bodyTitle = document.createElement('h2');
                    const bodtText = document.createElement('p');
                    card1.classList.add('d-lg-flex', 'align-items-lg-center', 'justify-content-lg-between', 'p-sm-5');
                    card1Body.classList.add('ps-lg-5');
                    bodyTitle.classList.add('bodytitle', 'width-50', 'pb-5', 'fs-2', 'text-center', 'text-sm-start');
                    bodtText.classList.add('bodytext', 'w-sm-75', 'text-center', 'mx-0', 'text-sm-start');
                    img1.classList.add('p-5', 'p-sm-0');
                    img1.src = post.img;
                    img1.alt = post.title;
                    bodyTitle.textContent = post.title;
                    bodtText.textContent = post.body;
                    card1Body.append(bodyTitle, bodtText);
                    card1.append(img1, card1Body);
                    row1.appendChild(card1);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Initial rendering when the page loads with the first page
    fetchDataAndRender(currentPage);

    // Function to handle pagination button click
    function handlePageClick(pageNumber) {
        currentPage = pageNumber;
        fetchDataAndRender(currentPage);
    }

    // Function to create pagination buttons and append them to the DOM
    async function createPagination() {
        try {
            const url = 'https://64a6fca7096b3f0fcc80ef97.mockapi.io/posts';
            const response = await fetch(url);
            const data = await response.json();
            const totalItems = searchData.length > 0 ? searchData.length : data.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const pagination = document.querySelector('.pagination');

            pagination.innerHTML = '';

            // Create and add "1" button for the first page
            const firstButton = document.createElement('button');
            firstButton.textContent = '1';
            firstButton.addEventListener('click', () => handlePageClick(1));
            pagination.appendChild(firstButton);

            // Create and add "2" button for the second page if it exists
            if (totalPages >= 2) {
                const secondButton = document.createElement('button');
                secondButton.textContent = '2';
                secondButton.addEventListener('click', () => handlePageClick(2));
                pagination.appendChild(secondButton);
            }

            // Create and add "Next" button if there are more than two pages
            if (totalPages > 2) {
                const nextButton = document.createElement('button');
                nextButton.textContent = 'Next';
                nextButton.addEventListener('click', () => handlePageClick(currentPage + 1));
                pagination.appendChild(nextButton);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Initial creation of pagination buttons when the page loads
    createPagination();

    // Function to filter the data based on the input value and trigger rendering
    function filterAndRenderData() {
        const inputv = document.querySelector('.input');
        const query = inputv.value.trim().toLowerCase();
        searchData = [];

        fetch('https://64a6fca7096b3f0fcc80ef97.mockapi.io/posts')
            .then(response => response.json())
            .then(data => {
                searchData = data.filter(post => post.title.toLowerCase().includes(query));
                currentPage = 1;
                fetchDataAndRender(currentPage);
                createPagination();
            })
            .catch(error => console.log(error));
    }

    // Add 'input' event listener for inputv to handle changes
    const inputv = document.querySelector('.input');
    inputv.addEventListener('input', filterAndRenderData);
});
