import React from 'react';
import { Shield, Lock, Key, Database, AlertTriangle, CheckCircle, Code, Zap } from 'lucide-react';

const VendettaSecurity = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Obfuscator Sistemi',
      description: 'Kodlarınızı okumayı imkansız hale getirin. Gelişmiş algoritma ile kodlarınız tamamen karmaşıklaştırılır ve korumayla sarmalanır.'
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: 'KEY Sistemi',
      description: 'Benzersiz KEY sistemi ile kodlarınızı kontrol edin. Her kullanıcı için özel KEY oluşturulur ve yetkisiz erişim engellenir.'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: '%100 Güvenli Depolama',
      description: 'Kodlarınız şifreli veritabanında güvenle saklanır. Hiçbir veri sızıntısı yaşanmaz, verileriniz her zaman güvende.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Yenilenebilir KEY',
      description: 'KEY\'ler istediğiniz zaman yenilenebilir. Güvenlik endişesi duyduğunuzda tek tuşla yeni KEY oluşturabilirsiniz.'
    }
  ];

  const securityFlow = [
    { step: '1', title: 'Kod Yükleme', description: 'Kodunuzu sisteme yükleyin' },
    { step: '2', title: 'Obfuscation', description: 'Kod otomatik şifrelenir' },
    { step: '3', title: 'KEY Oluşturma', description: 'Benzersiz KEY üretilir' },
    { step: '4', title: 'Güvenli Depolama', description: 'Kodunuz güvende' }
  ];

  const services = [
    {
      icon: <Key className="w-6 h-6" />,
      title: 'KEY Sistemi',
      description: 'Benzersiz ve yenilenebilir KEY sistemi ile kodlarınızı kontrol edin.'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Anti-Exploit Sistemi',
      description: 'Gelişmiş anti-exploit sistemi ile kodlarınızı exploit girişimlerine karşı koruyun.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Hızlı İşlem',
      description: 'Kodlarınız saniyeler içinde şifrelenir ve kullanıma hazır hale gelir.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/20 border border-red-500/30 rounded-full text-red-400 text-xs font-mono uppercase tracking-wider mb-8">
            <Shield className="w-4 h-4" />
            Güvenlik Özellikleri
          </div>
          
          <h1 className="font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight mb-6">
            Vendetta
            <br />
            <span className="text-red-500">Security</span>
          </h1>
          
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Kodlarınızı korumak için çok katmanlı güvenlik sistemi. Roblox script şifreleme ve güvenlik çözümleri ile kodlarınızı güvence altına alın.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#features"
              className="px-8 py-4 bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-all hover:scale-105"
            >
              Özellikleri Keşfet
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 transition-all"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section id="features" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight mb-4">
              Nedir bu <span className="text-red-500">Vendetta Security</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Kodlarınızı korumak için çok katmanlı güvenlik sistemi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-red-900/10 to-transparent border border-red-500/20 rounded-xl p-8 hover:border-red-500/40 transition-all hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900/20 border border-red-500/30 rounded-xl text-red-500 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Flow */}
      <section className="py-24 bg-gradient-to-b from-black to-red-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight mb-4">
              Güvenlik <span className="text-red-500">Akışı</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFlow.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white font-black text-2xl rounded-full mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight mb-4">
              Vendetta Security <span className="text-red-500">İçeriği</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Kodlarınızı korumak için sunduğumuz profesyonel güvenlik hizmetleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-red-500/40 transition-all hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-900/20 border border-red-500/30 rounded-lg text-red-500 mb-4">
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-red-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-20 h-20 mx-auto mb-8 text-red-500" />
          <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight mb-6">
            Kodlarınızı <span className="text-red-500">Korumaya</span> Hazır mısınız?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Vendetta Security ile kodlarınızı güvence altına alın. Discord üzerinden iletişime geçin.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-all hover:scale-105"
          >
            İletişime Geç
          </a>
        </div>
      </section>
    </div>
  );
};

export default VendettaSecurity;