    const form = document.getElementById('register-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const urlEncodedData = new URLSearchParams(formData).toString();

      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData,
      })
        .then(async (response) => {
          console.log(response);

          if (response.ok) {
            console.log('Registration successful');
            const responseData = await response.json();
            alert(JSON.stringify(responseData));  
            window.location.href = "/login";
          } else {
            console.error('Registration failed');
            const responseData = await response.json();
            alert(JSON.stringify(responseData));
    
          }
        })
        .catch((error) => {
          console.error('Error:', error);

        });
    });