export default function BooksPage() {
  const books = [
    {
      id: 1,
      title: "عن البدايات 🌱",
      text: "كل بداية صغيرة تخفي خلفها احتمالًا لعالم جديد، لا تستصغري أول خطوة.",
      date: "2025-10-28",
    },
    {
      id: 2,
      title: "هدوء الليل 🌙",
      text: "في سكون الليل، تتحدث الأرواح بلغةٍ لا يسمعها إلا القلب.",
      date: "2025-10-25",
    },
    {
      id: 3,
      title: "عن السعادة ☀️",
      text: "السعادة لا تأتي كاملة، لكنها تزورنا في تفاصيلٍ صغيرة لا ننتبه لها.",
      date: "2025-09-10",
    },
    {
      id: 4,
      title: "رسالة لنفسي 💌",
      text: "تذكّري دائمًا أنكِ لم تصلي هنا صدفة، بل لأنكِ قاومتِ كثيرًا.",
      date: "2025-08-20",
    },
    {
        id: 5,
        title: "عبور 🌤️",
        text: "كل مرحلة صعبة تمرّ بنا ليست إلا معبرًا نحو نضجٍ لم نعرفه بعد.",
        date: "2025-11-09",
    },

  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-36 text-right">
      <h1 className="text-3xl font-bold text-[#6B3074] mb-8 text-center">كتب✨</h1>

      <div className="grid gap-6 justify-center sm:grid-cols-2">
        {books.map((book) => (
          <div
            key={book.id}
            className="border border-[#C39E71] rounded-2xl p-5 bg-white/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-[#6B3074] mb-2">
              {book.title}
            </h2>
            <p className="text-[#827382] mb-3 leading-relaxed">{book.text}</p>
            <p className="text-sm text-[#A19282]">{book.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
