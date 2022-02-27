const elUserPostList = document.querySelector(".posts__list");
const elUserPostTemplate = document.querySelector("#posts__template").content;
const elUserButtons = document.querySelector(".posts__buttons");

const userId = window.localStorage.getItem("userId");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    const filteredPosts = data.filter((post) => post.userId == userId);
    getPosts(filteredPosts, elUserPostList);
  });

elUserButtons.addEventListener("click", (evt) => {
  if (evt.target.matches(".posts__prev-btn")) {
    window.location.replace("posts.html");
    window.localStorage.removeItem('userId');
    window.location.replace("index.html");
  }
  if (evt.target.matches(".posts__logout-btn")) {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem('userId')
    window.location.replace("index.html");
  }
});
elUserPostList.addEventListener('click', (evt)=>{
    if(evt.target.matches('.post__comments-btn')){
        const postId = evt.target.dataset.postId;
        window.localStorage.setItem('postId', postId);
        window.location.replace('comments.html');
    }
})

function getPosts(array, node) {
  node.innerHTML = null;
  const postFragment = document.createDocumentFragment();
  array.forEach((post) => {
    const postTemplate = elUserPostTemplate.cloneNode(true);
    postTemplate.querySelector(".post__title").textContent = post.title;
    postTemplate.querySelector(".post__text").textContent = post.body;
    postTemplate.querySelector('.post__comments-btn').dataset.postId = post.id;
    postFragment.appendChild(postTemplate);
  });

  node.appendChild(postFragment);
}
