const {remote} = require('electron');
const wnd = remote.getCurrentWindow();

const reqURL = 'https://jsonplaceholder.typicode.com/users';

const body = {
   name: 'Danil',
   age: 40
}

document.addEventListener('DOMContentLoaded', () => {
   const contApp = document.querySelector('.content');
   document.body.addEventListener('click', (e)=> {
      switch (e.target.dataset.id) {
         case 'close':
            wnd.close()
            break;
         case 'serv_get':
            reqRes('GET', reqURL)
               .then(data => contApp.innerHTML = parseData(data))
               .catch(err => console.log(err))
            break;
         case 'serv_post':
            reqRes('POST', reqURL, body)
               .then(data => console.log(data))
               .catch(err => console.log(err))
            break;
      }
   })
})

function reqRes(method, url, body = null) {
   const headers = {
      'Content-type': 'application/json'
   }
   if (method === 'GET') {
      return fetch(url).then(response =>{
         return response.json()
      })
   } else if (method === 'POST') {
      return fetch(url, {
         method: method,
         body: JSON.stringify(body),
         headers: headers
      }).then(response => {
         if (response.status <=400) {
            return response.json()
         } else {
            return response.json().then(err => {
               const e = new Error('not a num')
               e.data = err
               throw e
            })
         }
      })
   }

}

function parseData(data) {
   const tamp = [];
   data.forEach((el) => {
      tamp.push(`<div class="out"> id: ${el['id']},  name: ${el['name']},  username: ${el['username']}</div>`)
   })
   return  tamp.join('');
}
