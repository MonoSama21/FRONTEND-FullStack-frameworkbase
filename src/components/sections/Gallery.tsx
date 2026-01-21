import { motion } from 'framer-motion'
import { Image } from 'lucide-react'

export const Gallery = () => {
  // Placeholder para imágenes - puedes reemplazar con imágenes reales
  const images = Array(6).fill(null).map((_, i) => ({
    id: i + 1,
    alt: `Momento especial ${i + 1}`,
  }))

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gold-50 via-white to-rose-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-6xl md:text-7xl text-rose-600 mb-4">
            Momentos Especiales
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gold-400"></div>
            <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
            <div className="h-px w-20 bg-gold-400"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              {/* Placeholder - reemplaza con imágenes reales */}
              <div className="w-full h-full bg-gradient-to-br from-rose-200 via-gold-100 to-rose-100 flex items-center justify-center">
                <Image className="w-20 h-20 text-white/50 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 font-serif text-lg">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 italic">
            * Agrega tus propias fotos en la carpeta de imágenes para personalizar esta sección
          </p>
        </motion.div>
      </div>
    </section>
  )
}
