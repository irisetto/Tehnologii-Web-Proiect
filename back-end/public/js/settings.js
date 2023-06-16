const getLoggedUser = async () => {
    const token = localStorage.getItem("token");
  
    const response = await fetch("/api/logUser", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error: " + response.status);
    }
  };
          const seeUsersButton = document.getElementById("see_users");
         seeUsersButton.addEventListener("click", handleSeeUsers);
  //afisarea informatiilor dinamic despre user
  function handleSeeUsers() {
    getLoggedUser()
      .then(async (user) => {
        if(user.is_admin === true)
        window.location.href = "./users";
     else {
      alert("Only admins can access this feature.");
    }
        
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  }