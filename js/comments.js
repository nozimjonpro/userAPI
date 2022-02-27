const elCommentsList = document.querySelector('.comments__list');
const elCommentsTemplate = document.querySelector('#comments-template').content;
const elCommentsButtons = document.querySelector('.comments__buttons');


const postId = window.localStorage.getItem("postId");

elCommentsButtons.addEventListener('click', (evt)=>{
    if(evt.target.matches('.comments__prev-btn')){
        window.location.replace('comments.html')
        window.localStorage.removeItem('postId')
        window.location.replace('posts.html')
    }
    if(evt.target.matches('.comments__logout-btn')){
        window.location.replace('login.html');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('postId');
        window.localStorage.removeItem('userId');
    }
})



fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((data) => {
    const filteredComments = data.filter((comment) => comment.postId == postId);
    getComments(filteredComments, elCommentsList)
  });

  function getComments(array, node){
      node.innerHTML = null;
      const commentFragement = document.createDocumentFragment()
      array.forEach(comment => {
          const commentTemplate = elCommentsTemplate.cloneNode(true);
          commentTemplate.querySelector('.comment__heading').textContent = comment.name;
          commentTemplate.querySelector('.comment__link').textContent = comment.email;
          commentTemplate.querySelector('.comment__text').textContent = comment.body;
          commentFragement.appendChild(commentTemplate)
      });
      node.appendChild(commentFragement)
  }
  