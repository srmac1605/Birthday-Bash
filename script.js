document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Magical Spores (Confetti)
    const duration = 4000;
    const end = Date.now() + duration;

    function createSpores(originX) {
        confetti({
            particleCount: 3,
            angle: 90,
            spread: 90,
            origin: { x: originX, y: 1.1 },
            colors: ['#b5f542', '#b452ff', '#ffffff'],
            startVelocity: 50,
            gravity: 0.2,
            ticks: 300,
            shapes: ['circle']
        });
    }

    (function frame() {
        createSpores(Math.random());
        createSpores(Math.random());
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    setInterval(() => {
        if(Math.random() > 0.5) {
            createSpores(Math.random());
        }
    }, 2000);

    // 2. Explore Button
    document.getElementById("explore-btn").addEventListener("click", (e) => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#b5f542', '#b452ff', '#ffffff'],
            startVelocity: 40,
            gravity: 0.5,
            shapes: ['circle', 'star']
        });
        
        setTimeout(() => {
            document.getElementById("card").scrollIntoView({ behavior: "smooth" });
        }, 200);
    });

    // 3. Blow Candles Animation
    const blowBtn = document.getElementById("blow-btn");
    if (blowBtn) {
        blowBtn.addEventListener("click", () => {
            // Blow out all flames
            const flames = document.querySelectorAll('.flame');
            flames.forEach(flame => {
                flame.classList.add('blown-out');
            });
            
            // Wait slightly for flames to disappear, then animate digit 5 to 6
            setTimeout(() => {
                const digitContainer = document.querySelector('.digit-container');
                if (digitContainer) {
                    digitContainer.classList.add('digit-animate');
                }
                
                // Magical Confetti pop for turning 26!
                setTimeout(() => {
                    confetti({
                        particleCount: 150,
                        spread: 180,
                        origin: { y: 0.5 },
                        colors: ['#b5f542', '#b452ff', '#ffffff', '#ffcc00'],
                        startVelocity: 60,
                        gravity: 0.8,
                        shapes: ['star']
                    });
                }, 800);
                
            }, 600);

            blowBtn.textContent = "Happy 26th Birthday! 🎉";
            blowBtn.disabled = true;
            blowBtn.style.pointerEvents = 'none';
        });
    }

    // 4. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    tl.to(".hero-content", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
    });

    gsap.utils.toArray(".wish-item").forEach((item, i) => {
        gsap.set(item, { y: 60, opacity: 0, scale: 0.95 });
        gsap.to(item, {
            scrollTrigger: { trigger: item, start: "top 85%" },
            opacity: 1, y: 0, scale: 1, duration: 1.2,
            ease: "back.out(1.2)", delay: i * 0.2
        });
    });

    gsap.utils.toArray(".cake-container").forEach((item) => {
        gsap.set(item, { y: 50, opacity: 0, scale: 0.9 });
        gsap.to(item, {
            scrollTrigger: { trigger: item, start: "top 80%" },
            opacity: 1, y: 0, scale: 1, duration: 1.5,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray(".media-item").forEach((item, i) => {
        gsap.set(item, { y: 50, opacity: 0 });
        gsap.to(item, {
            scrollTrigger: { trigger: item, start: "top 90%" },
            opacity: 1, y: 0, duration: 1,
            ease: "power3.out", delay: (i % 3) * 0.15 
        });
    });

    gsap.from(".script-text", {
        scrollTrigger: { trigger: ".wishes-section", start: "top 80%" },
        opacity: 0, y: 40, duration: 1.2, ease: "power2.out"
    });

    gsap.from(".final-wish", {
        scrollTrigger: { trigger: ".wishes-section", start: "top 80%" },
        opacity: 0, y: 30, duration: 1, delay: 0.3, ease: "power2.out"
    });
});
