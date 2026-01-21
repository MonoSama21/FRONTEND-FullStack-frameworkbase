import { motion } from 'framer-motion'

export const Timeline = () => {
  const events = [
    {
      time: '5:00 PM',
      title: 'Ceremonia Religiosa',
      description: 'Iglesia Santa María',
      icon: '⛪',
    },
    {
      time: '6:30 PM',
      title: 'Sesión de Fotos',
      description: 'Con los novios y familiares',
      icon: '📸',
    },
    {
      time: '7:00 PM',
      title: 'Recepción',
      description: 'Cóctel de bienvenida',
      icon: '🥂',
    },
    {
      time: '8:00 PM',
      title: 'Cena',
      description: 'Menú especial de tres tiempos',
      icon: '🍽️',
    },
    {
      time: '9:30 PM',
      title: 'Primer Baile',
      description: 'Vals de los novios',
      icon: '💃',
    },
    {
      time: '10:00 PM',
      title: '¡Fiesta!',
      description: 'Baile hasta la medianoche',
      icon: '🎉',
    },
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-6xl md:text-7xl text-rose-600 mb-4">
            Cronograma del Día
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gold-400"></div>
            <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
            <div className="h-px w-20 bg-gold-400"></div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-300 via-gold-300 to-rose-300"></div>

          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 md:mb-16 flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-rose-500 to-gold-500 rounded-full items-center justify-center shadow-lg z-10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>

              {/* Content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                <div className="bg-gradient-to-br from-rose-50 to-gold-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-5xl mb-3">{event.icon}</div>
                  <p className="text-2xl font-bold text-gold-600 mb-2">{event.time}</p>
                  <h3 className="text-2xl font-serif text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
