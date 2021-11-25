const linkAllBook = "http://localhost:8080/api/books";
const linkToMainPage = "http://127.0.0.1:5501/main_page.html";
const linkToCertainBook = "http://127.0.0.1:5501/book_page.html?id=";
const linkAllCategories = 'http://localhost:8080/api/categories';
const linkAllAuthors = 'http://localhost:8080/api/authors';


var url = new URL(document.location.href);

var searchParams = new URLSearchParams(url.search.substring(1));

var id = searchParams.get("id");

console.log("id=" + id);

function toMainPage(){
    location = linkToMainPage;
}

let promise = fetch('http://localhost:8080/api/books/' + id)
  .then(response => response.json())

promise.then(
    result => {
        console.log(result);

        let div = document.querySelector('.mainDiv');

        let link = '';

        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                if(key == 'links'){
                    link = result[key][0].href;
                    continue;
                }
                if(key == 'photoData'){
                    let img = document.createElement('img');
                    img.src = "data:image/png;base64," + result[key];  
                    img.alt = "Nothing else";
                    div.insertBefore(img, div.firstChild);
                    continue;           
                }

                let span = document.createElement("span");
                span.innerHTML = `${key} : ${result[key]}`;
                div.appendChild(span);
            }
        }
    }
);

let promise_book = fetch(linkAllCategories)
  .then(response => response.json())

promise_book.then(
    result => {
        for(let i = 0; i < result.length; i++){
            let li = document.createElement('li');

            li.innerHTML = result[i]["categoryName"] + "(" + result[i]["books"].length+")";

            li.onclick = function(){
                var element = document.querySelector('.mainDiv');
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                for(let j = 0; j < result[i]["books"].length; j++){
                    wrapBook(result[i]["books"][j]);
                }
                if(result[i]["books"].length == 0){
                    alert("it's worth to addding");
                    location = linkToMainPage;
                }
            }
            
            document.getElementById('categories').appendChild(li);
            }
        }
);

let promiseAuthors = fetch(linkAllAuthors)
  .then(response => response.json())

promiseAuthors.then(
    result => {
        for(let i = 0; i < result.length; i++){
            let li = document.createElement('li');

            li.innerHTML = result[i]["authorName"] + "(" + result[i]["books"].length + ")";

            li.onclick = function(){
                var element = document.querySelector('.mainDiv');
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                for(let j = 0; j < result[i]["books"].length; j++){
                    wrapBook(result[i]["books"][j]);
                }
                if(result[i]["books"].length == 0){
                    alert("it's worth to addding");
                    location = linkToMainPage;
                }
            }
            
            document.getElementById('authors').appendChild(li);
            }
        }
);

function wrapBook(element){
    // let div = document.createElement('div');
    //     div.classList.add("bookDiv");

    //     let link = '';
        
    //     for (var key in element) {
    //         if (element.hasOwnProperty(key)) {
    //             if(key == 'links'){
    //                 link = element[key][0].href;
    //                 continue;
    //             }
    //             if(key == 'photoData'){
    //                 let img = document.createElement('img');
    //                 img.src = "data:image/png;base64," + element[key];  
    //                 img.alt = "Nothing else";
    //                 div.insertBefore(img, div.firstChild);
    //                 continue;           
    //             }

    //             let span = document.createElement("span");
    //             span.innerHTML = `${key} : ${element[key]}`;
    //             div.appendChild(span);
    //         }
    //     }

    //     div.onclick = function(){
    //         location = linkToCertainBook + element['id'];
    //     }
        
    //     document.querySelector('.mainDiv').appendChild(div);
    let div = document.createElement('div');
    div.classList.add("bookDiv");

    let img = document.createElement('img');
    img.src = "data:image/png;base64," + element["photoData"];  
    img.alt = "Nothing else";
    div.insertBefore(img, div.firstChild);         


    let span = document.createElement("span");
    span.innerHTML = element["bookName"];
    div.appendChild(span);

    div.onclick = function(){
        location = linkToCertainBook + element['id'];
    }

    document.querySelector('.mainDiv').appendChild(div);
}



