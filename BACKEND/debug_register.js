const axios = require('axios');

async function testRegister() {
    try {
        console.log("Sending registration request...");
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            email: 'debugtest@example.com',
            password: 'password123',
            username: 'debuguser'
        });
        console.log("Success:", res.data);
    } catch (err) {
        if (err.response) {
            console.log("Status:", err.response.status);
            console.log("Error Data:", JSON.stringify(err.response.data, null, 2));
        } else {
            console.error("Error:", err.message);
        }
    }
}

testRegister();
