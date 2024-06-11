document.getElementById('login').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validação básica (opcional)
    if (!email || !password) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Envia uma requisição POST para o servidor de autenticação
    fetch('BACKEND/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            senha: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            // Sucesso no login, armazene o token e redirecione
            const token = data.body.token;
            localStorage.setItem('authToken', token); // Armazena o token no localStorage
            window.location.href = 'home.html'; // Redireciona para a página do dashboard
        } else {
            // Erro no login, exibe mensagem de erro
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.body.mensagem;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
    });
});
