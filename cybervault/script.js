// Security Tools Data
const securityTools = [
    {
        name: "Nmap",
        icon: "🔍",
        description: "Network discovery and security auditing tool. Discover hosts and services on a computer network.",
        tags: ["Network Scanner", "Port Scanner", "Security"],
        downloadUrl: "https://nmap.org/dist/nmap-7.97-setup.exe"
    },
    {
        name: "Wireshark",
        icon: "📡",
        description: "World's foremost network protocol analyzer. Capture and analyze network traffic in real-time.",
        tags: ["Network Analysis", "Packet Capture", "Protocol"],
        downloadUrl: "https://2.na.dl.wireshark.org/win64/Wireshark-4.4.7-x64.exe"
    },
    {
        name: "Metasploit",
        icon: "🎯",
        description: "Penetration testing framework. Develop and execute exploit code against remote target machines.",
        tags: ["Penetration Testing", "Exploit", "Framework"],
        downloadUrl: "https://docs.metasploit.com/docs/using-metasploit/getting-started/nightly-installers.html"
    },
    {
        name: "Nikto",
        icon: "🕷️",
        description: "Web server scanner which performs comprehensive tests against web servers for multiple items.",
        tags: ["Web Scanner", "Vulnerability", "CGI"],
        downloadUrl: "https://github.com/sullo/nikto"
    },
    {
        name: "OWASP ZAP",
        icon: "🛡️",
        description: "Web application security scanner. Find security vulnerabilities in web applications.",
        tags: ["Web Security", "OWASP", "Proxy"],
        downloadUrl: "https://www.zaproxy.org/download/"
    },
    {
        name: "Burp Suite Community",
        icon: "🔒",
        description: "Web vulnerability scanner and proxy tool for testing web application security.",
        tags: ["Web Testing", "Proxy", "Scanner"],
        downloadUrl: "https://portswigger.net/burp/communitydownload"
    },
    {
        name: "John the Ripper",
        icon: "🔓",
        description: "Fast password cracker, currently available for many flavors of Unix, Windows, DOS, and OpenVMS.",
        tags: ["Password Cracking", "Hash", "Security"],
        downloadUrl: "https://github.com/openwall/john"
    },
    {
        name: "Hashcat",
        icon: "⚡",
        description: "Advanced password recovery tool supporting over 300 highly-optimized hashing algorithms.",
        tags: ["Password Recovery", "GPU", "Hash"],
        downloadUrl: "https://hashcat.net/hashcat/"
    },
    {
        name: "Aircrack-ng",
        icon: "📶",
        description: "Complete suite of tools to assess WiFi network security. Crack WEP and WPA/WPA2 keys.",
        tags: ["WiFi Security", "Wireless", "Cracking"],
        downloadUrl: "https://www.aircrack-ng.org/downloads.html"
    }
];

// Compilers and Interpreters Data
const compilers = [
    {
        name: "Python",
        icon: "🐍",
        description: "High-level programming language with elegant syntax. Great for beginners and professionals.",
        tags: ["Interpreter", "Scripting", "Data Science"],
        downloadUrl: "https://www.python.org/downloads/"
    },
    {
        name: "GCC",
        icon: "⚙️",
        description: "GNU Compiler Collection supporting C, C++, Objective-C, Fortran, Ada, Go, and D.",
        tags: ["Compiler", "C/C++", "GNU"],
        downloadUrl: "https://gcc.gnu.org/install/"
    },
    {
        name: "Node.js",
        icon: "🟢",
        description: "JavaScript runtime built on Chrome's V8 engine. Build scalable network applications.",
        tags: ["JavaScript", "Runtime", "Server"],
        downloadUrl: "https://nodejs.org/en/download/"
    },
    {
        name: "Go",
        icon: "🔵",
        description: "Open source programming language that makes it easy to build simple, reliable software.",
        tags: ["Compiler", "Google", "Concurrent"],
        downloadUrl: "https://golang.org/dl/"
    },
    {
        name: "Rust",
        icon: "🦀",
        description: "Systems programming language focused on safety, speed, and concurrency.",
        tags: ["Compiler", "Systems", "Memory Safe"],
        downloadUrl: "https://www.rust-lang.org/tools/install"
    },
    {
        name: "Java JDK",
        icon: "☕",
        description: "Java Development Kit with compiler, runtime, and development tools.",
        tags: ["Compiler", "JVM", "Enterprise"],
        downloadUrl: "https://openjdk.java.net/install/"
    },
    {
        name: ".NET Core",
        icon: "🔷",
        description: "Cross-platform framework for building modern applications and cloud services.",
        tags: ["Framework", "Microsoft", "Cross-platform"],
        downloadUrl: "https://dotnet.microsoft.com/download"
    },
    {
        name: "Ruby",
        icon: "💎",
        description: "Dynamic, open source programming language with focus on simplicity and productivity.",
        tags: ["Interpreter", "Dynamic", "Web"],
        downloadUrl: "https://www.ruby-lang.org/en/downloads/"
    },
    {
        name: "PHP",
        icon: "🐘",
        description: "Popular general-purpose scripting language especially suited for web development.",
        tags: ["Interpreter", "Web", "Scripting"],
        downloadUrl: "https://www.php.net/downloads.php"
    }
];

