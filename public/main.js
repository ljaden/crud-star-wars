// UPDATE
const update = document.querySelector('#update-button')

update.addEventListener('click', ()=> {
  fetch('/quotes', {
    method:'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Darth Vadar',
      quote: 'I find your lack of faith disturbing.'
    })
  }).then(res => {
    if(res.ok) return res.json()
  })
    .then(response => {
      window.location.reload(true) //refresh page
    })
})

// DELETE
const deleteButton = document.querySelector('#delete-button')
const message = document.getElementById('message')

deleteButton.addEventListener('click', () => {
  fetch('/quotes', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Darth Vadar'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    if(response ==='No quote to delete') {
      message.textContent = "No Darth Vadar quote to delete"
    } else{
      window.location.reload(true)
    }
  })
})
