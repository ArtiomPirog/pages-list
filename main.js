const paginationContainer = document.querySelector('.pagination-container');
const pageDescr = document.querySelector('.page-descr');

async function createPostsListPage(){
    const url = localStorage.url ? null : localStorage.setItem('url', 'https://gorest.co.in/public-api/posts?page=1');

    const response = await(await fetch(localStorage.url)).json();
    const pages = response.meta.pagination.pages;
    const pageNumber = response.meta.pagination.page;

    window.location.search === '' ? window.location.search = `page=${pageNumber}` : null;

    function addPagination(){
        pageDescr.textContent = `${pageNumber} страница`;

        for(let i = 1; i <= pages; ++i) {
            const paginationBtn = document.createElement('button');
            paginationBtn.classList.add('pagination-btn');
    
            paginationBtn.textContent = `${i}`;

            paginationBtn.addEventListener('click' , function() {
                localStorage.removeItem('url');
                localStorage.setItem('url', `https://gorest.co.in/public-api/posts?page=${i}`)
                window.location.search = `page=${i}`;
            })
    
            paginationContainer.append(paginationBtn);
        }
    }

    function addPosts() {
        response.data.map(element => {
            const postsList = document.querySelector('.posts-list')
            const itemPosts = document.createElement('li');
            const postCircle = document.createElement('div');
            const postDescr = document.createElement('p');
            const postBtn = document.createElement('button');

            itemPosts.classList.add('item-post')
            postCircle.classList.add('post-circle');
            postBtn.textContent = 'Перейти к статье'

            postBtn.addEventListener('click', function() {
                localStorage.removeItem('post');
                localStorage.setItem('post', JSON.stringify(element));
                window.open('Page2.html')
            })

            itemPosts.append(postCircle);
            postDescr.textContent = element.title;
            itemPosts.append(postDescr);
            itemPosts.append(postBtn);
            postsList.append(itemPosts);
        })
    }

    addPosts();
    addPagination();
    console.log(response)
 }


 async function createPostPage(){
    window.location.search === '' ? window.location.search = `id=${JSON.parse(localStorage.post).id}` : null;
    const urlParams = new URLSearchParams(window.location.search);
    const searchParams = urlParams.get('id');

    const response = await(await fetch(`https://gorest.co.in/public-api/comments?post_id=${searchParams}`)).json();

    const container = document.querySelector('.container-post');
    const title = document.createElement('h1');
    const descr = document.createElement('p');
    const localPage = JSON.parse(localStorage.post);

    title.textContent = localPage.title;
    descr.textContent = localPage.body;

    container.append(title);
    container.append(descr);

    response.data.map(element => {
        const authorContainer = document.createElement('div');
        const author = document.createElement('p');
        const authorComment = document.createElement('p');
        const authorEmail = document.createElement('p');
        authorContainer.classList.add('author-container');

        authorComment.textContent = `Comments: ${element.body}`;
        author.textContent = `Author: ${element.name}`;
        authorEmail.textContent = `Email: ${element.email}`;

        authorContainer.append(author);
        authorContainer.append(authorComment);
        authorContainer.append(authorEmail);
        container.append(authorContainer);
    })
 }
 
