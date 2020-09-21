var heart = document.getElementsByClassName("fa fa-heart");
var sad = document.getElementsByClassName("fa fa-frown-o");
var trash = document.getElementsByClassName("fa-trash");
//go into the thubUp element and grab the array
Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
//jumps on the list items and goes through each element in the array
        const name =
         this.parentNode.parentNode.children[0].innerText
        const msg = this.parentNode.parentNode.children[1].innerText
        const heart = parseFloat(this.parentNode.parentNode.children[2].innerText)
        //parse turns a string into a number
        fetch('messages', {
          method: 'put',
          //telling the fetch what you are doing and that it's a Json file
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            //grabing a json object and turning it into a string
            'name': name,
            'msg': msg,
            'heart':heart
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
Array.from(sad).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.children[0].innerText
        const msg = this.parentNode.parentNode.children[1].innerText
        const heart = parseFloat(this.parentNode.parentNode.children[2].innerText)
        if(heart === 0){
          console.log('hi')
        }
        else{

        fetch('sad', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'heart':heart
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      }
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
