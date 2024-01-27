'use server';

import { Profile } from '@/lib/definitions';
import { sql } from '@vercel/postgres';

const ITEMS_PER_PAGE = 6;

enum FilterName {
  Query = 'query',
  Position = 'position'
}

export async function fetchFilteredProfile(
  filter?: Record<FilterName, string | undefined>,
  currentPage = 1
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
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

    return profiles.rows;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching profiles');
  }
}

export async function fetchFilteredProfilesPages(
  filter?: Record<FilterName, string | undefined>
) {
  try {
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

    return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching profiles');
  }
}
