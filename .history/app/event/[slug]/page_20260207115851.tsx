

const EventDetails = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
  return (
    <section id='event'>
        <h1>Event details:</h1>
        <h2>{slug}</h2>
    </section>
  );
}

export default EventDetails;
