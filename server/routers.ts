
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { users, posts, transactions, products, orders, streams, comments, likes } from "../drizzle/schema";
import { eq, desc, and, or } from "drizzle-orm";

// ============ USER PROCEDURES ============
export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, ctx.user.id),
    });
    return user;
  }),

  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
      avatar: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.update(users).set(input).where(eq(users.id, ctx.user.id));
      return { success: true };
    }),

  getProfile: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });
    }),

  follow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Add follow logic
      return { success: true };
    }),

  getFollowers: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      // Return followers
      return [];
    }),
});

// ============ POST PROCEDURES ============
export const postRouter = router({
  list: publicProcedure
    .input(z.object({ limit: z.number().default(10), offset: z.number().default(0) }))
    .query(async ({ input }) => {
      return db.query.posts.findMany({
        limit: input.limit,
        offset: input.offset,
        orderBy: desc(posts.createdAt),
      });
    }),

  create: protectedProcedure
    .input(z.object({ content: z.string(), media: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const [post] = await db.insert(posts).values({
        userId: ctx.user.id,
        content: input.content,
        media: input.media,
      }).returning();
      return post;
    }),

  like: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db.insert(likes).values({
        userId: ctx.user.id,
        postId: input.postId,
      });
      return { success: true };
    }),

  comment: protectedProcedure
    .input(z.object({ postId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [comment] = await db.insert(comments).values({
        userId: ctx.user.id,
        postId: input.postId,
        content: input.content,
      }).returning();
      return comment;
    }),
});

// ============ MARKETPLACE PROCEDURES ============
export const marketplaceRouter = router({
  listProducts: publicProcedure
    .input(z.object({ category: z.string().optional(), limit: z.number().default(20) }))
    .query(async ({ input }) => {
      let query = db.query.products.findMany({ limit: input.limit });
      if (input.category) {
        query = db.query.products.findMany({
          where: eq(products.category, input.category),
          limit: input.limit,
        });
      }
      return query;
    }),

  getProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return db.query.products.findFirst({
        where: eq(products.id, input.id),
      });
    }),

  createOrder: protectedProcedure
    .input(z.object({
      productId: z.string(),
      quantity: z.number(),
      shippingAddress: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [order] = await db.insert(orders).values({
        userId: ctx.user.id,
        productId: input.productId,
        quantity: input.quantity,
        shippingAddress: input.shippingAddress,
        status: "pending",
      }).returning();
      return order;
    }),

  getOrders: protectedProcedure.query(async ({ ctx }) => {
    return db.query.orders.findMany({
      where: eq(orders.userId, ctx.user.id),
      orderBy: desc(orders.createdAt),
    });
  }),
});

// ============ STREAMING PROCEDURES ============
export const streamRouter = router({
  live: publicProcedure.query(async () => {
    return db.query.streams.findMany({
      where: eq(streams.status, "live"),
      limit: 50,
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [stream] = await db.insert(streams).values({
        streamerId: ctx.user.id,
        title: input.title,
        description: input.description,
        status: "live",
      }).returning();
      return stream;
    }),

  sendChat: protectedProcedure
    .input(z.object({ streamId: z.string(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Add chat message
      return { success: true };
    }),

  chat: publicProcedure
    .input(z.object({ streamId: z.string(), limit: z.number().default(100) }))
    .query(async ({ input }) => {
      // Return chat messages
      return [];
    }),

  donate: protectedProcedure
    .input(z.object({ streamId: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Process donation
      return { success: true };
    }),
});

// ============ TRANSACTION PROCEDURES ============
export const transactionRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db.query.transactions.findMany({
      where: eq(transactions.userId, ctx.user.id),
      orderBy: desc(transactions.createdAt),
    });
  }),

  create: protectedProcedure
    .input(z.object({
      type: z.enum(["deposit", "withdrawal", "transfer"]),
      amount: z.number(),
      toUserId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [tx] = await db.insert(transactions).values({
        userId: ctx.user.id,
        type: input.type,
        amount: input.amount,
        toUserId: input.toUserId,
        status: "completed",
      }).returning();
      return tx;
    }),

  getBalance: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, ctx.user.id),
    });
    return { balance: user?.balance || 0 };
  }),
});

// ============ MAIN ROUTER ============
export const appRouter = router({
  user: userRouter,
  post: postRouter,
  marketplace: marketplaceRouter,
  stream: streamRouter,
  transaction: transactionRouter,
});

export type AppRouter = typeof appRouter;
