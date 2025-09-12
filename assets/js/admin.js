import { checkAdminAccess } from './main.js';

document.addEventListener('DOMContentLoaded', async () => {
    const adminContent = document.getElementById('admin-content');
    const authMessage = document.getElementById('auth-message');

    const hasAccess = await checkAdminAccess();

    if (hasAccess) {
        adminContent.style.display = 'block';
        authMessage.style.display = 'none';

        const successMessage = document.createElement('p');
        successMessage.textContent = 'Complimenti, sei autenticato e autorizzato a vedere questo pannello.';
        successMessage.style.textAlign = 'center';
        successMessage.style.padding = '2rem 0';

        adminContent.insertBefore(successMessage, adminContent.firstChild);

    } else {
        adminContent.style.display = 'none';
        authMessage.style.display = 'block';

        const unauthorizedTitle = authMessage.querySelector('h2');
        const unauthorizedDesc = authMessage.querySelector('p');
        const loginButton = authMessage.querySelector('#login-button');

        if (unauthorizedTitle) {
            unauthorizedTitle.textContent = 'Accesso Negato';
        }
        if (unauthorizedDesc) {
            unauthorizedDesc.innerHTML = 'Non sei autorizzato a vedere questa pagina. <br> Effettua il login per continuare.';
        }

        const memeContainer = document.createElement('div');
        memeContainer.style.marginTop = '2rem';
        memeContainer.style.fontSize = '64px';

        const emoji1 = document.createElement('span');
        emoji1.textContent = '🚫';
        emoji1.setAttribute('role', 'img');
        emoji1.setAttribute('aria-label', 'No Entry Sign');

        const emoji2 = document.createElement('span');
        emoji2.textContent = '🤪';
        emoji2.setAttribute('role', 'img');
        emoji2.setAttribute('aria-label', 'Silly Face');

        memeContainer.appendChild(emoji1);
        memeContainer.appendChild(emoji2);

        authMessage.insertBefore(memeContainer, unauthorizedDesc.nextSibling);

        if(loginButton){
            loginButton.style.display = 'none';
        }
    }
});
