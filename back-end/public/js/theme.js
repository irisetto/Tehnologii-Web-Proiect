
const body = document.querySelector('body'),
  toggleWrapper = document.querySelector('.toggle__wrapper'),
  toggleButton = document.querySelector('.toggle__button');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    toggleButton.classList.add('toogle--movement');
    body.classList.add('body--dark--mode');
  }
  

// // Event Listeners

toggleWrapper.addEventListener('click', toggleMovement);

// // Functions

function toggleMovement() {
  toggleButton.classList.toggle('toogle--movement');
  body.classList.toggle('body--dark--mode');

  const theme = body.classList.contains('body--dark--mode') ? 'dark' : 'light';

  localStorage.setItem('theme', theme);

  updateThemeInDatabase(theme);
}


async function updateThemeInDatabase(theme) {
  try {
    const token = localStorage.getItem('token');
    const body = JSON.stringify({ theme: theme });
    const response = await fetch('http://localhost:3000/api/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: body
    });

    if (response.ok) {
      console.log('Theme updated in the database');
    } else {
      console.error('Failed to update theme in the database');
    }
  } catch (error) {
    console.error('Error updating theme in the database:', error);
  }
}

