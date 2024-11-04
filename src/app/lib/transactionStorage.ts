// lib/transactionStorage.ts
interface TransactionData {
  username: string;
  items: {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }[];
  rconMessages: string[];
}

export const transactionStorage: Record<string, TransactionData> = {};
