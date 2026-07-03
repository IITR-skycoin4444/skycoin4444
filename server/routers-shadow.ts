import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

// Shadow Mode & Anonymous Features
export const shadowRouter = router({
  // Create shadow post (anonymous)
  createShadowPost: protectedProcedure
    .input(z.object({ 
      content: z.string().min(1).max(5000), 
      media: z.string().optional(),
      isShadow: z.boolean().default(true)
    }))
    .mutation(async ({ ctx, input }) => {
      const post = await db.createPost(
        ctx.user.id,
        input.content,
        input.media,
        {
          isShadow: true,
          displayName: "Shadow",
          isAnonymous: true,
        }
      );
      return post;
    }),

  // Get shadow posts (anonymous feed)
  getShadowFeed: publicProcedure
    .input(z.object({ 
      limit: z.number().default(20), 
      offset: z.number().default(0) 
    }))
    .query(async ({ input }) => {
      const posts = await db.getPosts(input.limit, input.offset, { isShadow: true });
      return posts;
    }),

  // Celebrity/VIP features
  createCelebrityPost: protectedProcedure
    .input(z.object({
      content: z.string().min(1).max(5000),
      media: z.string().optional(),
      badge: z.enum(["verified", "celebrity", "influencer", "founder"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user has celebrity status
      const user = await db.getUserById(ctx.user.id);
      if (!user || !user.isCelebrity) {
        throw new Error("Celebrity status required");
      }

      const post = await db.createPost(ctx.user.id, input.content, input.media, {
        badge: input.badge || "celebrity",
        isFeatured: true,
        priority: "high",
      });
      return post;
    }),

  // Get celebrity posts (featured feed)
  getCelebrityFeed: publicProcedure
    .input(z.object({ 
      limit: z.number().default(20), 
      offset: z.number().default(0) 
    }))
    .query(async ({ input }) => {
      const posts = await db.getPosts(input.limit, input.offset, { isCelebrity: true });
      return posts;
    }),

  // Toggle shadow mode on user account
  toggleShadowMode: protectedProcedure
    .input(z.object({ enabled: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await db.updateUser(ctx.user.id, { shadowModeEnabled: input.enabled });
      return { success: true };
    }),

  // Get user's shadow posts
  getUserShadowPosts: protectedProcedure
    .query(async ({ ctx }) => {
      const posts = await db.getPostsByUser(ctx.user.id, { isShadow: true });
      return posts;
    }),

  // VIP features - early access, priority support
  getVIPBenefits: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await db.getUserById(ctx.user.id);
      return {
        isVIP: user?.isVIP || false,
        isCelebrity: user?.isCelebrity || false,
        shadowModeEnabled: user?.shadowModeEnabled || false,
        benefits: {
          earlyAccess: user?.isVIP,
          prioritySupport: user?.isVIP,
          customBadge: user?.isCelebrity,
          anonymousPosting: true,
          unlimitedStorage: user?.isVIP,
          advancedAnalytics: user?.isCelebrity,
        },
      };
    }),

  // Anonymous comment
  createAnonymousComment: protectedProcedure
    .input(z.object({
      postId: z.string(),
      content: z.string().min(1).max(1000),
    }))
    .mutation(async ({ ctx, input }) => {
      const comment = await db.createComment(ctx.user.id, input.postId, input.content, {
        isAnonymous: true,
        displayName: "Anonymous",
      });
      return comment;
    }),
});
