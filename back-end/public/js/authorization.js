// const authorizeRoute = async () => {
//   const token = localStorage.getItem("token");
//   console.log(token);
//   const response = await fetch("http://localhost:3000/verify", {
//     method: "GET",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const { result } = await response.json();

//   if (!result) {
//     window.location.href = "/";
//   }
// };

// authorizeRoute();

const authorizeRoute = () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    window.location.href = "/";
  }
  console.log(token);

  const request = new XMLHttpRequest();

  request.open("GET", "http://localhost:3000/verify", false); 
  request.setRequestHeader("Authorization", `Bearer ${token}`);
  request.send();

  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    const { result } = response;
    console.log(result);
    if (!result) {
      window.location.href = "/";
    }
  }
};

authorizeRoute();
