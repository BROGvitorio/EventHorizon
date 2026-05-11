const apiUrl = 'api/User'

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

async function AddUser() {
    userEmail = document.getElementById('userEmail').value;
    userPassword = document.getElementById('userPassword').value;



    token = document.getElementById('jwtToken').value.trim();
    console.log("Header enviado:", `Bearer ${token}`);

    const newUser = {
        Email: userEmail,
        LoginPassword: userPassword
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            ShowUsers();
        } else {
            alert("Erro 401: Token inválido");
        }
    } catch (erro) {
        console.error(erro);
    }
}