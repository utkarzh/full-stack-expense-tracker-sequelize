const form = document.getElementById("myform");
const amount = document.getElementById("amount");
const desc = document.getElementById("desc");
const category = document.getElementById("category");
const display = document.getElementById("res");

const leaderboard = document.getElementById("leaderboard");
const premiumtab = document.getElementById("premium-tab");
const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = token; ///

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "../login/login.html";
});

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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:3000/expenses");
    console.log(res.data);
    if (res.data.isPremium) {
      premiumtab.innerHTML =
        ' <a class="btn btn-info btn-sm rounded-5" id="leaderboard" href="../leaderboard/leaderboard.html">Leaderboard <i class="fas fa-crown"></i></a>';
    } else {
      premiumtab.innerHTML =
        ' <button class="btn btn-warning btn-sm rounded-5" id="premium">Buy Premium <i class="fas fa-gem"></i></button>';
     console.log('above premium');
     const premium = document.getElementById("premium");
        premium.addEventListener("click", buypremium);  //go down for buypremium function definition
      console.log('below premium')
      }
    createItem(res.data.expenses);
    console.log('after create item')
  } catch (error) {
    console.log(error)
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

const buypremium = async (e) => {
  try {
    const resp = await axios.post("http://localhost:3000/buypremium");

    const order = resp.data;
    var options = {
      key: order.key_id,
      order_id: order.id,

      handler: async function (response) {
        try {
          console.log("trying updatestatus..");
          console.log(response);
         const reply= await axios.post("http://localhost:3000/updateorderstatus", {
            orderId: order.id,
            paymentId: response.razorpay_payment_id,
          });
          const newtoken=reply.data.token;
          
          localStorage.setItem('token',newtoken);
          location.reload();

        } catch (e) {
          alert("Update failed!money goes brr..");
        }
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log(error);
  }
};

function createItem(res) {
  if(res==[]){return}

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
