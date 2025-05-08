export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">This Is What Our Customers Say</h2>
        <div className="flex gap-6 justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>"Great service and quality products!"</p>
            <div className="mt-4 font-semibold">James K.</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>"Amazing customer support and fast delivery!"</p>
            <div className="mt-4 font-semibold">Sara W.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
