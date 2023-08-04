const leaderboard = document.getElementById("leaderboard");
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = token;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const axiosResult = await axios.get(
      "http://localhost:3000/premium/leaderboard"
    );
    const headingLi = document.createElement("li");
    headingLi.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "font-weight-bold"
    );

    const headingRankElement = document.createElement("span");
    headingRankElement.innerHTML = "<b>RANK</b>";
    headingRankElement.classList.add("badge", "badge-primary");

    const headingNameElement = document.createElement("span");
    headingNameElement.innerHTML = "<b>NAME</b>";
    headingNameElement.classList.add("font-weight-bold");

    const headingAmountElement = document.createElement("span");
    headingAmountElement.innerHTML = "<b>EXPENSE</b>";

    headingLi.appendChild(headingRankElement);
    headingLi.appendChild(headingNameElement);
    headingLi.appendChild(headingAmountElement);


    leaderboard.appendChild(headingLi);
 

    axiosResult.data.leaderboardEntries.forEach((entry, index) => {
        const li = document.createElement("li");
        li.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center",
          "font-weight-bold"
        );
        
        const badgeElement = document.createElement("span");
        badgeElement.innerText = index + 1; 
        badgeElement.classList.add("badge", "badge-primary", "mr-2"); 
        
        const nameElement = document.createElement("span");
        nameElement.innerText = entry.name.toUpperCase();
        nameElement.classList.add("font-weight-bold");
        
        const amountElement = document.createElement("span");
        amountElement.innerText = entry.totalExpenses;
        
        li.appendChild(badgeElement);
        li.appendChild(nameElement);
        li.appendChild(amountElement);
        
        leaderboard.appendChild(li);
        
    });
  } catch (error) {
    alert("nahi kaam kara hahahha");
  }
});
