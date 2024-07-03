document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.num');
    const speed = 200; // Adjust speed here

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-val');
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  });
