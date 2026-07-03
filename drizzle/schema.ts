
import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// ============ USERS TABLE ============
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  username: text("username").unique(),
  name: text("name"),
  bio: text("bio"),
  avatar: text("avatar"),
  balance: real("balance").default(0),
  role: text("role").default("user"), // admin | user
  verified: integer("verified", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()),
});

// ============ POSTS TABLE ============
export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  content: text("content"),
  media: text("media"),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()),
});

// ============ COMMENTS TABLE ============
export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  postId: text("post_id").references(() => posts.id),
  userId: text("user_id").references(() => users.id),
  content: text("content"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ LIKES TABLE ============
export const likes = sqliteTable("likes", {
  id: text("id").primaryKey(),
  postId: text("post_id").references(() => posts.id),
  userId: text("user_id").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ PRODUCTS TABLE ============
export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  price: real("price"),
  category: text("category"),
  image: text("image"),
  stock: integer("stock"),
  sellerId: text("seller_id").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ ORDERS TABLE ============
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  productId: text("product_id").references(() => products.id),
  quantity: integer("quantity"),
  total: real("total"),
  status: text("status"), // pending | shipped | delivered | cancelled
  shippingAddress: text("shipping_address"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ STREAMS TABLE ============
export const streams = sqliteTable("streams", {
  id: text("id").primaryKey(),
  streamerId: text("streamer_id").references(() => users.id),
  title: text("title"),
  description: text("description"),
  status: text("status"), // live | ended | scheduled
  viewers: integer("viewers").default(0),
  hlsUrl: text("hls_url"),
  archiveUrl: text("archive_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ TRANSACTIONS TABLE ============
export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  type: text("type"), // deposit | withdrawal | transfer | purchase
  amount: real("amount"),
  toUserId: text("to_user_id").references(() => users.id),
  status: text("status"), // pending | completed | failed
  txHash: text("tx_hash"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ WALLETS TABLE ============
export const wallets = sqliteTable("wallets", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  address: text("address"),
  balance: real("balance").default(0),
  currency: text("currency"), // BTC | ETH | SOL | DOGE | SKY444
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ FOLLOWS TABLE ============
export const follows = sqliteTable("follows", {
  id: text("id").primaryKey(),
  followerId: text("follower_id").references(() => users.id),
  followingId: text("following_id").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ NOTIFICATIONS TABLE ============
export const notifications = sqliteTable("notifications", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  type: text("type"), // like | comment | follow | message | order
  content: text("content"),
  read: integer("read", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ MESSAGES TABLE ============
export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  senderId: text("sender_id").references(() => users.id),
  recipientId: text("recipient_id").references(() => users.id),
  content: text("content"),
  read: integer("read", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ REVIEWS TABLE ============
export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  userId: text("user_id").references(() => users.id),
  rating: integer("rating"), // 1-5
  comment: text("comment"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

// ============ RELATIONS ============
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  orders: many(orders),
  products: many(products),
  streams: many(streams),
  wallets: many(wallets),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
  comments: many(comments),
  likes: many(likes),
}));
