const apiUrl = 'api/User';
const authApiUrl = 'api/Auth';

async function CreateUser(emailInput, passwordInput) {
    const newUser = {
        Email: document.getElementById(emailInput).value,
        LoginPassword: document.getElementById(passwordInput).value
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });

        const data = await response.json();

        alert(data.message);
    } catch (erro) {
        console.error(erro);
    }

    window.location.reload();
}

async function Login() {
    const userLogin = {
        Email: document.getElementById('loginEmail').value,
        LoginPassword: document.getElementById('loginPassword').value
    }

    try {
        const response = await fetch(authApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert(data.message);
            window.location.href = '/dashboard.html';
        }
        else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

async function ShowUsers() {
    try {
        const response = await fetch(`${apiUrl}/ListAll`);
        const users = await response.json();

        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '';

        users.forEach(user => {
            tbody.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.loginPassword}</td>
                </tr>
            `
        });

    } catch (erro) {
        alert("Erro ao buscar dados.")
        console.error(erro);
    }
}

async function DeleteUser() {
    const userEmail = document.getElementById('userEmailInput').value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userEmail)
        });

        const data = await response.json();

        alert(data.message);
        window.location.reload();
    } catch(erro) {
        console.error(erro);
    }
}

async function UpdateUser() {
    const updatedUser = {
        Email: document.getElementById('userEmailUpdate').value,
        LoginPassword: document.getElementById('userPasswordUpdate').value
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser)
        });

        const data = await response.json();

        alert(data.message);
    } catch (erro) {
        console.error(erro);
    }

    window.location.reload();
}