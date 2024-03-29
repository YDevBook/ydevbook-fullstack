'use server';

import { sql } from '@vercel/postgres';

import { auth } from '@/auth';
import { apiCommonAdapter } from '@/lib/adapter';
import { Profile } from '@/lib/definitions';

export async function fetchMyProfile() {
  try {
    const session = await auth();
    if (!session?.user || session.user.isStartup) {
      return { status: 401 };
    }

    const profile = await sql.query<Profile>(
      `SELECT * FROM profiles WHERE "userId" = $1`,
      [session.user.id]
    );

    if (!profile || profile.rowCount === 0 || profile.rows.length === 0) {
      return { status: 404 };
    }

    return { data: apiCommonAdapter(profile.rows[0]), status: 200 };
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong.');
  }
}

const ITEMS_PER_PAGE = 6;

enum FilterName {
  Query = 'query',
  Position = 'position',
}

export async function fetchFilteredProfilesAndPages(
  filter?: Record<FilterName, string | undefined>,
  currentPage = 1
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const session = await auth();
    if (!session?.user?.isStartup) {
      return { status: 401 };
    }

    let fetchingQuery = `SELECT * FROM profiles `;
    let pageQuery = `SELECT COUNT(*) FROM profiles `;
    const queryConditions = [];
    const queryValues = [];
    if (!!filter?.query) {
      queryConditions.push(
        `(name ILIKE $${queryValues.length + 1} OR email ILIKE $${queryValues.length + 1}) `
      );
      queryValues.push(`%${filter.query}%`);
    }
    if (!!filter?.position) {
      queryConditions.push(`$${queryValues.length + 1} = ANY (positions)`);
      queryValues.push(filter.position);
    }

    for (const condition of queryConditions) {
      if (queryConditions.indexOf(condition) === 0) {
        fetchingQuery += `WHERE ${condition} `;
        pageQuery += `WHERE ${condition} `;
      } else {
        fetchingQuery += `AND ${condition} `;
        pageQuery += `AND ${condition} `;
      }
    }
    fetchingQuery += `LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const [profiles, count] = await Promise.all([
      sql.query<Profile>(fetchingQuery, queryValues),
      sql.query<{ count: string }>(pageQuery, queryValues),
    ]);

    return {
      data: {
        profiles: profiles.rows,
        pages: Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE),
      },
      status: 200,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong.');
  }
}
