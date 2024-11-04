const { Rcon } = require("rcon-client");

const rcon = new Rcon({
  host: "185.207.164.129", // Ganti dengan alamat RCON Anda
  port: 20123, // Ganti dengan port RCON Anda
  password: "alternativeworld", // Ganti dengan password RCON Anda
});

async function testRcon() {
  try {
    console.log("Connecting to RCON...");
    await rcon.connect();
    console.log("Connected to RCON successfully");

    // Mengirim perintah tes
    const response = await rcon.send("/list"); // Contoh perintah RCON
    console.log("Response from RCON:", response);

    // Tutup koneksi setelah selesai
    await rcon.end();
    console.log("RCON connection closed");
  } catch (error) {
    console.error("Error during RCON operation:", error.message);
  }
}

testRcon();
