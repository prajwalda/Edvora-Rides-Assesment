import Head from "next/head";
import { NavBar, Rides } from "../components";
import { cleanData } from "../lib/fns";
import RideService from "../services/RideService";
import UserService from "../services/UserService";

export async function getServerSideProps() {
  const user = await UserService.get();
  const rides = await RideService.get();

  if (!user.data || !rides.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: user.data,
      rides: rides.data,
      revalidate: 600,
    },
  };
}

export default function Home({ user, rides }) {
  return (
    <div>
      <Head>
        <title>Edvora</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar user={user} />
        <Rides allRides={cleanData(rides, user.station_code)} />
      </main>
    </div>
  );
}
