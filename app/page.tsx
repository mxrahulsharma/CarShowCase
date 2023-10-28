import Image from 'next/image'
import { fetchCars } from '@/utils';
import { HomeProps } from '@/types';
import { CarCard, CustomFilter, Hero, Searchbar } from '@/components';
import { fuels, yearsOfProduction } from '@/components/constants';
export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.
  length <1 || !allCars;

  console.log(allCars)
  return (
    <main className="overflow-hidden">
<Hero/>
<div className='mt-12 padding-x  padding-y max-width' id="discover">
  <div className='home__text-container'>
    <h1 className='text-4xl font-extrabold'>
  Car Catalogue
    </h1>
    <p>Explore the cars you might like</p>
  </div>
  <div className='home__filters'>
    <Searchbar />
    <div className='home__filter-container'>
      <CustomFilter title="fuel" option={fuels} />
      <CustomFilter title="year" option={yearsOfProduction} />
    </div>
  </div>
(!isDataEmpty ?(
  <section>
  <div className='home__cars-wrapper'>
    {Array.isArray(allCars) ? (
      allCars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))
    ) : (
      <div className='home__error-container'>
        <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
        <p>{allCars?.message}</p>
      </div>
    )}
  </div>
</section>

):(
  <div className='home__error-container'>
    <h2 className='text-black text-xl font bold'>Oaps, no results</h2>
    <p>[allCars?.message]</p>
  </div>
))
</div>
    </main>
  )
}
