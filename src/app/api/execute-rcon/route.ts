import { Rcon } from "rcon-client";

export async function POST(request: Request) {
  const { username, amount, itemDetails } = await request.json();

  console.log("Received data:", { username, amount, itemDetails });

  const rcon = new Rcon({
    host: process.env.MINECRAFT_SERVER_IP!,
    port: parseInt(process.env.MINECRAFT_SERVER_RCON_PORT!),
    password: process.env.MINECRAFT_SERVER_RCON_PASSWORD!,
  });

  // Fungsi untuk mengekstrak jumlah koin dari nama item
  const extractCoinAmount = (
    itemName: string
  ): { type: string; amount: number; quantity: number } | null => {
    console.log("Extracting coin amount from:", itemName);

    // Pola regex yang lebih komprehensif
    const quantityPattern = /^(\d+)x?\s*(\d+)\s*(Alt Coin|Ruby)$/;
    const quantityMatch = itemName.match(quantityPattern);

    if (quantityMatch) {
      const quantity = parseInt(quantityMatch[1]);
      const amount = parseInt(quantityMatch[2]);
      const type = quantityMatch[3];

      console.log("Extracted with quantity:", { quantity, amount, type });
      return { type, amount, quantity };
    }

    // Pola untuk item tanpa quantity
    const singlePattern = /^(\d+)\s*(Alt Coin|Ruby)$/;
    const singleMatch = itemName.match(singlePattern);

    if (singleMatch) {
      const amount = parseInt(singleMatch[1]);
      const type = singleMatch[2];

      console.log("Extracted single:", { amount, type, quantity: 1 });
      return { type, amount, quantity: 1 };
    }

    console.log("No match found for coin amount");
    return null;
  };

  // Mengubah amount menjadi bilangan bulat
  const roundedAmount = Math.floor(parseFloat(amount));

  try {
    await rcon.connect();

    // Buat broadcast command di sini
    const broadcastCommand = `tellraw @a ["",{"text":"Pembelian","color":"gold"},{"text":" ${itemDetails} ","color":"yellow"},{"text":" oleh","color":"gold"},{"text":" ${username}","color":"yellow"},{"text":" sebesar","color":"gold"},{"text":" Rp. ${roundedAmount.toLocaleString(
      "id-ID"
    )}","color":"white"},{"text":" berhasil!","color":"green"},{"text":"\\n "}]`;

    // Kirim pesan broadcast
    await rcon.send(broadcastCommand);

    // Proses setiap item dan kumpulkan perintah
    const coinCommands: string[] = [];
    const processedItems: string[] = [];

    // Parse dan proses setiap item
    const itemList = itemDetails.split(", ");

    for (const itemDesc of itemList) {
      const coinInfo = extractCoinAmount(itemDesc);

      if (coinInfo) {
        // Hitung total koin berdasarkan quantity
        const totalAmount = coinInfo.amount * coinInfo.quantity;
        let coinCommand = "";

        if (coinInfo.type === "Alt Coin") {
          coinCommand = `points give ${username} ${totalAmount}`;
        } else if (coinInfo.type === "Ruby") {
          coinCommand = `coins give ${username} ${totalAmount}`;
        }

        if (coinCommand) {
          coinCommands.push(coinCommand);
          processedItems.push(itemDesc);
        }
      }
    }

    // Eksekusi semua perintah koin sekaligus
    for (const command of coinCommands) {
      console.log("Executing coin command:", command);
      const coinResponse = await rcon.send(command);
      console.log(`Command response: ${coinResponse}`);
    }

    await rcon.end();

    return new Response(
      JSON.stringify({
        success: true,
        response: "Commands executed successfully",
        processedItems: processedItems,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error executing RCON command:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to execute RCON command",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
