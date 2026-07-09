document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTOS ---
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const currentYearSpan = document.getElementById('current-year');

  // --- 1. ANO ATUAL AUTOMÁTICO ---
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- 2. HEADER SCROLL & LINK ATIVO ---
  window.addEventListener('scroll', () => {
    // Efeito de rolagem do header
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Detecção de seção ativa no menu
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 180)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // --- 3. MENU MOBILE ---
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      
      const spans = menuToggle.querySelectorAll('span');
      if (navLinksContainer.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- 4. FILTRAGEM DE PROJETOS ---
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. FORMULÁRIO DE CONTATO PROFISSIONAL ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Direcionando...';
      if (window.lucide) lucide.createIcons();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (window.lucide) lucide.createIcons();
        
        if (name && email && message) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `<strong>Sucesso:</strong> Redirecionando para o WhatsApp Comercial para iniciar o contato...`;
          
          // Formatar o texto de contato profissional para enviar ao WhatsApp
          const serviceLabel = getServiceLabel(service);
          const formattedMessage = `Olá Gustavo,\n\nMeu nome é ${name} (${email}). Entro em contato através do portfólio referente a: *${serviceLabel}*.\n\nMensagem:\n${message}`;
          const encodedMessage = encodeURIComponent(formattedMessage);
          
          // Abre o WhatsApp em nova aba com o texto pré-definido
          const whatsappUrl = `https://wa.me/5511987279615?text=${encodedMessage}`;
          window.open(whatsappUrl, '_blank');
          
          contactForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.innerHTML = '<strong>Erro:</strong> Por favor, verifique se todos os campos obrigatórios foram preenchidos.';
        }
        
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1200);
    });
  }

  // --- 6. PAINEL LATERAL DESLIZANTE (CASES DETAIL DRAWER) ---
  const caseDrawer = document.getElementById('case-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');
  const drawerContent = document.getElementById('drawer-content');
  const viewCaseBtns = document.querySelectorAll('.view-case-btn');

  const casesData = {
    ativos: {
      title: "Auditoria e Cadastro de Ativos Corporativos",
      tags: ["FlutterFlow", "Supabase", "Resend API", "Biometria"],
      problem: "Auditorias e inventários manuais lentos, dependentes de planilhas locais e vulneráveis a erros de preenchimento e perda de imagens físicas.",
      solution: "Aplicativo mobile desenvolvido em FlutterFlow integrado ao Supabase. Apresenta autenticação biométrica (impressão digital), tela de cadastro dinâmico com fotos enviadas diretamente para o Storage do Supabase e envio de relatórios de conformidade via API do Resend.",
      tech: "FlutterFlow, Supabase (Database/Storage/Auth), Resend Email API, Dart.",
      result: "Digitalização de 100% dos relatórios de auditoria, eliminação de papéis e planilhas paralelas, e rastreabilidade imediata do status de cada ativo corporativo.",
      hasVideo: true,
      videoSrc: "assets/cadastro_ativos.mp4",
      images: ["assets/home_page.jpeg", "assets/cadastro_ativo.jpeg", "assets/lista_ativos.jpeg"],
      showSupabasePrint: true,
      codeSnippet: `// Custom Action no FlutterFlow para Envio de E-mail de Auditoria via Resend API
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<bool> sendAssetConfirmationEmail(
  String recipientEmail,
  String assetName,
  String assetCode,
  String auditorName,
) async {
  final url = Uri.parse('https://api.resend.com/emails');
  
  try {
    final response = await http.post(
      url,
      headers: {
        'Authorization': 'Bearer re_123456789', // API Key higienizada
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'from': 'Auditoria de Ativos <auditoria@empresa.com>',
        'to': [recipientEmail],
        'subject': 'Alerta de Cadastro de Ativo: $assetCode',
        'html': '''
          <h3>Confirmação de Auditoria de Ativo</h3>
          <p>O ativo <strong>$assetName</strong> (Código: $assetCode) foi cadastrado com sucesso.</p>
          <p>Auditor responsável: $auditorName</p>
        ''',
      }),
    );
    return response.statusCode == 200;
  } catch (e) {
    return false;
  }
}`
    },
    sheets: {
      title: "Visualizador Analítico de Planilhas via Apps Script",
      tags: ["FlutterFlow", "Google Sheets", "Apps Script", "REST API"],
      problem: "Dificuldade de equipes de campo sem computadores em acessar, cruzar e visualizar dados de andamento operacional que estavam distribuídos em várias planilhas no Google Drive.",
      solution: "Aplicativo móvel conectado a endpoints criados via Google Apps Script (Web App), que leem as planilhas do Sheets em tempo real e as servem como JSON estruturado, apresentando visões executivas limpas por programas operacionais.",
      tech: "FlutterFlow, Google Sheets, Google Apps Script (REST Endpoints).",
      result: "Redução do tempo de consulta de status de projetos de 15 minutos para menos de 10 segundos, com acesso mobile instantâneo e sem necessidade de licenças de ERP caras.",
      hasVideo: false,
      images: ["assets/sheets_home.png", "assets/sheets_list.png", "assets/sheets_code.png"],
      showSupabasePrint: false,
      codeSnippet: `// Google Apps Script (Web App) para servir planilhas como JSON REST
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Operacional");
  var data = sheet.getDataRange().getValues();
  var result = [];
  
  for (var i = 1; i < data.length; i++) {
    result.push({
      "id": data[i][0],
      "programa": data[i][1],
      "responsavel": data[i][2],
      "status": data[i][3],
      "progresso": parseFloat(data[i][4]) * 100
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}`
    },
    dre: {
      title: "Controladoria Gerencial e DRE Operacional",
      tags: ["Power BI", "SQL Server", "Financeiro", "DAX"],
      problem: "A equipe necessitava de uma DRE operacional estruturada para a consolidação ágil e centralizada dos resultados gerais da empresa.",
      solution: "Painel de Controladoria unificando faturamento bruto, deduções de receita, receitas operacionais líquidas e despesas administrativas por filial. Inclui análise dinâmica de margem líquida e detalhamento metodológico dos cálculos financeiros diretamente no dashboard.",
      tech: "Power BI, DAX avançado, SQL Server, ETL, Modelagem Dimensional.",
      result: "Consolidação automática dos dados e fechamento financeiro imediato após os lançamentos de cada filial, simplificando a controladoria e reduzindo o tempo administrativo.",
      hasVideo: false,
      hasEmbed: true,
      embedSrc: "https://app.powerbi.com/view?r=eyJrIjoiMjczMmNkYWYtMDNkNy00MzNkLTg4ZDYtN2M0YWUxOGRjMmJiIiwidCI6IjBjMzA1M2ViLWY4NDAtNDc0Ni05NWQ0LTQ1MDVkNmVjYzRiMiJ9",
      images: ["assets/dre_home.png", "assets/dre_executivo.png", "assets/dre_informativo.png"],
      showSupabasePrint: false
    },
    sla: {
      title: "Monitoramento de SLA de Entregas e E-commerce",
      tags: ["Power BI", "Python", "Logística", "WhatsApp API"],
      problem: "Atrasos no faturamento e expedição de pedidos do e-commerce das lojas físicas, sem alertas centralizados para atuar nos pedidos críticos antes de violar o SLA de entrega.",
      solution: "Painel operacional detalhando a quantidade de pedidos entregues dentro do SLA, em alerta e fora do SLA por loja (ex: Oba Asa Sul, Oba 212 Sul, etc.). O sistema é integrado a uma automação em Python que varre o banco de dados operacional a cada 10 minutos, detecta pedidos com risco iminente de expiração e notifica os gerentes de loja via WhatsApp API com o número e dados do pedido para expedição imediata.",
      tech: "Power BI, Python (scripts de automação e integração com WhatsApp), SQL Server, ETL.",
      result: "Maior controle operacional por loja (redução de atrasos severos na Black Friday e operação diária), engajando as equipes de expedição e garantindo a satisfação do cliente final.",
      hasVideo: false,
      hasEmbed: true,
      embedSrc: "https://app.powerbi.com/view?r=eyJrIjoiNTZhODk3NTctOTZhYy00MmUxLTlkNGQtMTYzZWQzMzc2ZjQ5IiwidCI6IjBjMzA1M2ViLWY4NDAtNDc0Ni05NWQ0LTQ1MDVkNmVjYzRiMiJ9",
      images: ["assets/sla_dashboard.png"],
      showSupabasePrint: false,
      isLandscape: true
    },
    monitoramento: {
      title: "Central de Monitoramento Integrada (NOC)",
      tags: ["Grafana", "Power BI", "NOC", "Monitoramento"],
      problem: "Ausência de centralização no monitoramento em tempo real do funcionamento de servidores, bancos de dados, fluxos de ETL e indicadores de desempenho (KPIs) do negócio.",
      solution: "Implementação de uma sala de controle operacional (NOC) com 6 TVs exibindo em tempo real painéis integrados do Grafana (infraestrutura de TI/ETL) e Power BI (desempenho comercial e operacional).",
      tech: "Grafana, Power BI, SQL Server, Jenkins (orquestração de jobs de dados), Windows Server.",
      result: "Redução no tempo de indisponibilidade de serviços (downtime), detecção proativa de falhas em jobs de banco de dados e aumento da visibilidade operacional para os tomadores de decisão.",
      hasVideo: false,
      hasMonitorVideos: true,
      monitorVideo1: "assets/monitor_video_1.mp4",
      monitorVideo2: "assets/monitor_video_2.mp4",
      images: ["assets/monitor_home.jpeg", "assets/monitor_1.jpeg", "assets/monitor_2.jpeg", "assets/monitor_3.jpeg", "assets/monitor_4.jpeg", "assets/monitor_5.jpeg"],
      showSupabasePrint: false,
      isLandscape: true
    }
  };

  function openDrawer(caseId) {
    const data = casesData[caseId];
    if (!data) return;

    let mediaHTML = '';
    if (data.hasVideo) {
      mediaHTML = `
        <div class="phone-mockup-wrapper">
          <div class="phone-mockup">
            <video autoplay loop muted playsinline class="phone-video" id="drawer-video">
              <source src="${data.videoSrc}" type="video/mp4">
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
      `;
    }

    if (data.hasMonitorVideos) {
      mediaHTML = `
        <div style="margin-bottom: 20px;">
          <h4 class="detail-subtitle"><i data-lucide="video" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Gravações da Sala de Controle (NOC)</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; justify-content: center; margin-bottom: 12px;">
            <div style="border-radius: 8px; overflow: hidden; border: 1px solid var(--border-light); background: #000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <video autoplay loop muted playsinline style="width: 100%; display: block;" class="monitor-drawer-video">
                <source src="${data.monitorVideo1}" type="video/mp4">
              </video>
            </div>
            <div style="border-radius: 8px; overflow: hidden; border: 1px solid var(--border-light); background: #000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <video autoplay loop muted playsinline style="width: 100%; display: block;" class="monitor-drawer-video">
                <source src="${data.monitorVideo2}" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
      `;
    }

    let imagesHTML = '';
    if (data.images && data.images.length > 0) {
      const isLandscape = data.isLandscape || false;
      const thumbStyle = isLandscape
        ? 'width: 120px; height: 68px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-light); cursor: pointer;'
        : 'width: 75px; height: 140px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-light); cursor: pointer;';

      imagesHTML = `
        <div style="margin-top: 8px;">
          <h4 class="detail-subtitle"><i data-lucide="image" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Galeria de Mídias / Capturas</h4>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px;">
            ${data.images.map(img => `
              <img src="${img}" alt="Screenshot" class="screenshot-thumbnail" style="${thumbStyle}" data-full="${img}">
            `).join('')}
          </div>
        </div>
      `;
    }

    let supabaseHTML = '';
    if (data.showSupabasePrint) {
      supabaseHTML = `
        <div class="case-detail-section">
          <h4 class="detail-subtitle"><i data-lucide="database" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Modelagem de Banco (Supabase)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Estrutura relacional e tabelas mapeadas para armazenar ativos, logs de conformidade e links de imagens do Storage:</p>
          <img src="assets/tabela_supabase.png" alt="Estrutura de Tabelas Supabase" class="screenshot-thumbnail" style="width: 100%; border-radius: 4px; border: 1px solid var(--border-light); cursor: pointer;" data-full="assets/tabela_supabase.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <div style="display: none; padding: 12px; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-light); border-radius: 4px; text-align: center; font-size: 0.75rem; color: var(--text-muted);">
            <i data-lucide="info" style="width: 16px; height: 16px; display: block; margin: 0 auto 6px; color: var(--primary-cyan);"></i>
            Para carregar o print da estrutura, salve a captura de tela da tabela do Supabase com o nome <strong>tabela_supabase.png</strong> na pasta <strong>assets/</strong> do projeto.
          </div>
        </div>
      `;
    }

    let embedHTML = '';
    if (data.hasEmbed) {
      embedHTML = `
        <div class="case-detail-section" style="margin-top: 12px; padding: 12px;">
          <h4 class="detail-subtitle"><i data-lucide="monitor" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Dashboard Interativo (Live)</h4>
          <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; overflow: hidden; border-radius: 4px; border: 1px solid var(--border-light); background: #111;">
            <iframe src="${data.embedSrc}" frameborder="0" allowFullScreen="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
          </div>
        </div>
      `;
    }

    drawerContent.innerHTML = `
      <h3>${data.title}</h3>
      <div class="drawer-tags">
        ${data.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      
      ${mediaHTML}
      ${embedHTML}
      ${imagesHTML}

      <div class="case-detail-section">
        <h4 class="detail-subtitle"><i data-lucide="alert-circle" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> O Problema</h4>
        <p>${data.problem}</p>
      </div>

      <div class="case-detail-section">
        <h4 class="detail-subtitle"><i data-lucide="check-circle" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> A Solução</h4>
        <p>${data.solution}</p>
      </div>

      <div class="case-detail-section">
        <h4 class="detail-subtitle"><i data-lucide="cpu" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Tecnologias</h4>
        <p>${data.tech}</p>
      </div>

      <div class="case-detail-section">
        <h4 class="detail-subtitle"><i data-lucide="trending-up" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> Resultado de Negócio</h4>
        <p><strong>Impacto:</strong> ${data.result}</p>
      </div>

      ${supabaseHTML}
    `;

    caseDrawer.classList.add('active');
    document.body.style.overflow = 'hidden'; // block main scroll
    if (window.lucide) lucide.createIcons();
  }

  function closeDrawer() {
    const video = document.getElementById('drawer-video');
    if (video) video.pause(); // pause video on close

    caseDrawer.classList.remove('active');
    document.body.style.overflow = ''; // restore main scroll
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  if (viewCaseBtns) {
    viewCaseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const caseId = btn.getAttribute('data-case');
        openDrawer(caseId);
      });
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // --- 7. LIGHTBOX DE IMAGENS (AMAZON STYLE) ---
  const imageLightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPhoneFrame = document.getElementById('lightbox-phone-frame');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentImageIndex = 0;
  let imageList = [];

  document.addEventListener('click', (e) => {
    const thumbnail = e.target.closest('.screenshot-thumbnail');
    if (thumbnail && thumbnail.hasAttribute('data-full')) {
      e.preventDefault();
      
      // Get all screenshots in the active drawer to build navigation queue
      const allThumbs = Array.from(document.querySelectorAll('.drawer-content .screenshot-thumbnail'));
      imageList = allThumbs.map(t => t.getAttribute('data-full'));
      
      const fullSrc = thumbnail.getAttribute('data-full');
      currentImageIndex = imageList.indexOf(fullSrc);
      if (currentImageIndex === -1) currentImageIndex = 0;
      
      openLightboxAtIndex(currentImageIndex);
    }
  });

  function openLightboxAtIndex(index) {
    if (index < 0 || index >= imageList.length) return;
    currentImageIndex = index;
    const fullSrc = imageList[currentImageIndex];
    
    lightboxImg.src = fullSrc;
    
    // Only show phone frame for mobile screenshots in the "Ativos" case
    const isMobileScreenshot = fullSrc.includes('home_page') || fullSrc.includes('cadastro_ativo') || fullSrc.includes('lista_ativos');
    if (lightboxPhoneFrame) {
      if (isMobileScreenshot) {
        lightboxPhoneFrame.classList.remove('no-frame');
      } else {
        lightboxPhoneFrame.classList.add('no-frame');
      }
    }
    
    imageLightbox.classList.add('active');
    updateNavButtons();
  }

  function updateNavButtons() {
    if (imageList.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
    }
  }

  function navigateLightbox(direction) {
    if (imageList.length <= 1) return;
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) {
      newIndex = imageList.length - 1;
    } else if (newIndex >= imageList.length) {
      newIndex = 0;
    }
    openLightboxAtIndex(newIndex);
  }

  function closeLightbox() {
    imageLightbox.classList.remove('active');
    setTimeout(() => {
      lightboxImg.src = '';
    }, 250);
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  if (imageLightbox) {
    imageLightbox.addEventListener('click', (e) => {
      // Closes if clicked on the overlay background or the wrapper outside the actual image/phone frame
      if (e.target === imageLightbox || e.target.classList.contains('lightbox-wrapper')) {
        closeLightbox();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (imageLightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
          navigateLightbox(1);
        }
      }
    });
  }

  function getServiceLabel(value) {
    switch (value) {
      case 'dashboards': return 'Dados & BI';
      case 'automacoes': return 'Automação de Processos';
      case 'apps': return 'Aplicativos Corporativos';
      case 'consultoria': return 'Consultoria Técnica';
      default: return 'Contato Geral';
    }
  }
});
