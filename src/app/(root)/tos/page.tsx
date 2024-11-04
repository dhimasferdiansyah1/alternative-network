"use client";

export default function TermsOfService() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen flex justify-center items-center py-16">
      <div className="mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-amber-400">
            Terms of Service
          </h1>
          <ul className="list-disc pl-6 text-lg space-y-4">
            <li>Donasi yang di lakukan tidak bisa di refund.</li>
            <li>Alternative World MC tidak memaksa User melakukan donasi.</li>
            <li>Rank hanya dapat digunakan oleh satu akun Minecraft.</li>
            <li>
              Rank beserta perks yang tertera dapat berubah sewaktu-waktu.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
