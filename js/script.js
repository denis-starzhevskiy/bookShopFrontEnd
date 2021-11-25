const linkAllBook = "http://localhost:8080/api/books";
const linkToMainPage = "http://127.0.0.1:5501/main_page.html";
const linkToCertainBook = "http://127.0.0.1:5501/book_page.html?id=";
const linkAllCategories = 'http://localhost:8080/api/categories';
const linkAllAuthors = 'http://localhost:8080/api/authors';


function toMainPage(){
    location = linkToMainPage;
}

// let request = new XMLHttpRequest();
// let response;

// request.responseType = 'json';

// request.open("GET", linkAllBook, true)

// request.send();

// request.onload = function(){
//     if(request.status != 200){
//         alert("Error : " + request.status);
//         return
//     }

//     response = request.response;

//     console.log(response);

//     response.forEach(element => {
//         console.log(element);
//         wrapBook(element)
//     });
// }


let promiseCategories = fetch(linkAllCategories)
  .then(response => response.json())

promiseCategories.then(
    result => {
        for(let i = 0; i < result.length; i++){
            console.log(result[i]);
            let details = document.createElement('details');
            let summary = document.createElement('summary');
            summary.innerText =result[i]["categoryName"] + "(" + result[i]["books"].length + " книги )";
            details.appendChild(summary);

            let subCategories = result[i]['subCategoryDtoSet'];

            for(let k = 0; k < subCategories.length; k++){
                let li = document.createElement('li');
                li.innerHTML = subCategories[k]['subCategoryName'];
                details.appendChild(li);
            }

            // li.onclick = function(){
            //     var element = document.querySelector('.mainDiv');
            //     while (element.firstChild) {
            //         element.removeChild(element.firstChild);
            //     }
            //     for(let j = 0; j < result[i]["books"].length; j++){
            //         wrapBook(result[i]["books"][j]);
            //     }
            //     if(result[i]["books"].length == 0){
            //         alert("it's worth to addding");
            //         location = linkToMainPage;
            //     }
            // }
            
            document.querySelector('.category-container').appendChild(details);
            }
        }
);

// let promiseAuthors = fetch(linkAllAuthors)
//   .then(response => response.json())

// promiseAuthors.then(
//     result => {
//         for(let i = 0; i < result.length; i++){
//             let li = document.createElement('li');

//             li.innerHTML = result[i]["authorName"] + "(" + result[i]["books"].length + ")";

//             li.onclick = function(){
//                 var element = document.querySelector('.mainDiv');
//                 while (element.firstChild) {
//                     element.removeChild(element.firstChild);
//                 }
//                 for(let j = 0; j < result[i]["books"].length; j++){
//                     wrapBook(result[i]["books"][j]);
//                 }
//                 if(result[i]["books"].length == 0){
//                     alert("it's worth to addding");
//                     location = linkToMainPage;
//                 }
//             }
            
//             document.getElementById('authors').appendChild(li);
//             }
//         }
// );


function wrapBook(element){
    let div = document.createElement('div');
    div.classList.add("bookDiv");

    let img = document.createElement('img');
    img.src = "data:image/png;base64," + element["photoData"];  
    img.alt = "Nothing else";
    div.insertBefore(img, div.firstChild);         


    let span = document.createElement("span");
    span.innerHTML = element["bookName"] + " : " +element["price"] + " грн";
    div.appendChild(span);
    
    div.onclick = function(){
        location = linkToCertainBook + element['id'];
    }
    
    document.querySelector('.mainDiv').appendChild(div);
}
