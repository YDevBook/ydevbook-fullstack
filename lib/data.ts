'use server';

import { Profile } from '@/lib/definitions';
import { sql } from '@vercel/postgres';

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredProfile(filter?: string, currentPage = 1) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    let query = '';
    if (!!filter) {
      query = `SELECT * FROM profiles WHERE name LIKE '%${filter}%' OR email LIKE '%${filter}%' LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
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
