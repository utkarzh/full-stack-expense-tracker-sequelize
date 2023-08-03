const form = document.getElementById("myform");
const namee = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const number = document.getElementById("number");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const confirmPassword = document.getElementById("cpassword").value;

  if (password.value !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }
  console.log;
  const user = {
    name: namee.value,
    email: email.value,
    password: password.value,
    number: number.value,
  };
  try {
    console.log(user);
    var res = await axios.post("http://localhost:3000/signup", user);
    console.log("success");
    window.location.href = "../login/login.html";
  } catch (error) {
    console.log(error);
    alert(
      "Signup failed might be because phone or email is already registered!"
    );
  }
});
