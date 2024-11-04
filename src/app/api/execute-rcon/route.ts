import { Rcon } from "rcon-client";

export async function POST(request: Request) {
  const { username, amount, itemDetails } = await request.json();

  const rcon = new Rcon({
    host: process.env.MINECRAFT_SERVER_IP!,
    port: parseInt(process.env.MINECRAFT_SERVER_RCON_PORT!),
    password: process.env.MINECRAFT_SERVER_RCON_PASSWORD!,
  });

  // Mengubah amount menjadi bilangan bulat
  const roundedAmount = Math.floor(parseFloat(amount));

  const command = `tellraw @a ["",{"text":"Pembelian","color":"gold"},{"text":" ${itemDetails} ","color":"yellow"},{"text":"oleh","color":"gold"},{"text":" ${username}","color":"yellow"},{"text":" sebesar","color":"gold"},{"text":" Rp. ${roundedAmount.toLocaleString(
    "id-ID"
  )}","color":"white"},{"text":" berhasil!","color":"green"},{"text":"\\n "}]`;

  try {
    await rcon.connect();
    const response = await rcon.send(command);
    await rcon.end();

    console.log("RCON Response:", response);
    if (response.includes("success")) {
      console.log("RCON command executed successfully:", response);
    } else {
      console.error("Failed to execute RCON command:", response);
    }

    return new Response(JSON.stringify({ success: true, response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error executing RCON command:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to execute RCON command",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
