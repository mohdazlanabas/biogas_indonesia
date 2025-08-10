export type Presentation = {
  slug: string
  title: string
  filename: string
}

export const presentations: Presentation[] = [
  {
    slug: 'ad-biogas-sumatra',
    title: 'AD Biogas – Sumatra',
    filename: '1_AD_biogas_sumatra.pdf',
  },
  {
    slug: 'ad-bahasa-presentasi',
    title: 'AD (Bahasa) – Presentasi',
    filename: '2_AD_bahasa_presentasi.pdf',
  },
  {
    slug: 'ad-simple-explanation',
    title: 'AD – Simple Explanation',
    filename: '3_AD_simple_explanation.pdf',
  },
  {
    slug: 'iswmc-biogas-malaysia',
    title: 'ISWMC – Biogas Malaysia Facility',
    filename: '4_ISWMC_biogas_malaysia_facility.pdf',
  },
  {
    slug: 'gaia-english',
    title: 'Gaia – English Presentation',
    filename: '5_Gaia_english_presentation.pdf',
  },
  {
    slug: 'gaia-bahasa',
    title: 'Gaia – Bahasa Presentasi',
    filename: '6_Gaia_bahasa_presnetaau.pdf',
  },
  {
    slug: 'video-explanation-links',
    title: 'Video Explanation – Links',
    filename: '7_Video_explaination_links.pdf',
  },
]

export function findPresentationBySlug(slug: string) {
  return presentations.find((p) => p.slug === slug)
}


