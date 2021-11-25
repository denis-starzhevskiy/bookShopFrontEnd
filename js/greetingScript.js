const linkAllBook = "http://localhost:8080/api/books";
const linkToMainPage = "http://127.0.0.1:5501/main_page.html";
const linkToCertainBook = "http://127.0.0.1:5501/book_page.html?id=";
const linkAllCategories = 'http://localhost:8080/api/categories';
const linkAllAuthors = 'http://localhost:8080/api/authors';


let loginForm = document.querySelector('.login-form-container');

document.getElementById("login-btn").onclick = function(){
    loginForm.classList.toggle('active');
}
  
document.querySelector('#close-login-btn').onclick = function(){
    loginForm.classList.remove('active');
}

let promise = fetch('http://localhost:8080/api/books')
  .then(response => response.json())

promise.then(
    result => {
        console.log(result);

        let span = document.querySelector('.category-container');

        for (let i =0; i < result.length; i++) {
            console.log(result[i]);
            let div = document.createElement('div');
            div.classList.add("featured-book");
        
            let img = document.createElement('img');
            img.src = "data:image/png;base64," + result[i]["photoData"];  
            img.alt = "Nothing else";
            div.insertBefore(img, div.firstChild);         
        
            div.onclick = function(){
                location = linkToCertainBook + result[i]['id'];
            }
        
            span.appendChild(div);
        }
    }
)
.catch(err => {
    document.querySelector('.heading').classList.add("display-none");
    document.querySelector('hr').classList.add("display-none")
    document.querySelector('.category-container').style.display = 'none';
})
.finally(() => preLoadFinish());


function preLoadFinish() {
    let preloader = document.getElementById('page-preloader'),
        spinner   = preloader.children[0];
    spinner.style.display = 'none';
    preloader.style.display = 'none';
};

(async () => {
    const rawResponse = await fetch('http://localhost:8080/api/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: 1, password: 'Textual content'})
    });
    const content = await rawResponse.json();
  
    console.log(content);
})();