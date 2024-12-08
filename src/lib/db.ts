import { PrismaClient, ShoppingList as ShoppingListTypes, Item as ItemTypes } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

export type ShoppingList = ShoppingListTypes;
export type Item = ItemTypes;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
