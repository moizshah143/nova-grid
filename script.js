/* =====================================
   NOVA GRID — MAIN SCRIPT
   (jQuery: navbar, counters, filters, validation)
===================================== */

$(document).ready(function () {

    /* ---------- 1. Navbar Scroll Effect ---------- */
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 50) {
            $(".glass-nav").addClass("scrolled");
        } else {
            $(".glass-nav").removeClass("scrolled");
        }
    });

    /* ---------- 2. Smooth Scroll for Anchors ---------- */
    $('a[href^="#"]').on("click", function (e) {
        const target = $(this).attr("href");
        if (target.length > 1 && $(target).length) {
            e.preventDefault();
            $("html, body").animate(
                { scrollTop: $(target).offset().top - 80 },
                700
            );
        }
    });

    /* ---------- 3. Mobile Navbar Auto-Close ---------- */
    $(".navbar-nav .nav-link").on("click", function () {
        if ($(".navbar-collapse").hasClass("show")) {
            $(".navbar-collapse").collapse("hide");
        }
    });

    /* ---------- 4. Homepage Statistics Counter ---------- */
    let counterStarted = false;

    function startCounters() {
        const statsSection = $(".stats-section");
        if (!statsSection.length || counterStarted) return;

        const sectionTop = statsSection.offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom > sectionTop + 50) {
            counterStarted = true;

            $(".stat-box h2").each(function () {
                const el = $(this);
                const text = el.text().trim();
                const number = parseInt(text.replace(/\D/g, ""), 10);
                const suffix = text.replace(/[0-9]/g, "");

                $({ count: 0 }).animate(
                    { count: number },
                    {
                        duration: 1800,
                        step: function () {
                            el.html(Math.floor(this.count) + "<span>" + suffix + "</span>");
                        },
                        complete: function () {
                            el.html(number + "<span>" + suffix + "</span>");
                        }
                    }
                );
            });
        }
    }

    $(window).on("scroll", startCounters);
    startCounters();


    /* ---------- 5. Projects Filter ---------- */
    $(".filter-btn").on("click", function () {
        const filter = $(this).data("filter");

        // Update active button
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");

        // Filter cards
        let visibleCount = 0;

        $(".project-item").each(function () {
            const category = $(this).data("category");

            if (filter === "all" || category === filter) {
                $(this).removeClass("hide").hide().fadeIn(300);
                visibleCount++;
            } else {
                $(this).addClass("hide").fadeOut(200);
            }
        });

        // Show/hide no results
        if (visibleCount === 0) {
            $("#noResults").fadeIn(300);
        } else {
            $("#noResults").fadeOut(200);
        }
    });


    /* ---------- 6. Dashboard Animations ---------- */
    function animateDashboardCounters() {
        const dash = $(".dashboard-section");
        if (!dash.length || dash.data("animated")) return;

        const windowBottom = $(window).scrollTop() + $(window).height();
        const sectionTop = dash.offset().top;

        if (windowBottom > sectionTop + 100) {
            dash.data("animated", true);

            // Animate Numbers
            $(".metric-value").each(function () {
                const el = $(this);
                const target = parseFloat(el.data("target"));
                const prefix = el.data("prefix") || "";
                const suffix = el.data("suffix") || "";
                const unit = el.find(".unit").text() || "";
                const isDecimal = target % 1 !== 0;

                $({ count: 0 }).animate(
                    { count: target },
                    {
                        duration: 1600,
                        step: function () {
                            const val = isDecimal ? this.count.toFixed(1) : Math.floor(this.count);
                            el.html(prefix + val + '<span class="unit">' + (suffix || unit) + '</span>');
                        },
                        complete: function () {
                            const val = isDecimal ? target.toFixed(1) : target;
                            el.html(prefix + val + '<span class="unit">' + (suffix || unit) + '</span>');
                        }
                    }
                );
            });

            // Animate Chart Bars
            $(".chart-bars .bar").each(function (i) {
                const targetH = $(this).attr("style").match(/height:\s*(\d+)%/);
                if (targetH) {
                    const h = targetH[1];
                    $(this).css("height", "0%");
                    const el = $(this);
                    setTimeout(function () {
                        el.css("height", h + "%");
                    }, 100 + i * 80);
                }
            });

            // Animate Energy Mix
            $(".mix-fill").each(function () {
                const w = $(this).attr("style").match(/width:\s*(\d+)%/);
                if (w) {
                    const width = w[1];
                    $(this).css("width", "0%");
                    const el = $(this);
                    setTimeout(function () {
                        el.css("width", width + "%");
                    }, 200);
                }
            });
        }
    }

    $(window).on("scroll", animateDashboardCounters);
    animateDashboardCounters();


    /* ---------- 7. Contact Form Validation ---------- */
    $("#contactForm").on("submit", function (e) {
        e.preventDefault();

        let valid = true;

        // Clear previous errors
        $(".error-msg").text("");
        $(".form-control").removeClass("invalid");

        // Name
        const name = $("#name").val().trim();
        if (name.length < 2) {
            $('[data-for="name"]').text("Please enter your full name.");
            $("#name").addClass("invalid");
            valid = false;
        }

        // Email
        const email = $("#email").val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('[data-for="email"]').text("Please enter a valid email address.");
            $("#email").addClass("invalid");
            valid = false;
        }

        // Subject
        if (!$("#subject").val()) {
            $('[data-for="subject"]').text("Please choose a topic.");
            $("#subject").addClass("invalid");
            valid = false;
        }

        // Message
        const message = $("#message").val().trim();
        if (message.length < 10) {
            $('[data-for="message"]').text("Message should be at least 10 characters.");
            $("#message").addClass("invalid");
            valid = false;
        }

        // If valid, show success
        if (valid) {
            $("#formSuccess").fadeIn(300);

            setTimeout(function () {
                $("#formSuccess").fadeOut(400);
            }, 5000);
        }
    });

    // Remove error on input
    $("#contactForm .form-control").on("input change", function () {
        $(this).removeClass("invalid");
        const fieldName = $(this).attr("id");
        $('[data-for="' + fieldName + '"]').text("");
    });

    // Success console log
    console.log("NOVA GRID loaded successfully — Pakistan edition 🇵🇰");

});



