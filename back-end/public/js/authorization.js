const authorizeRoute = () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    window.location.href = "/";
  }

  const request = new XMLHttpRequest();

  request.open("GET", "http://localhost:3000/verify", false);
  request.setRequestHeader("Authorization", `Bearer ${token}`);
  request.send();

  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    const { result } = response;
    if (!result) {
      window.location.href = "/";
    }
  }
};

authorizeRoute();
