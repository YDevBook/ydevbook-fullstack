import { auth } from '../auth';
import Navbar from './navbar';

export default async function Nav() {
  const session = await auth();
  return <Navbar user={session?.user} />;
}
