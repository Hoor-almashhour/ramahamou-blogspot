export default function StoriesPage() {
  const stories = [
    {
      id: 1,
      title: "ظلّ القمر 🌙",
      description:
        "في قرية بعيدة، كانت الطفلة تجلس كل ليلة تحت القمر تروي له أحلامها الصغيرة، حتى ظنّ الجميع أن القمر لا يضيء إلا حين تبتسم.",
      date: "2025-09-22",
    },
    {
      id: 2,
      title: "عطر الرسالة 💌",
      description:
        "وجدت الرسالة في درجٍ قديم، مكتوبة بخطٍّ أنيق تفوح منه رائحة الورد، لكنها لم تكن موجّهة إليها...",
      date: "2025-08-14",
    },
    {
      id: 3,
      title: "نوافذ مغلقة 🪟",
      description:
        "كل النوافذ في البيت أغلقت بعد رحيلها، لكن النسيم كان لا يزال يطرقها في المساء وكأنه يسأل: هل عادت؟",
      date: "2025-07-03",
    },
    {
    id: 4,
    title: "الطريق إلى البحر 🌊",
    description: "كانت تمشي كل يوم نحو الأفق، كأنها تعرف أن البحر وحده يفهم الصمت.",
    date: "2025-11-09",
    },

  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-36 text-right">
      <h1 className="text-3xl font-bold text-[#6B3074] mb-8 text-center">قصص ✨</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {stories.map((story) => (
          <div
            key={story.id}
            className="border border-[#C39E71] rounded-2xl p-6 bg-white/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-[#6B3074] mb-2">
              {story.title}
            </h2>
            <p className="text-[#827382] mb-3 leading-relaxed">
              {story.description}
            </p>
            <p className="text-sm text-[#A19282]">{story.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
