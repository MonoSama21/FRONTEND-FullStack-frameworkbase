import { Hero } from '../sections/Hero'
import { WeddingDetails } from '../sections/WeddingDetails'
import { OurStory } from '../sections/OurStory'
import { Timeline } from '../sections/Timeline'
import { Gallery } from '../sections/Gallery'
import { RSVPForm } from '../sections/RSVPForm'
import { Footer } from '../sections/Footer'

export const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <WeddingDetails />
      <OurStory />
      <Timeline />
      <Gallery />
      <RSVPForm />
      <Footer />
    </div>
  )
}
