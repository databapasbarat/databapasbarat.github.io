export default function SppaContent() {
  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <button id="theme-toggle" className="p-3 bg-gray-light dark:bg-gray rounded-full text-dark dark:text-light shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
          <svg id="theme-icon" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
        <button id="scroll-to-top" className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-light/90 dark:bg-dark/90 backdrop-blur-sm border-b border-gray-light/50 dark:border-gray/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                SPPA
              </div>
              <div>
                <h1 className="text-xl font-bold text-dark dark:text-light">UU SPPA Interaktif</h1>
                <p className="text-xs text-gray dark:text-gray-light">Sistem Peradilan Pidana Anak</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#pendahuluan" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors">Pendahuluan</a>
              <a href="#prinsip" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors">Prinsip</a>
              <a href="#diversi" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors">Diversi</a>
              <a href="#proses" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors">Proses</a>
              <a href="#sanksi" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors">Sanksi</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark dark:text-light">Memahami Sistem Peradilan Anak Indonesia</h1>
            <p className="text-xl text-gray dark:text-gray-light mb-8">Analisis interaktif UU Nomor 11 Tahun 2012 tentang Sistem Peradilan Pidana Anak dengan visualisasi yang mudah dipahami</p>

            <div className="illustration-container">
              {/* @ts-ignore */}
              <lottie-player
                src="https://assets3.lottiefiles.com/packages/lf20_z9gxm3qk.json"
                background="transparent"
                speed="1"
                className="w-64 h-64 mx-auto floating"
                loop
                autoplay>
              </lottie-player>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <a href="#pendahuluan" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">Mulai Jelajahi</a>
              <a href="#infografis" className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">Lihat Infografis</a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Pendahuluan */}
        <section id="pendahuluan" className="scroll-mt mb-20">
          <div className="section-header">
            <h2 className="text-3xl font-bold text-dark dark:text-light">Pendahuluan</h2>
            <p className="text-gray dark:text-gray-light mt-2">Latar belakang dan tujuan UU SPPA</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="card p-6 md:p-8 gradient-bg">
              <h3 className="text-2xl font-semibold mb-4 text-dark dark:text-light">Latar Belakang</h3>
              <div className="prose dark:prose-invert">
                <p>Undang-Undang Nomor 11 Tahun 2012 tentang Sistem Peradilan Pidana Anak (SPPA) merupakan terobosan hukum yang mengubah paradigma penanganan anak berhadapan dengan hukum di Indonesia.</p>
                <p>UU ini menggantikan UU Nomor 3 Tahun 1997 yang dianggap <span className="font-semibold text-primary">tidak cukup melindungi hak-hak anak</span> dan lebih berorientasi pada pendekatan retributif.</p>

                <div className="mt-6 bg-primary/5 dark:bg-primary/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-dark dark:text-light">Tujuan Utama:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Menghindari <span className="font-medium">stigmatisasi</span> terhadap anak</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Mendorong <span className="font-medium">reintegrasi sosial</span></span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l8-8m0 0l-8-8m8 8H4" />
                      </svg>
                      <span>Menerapkan <span className="font-medium">keadilan restoratif</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-4 text-dark dark:text-light">Prinsip Dasar</h3>
              <div className="space-y-3">
                <div className="flex items-center p-4 bg-gray-light/50 dark:bg-gray/20 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l8-8m0 0l-8-8m8 8H4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark dark:text-light">Kepentingan Terbaik Bagi Anak</h4>
                    <p className="text-sm text-gray dark:text-gray-light">Setiap keputusan harus mempertimbangkan dampak jangka panjang bagi tumbuh kembang anak</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-light/50 dark:bg-gray/20 rounded-lg">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark dark:text-light">Nondiskriminasi</h4>
                    <p className="text-sm text-gray dark:text-gray-light">Perlakuan adil tanpa membedakan latar belakang anak</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-light/50 dark:bg-gray/20 rounded-lg">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark dark:text-light">Pembinaan dan Pembimbingan</h4>
                    <p className="text-sm text-gray dark:text-gray-light">Fokus pada pendidikan dan pengembangan potensi anak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prinsip dan Definisi */}
        <section id="prinsip" className="scroll-mt mb-20">
          <div className="section-header">
            <h2 className="text-3xl font-bold text-dark dark:text-light">Prinsip dan Definisi Kunci</h2>
            <p className="text-gray dark:text-gray-light mt-2">Landasan filosofis UU SPPA</p>
          </div>

          <div className="card p-6 md:p-8 gradient-bg">
            <div className="tabs mb-6">
              <div className="flex border-b border-gray-light dark:border-gray/50">
                <button className="px-4 py-2 text-gray dark:text-gray-light tab-active" data-tab="asas">Asas-Asas</button>
                <button className="px-4 py-2 text-gray dark:text-gray-light" data-tab="definisi">Definisi Kunci</button>
                <button className="px-4 py-2 text-gray dark:text-gray-light" data-tab="aktor">Aktor Kunci</button>
              </div>
            </div>

            <div className="tab-content active" id="asas">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-light dark:border-gray/50">
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">No</th>
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Asas</th>
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Penjelasan</th>
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Pasal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                      <td className="py-3 px-4">1</td>
                      <td className="py-3 px-4 font-medium text-dark dark:text-light">Pelindungan</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Melindungi anak dari bahaya fisik dan psikis</td>
                      <td className="py-3 px-4">
                        <span className="badge badge-primary">Pasal 2(a)</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                      <td className="py-3 px-4">2</td>
                      <td className="py-3 px-4 font-medium text-dark dark:text-light">Keadilan</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Penyelesaian yang adil dan proporsional</td>
                      <td className="py-3 px-4">
                        <span className="badge badge-primary">Pasal 2(b)</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                      <td className="py-3 px-4">3</td>
                      <td className="py-3 px-4 font-medium text-dark dark:text-light">Nondiskriminasi</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Tanpa pembedaan berdasarkan suku, agama, ras</td>
                      <td className="py-3 px-4">
                        <span className="badge badge-primary">Pasal 2(c)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="tab-content" id="definisi">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-dark dark:text-light">Anak yang Berhadapan dengan Hukum</h4>
                  <p className="text-gray dark:text-gray-light text-sm">Anak berusia 12-18 tahun yang diduga melakukan tindak pidana, atau menjadi korban/saksi</p>
                  <span className="badge badge-secondary mt-2">Pasal 1(2)</span>
                </div>
                <div className="p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-dark dark:text-light">Keadilan Restoratif</h4>
                  <p className="text-gray dark:text-gray-light text-sm">Penyelesaian dengan melibatkan pelaku, korban, keluarga, dan masyarakat</p>
                  <span className="badge badge-secondary mt-2">Pasal 1(5)</span>
                </div>
                <div className="p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-dark dark:text-light">Diversi</h4>
                  <p className="text-gray dark:text-gray-light text-sm">Pengalihan penyelesaian perkara anak dari proses peradilan</p>
                  <span className="badge badge-secondary mt-2">Pasal 1(6)</span>
                </div>
              </div>
            </div>

            <div className="tab-content" id="aktor">
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.071a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.071a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark dark:text-light">Penyidik</h4>
                    <p className="text-gray dark:text-gray-light text-sm">Bertugas melakukan penyidikan dengan pendekatan khusus anak</p>
                    <span className="badge badge-accent mt-2">Pasal 7</span>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                  <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark dark:text-light">Hakim Anak</h4>
                    <p className="text-gray dark:text-gray-light text-sm">Memeriksa dan memutus perkara anak dengan pertimbangan khusus</p>
                    <span className="badge badge-accent mt-2">Pasal 15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diversi */}
        <section id="diversi" className="scroll-mt mb-20">
          <div className="section-header">
            <h2 className="text-3xl font-bold text-dark dark:text-light">Mekanisme Diversi</h2>
            <p className="text-gray dark:text-gray-light mt-2">Proses pengalihan penyelesaian perkara anak</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-4 text-dark dark:text-light">Tujuan Diversi</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark dark:text-light">Mencapai perdamaian</h4>
                    <p className="text-gray dark:text-gray-light text-sm">Antara korban dan anak pelaku</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l8-8m0 0l-8-8m8 8H4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark dark:text-light">Menghindari perampasan kemerdekaan</h4>
                    <p className="text-gray dark:text-gray-light text-sm">Anak tetap bisa tumbuh di lingkungan keluarga</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark dark:text-light">Mendorong partisipasi masyarakat</h4>
                    <p className="text-gray dark:text-gray-light text-sm">Melibatkan keluarga dan tokoh masyarakat</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                <h4 className="font-semibold mb-2 text-dark dark:text-light">Syarat Diversi:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray dark:text-gray-light text-sm">
                  <li>Tindak pidana dengan ancaman &lt; 7 tahun</li>
                  <li>Bukan pengulangan tindak pidana</li>
                  <li>Terdapat persetujuan dari korban</li>
                </ul>
              </div>
            </div>

            <div className="card p-6 md:p-8 gradient-bg">
              <h3 className="text-2xl font-semibold mb-4 text-dark dark:text-light">Alur Proses</h3>
              <div className="mermaid" id="diversi-diagram-container">
                {`graph TD
                    A[Tindak Pidana Anak] --> B{Penyidikan}
                    B --> C{Diversi}
                    C -->|Berhasil| D[Kesepakatan Diversi]
                    C -->|Gagal| E[Proses Peradilan]
                    D --> F[Penetapan Pengadilan]
                    E --> F
                    F --> G[Penyelesaian]
                    style A fill:#F3F4F6,stroke:#E5E7EB
                    style B fill:#3B82F6,stroke:#2563EB,color:#fff
                    style C fill:#10B981,stroke:#059669,color:#fff
                    style D fill:#10B981,stroke:#059669,color:#fff
                    style E fill:#EF4444,stroke:#DC2626,color:#fff
                    style F fill:#3B82F6,stroke:#2563EB,color:#fff
                    style G fill:#F59E0B,stroke:#D97706,color:#fff
                `}
              </div>
              <div className="flex justify-center space-x-2 mt-4">
                <button id="download-diagram-btn" className="px-3 py-1.5 bg-primary text-white text-xs rounded hover:bg-primary-dark transition-colors">Unduh Diagram</button>
                <button id="fullscreen-diagram-btn" className="px-3 py-1.5 bg-gray-light text-dark dark:bg-gray text-light text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Layar Penuh</button>
              </div>
            </div>
          </div>
        </section>

        {/* Proses Peradilan */}
        <section id="proses" className="scroll-mt mb-20">
          <div className="section-header">
            <h2 className="text-3xl font-bold text-dark dark:text-light">Proses Peradilan Anak</h2>
            <p className="text-gray dark:text-gray-light mt-2">Tahapan penyelesaian perkara anak</p>
          </div>

          <div className="card p-6 md:p-8 gradient-bg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-light dark:border-gray/50">
                    <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Tahapan</th>
                    <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Pelaksana</th>
                    <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Jangka Waktu</th>
                    <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                    <td className="py-3 px-4 font-medium text-dark dark:text-light">Penangkapan</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">Penyidik</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">Maks. 24 jam</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">Hanya untuk tindak pidana tertentu</td>
                  </tr>
                  <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                    <td className="py-3 px-4 font-medium text-dark dark:text-light">Penahanan Penyidikan</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">Penyidik</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">7 hari (dapat diperpanjang 8 hari)</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">Hanya jika terpaksa</td>
                  </tr>
                  <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                    <td className="py-3 px-4 font-medium text-dark dark:text-light">Penahanan Penuntutan</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">Penuntut Umum</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">5 hari (dapat diperpanjang 5 hari)</td>
                    <td className="py-3 px-4 text-gray dark:text-gray-light">Dengan pertimbangan khusus</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 illustration-container">
              {/* @ts-ignore */}
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_x02r2s4h.json"
                background="transparent"
                speed="1"
                className="w-64 h-48 mx-auto floating"
                loop
                autoplay>
              </lottie-player>
            </div>
          </div>
        </section>

        {/* Sanksi */}
        <section id="sanksi" className="scroll-mt mb-20">
          <div className="section-header">
            <h2 className="text-3xl font-bold text-dark dark:text-light">Sanksi dan Tindakan</h2>
            <p className="text-gray dark:text-gray-light mt-2">Hierarki pidana dan tindakan bagi anak</p>
          </div>

          <div className="card p-6 md:p-8">
            <div className="tabs mb-6">
              <div className="flex border-b border-gray-light dark:border-gray/50">
                <button className="px-4 py-2 text-gray dark:text-gray-light tab-active" data-tab="pidana">Pidana</button>
                <button className="px-4 py-2 text-gray dark:text-gray-light" data-tab="tindakan">Tindakan</button>
                <button className="px-4 py-2 text-gray dark:text-gray-light" data-tab="umur">Berdasarkan Umur</button>
              </div>
            </div>

            <div className="tab-content active" id="pidana">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-light dark:border-gray/50">
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Jenis</th>
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Kriteria</th>
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Pasal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                      <td className="py-3 px-4 font-medium text-dark dark:text-light">Peringatan</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Pidana ringan tanpa pembatasan kebebasan</td>
                      <td className="py-3 px-4">
                        <span className="badge badge-primary">Pasal 71(1a)</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                      <td className="py-3 px-4 font-medium text-dark dark:text-light">Dengan Syarat</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Penjara maks. 2 tahun, masa percobaan 3 tahun</td>
                      <td className="py-3 px-4">
                        <span className="badge badge-primary">Pasal 71(1b)</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                      <td className="py-3 px-4 font-medium text-dark dark:text-light">Pelatihan Kerja</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">3 bulan - 1 tahun</td>
                      <td className="py-3 px-4">
                        <span className="badge badge-primary">Pasal 71(1c)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="tab-content" id="tindakan">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-dark dark:text-light">Pengembalian kepada Orang Tua</h4>
                  <p className="text-gray dark:text-gray-light text-sm">Dengan syarat dan pembimbingan</p>
                  <span className="badge badge-accent mt-2">Pasal 82(1a)</span>
                </div>
                <div className="p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-dark dark:text-light">Penyerahan kepada Seseorang</h4>
                  <p className="text-gray dark:text-gray-light text-sm">Kepada orang dewasa yang cakap</p>
                  <span className="badge badge-accent mt-2">Pasal 82(1b)</span>
                </div>
                <div className="p-4 bg-gray-light/30 dark:bg-gray/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-dark dark:text-light">Perawatan di LPKS</h4>
                  <p className="text-gray dark:text-gray-light text-sm">Untuk anak dengan masalah khusus</p>
                  <span className="badge badge-accent mt-2">Pasal 82(1d)</span>
                </div>
              </div>
            </div>

            <div className="tab-content" id="umur">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-light dark:border-gray/50">
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Kelompok Umur</th>
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Jenis Sanksi</th>
                      <th className="py-3 px-4 text-left font-semibold text-dark dark:text-light">Rincian</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                      <td className="py-3 px-4 font-medium text-dark dark:text-light">Di bawah 12 tahun</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Tindakan</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Pengembalian atau pembinaan di LPKS (maks. 6 bulan)</td>
                    </tr>
                    <tr className="border-b border-gray-light/50 dark:border-gray/20 hover:bg-gray-light/30 dark:hover:bg-gray/10">
                      <td className="py-3 px-4 font-medium text-dark dark:text-light">12-18 tahun</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Pidana atau Tindakan</td>
                      <td className="py-3 px-4 text-gray dark:text-gray-light">Penjara sebagai upaya terakhir (maks. ½ dari ancaman dewasa)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Infografis */}
        <section id="infografis" className="scroll-mt mb-20">
          <div className="section-header">
            <h2 className="text-3xl font-bold text-dark dark:text-light">Infografis</h2>
            <p className="text-gray dark:text-gray-light mt-2">Ringkasan visual UU SPPA</p>
          </div>

          <div className="card p-6 md:p-8 gradient-bg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-dark dark:text-light">Prinsip Utama</h3>
                <div className="illustration-container">
                  {/* @ts-ignore */}
                  <lottie-player
                                src="https://assets1.lottiefiles.com/packages/lf20_q4h7T0.json"
                    background="transparent"
                    speed="1"
                    className="w-full h-64"
                    loop
                    autoplay>
                  </lottie-player>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-dark dark:text-light">Proses Diversi</h3>
                <div className="mermaid">
                  {`flowchart TD
                      A[Anak Berhadapan\\n dengan Hukum] --> B{Penyidikan}
                      B -->|Diversi| C[Kesepakatan\\n Damai]
                      B -->|Tidak Diversi| D[Proses\\n Peradilan]
                      C --> E[Penyelesaian\\n di Luar Pengadilan]
                      D --> F[Sidang\\n Pengadilan Anak]
                      E --> G[Anak Kembali\\n ke Masyarakat]
                      F --> G
                  `}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Penutup */}
        <section className="mb-20">
          <div className="section-header">
            <h2 className="text-3xl font-bold text-dark dark:text-light">Penutup</h2>
            <p className="text-gray dark:text-gray-light mt-2">Refleksi dan tantangan implementasi</p>
          </div>

          <div className="card p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-dark dark:text-light">Tantangan Implementasi</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark dark:text-light">Infrastruktur Terbatas</h4>
                      <p className="text-gray dark:text-gray-light text-sm">Ketersediaan LPKA dan LPKS yang belum merata</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark dark:text-light">SDM yang Terbatas</h4>
                      <p className="text-gray dark:text-gray-light text-sm">Kurangnya hakim dan penyidik terlatih</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark dark:text-light">Kesadaran Masyarakat</h4>
                      <p className="text-gray dark:text-gray-light text-sm">Pemahaman yang masih rendah tentang keadilan restoratif</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-dark dark:text-light">Rekomendasi</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark dark:text-light">Peningkatan Anggaran</h4>
                      <p className="text-gray dark:text-gray-light text-sm">Untuk pembangunan infrastruktur dan pelatihan</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark dark:text-light">Sosialisasi Masif</h4>
                      <p className="text-gray dark:text-gray-light text-sm">Meningkatkan pemahaman masyarakat tentang UU SPPA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 dark:bg-primary/10 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2 text-dark dark:text-light">Kesimpulan</h3>
                <p className="text-gray dark:text-gray-light mb-4">UU SPPA merupakan kemajuan besar dalam sistem peradilan anak Indonesia. Keberhasilannya bergantung pada implementasi yang konsisten dan dukungan semua pemangku kepentingan.</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">Unduh Full Report</a>
                  <a href="#" className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-colors">Bagikan</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-light/30 dark:bg-dark/50 py-12 border-t border-gray-light/50 dark:border-gray/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-dark dark:text-light">Tentang</h4>
              <p className="text-gray dark:text-gray-light text-sm">Platform analisis interaktif UU Nomor 11 Tahun 2012 tentang Sistem Peradilan Pidana Anak.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-dark dark:text-light">Navigasi</h4>
              <ul className="space-y-2">
                <li><a href="#pendahuluan" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors text-sm">Pendahuluan</a></li>
                <li><a href="#prinsip" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors text-sm">Prinsip</a></li>
                <li><a href="#diversi" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors text-sm">Diversi</a></li>
                <li><a href="#sanksi" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors text-sm">Sanksi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-dark dark:text-light">Sumber</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors text-sm">UU No. 11/2012</a></li>
                <li><a href="#" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors text-sm">Kemenkumham RI</a></li>
                <li><a href="#" className="text-gray dark:text-gray-light hover:text-primary dark:hover:text-primary transition-colors text-sm">Konvensi Hak Anak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-dark dark:text-light">Kontak</h4>
              <p className="text-gray dark:text-gray-light text-sm">Email: info@sppa-analisis.go.id</p>
              <p className="text-gray dark:text-gray-light text-sm">Telepon: (021) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-light/50 dark:border-gray/50 pt-6 text-center text-gray dark:text-gray-light text-sm">
            <p>&copy; 2025 Analisis UU SPPA. All rights reserved.</p>
            <p className="mt-1">Dikembangkan untuk kepentingan terbaik anak Indonesia</p>
          </div>
        </div>
      </footer>
    </>
  );
}
