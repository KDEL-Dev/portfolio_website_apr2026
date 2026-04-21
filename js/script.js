window.onload = () => {

    gsap.registerPlugin(Draggable);

    const container = document.getElementById("#projectContainer");

    container.innerHTML += container.innerHTML;

    const cards = document.querySelectorAll(".allCards");
    const totalCards = cards.length / 2;

    let currentIndex = 0;

    const cardWidth = cards[0].offsetWidth + 20;
    const wrapper = document.querySelector("#projectWrapper");
    const containerWidth = wrapper.offsetWidth;

    const offset = (containerWidth / 2) - (cardWidth / 2);

    const totalWidth = container.scrollWidth / 2;

    gsap.set(container, { x: 0 });

    // -------------------------
    // LOOP WRAPPING
    // -------------------------
    function checkBounds() {
        let x = gsap.getProperty(container, "x");

        if (x <= -totalWidth) {
            gsap.set(container, { x: x + totalWidth });
        } else if (x >= 0) {
            gsap.set(container, { x: x - totalWidth });
        }
    }

    // -------------------------
    // CENTER CARD SCALING
    // -------------------------
    function updateCardScale() {
        const center = window.innerWidth / 2;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;

            const distance = Math.abs(center - cardCenter);

            const maxDistance = 400;

            let scale = 1 - (distance / maxDistance) * 0.25;

            scale = Math.max(0.85, Math.min(1.15, scale));

            gsap.set(card, {
                scale: scale
            });
        });
    }

    // -------------------------
    // GO TO CARD (SNAP)
    // -------------------------
    function goToCard(index) {
        currentIndex = index;

        gsap.to(container, {
            x: -(currentIndex * cardWidth) + offset,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
                checkBounds();
                updateCardScale();
            }
        });
    }

    // -------------------------
    // DRAG SUPPORT
    // -------------------------
    Draggable.create(container, {
        type: "x",
        inertia: true,
        edgeResistance: 0.85,

        onDrag: () => {
            checkBounds();
            updateCardScale();
        },

        onThrowUpdate: () => {
            checkBounds();
            updateCardScale();
        },

        onDragEnd: () => {
            let x = gsap.getProperty(container, "x");
            let index = Math.round((-x + offset) / cardWidth);
            goToCard(index);
        }
    });

    // -------------------------
    // BUTTONS
    // -------------------------
    const nextBtn = document.querySelector("#next");
    const prevBtn = document.querySelector("#prev");

    nextBtn.addEventListener("click", () => {
        goToCard(currentIndex + 1);
    });

    prevBtn.addEventListener("click", () => {
        goToCard(currentIndex - 1);
    });

    // -------------------------
    // INIT SCALE
    // -------------------------
    updateCardScale();

};