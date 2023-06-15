const checkTheme = async () => {
    const theme = localStorage.getItem('theme');
    
    // for (let i = 0; i < localStorage.length; i++) {
    //     const key = localStorage.key(i);
    //     const value = localStorage.getItem(key);
    //     console.log(`Key: ${key}, Value: ${value}`);
    // }

    if (theme === 'dark') {
        document.body.classList.add('body--dark--mode');
    } else {
        document.body.classList.remove('body--dark--mode');
    }
}

window.addEventListener('load', checkTheme);
