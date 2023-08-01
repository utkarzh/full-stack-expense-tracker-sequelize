const form = document.getElementById("myform");
const email = document.getElementById("email");
const password = document.getElementById("password");

console.log("atleast working");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("event listener working aswell");
  try {
    const res = await axios.post("http://localhost:3000/login", {
      email: email.value,
      password: password.value,
    });
    const token = res.data.token;
    localStorage.setItem("token", token);

    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Invalid username or Password");
  }
});
