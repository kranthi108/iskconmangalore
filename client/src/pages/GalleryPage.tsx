import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import GalleryModal from '@/components/gallery/GalleryModal'
import HeroBanner from '@/components/layout/HeroBanner'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { GALLERY_CATEGORIES } from '@/constants/data'
import { GALLERY_IMAGES, HERO_BANNER } from '@/constants/placeholders'
import { useUiStore } from '@/store/uiStore'

export default function GalleryPage() {
  const selectedImage = useUiStore((state) => state.selectedGalleryImage)
  const isGalleryModalOpen = useUiStore((state) => state.isGalleryModalOpen)
  const openGalleryModal = useUiStore((state) => state.openGalleryModal)
  const closeGalleryModal = useUiStore((state) => state.closeGalleryModal)

  const [activeCategory, setActiveCategory] = useState<(typeof GALLERY_CATEGORIES)[number]>(GALLERY_CATEGORIES[0])

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') {
      return GALLERY_IMAGES
    }

    return GALLERY_IMAGES.filter((photo) => photo.category === activeCategory)
  }, [activeCategory])

  const activeIndex = selectedImage ? filteredImages.findIndex((photo) => photo.id === selectedImage.id) : -1

  function handleNext() {
    if (!selectedImage || activeIndex === -1 || filteredImages.length === 0) {
      return
    }
    const next = filteredImages[(activeIndex + 1) % filteredImages.length]
    openGalleryModal(next)
  }

  function handlePrev() {
    if (!selectedImage || activeIndex === -1 || filteredImages.length === 0) {
      return
    }
    const prevIndex = activeIndex === 0 ? filteredImages.length - 1 : activeIndex - 1
    openGalleryModal(filteredImages[prevIndex])
  }

  return (
    <>
      <Helmet>
        <title>Divine Gallery · ISKCON Mangalore</title>
        <meta name="description" content="Luminous frames from Krishna Balaram's hall — kartik flames, childrens’ dramas, goshāla picnics." />
      </Helmet>

      <HeroBanner title="Divine Gallery" subtitle="Each frame echoes harināma clapping along the seaboard skyline." backgroundImage={HERO_BANNER} height="medium" />

      <section className="bg-white py-14">
        <Container size="lg">
          <div className="flex flex-wrap justify-center gap-3">
            {GALLERY_CATEGORIES.map((category) => (
              <Button key={category} type="button" variant={category === activeCategory ? 'maroon' : 'outline'} size="sm" onClick={() => setActiveCategory(category)} className="capitalize tracking-wide">
                {category}
              </Button>
            ))}
          </div>
        </Container>
      </section>

      <motion.section layout className="bg-gradient-to-b from-cream to-peacock-50 pb-28 pt-12">
        <Container size="xl">
          <SectionHeading title="Mercy-light gallery" subtitle="Tap any frame · inhale incense · chant softly along." decorative />

          <GalleryGrid images={filteredImages} onImageClick={(photo) => openGalleryModal(photo)} />
          {filteredImages.length === 0 ? (
            <p className="mt-16 text-center text-maroon">Śyāmasundara is developing new slides for this filter — chant one round and revisit.</p>
          ) : null}
        </Container>
      </motion.section>

      <GalleryModal
        image={selectedImage}
        isOpen={isGalleryModalOpen && Boolean(selectedImage)}
        onClose={closeGalleryModal}
        onNext={filteredImages.length > 1 ? handleNext : undefined}
        onPrev={filteredImages.length > 1 ? handlePrev : undefined}
      />
    </>
  )
}
