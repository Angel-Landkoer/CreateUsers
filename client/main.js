const main = document.querySelector(".main");
const listUsers = document.querySelector(".listUser");
const form = document.querySelector("form");
const btnAction = document.querySelector(".btnAction");

const fetchGetData = async ({ id = "", url = "" }) => {
  const uri = id ? `${url}/${id}` : url;

  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await fetch(uri, options);
    return await response.json();
  } catch (err) {
    return { error: err.message, stack: err.stack };
  }
};

const fetchDeleteData = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(`http://localhost:3050/api/v1/users/${id.trim()}`, options);
    return await response.json();
  } catch (err) {
    return { error: err.message, stack: err.stack };
  }
};

const fetchCreateUser = async (body) => {
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch("http://localhost:3050/api/v1/users", options);
    return await response.json();
  } catch (err) {
    return { error: err.message, stack: err.stack };
  }
};

const renderUserList = async () => {

  const userItems = document.querySelectorAll(".user-item");
  userItems.forEach(item => item.remove());

  const { data = [] } = await fetchGetData({ url: "http://localhost:3050/api/v1/users" });

  data.forEach(item => {
    const list = document.createElement("li");
    list.classList.add("user-item");
    const img = document.createElement("img");
    img.setAttribute("src", item.avatar);
    img.setAttribute("alt", item.name);

    const section = document.createElement("section");
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    section.appendChild(btn);

    btn.addEventListener("click", handleClickBtnDelete(item.id));
    list.addEventListener("click", handleClickList(list));

    list.appendChild(img);
    list.appendChild(section);
    listUsers.appendChild(list);
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const responseData = await fetchCreateUser(data);
  if (!responseData.data) {
    alert("Error: Check the console")
    console.error("Error: ", responseData)
  } else {
    alert("User created")
  }

  form.classList.add("form");
  e.target.reset();
  btnAction.removeAttribute("disabled");

  await renderUserList()
};

btnAction.addEventListener("click", () => {
  form.classList.remove("form");
  form.addEventListener("submit", handleSubmit);
  btnAction.setAttribute("disabled", "");
});

const handleClickList = (list) => () => {
  if (!list) {
    console.warn("No hay node disponible");
    return;
  }
  list.classList.toggle("list");
};

const handleClickBtnDelete = (id) => async () => {
  const data = await fetchDeleteData(id);
  if (data.error !== "Unexpected end of JSON input") {
    alert("Error: Check the console")
  } else {
    alert("User deleted")
  }

  await renderUserList()
};

document.addEventListener("DOMContentLoaded", renderUserList)
