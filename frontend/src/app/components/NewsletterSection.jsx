export default function NewsletterSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold">Subscribe To Our Newsletter</h2>
        <div className="mt-4">
          <input type="email" placeholder="you@example.com" className="px-4 py-2 border rounded-l-lg" />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-r-lg">Subscribe</button>
        </div>
      </div>
    </section>
  );
}