/* =====================================
   NOVA GRID CUSTOM AI ASSISTANT
===================================== */

const knowledgeBase = [
    {
        keywords: ["hi", "hello", "hey", "salam", "assalam"],
        answer: "Hello! Welcome to NOVA GRID. How can I help you with your energy needs today?"
    },
    {
        keywords: ["services", "what do you do", "solutions", "work"],
        answer: "We provide Solar Energy, Wind Energy (Jhimpir corridor), Smart Cities infrastructure, and Energy Storage solutions across Pakistan."
    },
    {
        keywords: ["price", "pricing", "cost", "rate", "charges", "how much"],
        answer: "Our pricing depends on the scale of the project. Please visit our Contact page and send us an inquiry for a custom quote."
    },
    {
        keywords: ["timeline", "time", "how long", "duration", "delivery"],
        answer: "Project timelines vary. Small residential solar setups take 1-2 weeks, while large commercial wind or smart city projects can take 3-6 months."
    },
    {
        keywords: ["contact", "phone", "email", "address", "location", "office"],
        answer: "You can email us at hello@novagrid.pk or visit our office in Blue Area, Jinnah Avenue, Islamabad."
    },
    {
        keywords: ["solar", "sun", "panels"],
        answer: "Our solar solutions help homes and businesses harness Pakistan's abundant sunlight for clean electricity. We have projects like Quaid-e-Azam Solar Park."
    },
    {
        keywords: ["wind", "turbine", "jhimpir"],
        answer: "We utilize the Jhimpir wind corridor in Sindh to generate reliable renewable electricity for the national grid."
    },
    {
        keywords: ["dashboard", "monitoring", "data", "live"],
        answer: "The Dashboard page currently shows sample metrics for demonstration; it is not connected to live data."
    },
    {
        keywords: ["project", "portfolio", "bahawalpur", "lahore", "karachi", "quetta"],
        answer: "We have completed many projects including Quaid-e-Azam Solar Park (Bahawalpur), Jhimpir Wind Corridor, and Smart Grids in Islamabad & Quetta. Check our Projects page!"
    },
    {
        keywords: ["who are you", "nova", "company"],
        answer: "NOVA GRID is a forward-thinking energy technology company focused on creating smarter and more sustainable energy solutions for Pakistan."
    }
];

// Fallback answer if bot doesn't know the answer
const fallbackAnswer = "I am NOVA GRID's automated assistant, so I might not have the answer to that. For detailed or custom queries, please visit our Contact page and send us a message!";

const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Toggle Chat Window
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });
}

// Close Chat
if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
}

// Send Message on Enter key
if (chatInput) {
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUserMessage();
        }
    });
}

// Send Message on Button Click
if (chatSend) {
    chatSend.addEventListener('click', handleUserMessage);
}

// Handle Quick Reply Buttons
function sendQuickReply(text) {
    chatInput.value = text;
    handleUserMessage();
}

// Main function to process user message
function handleUserMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    // 1. Add User Message to Chat
    appendMessage(text, 'user-message');
    chatInput.value = '';

    // 2. Simulate Bot Typing
    setTimeout(() => {
        const botReply = getBotReply(text);
        appendMessage(botReply, 'bot-message');
    }, 800); // 0.8 seconds delay for realistic feel
}

// Function to append message to chat body
function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${className}`;
    messageDiv.innerText = text;
    chatBody.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Logic to find the best answer
function getBotReply(userText) {
    const lowerText = userText.toLowerCase();

    // Search for keyword matches
    for (let item of knowledgeBase) {
        for (let keyword of item.keywords) {
            if (lowerText.includes(keyword)) {
                return item.answer;
            }
        }
    }

    // If no match found, return fallback
    return fallbackAnswer;
}