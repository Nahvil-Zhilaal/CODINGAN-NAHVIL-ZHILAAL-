// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor
    const customCursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('cursorDot');

    if (customCursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX - 10 + 'px';
            customCursor.style.top = e.clientY - 10 + 'px';
            cursorDot.style.left = e.clientX - 4 + 'px';
            cursorDot.style.top = e.clientY - 4 + 'px';
        });

        // Cursor hover effect on links and buttons
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .academic-skill-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.style.transform = 'scale(1.5)';
                customCursor.style.borderColor = '#7b2cbf';
            });
            el.addEventListener('mouseleave', () => {
                customCursor.style.transform = 'scale(1)';
                customCursor.style.borderColor = '#00d4ff';
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Skill bars animation on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });

    // Academic skill bars animation on scroll
    const academicCards = document.querySelectorAll('.academic-skill-card');
    const academicObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.academic-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
            }
        });
    }, { threshold: 0.5 });

    academicCards.forEach(card => {
        academicObserver.observe(card);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // Show success message (you can customize this)
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.about-text, .contact-info, .contact-form');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').slice(1) === current) {
                li.classList.add('active');
            }
        });
    });

    // Add loading animation on page load
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Initial body opacity for fade in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    // Translate Button Functionality
    const translateBtn = document.getElementById('translateBtn');
    const translateDropdown = document.getElementById('translateDropdown');
    const currentLangSpan = document.getElementById('currentLang');
    
    // Translation data
    const translations = {
        en: {
            navHome: 'Home',
            navAbout: 'About',
            navSkills: 'Skills',
            navProjects: 'Projects',
            navContact: 'Contact',
            heroTitle: "Hi, I'm Nahvil Zhilaal",
            heroSubtitle: 'Web Developer & Designer',
            viewWork: 'View My Work',
            contactMe: 'Contact Me',
            aboutMe: 'About Me',
            aboutText1: "Hello! I'm a passionate web developer with a keen eye for design. I love creating beautiful, functional websites and applications that provide great user experiences.",
            aboutText2: "With a focus on clean code and modern design principles, I strive to build digital solutions that make an impact.",
            yearsExp: 'Years Experience',
            projectsCompleted: 'Projects Completed',
            happyClients: 'Happy Clients',
            mySkills: 'My Skills',
            myProjects: 'My Projects',
            getInTouch: 'Get In Touch',
            yourName: 'Your Name',
            yourEmail: 'Your Email',
            yourMessage: 'Your Message',
            sendMessage: 'Send Message',
            footerText: 'All rights reserved.'
        },
        es: {
            navHome: 'Inicio',
            navAbout: 'Sobre Mí',
            navSkills: 'Habilidades',
            navProjects: 'Proyectos',
            navContact: 'Contacto',
            heroTitle: 'Hola, soy Nahvil Zhilaal',
            heroSubtitle: 'Desarrollador Web y Diseñador',
            viewWork: 'Ver Mi Trabajo',
            contactMe: 'Contáctame',
            aboutMe: 'Sobre Mí',
            aboutText1: '¡Hola! Soy un desarrollador web apasionado con un buen ojo para el diseño. Me encanta crear sitios web hermosos y funcionales que brinden grandes experiencias de usuario.',
            aboutText2: 'Con un enfoque en código limpio y principios de diseño modernos, me esfuerzo por crear soluciones digitales que marquen la diferencia.',
            yearsExp: 'Años de Experiencia',
            projectsCompleted: 'Proyectos Completados',
            happyClients: 'Clientes Felices',
            mySkills: 'Mis Habilidades',
            myProjects: 'Mis Proyectos',
            getInTouch: 'Contáctame',
            yourName: 'Tu Nombre',
            yourEmail: 'Tu Correo',
            yourMessage: 'Tu Mensaje',
            sendMessage: 'Enviar Mensaje',
            footerText: 'Todos los derechos reservados.'
        },
        fr: {
            navHome: 'Accueil',
            navAbout: 'À Propos',
            navSkills: 'Compétences',
            navProjects: 'Projets',
            navContact: 'Contact',
            heroTitle: 'Salut, je suis Nahvil Zhilaal',
            heroSubtitle: 'Développeur Web et Designer',
            viewWork: 'Voir Mon Travail',
            contactMe: 'Me Contacter',
            aboutMe: 'À Propos',
            aboutText1: 'Bonjour ! Je suis un développeur web passionné avec un œil pour le design. J\'aime créer de beaux sites Web fonctionnels qui offrent de grandes expériences utilisateur.',
            aboutText2: 'Avec un accent sur le code propre et les principes de conception modernes, je m\'efforce de créer des solutions numériques qui font la différence.',
            yearsExp: "Années d'Expérience",
            projectsCompleted: 'Projets Terminés',
            happyClients: 'Clients Satisfaits',
            mySkills: 'Mes Compétences',
            myProjects: 'Mes Projets',
            getInTouch: 'Me Contacter',
            yourName: 'Votre Nom',
            yourEmail: 'Votre Email',
            yourMessage: 'Votre Message',
            sendMessage: 'Envoyer le Message',
            footerText: 'Tous droits réservés.'
        },
        de: {
            navHome: 'Startseite',
            navAbout: 'Über Mich',
            navSkills: 'Fähigkeiten',
            navProjects: 'Projekte',
            navContact: 'Kontakt',
            heroTitle: 'Hallo, ich bin Nahvil Zhilaal',
            heroSubtitle: 'Webentwickler & Designer',
            viewWork: 'Meine Arbeit Ansehen',
            contactMe: 'Kontaktiere Mich',
            aboutMe: 'Über Mich',
            aboutText1: 'Hallo! Ich bin ein leidenschaftlicher Webentwickler mit einem Blick für Design. Ich liebe es, schöne, funktionale Websites zu erstellen, die großartige Benutzererfahrungen bieten.',
            aboutText2: 'Mit einem Fokus auf sauberen Code und modernen Designprinzipien strebe ich danach, digitale Lösungen zu entwickeln, die einen Unterschied machen.',
            yearsExp: 'Jahre Erfahrung',
            projectsCompleted: 'Abgeschlossene Projekte',
            happyClients: 'Zufriedene Kunden',
            mySkills: 'Meine Fähigkeiten',
            myProjects: 'Meine Projekte',
            getInTouch: 'Kontaktiere Mich',
            yourName: 'Dein Name',
            yourEmail: 'Deine E-Mail',
            yourMessage: 'Deine Nachricht',
            sendMessage: 'Nachricht Senden',
            footerText: 'Alle Rechte vorbehalten.'
        },
        id: {
            navHome: 'Beranda',
            navAbout: 'Tentang',
            navSkills: 'Keterampilan',
            navProjects: 'Proyek',
            navContact: 'Kontak',
            heroTitle: 'Halo, saya Nahvil Zhilaal',
            heroSubtitle: 'Pengembang Web & Desainer',
            viewWork: 'Lihat Pekerjaan Saya',
            contactMe: 'Hubungi Saya',
            aboutMe: 'Tentang Saya',
            aboutText1: 'Halo! Saya adalah pengembang web yang passionate dengan mata untuk desain. Saya suka membuat website yang indah dan fungsional yang memberikan pengalaman pengguna yang luar biasa.',
            aboutText2: 'Dengan fokus pada kode bersih dan prinsip desain modern, saya berusaha membangun solusi digital yang memberikan dampak.',
            yearsExp: 'Tahun Pengalaman',
            projectsCompleted: 'Proyek Selesai',
            happyClients: 'Klien Puas',
            mySkills: 'Keterampilan Saya',
            myProjects: 'Proyek Saya',
            getInTouch: 'Hubungi Saya',
            yourName: 'Nama Anda',
            yourEmail: 'Email Anda',
            yourMessage: 'Pesan Anda',
            sendMessage: 'Kirim Pesan',
            footerText: 'Semua hak dilindungi.'
        },
        ar: {
            navHome: 'الرئيسية',
            navAbout: 'من أنا',
            navSkills: 'المهارات',
            navProjects: 'المشاريع',
            navContact: 'اتصل بي',
            heroTitle: 'مرحباً، أنا ناحفيل زيلال',
            heroSubtitle: 'مطور ويب ومصمم',
            viewWork: 'شاهد عملي',
            contactMe: 'اتصل بي',
            aboutMe: 'من أنا',
            aboutText1: 'مرحباً! أنا مطور ويب شغوف ولدي عيون للتصميم. أحب إنشاء مواقع ويب جميلة وظيفية توفر تجارب مستخدم رائعة.',
            aboutText2: 'مع التركيز على الكود النظيف ومبادئ التصميم الحديثة، أسعى لبناء حلول رقمية تحدث فرقاً.',
            yearsExp: 'سنوات الخبرة',
            projectsCompleted: 'مشاريع مكتملة',
            happyClients: 'عملاء سعداء',
            mySkills: 'مهاراتي',
            myProjects: 'مشاريعي',
            getInTouch: 'تواصل معي',
            yourName: 'اسمك',
            yourEmail: 'بريدك الإلكتروني',
            yourMessage: 'رسالتك',
            sendMessage: 'إرسال الرسالة',
            footerText: 'جميع الحقوق محفوظة.'
        }
    };

    // Language codes display
    const langCodes = {
        en: 'EN',
        es: 'ES',
        fr: 'FR',
        de: 'DE',
        id: 'ID',
        ar: 'AR'
    };

    // Toggle dropdown
    translateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        translateDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        translateDropdown.classList.remove('active');
    });

    // Handle language selection
    translateDropdown.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
            translateDropdown.classList.remove('active');
        });
    });

    // Change language function
    function changeLanguage(lang) {
        const trans = translations[lang];
        
        // Update nav links
        document.querySelector('a[href="#home"]').textContent = trans.navHome;
        document.querySelector('a[href="#about"]').textContent = trans.navAbout;
        document.querySelector('a[href="#skills"]').textContent = trans.navSkills;
        document.querySelector('a[href="#projects"]').textContent = trans.navProjects;
        document.querySelector('a[href="#contact"]').textContent = trans.navContact;

        // Update hero
        document.querySelector('.hero-text h1').innerHTML = `Hi, I'm <span class="highlight">Nahvil Zhilaal</span>`;
        document.querySelector('.hero-text p').textContent = trans.heroSubtitle;
        document.querySelector('.btn-primary').textContent = trans.viewWork;
        document.querySelector('.btn-secondary').textContent = trans.contactMe;

        // Update about
        document.querySelector('#about .section-title').textContent = trans.aboutMe;
        const aboutParagraphs = document.querySelectorAll('.about-text p');
        aboutParagraphs[0].textContent = trans.aboutText1;
        aboutParagraphs[1].textContent = trans.aboutText2;

        const statLabels = document.querySelectorAll('.stat-label');
        statLabels[0].textContent = trans.yearsExp;
        statLabels[1].textContent = trans.projectsCompleted;
        statLabels[2].textContent = trans.happyClients;

        // Update skills
        document.querySelector('#skills .section-title').textContent = trans.mySkills;

        // Update projects
        document.querySelector('#projects .section-title').textContent = trans.myProjects;

        // Update contact
        document.querySelector('#contact .section-title').textContent = trans.getInTouch;
        
        const contactForm = document.getElementById('contactForm');
        contactForm.querySelector('input[name="name"]').placeholder = trans.yourName;
        contactForm.querySelector('input[name="email"]').placeholder = trans.yourEmail;
        contactForm.querySelector('textarea[name="message"]').placeholder = trans.yourMessage;
        contactForm.querySelector('button[type="submit"]').textContent = trans.sendMessage;

        // Update footer
        document.querySelector('footer p').textContent = `© 2024 Nahvil Zhilaal. ${trans.footerText}`;

        // Update current language display
        currentLangSpan.textContent = langCodes[lang];

// Set RTL for Arabic
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
    }

    // Theme Toggle (Day/Night Mode)
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'day') {
        document.body.classList.add('day-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('day-mode');
        
        if (document.body.classList.contains('day-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'day');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'night');
        }
    });
});

