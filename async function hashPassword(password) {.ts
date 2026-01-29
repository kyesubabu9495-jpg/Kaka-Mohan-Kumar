async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const usernameElement = document.getElementById("username") as HTMLInputElement;
        const passwordElement = document.getElementById("password") as HTMLInputElement;
        const outputElement = document.getElementById("output");

        if (!usernameElement || !passwordElement || !outputElement) {
            console.error("Required form elements not found");
            return;
        }

        const username = usernameElement.value;
        const password = passwordElement.value;

        const hashedPassword = await hashPassword(password);

        outputElement.innerText =
            `Username: ${username}\nEncrypted Password (SHA-256):\n${hashedPassword}`;

        // Normally, you'd send `username` and `hashedPassword` to a backend
    });
}
