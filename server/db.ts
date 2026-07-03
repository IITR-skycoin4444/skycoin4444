
import { users, posts, products, orders, transactions, wallets } from "../drizzle/schema";
import { db } from "./_core/index";
import { eq, desc, and } from "drizzle-orm";

// ============ USER HELPERS ============
export async function getUserById(id: string) {
  return db.query.users.findFirst({ where: eq(users.id, id) });
}

export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({ where: eq(users.email, email) });
}

export async function createUser(data: any) {
  return db.insert(users).values(data).returning();
}

export async function updateUserBalance(userId: string, amount: number) {
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");
  const newBalance = (user.balance || 0) + amount;
  return db.update(users).set({ balance: newBalance }).where(eq(users.id, userId));
}

// ============ POST HELPERS ============
export async function getPosts(limit = 20, offset = 0) {
  return db.query.posts.findMany({
    limit,
    offset,
    orderBy: desc(posts.createdAt),
  });
}

export async function getPostsByUser(userId: string) {
  return db.query.posts.findMany({
    where: eq(posts.userId, userId),
    orderBy: desc(posts.createdAt),
  });
}

export async function createPost(userId: string, content: string, media?: string) {
  return db.insert(posts).values({ userId, content, media }).returning();
}

// ============ PRODUCT HELPERS ============
export async function getProducts(limit = 20, category?: string) {
  if (category) {
    return db.query.products.findMany({
      where: eq(products.category, category),
      limit,
    });
  }
  return db.query.products.findMany({ limit });
}

export async function getProductById(id: string) {
  return db.query.products.findFirst({ where: eq(products.id, id) });
}

export async function createProduct(data: any) {
  return db.insert(products).values(data).returning();
}

// ============ ORDER HELPERS ============
export async function getOrders(userId: string) {
  return db.query.orders.findMany({
    where: eq(orders.userId, userId),
    orderBy: desc(orders.createdAt),
  });
}

export async function createOrder(data: any) {
  return db.insert(orders).values(data).returning();
}

export async function updateOrderStatus(orderId: string, status: string) {
  return db.update(orders).set({ status }).where(eq(orders.id, orderId));
}

// ============ TRANSACTION HELPERS ============
export async function getTransactions(userId: string) {
  return db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
    orderBy: desc(transactions.createdAt),
  });
}

export async function createTransaction(data: any) {
  return db.insert(transactions).values(data).returning();
}

// ============ WALLET HELPERS ============
export async function getWallet(userId: string, currency: string) {
  return db.query.wallets.findFirst({
    where: and(eq(wallets.userId, userId), eq(wallets.currency, currency)),
  });
}

export async function createWallet(userId: string, currency: string, address: string) {
  return db.insert(wallets).values({ userId, currency, address }).returning();
}

export async function updateWalletBalance(walletId: string, amount: number) {
  const wallet = await db.query.wallets.findFirst({ where: eq(wallets.id, walletId) });
  if (!wallet) throw new Error("Wallet not found");
  const newBalance = (wallet.balance || 0) + amount;
  return db.update(wallets).set({ balance: newBalance }).where(eq(wallets.id, walletId));
}
