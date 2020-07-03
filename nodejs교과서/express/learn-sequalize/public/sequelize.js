// redirect comment when user name is clicked
document.querySelectorAll("#user-list tr").forEach(function (el) {
  el.addEventListener("click", function () {
    let id = el.querySelector("td").textContent;
    getComment(id);
  });
});

function getUser() {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      let users = JSON.parse(xhr.responseText);
      console.log(users);
      let tbody = document.querySelector("#user-list tbody");
      tbody.innerHTML = "";
      users.map(function (user) {
        let row = document.createElement("tr");
        row.addEventListener("click", function () {
          getComment(user.id);
        });
        let td = document.createElement("td");
        td.textContent = user.id;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.age;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = user.married ? "Married" : "Not Married";
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open("GET", "/users");
  xhr.send();
}
