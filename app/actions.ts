import { NextAuthOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
export async function getAllUsers() {
  return db.user.findMany();
}

export async function getUserDetails() {
  try {
    const session = await getServerSession(NextAuthOptions);
    if (!session || !session.user) {
      return null;
    }
    const email = session.user.email;
    if (!email) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get name

export async function getName() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function isAuthenticated() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// get email

export async function getEmail() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.email;
  } catch (error) {
    console.error(error);
    return null;
  }
}
