"use client";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const steps = {
  id: [
    {
      title: "Pilih Item",
      description:
        "Klik pada item yang ingin Anda beli. Setiap klik akan menambahkan item ke keranjang. Anda dapat menambahkan beberapa item dan mengatur jumlahnya di keranjang.",
      image: "/howtobuy/1.png",
    },
    {
      title: "Proses Checkout",
      description:
        "Setelah memilih item, klik tombol checkout. Pastikan username Anda valid - ini penting karena hadiah akan dikirim berdasarkan username ini.",
      image: "/howtobuy/2.png",
    },
    {
      title: "Pilih Metode Pembayaran",
      description:
        "Anda akan diarahkan ke halaman pembayaran Midtrans. Pilih metode pembayaran yang Anda inginkan, misalnya BCA Virtual Account.",
      image: "/howtobuy/3.png",
    },
    {
      title: "Dapatkan Kode Pembayaran",
      description:
        "Salin nomor virtual account atau kode pembayaran yang diberikan oleh Midtrans.",
      image: "/howtobuy/4.png",
    },
    {
      title: "Lakukan Pembayaran",
      description: (
        <>
          Kunjungi{" "}
          <a
            href="https://simulator.sandbox.midtrans.com/bca/va/index"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            simulator pembayaran Midtrans
          </a>
          , tempelkan kode pembayaran Anda, dan klik bayar untuk mensimulasikan
          pembayaran.
        </>
      ),
      image: "/howtobuy/5.png",
    },
    {
      title: "Verifikasi Pembayaran",
      description:
        "Kembali ke halaman Midtrans dan klik 'Cek Status Pembayaran' untuk memverifikasi pembayaran Anda.",
      image: "/howtobuy/6.png",
    },
    {
      title: "Klaim Hadiah",
      description:
        "Setelah pembayaran berhasil, Anda akan diarahkan ke halaman status pembayaran. Klik 'Klaim Hadiah' untuk menerima item Anda.",
      image: "/howtobuy/7.png",
    },
    {
      title: "Pengiriman Otomatis",
      description:
        "Hadiah Anda akan secara otomatis dikirim ke server Minecraft menggunakan username yang Anda berikan. Pastikan Anda online dalam game untuk menerimanya!",
      image: "/howtobuy/8.png",
    },
  ],
  en: [
    {
      title: "Select Items",
      description:
        "Click on the items you want to purchase. Each click will add the item to your cart. You can add multiple items and adjust quantities in the cart.",
      image: "/howtobuy/1.png",
    },
    {
      title: "Checkout Process",
      description:
        "Once you've selected your items, click the checkout button. Make sure your username is valid - this is important as rewards will be delivered based on this username.",
      image: "/howtobuy/2.png",
    },
    {
      title: "Payment Method Selection",
      description:
        "You'll be directed to the Midtrans payment page. Choose your preferred payment method, for example BCA Virtual Account.",
      image: "/howtobuy/3.png",
    },
    {
      title: "Get Payment Code",
      description:
        "Copy the virtual account number or payment code provided by Midtrans.",
      image: "/howtobuy/4.png",
    },
    {
      title: "Make Payment",
      description: (
        <>
          Go to{" "}
          <a
            href="https://simulator.sandbox.midtrans.com/bca/va/index"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Midtrans payment simulator
          </a>
          , paste your payment code, and click pay to simulate the payment.
        </>
      ),
      image: "/howtobuy/5.png",
    },
    {
      title: "Payment Verification",
      description:
        "Return to the Midtrans page and click 'Check Payment Status' to verify your payment.",
      image: "/howtobuy/6.png",
    },
    {
      title: "Claim Your Reward",
      description:
        "After successful payment, you'll be directed to the payment status page. Click 'Claim Reward' to receive your items.",
      image: "/howtobuy/7.png",
    },
    {
      title: "Automatic Delivery",
      description:
        "Your rewards will be automatically sent to the Minecraft server using your provided username. Make sure you're online in the game to receive them!",
      image: "/howtobuy/8.png",
    },
  ],
};

export default function HowToBuy() {
  const [language, setLanguage] = useState<"id" | "en">("id");

  return (
    <div className="min-h-screen bg-neutral-900 py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            {language === "id" ? "Cara Pembelian" : "How to Buy"}
          </h1>
          <button
            onClick={() => setLanguage(language === "id" ? "en" : "id")}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
          >
            <Globe size={16} className="inline-block -mt-1 mr-2" />
            {language === "id"
              ? "Switch to English"
              : "Ganti ke Bahasa Indonesia"}
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps[language].map((step, index) => (
            <div
              key={index}
              className="mb-16 bg-neutral-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {language === "id" ? "Langkah" : "Step"} {index + 1}:{" "}
                    {step.title}
                  </h2>
                  <p className="text-gray-300 text-lg mb-6">
                    {step.description}
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-neutral-700">
                    <Image
                      src={step.image}
                      alt={`${language === "id" ? "Langkah" : "Step"} ${
                        index + 1
                      }`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-neutral-400 text-lg">
            {language === "id"
              ? "Jika Anda mengalami masalah selama proses pembelian, silakan hubungi tim support kami."
              : "If you encounter any issues during the purchase process, please contact our support team."}
          </p>
        </div>
      </div>
    </div>
  );
}