const resources = [
    {
        name: "C Cheatsheet",
        icon: "🔣",
        description: "Quick reference for C programming syntax and core concepts.",
        tags: ["Cheatsheet", "C"],
        downloadUrl: "https://www.codewithharry.com/blogpost/c-cheatsheet"
    },
    {
        name: "Python Cheatsheet",
        icon: "🐍",
        description: "Quick reference for Python syntax and essential commands.",
        tags: ["Cheatsheet", "Python"],
        downloadUrl: "https://www.codewithharry.com/blogpost/python-cheatsheet"
    },
    {
        name: "C++ Cheatsheet",
        icon: "💻",
        description: "Handy C++ syntax overview with STL and examples.",
        tags: ["Cheatsheet", "C++"],
        downloadUrl: "https://www.codewithharry.com/blogpost/cpp-cheatsheet"
    },
    {
        name: "Java Cheatsheet",
        icon: "☕",
        description: "Comprehensive Java syntax, OOP, and standard libraries overview.",
        tags: ["Cheatsheet", "Java"],
        downloadUrl: "https://www.codewithharry.com/blogpost/java-cheatsheet"
    },
    {
        name: "MySQL Cheatsheet",
        icon: "🗄️",
        description: "Important SQL queries and database operations reference.",
        tags: ["Cheatsheet", "SQL", "MySQL"],
        downloadUrl: "https://www.codewithharry.com/blogpost/mysql-cheatsheet"
    },
    {
        name: "PHP Cheatsheet",
        icon: "🐘",
        description: "PHP syntax, functions, and common backend programming tips.",
        tags: ["Cheatsheet", "PHP", "Web"],
        downloadUrl: "https://www.codewithharry.com/blogpost/php-cheatsheet"
    },
    {
        name: "HTML Cheatsheet",
        icon: "🌐",
        description: "Quick reference for HTML elements and structure.",
        tags: ["Cheatsheet", "HTML", "Web"],
        downloadUrl: "https://www.codewithharry.com/blogpost/html-cheatsheet"
    },
    {
        name: "CSS Cheatsheet",
        icon: "🎨",
        description: "Essential CSS properties, selectors, and layout techniques.",
        tags: ["Cheatsheet", "CSS", "Web"],
        downloadUrl: "https://www.codewithharry.com/blogpost/css-cheatsheet"
    },
    {
        name: "JavaScript Cheatsheet",
        icon: "📟",
        description: "JavaScript syntax, functions, and DOM manipulation overview.",
        tags: ["Cheatsheet", "JavaScript", "Web"],
        downloadUrl: "https://www.codewithharry.com/blogpost/javascript-cheatsheet"
    }
];



// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Create tool cards
function createToolCard(tool) {
    return `
        <div class="tool-card fade-in">
            <span class="tool-icon">${tool.icon}</span>
            <h3 class="tool-name">${tool.name}</h3>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-tags">
                ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${tool.downloadUrl}" target="_blank" rel="noopener noreferrer" class="download-btn">
                Download ${tool.name}
            </a>
        </div>
    `;
}

// Populate tools and compilers
function populateTools() {
    const toolsGrid = document.getElementById('toolsGrid');
    const compilersGrid = document.getElementById('compilersGrid');
    const resourcesGrid = document.getElementById('resourcesGrid');

    
    if (toolsGrid) {
        toolsGrid.innerHTML = securityTools.map(tool => createToolCard(tool)).join('');
    }
    
    if (compilersGrid) {
        compilersGrid.innerHTML = compilers.map(compiler => createToolCard(compiler)).join('');
    }

    if (resourcesGrid) {
        resourcesGrid.innerHTML = resources.map(resource => createToolCard(resource)).join('');
    }

}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Contact form handling
function handleContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Navbar background on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
}

// Event listeners
window.addEventListener('scroll', () => {
    handleScrollAnimations();
    updateActiveNavLink();
    handleNavbarScroll();
});

window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    populateTools();
    handleContactForm();
    handleScrollAnimations();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add some interactive features
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.cursor');
    if (cursorElement) {
        cursorElement.style.left = e.clientX - 10 + 'px';
        cursorElement.style.top = e.clientY - 10 + 'px';
    }
});

// Add click ripple effect
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    const size = 60;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.pageX - size / 2) + 'px';
    ripple.style.top = (e.pageY - size / 2) + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);