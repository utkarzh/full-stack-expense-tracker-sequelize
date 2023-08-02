const form = document.getElementById("myform");
const amount = document.getElementById("amount");
const desc = document.getElementById("desc");
const category = document.getElementById("category");
const display = document.getElementById("res");
const premium = document.getElementById("premium");
const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = token;

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

premium.addEventListener("click", async () => {
  try {
    const resp = await axios.get("http://localhost:3000/buypremium");
    const order = resp.data;
    var options = {
      key: order.key_id, // Replace with your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      order_id: order.id, // Use the order ID from the response
      name: "Expense Tracker App",
      description: "Premium Subscription",
      handler: function (response) {
        // Handle the payment success response here (optional)
        console.log("Payment successful:", response);
      },
      prefill: {
        email: "user@example.com",
      },
      notes: {},
    };
    const rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log(error);
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

function createItem(res) {
  console.log(res[0]);
  res.forEach((item) => {
    const div = document.createElement("div");
    const hr = document.createElement("hr");
    const btn = document.createElement("button");
    btn.classList = "btn btn-danger btn-sm mx-4 my-3";
    btn.innerText = "Delete Expense";
    btn.setAttribute("id", item.id);

    div.classList = "container";
    div.innerHTML =
      '<div class="row"><div class="col-auto"><li><u>AMOUNT:</u>  <b>' +
      item.amount +
      '</b></div><div class="col-auto"><u>CATEGORY:</u>  <b>' +
      item.category.toUpperCase() +
      '</b></div><div class="col-auto"><u>DESCRIPTION</u>:  <b>' +
      item.desc.toUpperCase() +
      "</b></li></div></>";
    div.appendChild(btn);
    div.appendChild(hr);

    display.prepend(div);
  });
}
