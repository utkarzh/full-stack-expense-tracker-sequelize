const form = document.getElementById("myform");
const email = document.getElementById("email");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(email.value);
  const ans = await axios.post(
    "http://localhost:3000/password/forgotpassword",
    {
      email: email.value,
    }
  );
  console.log(ans);
});
