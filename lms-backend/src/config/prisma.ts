
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Hover on prisma in VS Code
type PrismaType = typeof prisma;

export default prisma;