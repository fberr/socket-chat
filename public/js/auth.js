
const miFormulario = document.querySelector('form');


// const url = ( window.location.hostname.includes('localhost') )
//             ? 'http://localhost:8080/api/auth/'
//             : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

            const url = "http://localhost:8080/api/auth/";



miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for( let el of miFormulario.elements ) {
        if ( el.name.length > 0 ) 
            formData[el.name] = el.value
    }

    console.log(formData);

    fetch( url + 'login', {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json() )
    .then( ({ msg, token }) => {
        if( msg ){
            return console.error( msg );
        }

        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( err => {
        console.log(err)
    })
    
});



      function handleCredentialResponse(response) {
        //Google Token = ID_TOKEN
        //  console.log('ID_TOKEN',response.credential);
        const body = { id_token: response.credential };
        fetch(url + 'google', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((resp) => resp.json())
         .then((resp) => {
           console.log(resp);
            localStorage.setItem('email', resp.usuario.correo);
            localStorage.setItem('token', resp.token);
            window.location = 'chat.html';

          })
       
          .catch( console.log('error'));
      }

      const button = document.getElementById("google_signout");
      button.onclick = () => {
        
        if (!window.localStorage.length == 0 ) {
            google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
                localStorage.clear();
                console.log('clean localStorage');
                // location.reload();
          });


         }
      };