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

export async function fetchFilteredProfiles(
  filter?: Record<FilterName, string | undefined>,
  currentPage = 1
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const session = await auth();
    if (!session?.user?.isStartup) {
      return { status: 401 };
    }

    let query = '';
    if (!!filter) {
      query = `SELECT * FROM profiles `;
      const whereCondition = !!filter.query
        ? `WHERE (name ILIKE '%${filter.query}%' OR email ILIKE '%${filter.query}%') `
        : '';
      let conditionAnd = '';
      if (!!filter.query && !!filter.position) {
        conditionAnd = 'AND ';
      } else if (!!filter.position) {
        conditionAnd = 'WHERE ';
      }
      const positionCondition = !!filter.position
        ? `'${filter.position}' = ANY (positions) `
        : '';
      const pageCondition = `LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
      query +=
        whereCondition + conditionAnd + positionCondition + pageCondition;
    } else {
      query = `SELECT * FROM profiles LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    }
    const profiles = await sql.query<Profile>(query);

    return { data: profiles.rows, status: 200 };
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong.');
  }
}

export async function fetchFilteredProfilesV2(
  filter?: Record<FilterName, string | undefined>,
  currentPage = 1
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const session = await auth();
    if (!session?.user?.isStartup) {
      return { status: 401 };
    }

    let query = '';
    const queryValues = [];
    if (!!filter) {
      query = `SELECT * FROM profiles `;
      const queryConditions = [];
      if (!!filter.query) {
        queryConditions.push(
          `(name ILIKE $${queryValues.length + 1} OR email ILIKE $${queryValues.length + 1}) `
        );
        queryValues.push(`%${filter.query}%`);
      }
      if (!!filter.position) {
        queryConditions.push(`$${queryValues.length + 1} = ANY (positions)`);
        queryValues.push(filter.position);
      }

      for (const condition of queryConditions) {
        if (queryConditions.indexOf(condition) === 0) {
          query += `WHERE ${condition} `;
        } else {
          query += `AND ${condition} `;
        }
      }

      query += `LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    } else {
      query = `SELECT * FROM profiles LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    }
    console.log('QUERY: ', query);
    console.log(queryValues);
    const profiles = await sql.query<Profile>(query, queryValues);

    return { data: profiles.rows, status: 200 };
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong.');
  }
}

export async function fetchFilteredProfilesPages(
  filter?: Record<FilterName, string | undefined>
) {
  try {
    const session = await auth();
    if (!session?.user?.isStartup) {
      return { status: 401 };
    }

    let query = '';
    if (!!filter) {
      query = `SELECT COUNT(*) FROM profiles `;
      const whereCondition = !!filter.query
        ? `WHERE (name ILIKE '%${filter.query}%' OR email ILIKE '%${filter.query}%') `
        : '';
      let conditionAnd = '';
      if (!!filter.query && !!filter.position) {
        conditionAnd = 'AND ';
      } else if (!!filter.position) {
        conditionAnd = 'WHERE ';
      }
      const positionCondition = !!filter.position
        ? `'${filter.position}' = ANY (positions) `
        : '';
      query += whereCondition + conditionAnd + positionCondition;
    } else {
      query = `SELECT COUNT(*) FROM profiles`;
    }
    const count = await sql.query<{ count: string }>(query);

    return {
      data: Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE),
      status: 200,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong.');
  }
}
