export default function BrandsSection() {
  const brands = ["CHANEL", "LOUIS VUITTON", "PRADA", "CALVIN KLEIN", "DENIM"];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto flex justify-center gap-12">
        {brands.map((brand, index) => (
          <div key={index} className="text-lg font-semibold">
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}
