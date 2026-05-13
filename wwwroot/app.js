const apiUrl = 'api/User';
const authApiUrl = 'api/Auth';

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
            alert(data.Message);
            window.location.href = '/dashboard.html';
        }
        else {
            alert(data.Message);
        }
    } catch (error) {
        console.error(error);
    }
}

async function ShowUsers() {
    try {
        const response = await fetch(apiUrl);
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
        }
    )
    } catch (erro) {
        alert("Erro ao buscar dados.")
        console.error(erro);
    }
}

async function CreateUser() {
    const newUser = {
        Email: document.getElementById('signUpEmail').value,
        LoginPassword: document.getElementById('signUpPassword').value
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