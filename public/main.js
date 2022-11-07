var check = document.getElementsByClassName("fa-check");
var bookMark = document.getElementsByClassName("fa-bookmark");
var trash = document.getElementsByClassName("fa-trash-o");

Array.from(check).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const bookName = this.parentNode.parentNode.childNodes[3].innerText
        const status = this.parentNode.parentNode.childNodes[5].innerText
        fetch('books', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'bookName': bookName,
            'status': status
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(bookMark).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const bookName = this.parentNode.parentNode.childNodes[3].innerText
    const status = this.parentNode.parentNode.childNodes[5].innerText
    fetch('bookmarks', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'bookName': bookName,
        'status': status
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         //add phone number
//         const cart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         console.log(thumbDown)
//         //fetches to api created in routes
//         //a request
//         fetch('dislikes', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'cart': cart
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const bookName = this.parentNode.parentNode.childNodes[3].innerText
        fetch('books', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'bookName': bookName,
         
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
