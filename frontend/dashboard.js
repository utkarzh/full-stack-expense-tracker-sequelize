const form = document.getElementById("myform");
const amount = document.getElementById("amount");
const desc = document.getElementById("desc");
const category = document.getElementById("category");
const display = document.getElementById("res");
const token=localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:3000/expenses", {
      amount: amount.value,
      desc: desc.value,
      category: category.value,
    });
    location.reload();
  } catch (error) {
    alert("Unable to add Expense!");
  }
});

display.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-danger")) {
    try {
      const id = e.target.id;
      console.log(id);
      await axios.delete("http://localhost:3000/expenses/" + id);
      location.reload();
    } catch (error) {
      alert("unable to delete the expense!");
    }
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:3000/expenses");
    
   
    createItem(res.data.expenses);
  } catch (error) {
    alert("unable to fetch records!");
  }
});

function createItem(res) {
  console.log(res[0]);
  res.forEach((item) => {
    const div = document.createElement("div");
    const hr = document.createElement("hr");
    const btn = document.createElement("button");
    btn.classList = "btn btn-danger btn-sm mx-1 my-3";
    btn.innerText = "Delete Expense";
    btn.setAttribute("id", item.id);

    div.classList = "container";
    div.innerHTML =
      '<div class="row"><div class="col-auto"><u>AMOUNT:</u>  <b>' +
      item.amount +
      '</b></div><div class="col-auto"><u>CATEGORY:</u>  <b>' +
      item.category +
      '</b></div><div class="col-auto"><u>DESCRIPTION</u>:  <b>' +
      item.desc +
      "</b></div></>";
    div.appendChild(btn);
    div.appendChild(hr);

    display.appendChild(div);
  });
}
