import { db } from './db';
import {
  users,
  posts,
  comments,
  likes,
  follows,
  gameScores,
  achievements,
} from '../drizzle/schema';

/**
 * Realistic seed data for development and testing
 */

const FIRST_NAMES = [
  'Alex', 'Jordan', 'Casey', 'Morgan', 'Riley', 'Taylor', 'Avery',
  'Quinn', 'Blake', 'Drew', 'Skyler', 'Phoenix', 'Dakota', 'River',
];

const LAST_NAMES = [
  'Chen', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
];

const BIO_TEMPLATES = [
  'Crypto enthusiast | Builder | #Web3',
  'Trading markets | AI researcher | Blockchain',
  'Founder | Investor | Tech lover',
  'Developer | Open source contributor',
  'Artist | Creator | Community builder',
  'Entrepreneur | Innovator | Disruptor',
  'Gamer | Streamer | Content creator',
  'Educator | Mentor | Thought leader',
];

const POST_TEMPLATES = [
  'Just launched my new project! Check it out 🚀',
  'The future of blockchain is here. What are your thoughts?',
  'Building something amazing with AI and crypto',
  'Community is everything. Grateful for this ecosystem',
  'New article on tokenomics and DeFi strategies',
  'Excited to announce our partnership!',
  'Learning something new every day in this space',
  'The best time to build is now',
];

/**
 * Generate random user
 */
function generateUser() {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  return {
    email,
    firstName,
    lastName,
    bio: BIO_TEMPLATES[Math.floor(Math.random() * BIO_TEMPLATES.length)],
    profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    emailVerified: true,
    profileComplete: true,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
  };
}

/**
 * Generate random post
 */
function generatePost(userId: string) {
  return {
    userId,
    content: POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)],
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    shares: Math.floor(Math.random() * 50),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  };
}

/**
 * Seed database with realistic data
 */
export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create 50 users
    const userIds: string[] = [];
    for (let i = 0; i < 50; i++) {
      const user = generateUser();
      const result = await db.insert(users).values(user);
      userIds.push(result.insertId);
    }
    console.log(`✅ Created ${userIds.length} users`);

    // Create posts for each user
    let postCount = 0;
    for (const userId of userIds) {
      const postsPerUser = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < postsPerUser; i++) {
        const post = generatePost(userId);
        await db.insert(posts).values(post);
        postCount++;
      }
    }
    console.log(`✅ Created ${postCount} posts`);

    // Create follows (users following each other)
    let followCount = 0;
    for (let i = 0; i < userIds.length; i++) {
      const followersPerUser = Math.floor(Math.random() * 10) + 1;
      for (let j = 0; j < followersPerUser; j++) {
        const followeeIndex = Math.floor(Math.random() * userIds.length);
        if (i !== followeeIndex) {
          await db.insert(follows).values({
            followerId: userIds[i],
            followeeId: userIds[followeeIndex],
            createdAt: new Date(),
          });
          followCount++;
        }
      }
    }
    console.log(`✅ Created ${followCount} follow relationships`);

    // Create game scores
    let gameScoreCount = 0;
    const gameIds = [
      'crypto-arcade',
      'strategy-game',
      'puzzle-game',
      'mining-game',
      'trading-game',
    ];

    for (const userId of userIds) {
      const gamesPerUser = Math.floor(Math.random() * 10) + 1;
      for (let i = 0; i < gamesPerUser; i++) {
        const gameId = gameIds[Math.floor(Math.random() * gameIds.length)];
        await db.insert(gameScores).values({
          userId,
          gameId,
          score: Math.floor(Math.random() * 10000),
          level: Math.floor(Math.random() * 50) + 1,
          earnedRewards: Math.floor(Math.random() * 500),
          playedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        });
        gameScoreCount++;
      }
    }
    console.log(`✅ Created ${gameScoreCount} game scores`);

    // Award achievements to random users
    let achievementCount = 0;
    const achievementIds = [
      'first-game',
      'level-10',
      'level-50',
      'streak-7',
      'leaderboard-top-10',
      'charity-donor',
    ];

    for (const userId of userIds) {
      const achievementsPerUser = Math.floor(Math.random() * 4);
      for (let i = 0; i < achievementsPerUser; i++) {
        const achievementId =
          achievementIds[Math.floor(Math.random() * achievementIds.length)];
        try {
          await db.insert(achievements).values({
            userId,
            achievementId,
            unlockedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            reward: Math.floor(Math.random() * 500),
          });
          achievementCount++;
        } catch (e) {
          // Duplicate achievement, skip
        }
      }
    }
    console.log(`✅ Created ${achievementCount} achievements`);

    console.log('🎉 Database seeding complete!');
    return {
      success: true,
      stats: {
        users: userIds.length,
        posts: postCount,
        follows: followCount,
        gameScores: gameScoreCount,
        achievements: achievementCount,
      },
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return {
      success: false,
      error: 'Failed to seed database',
    };
  }
}

/**
 * Clear all seed data
 */
export async function clearSeedData() {
  try {
    console.log('🗑️ Clearing seed data...');

    // Delete in order of dependencies
    await db.delete(achievements);
    await db.delete(gameScores);
    await db.delete(likes);
    await db.delete(comments);
    await db.delete(posts);
    await db.delete(follows);
    await db.delete(users);

    console.log('✅ All seed data cleared');
    return { success: true };
  } catch (error) {
    console.error('❌ Error clearing seed data:', error);
    return { success: false, error: 'Failed to clear seed data' };
  }
}

/**
 * Reseed database (clear and recreate)
 */
export async function reseedDatabase() {
  const clear = await clearSeedData();
  if (!clear.success) return clear;

  return await seedDatabase();
}
