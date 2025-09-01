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

        const memeImage = document.createElement('img');
        memeImage.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Pixel_Red_Stop_Sign_16x16.png';
        memeImage.style.marginTop = '2rem';
        memeImage.style.imageRendering = 'pixelated';
        memeImage.style.width = '64px';
        memeImage.style.height = '64px';


        authMessage.insertBefore(memeImage, unauthorizedDesc.nextSibling);

        if(loginButton){
            loginButton.style.display = 'none';
        }
    }
});
