export const PRESETS = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    description: 'Electric cyan dots with magenta eye accents',
    dotsOptions: {
      color: '#00f2fe',
      type: 'rounded',
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#00f2fe' },
          { offset: 1, color: '#4facfe' }
        ]
      }
    },
    backgroundOptions: {
      color: '#0d1117'
    },
    cornersSquareOptions: {
      color: '#ff007f',
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: '#00f2fe',
      type: 'dot'
    }
  },
  {
    id: 'gold_luxury',
    name: 'Midnight Gold',
    description: 'Shimmering gold gradient on deep obsidian',
    dotsOptions: {
      color: '#f6d365',
      type: 'classy',
      gradient: {
        type: 'linear',
        rotation: 135,
        colorStops: [
          { offset: 0, color: '#f6d365' },
          { offset: 1, color: '#fda085' }
        ]
      }
    },
    backgroundOptions: {
      color: '#121212'
    },
    cornersSquareOptions: {
      color: '#f6d365',
      type: 'square'
    },
    cornersDotOptions: {
      color: '#fda085',
      type: 'square'
    }
  },
  {
    id: 'sunset_glow',
    name: 'Sunset Glow',
    description: 'Vibrant orange to purple gradient on crisp background',
    dotsOptions: {
      color: '#ff0844',
      type: 'dots',
      gradient: {
        type: 'linear',
        rotation: 90,
        colorStops: [
          { offset: 0, color: '#ff0844' },
          { offset: 1, color: '#ffb199' }
        ]
      }
    },
    backgroundOptions: {
      color: '#ffffff'
    },
    cornersSquareOptions: {
      color: '#ff0844',
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: '#ff0844',
      type: 'dot'
    }
  },
  {
    id: 'emerald_eco',
    name: 'Emerald Matrix',
    description: 'Bio-tech neon mint green on dark glass',
    dotsOptions: {
      color: '#10b981',
      type: 'classy',
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#10b981' },
          { offset: 1, color: '#06b6d4' }
        ]
      }
    },
    backgroundOptions: {
      color: '#0f172a'
    },
    cornersSquareOptions: {
      color: '#10b981',
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: '#06b6d4',
      type: 'dot'
    }
  },
  {
    id: 'ocean_breeze',
    name: 'Ocean Gradient',
    description: 'Refreshing blue to violet gradient',
    dotsOptions: {
      color: '#3b82f6',
      type: 'rounded',
      gradient: {
        type: 'linear',
        rotation: 120,
        colorStops: [
          { offset: 0, color: '#2563eb' },
          { offset: 1, color: '#7c3aed' }
        ]
      }
    },
    backgroundOptions: {
      color: '#f8fafc'
    },
    cornersSquareOptions: {
      color: '#2563eb',
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: '#7c3aed',
      type: 'dot'
    }
  },
  {
    id: 'minimal_dark',
    name: 'Minimal Obsidian',
    description: 'Clean monochrome high contrast dark mode',
    dotsOptions: {
      color: '#ffffff',
      type: 'rounded',
      gradient: null
    },
    backgroundOptions: {
      color: '#090d16'
    },
    cornersSquareOptions: {
      color: '#ffffff',
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: '#38bdf8',
      type: 'dot'
    }
  },
  {
    id: 'classic_clean',
    name: 'Classic Black & White',
    description: 'Standard sharp high-readability QR style',
    dotsOptions: {
      color: '#000000',
      type: 'square',
      gradient: null
    },
    backgroundOptions: {
      color: '#ffffff'
    },
    cornersSquareOptions: {
      color: '#000000',
      type: 'square'
    },
    cornersDotOptions: {
      color: '#000000',
      type: 'square'
    }
  }
];
